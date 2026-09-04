"use client";

import React, { useRef, useEffect, useState } from "react";

interface KineticGridProps {
  background?: string;
  dotColor?: string;
  lineColor?: string;
  trailColor?: string;
  spacing?: number; // grid spacing in px
  radius?: number; // cursor attraction radius in px
  strength?: number; // 1-10 attraction strength
  trail?: boolean; // show cursor trail line
  style?: React.CSSProperties;
}

export default function KineticGrid({
  background = "transparent",
  dotColor = "rgba(255,255,255,0.4)",
  lineColor = "rgba(255,255,255,0.1)",
  trailColor = "rgba(182, 245, 0, 0.4)", // Cinova accent for trail
  spacing = 40,
  radius = 250,
  strength = 3,
  trail = true,
  style,
}: KineticGridProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const trailRef = useRef<{ x: number; y: number; t: number }[]>([]);

  // State to manage reduced motion and coarse pointers safely
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Only animate if no reduced motion preference
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!reduced) {
      setShouldAnimate(true);
    }
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = Math.max(8, spacing);
    const R = Math.max(1, radius);
    const PULL = (Math.max(1, Math.min(10, strength)) / 10) * 4;

    let W = 1;
    let H = 1;
    let cols: { hx: number; hy: number; x: number; y: number; vx: number; vy: number }[][] = [];
    let dots: { hx: number; hy: number; x: number; y: number; vx: number; vy: number }[] = [];

    const build = (mw?: number, mh?: number) => {
      const r = host.getBoundingClientRect();
      W = Math.max(1, Math.floor(mw ?? r.width));
      H = Math.max(1, Math.floor(mh ?? r.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
      
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = [];
      dots = [];
      const nCols = Math.floor(W / GAP) + 2;
      const nRows = Math.floor(H / GAP) + 2;
      for (let c = 0; c < nCols; c++) {
        const col: typeof dots = [];
        for (let rIdx = 0; rIdx < nRows; rIdx++) {
          const hx = c * GAP;
          const hy = rIdx * GAP;
          const d = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 };
          col.push(d);
          dots.push(d);
        }
        cols.push(col);
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.75;
      
      for (let c = 0; c < cols.length; c++) {
        for (let rIdx = 0; rIdx < cols[c].length; rIdx++) {
          const d = cols[c][rIdx];
          const right = cols[c + 1]?.[rIdx];
          const down = cols[c]?.[rIdx + 1];
          if (right) {
            ctx.beginPath();
            ctx.moveTo(d.hx, d.hy);
            ctx.lineTo(right.hx, right.hy);
            ctx.stroke();
          }
          if (down) {
            ctx.beginPath();
            ctx.moveTo(d.hx, d.hy);
            ctx.lineTo(down.hx, down.hy);
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = dotColor;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.hx, d.hy, 1.2, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    build();

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) {
        build(cr.width, cr.height);
        if (!shouldAnimate) drawStatic();
      }
    });
    ro.observe(host);

    if (!shouldAnimate) {
      drawStatic();
      return () => ro.disconnect();
    }

    // Animation logic
    let isIntersecting = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(host);

    // Listen on window so the grid reacts to cursor movement even when
    // the parent element has CSS pointer-events:none.
    const onWindowMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const inBounds =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;

      if (!inBounds) {
        mouseRef.current.active = false;
        return;
      }

      const cr = canvas.getBoundingClientRect();
      const mx = e.clientX - cr.left;
      const my = e.clientY - cr.top;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      mouseRef.current.active = true;
      const now = performance.now();
      const tr = trailRef.current;
      tr.push({ x: mx, y: my, t: now });
      if (tr.length > 80) tr.shift();
    };

    window.addEventListener("mousemove", onWindowMove, { passive: true });

    let raf = 0;
    const frame = () => {
      if (!isIntersecting) {
        raf = requestAnimationFrame(frame);
        return; // Skip drawing to save CPU
      }

      const m = mouseRef.current;
      ctx.clearRect(0, 0, W, H);

      // Physics
      for (const d of dots) {
        let ax = (d.hx - d.x) * 0.08;
        let ay = (d.hy - d.y) * 0.08;
        if (m.active) {
          const dx = m.x - d.x;
          const dy = m.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R && dist > 0.001) {
            const f = (1 - dist / R) * PULL;
            ax += (dx / dist) * f;
            ay += (dy / dist) * f;
          }
        }
        d.vx = (d.vx + ax) * 0.82;
        d.vy = (d.vy + ay) * 0.82;
        d.x += d.vx;
        d.y += d.vy;
      }

      // Lines
      for (let c = 0; c < cols.length; c++) {
        for (let rIdx = 0; rIdx < cols[c].length; rIdx++) {
          const d = cols[c][rIdx];
          const right = cols[c + 1]?.[rIdx];
          const down = cols[c]?.[rIdx + 1];
          const prox = m.active
            ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R)
            : 0;
            
          if (right) {
            ctx.globalAlpha = 0.06 + prox * 0.5;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5 + prox * 1.5;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }
          if (down) {
            ctx.globalAlpha = 0.06 + prox * 0.5;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5 + prox * 1.5;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(down.x, down.y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const d of dots) {
        const prox = m.active
          ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R)
          : 0;
        ctx.globalAlpha = 0.15 + prox * 0.8;
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 0.8 + prox * 2, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Trail
      if (trail) {
        const now = performance.now();
        const tr = trailRef.current;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < tr.length; i++) {
          const a = tr[i - 1];
          const b = tr[i];
          const age = now - b.t;
          if (age > 300) continue; // Trail fades out over 300ms
          ctx.globalAlpha = Math.max(0, 1 - age / 300) * 0.6;
          ctx.strokeStyle = trailColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
      window.removeEventListener("mousemove", onWindowMove);
    };
  }, [spacing, radius, strength, trail, lineColor, dotColor, trailColor, shouldAnimate]);

  return (
    <div
      ref={hostRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
