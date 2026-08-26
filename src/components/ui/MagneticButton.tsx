"use client";

/**
 * MagneticButton — Subtle magnetic pull effect on fine-pointer (desktop) devices.
 *
 * Safety contract:
 * - Only activates on fine-pointer (mouse) devices via matchMedia.
 * - Automatically disabled when prefers-reduced-motion is set.
 * - pointer-events are never modified; clicks always pass through.
 * - Listeners are scoped to the element and cleaned up on unmount.
 * - Uses CSS transform only (GPU-composited, no layout reflow).
 * - Movement is deliberately subtle: max 28px pull at center, 0.3 factor.
 */

import React, { useRef, useCallback, useEffect, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Maximum pixel displacement at element center. Default: 22 */
  strength?: number;
  /** HTML element tag. Default: "div" */
  as?: React.ElementType;
  [key: string]: unknown;
}

export default function MagneticButton({
  children,
  className = "",
  style,
  strength = 22,
  as: Tag = "div",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  /* ── Determine if magnetic should activate ── */
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setActive(fine.matches && !reduced.matches);
    update();

    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!active || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalise to [-1, 1] within the element bounding box
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);
      const dx = nx * strength;
      const dy = ny * strength;
      ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [active, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }, []);

  const mergedStyle: React.CSSProperties = {
    transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
    willChange: "transform",
    display: "inline-flex",
    ...style,
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      style={mergedStyle}
      onMouseMove={active ? onMouseMove : undefined}
      onMouseLeave={active ? onMouseLeave : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
