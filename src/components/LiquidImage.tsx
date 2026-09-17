"use client";

import React, { useRef, useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   SHADERS  (faithful to Pavel Dobryakov / Ksenia Kondrashova)
   ═══════════════════════════════════════════════════════════════ */

/* Shared vertex — outputs vUv + neighbours for sim passes */
const VERT = `
  precision highp float;
  attribute vec2 a_position;
  varying vec2 vUv;
  varying vec2 vL; varying vec2 vR;
  varying vec2 vT; varying vec2 vB;
  uniform vec2 u_texel;
  void main () {
    vUv = .5 * (a_position + 1.);
    vL = vUv - vec2(u_texel.x, 0.);
    vR = vUv + vec2(u_texel.x, 0.);
    vT = vUv + vec2(0., u_texel.y);
    vB = vUv - vec2(0., u_texel.y);
    gl_Position = vec4(a_position, 0., 1.);
  }
`;

/* Bilinear-interpolated advection */
const ADVECT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_velocity_texture;
  uniform sampler2D u_input_texture;
  uniform vec2 u_texel;
  uniform vec2 u_output_textel;
  uniform float u_dt;
  uniform float u_dissipation;
  vec4 bilerp(sampler2D s, vec2 uv, vec2 ts) {
    vec2 st = uv / ts - .5;
    vec2 i = floor(st); vec2 f = fract(st);
    vec4 a = texture2D(s, (i + vec2(.5,.5)) * ts);
    vec4 b = texture2D(s, (i + vec2(1.5,.5)) * ts);
    vec4 c = texture2D(s, (i + vec2(.5,1.5)) * ts);
    vec4 d = texture2D(s, (i + vec2(1.5,1.5)) * ts);
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }
  void main () {
    vec2 coord = vUv - u_dt * bilerp(u_velocity_texture, vUv, u_texel).xy * u_texel;
    gl_FragColor = u_dissipation * bilerp(u_input_texture, coord, u_output_textel);
  }
`;

const DIVERGENCE = `
  precision highp float;
  varying vec2 vL; varying vec2 vR;
  varying vec2 vT; varying vec2 vB;
  uniform sampler2D u_velocity_texture;
  void main () {
    float L = texture2D(u_velocity_texture, vL).x;
    float R = texture2D(u_velocity_texture, vR).x;
    float T = texture2D(u_velocity_texture, vT).y;
    float B = texture2D(u_velocity_texture, vB).y;
    gl_FragColor = vec4(.25 * (R - L + T - B), 0., 0., 1.);
  }
`;

const PRESSURE = `
  precision highp float;
  varying vec2 vL; varying vec2 vR;
  varying vec2 vT; varying vec2 vB;
  varying vec2 vUv;
  uniform sampler2D u_pressure_texture;
  uniform sampler2D u_divergence_texture;
  void main () {
    float L = texture2D(u_pressure_texture, vL).x;
    float R = texture2D(u_pressure_texture, vR).x;
    float T = texture2D(u_pressure_texture, vT).x;
    float B = texture2D(u_pressure_texture, vB).x;
    float div = texture2D(u_divergence_texture, vUv).x;
    gl_FragColor = vec4((L + R + B + T - div) * .25, 0., 0., 1.);
  }
`;

const GRADIENT_SUBTRACT = `
  precision highp float;
  varying vec2 vL; varying vec2 vR;
  varying vec2 vT; varying vec2 vB;
  varying vec2 vUv;
  uniform sampler2D u_pressure_texture;
  uniform sampler2D u_velocity_texture;
  void main () {
    float L = texture2D(u_pressure_texture, vL).x;
    float R = texture2D(u_pressure_texture, vR).x;
    float T = texture2D(u_pressure_texture, vT).x;
    float B = texture2D(u_pressure_texture, vB).x;
    vec2 vel = texture2D(u_velocity_texture, vUv).xy;
    vel -= vec2(R - L, T - B);
    gl_FragColor = vec4(vel, 0., 1.);
  }
`;

/* Gaussian splat — adds velocity or density at pointer position */
const SPLAT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_input_texture;
  uniform vec2 u_point;
  uniform vec3 u_point_value;
  uniform float u_point_size;
  uniform float u_ratio;
  void main () {
    vec2 p = vUv - u_point;
    p.x *= u_ratio;
    float splat = .6 * pow(2., -dot(p,p) / u_point_size);
    vec3 base = texture2D(u_input_texture, vUv).xyz;
    gl_FragColor = vec4(base + splat * u_point_value, 1.);
  }
`;

/*
  Display shader — key fixes vs previous:
  - u_disturb_power kept LOW (0.12 max) to prevent edge tears
  - displacement applied once (not twice)
  - velocity magnitude test avoids normalizing near-zero vectors
  - aspect-ratio correct cover mapping with scale_factor = 1.0 (fill, no over-zoom)
  - smoothstep alpha guard prevents edge pixel bleed
*/
const DISPLAY = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_output_texture;
  uniform sampler2D u_velocity_texture;
  uniform sampler2D u_image_texture;
  uniform float u_ratio;
  uniform float u_img_ratio;
  uniform float u_disturb_power;

  vec2 cover_uv(vec2 uv) {
    /* Cover-fit: fill the canvas without stretching */
    vec2 c = uv - .5;
    if (u_ratio > u_img_ratio) {
      c.x *= u_ratio / u_img_ratio;
    } else {
      c.y *= u_img_ratio / u_ratio;
    }
    return c + .5;
  }

  void main () {
    float density = texture2D(u_output_texture, vUv).r;

    vec2 vel = texture2D(u_velocity_texture, vUv).xy;
    float speed = length(vel);
    vec2 dir = speed > 0.0001 ? vel / speed : vec2(0.);

    vec2 img_uv = cover_uv(vUv);
    /* Single displacement application — keeps effect subtle */
    img_uv -= u_disturb_power * dir * density;

    /* Clamp to prevent edge-wrap sampling artifacts */
    img_uv = clamp(img_uv, vec2(0.001), vec2(0.999));

    /* WebGL textures load bottom-up, flip Y for correct orientation */
    vec3 col = texture2D(u_image_texture, vec2(img_uv.x, 1. - img_uv.y)).rgb;

    /* Soft alpha guard at image borders */
    float alpha = smoothstep(0., .005, img_uv.x) * smoothstep(1., .995, img_uv.x)
                * smoothstep(0., .005, img_uv.y) * smoothstep(1., .995, img_uv.y);

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ═══════════════════════════════════════════════════════════════
   GL HELPERS
   ═══════════════════════════════════════════════════════════════ */

function makeShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(`[LiquidImage] Shader error: ${log}`);
  }
  return s;
}

function makeProgram(gl: WebGLRenderingContext, vert: string, frag: string): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, makeShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, makeShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(`[LiquidImage] Link error: ${gl.getProgramInfoLog(p)}`);
  }
  return p;
}

type FBO = { fbo: WebGLFramebuffer; tex: WebGLTexture; w: number; h: number; tx: number; ty: number };
type DoubleFBO = { read: FBO; write: FBO; tx: number; ty: number; swap(): void };

function makeFBO(gl: WebGLRenderingContext, w: number, h: number): FBO {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);

  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return { fbo, tex, w, h, tx: 1 / w, ty: 1 / h };
}

function makeDoubleFBO(gl: WebGLRenderingContext, w: number, h: number): DoubleFBO {
  let a = makeFBO(gl, w, h);
  let b = makeFBO(gl, w, h);
  return {
    get read() { return a; },
    get write() { return b; },
    tx: 1 / w,
    ty: 1 / h,
    swap() { const t = a; a = b; b = t; },
  };
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

interface LiquidImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

function isFinePointer() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function LiquidImage({ src, alt = "", className, style }: LiquidImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  /* Start as SSR-safe fallback; flip once after hydration on qualifying devices */
  const [webgl, setWebgl] = useState(false);
  useEffect(() => { setWebgl(isFinePointer()); }, []);

  const glRef     = useRef<WebGLRenderingContext | null>(null);
  const rafRef    = useRef<number | null>(null);
  const readyRef  = useRef(false);

  const pAdvect   = useRef<WebGLProgram | null>(null);
  const pDiv      = useRef<WebGLProgram | null>(null);
  const pPressure = useRef<WebGLProgram | null>(null);
  const pGrad     = useRef<WebGLProgram | null>(null);
  const pSplat    = useRef<WebGLProgram | null>(null);
  const pDisplay  = useRef<WebGLProgram | null>(null);

  const vel       = useRef<DoubleFBO | null>(null);
  const pressure  = useRef<DoubleFBO | null>(null);
  const density   = useRef<DoubleFBO | null>(null);
  const divergRef = useRef<FBO | null>(null);
  const imageTex  = useRef<WebGLTexture | null>(null);
  const quadBuf   = useRef<WebGLBuffer | null>(null);
  const imgRatio  = useRef(1.5); // overwritten on image load

  const ptr = useRef({ x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false });

  /* Tuning — increased for broader, smoother cinematic distortion */
  const CURSOR_SIZE    = 0.0085; // gaussian radius in UV² space
  const CURSOR_POWER   = 0.05;   // density injection per frame
  const DISTURB_POWER  = 0.35;   // UV displacement scale
  const VEL_DISSIPATION = 0.98;
  const DEN_DISSIPATION = 0.985;
  const SIM_W = 512;
  const SIM_H = 512;
  const DT = 1 / 60;

  useEffect(() => {
    if (!webgl) return;

    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    /* --- Context -------------------------------------------------- */
    const gl = canvas.getContext("webgl", {
      alpha: true,               // need alpha for the edge-guard smoothstep
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    if (!gl.getExtension("OES_texture_float")) {
      console.warn("[LiquidImage] OES_texture_float not supported — falling back");
      return;
    }
    glRef.current = gl;

    /* --- Compile shaders ------------------------------------------ */
    try {
      pAdvect.current   = makeProgram(gl, VERT, ADVECT);
      pDiv.current      = makeProgram(gl, VERT, DIVERGENCE);
      pPressure.current = makeProgram(gl, VERT, PRESSURE);
      pGrad.current     = makeProgram(gl, VERT, GRADIENT_SUBTRACT);
      pSplat.current    = makeProgram(gl, VERT, SPLAT);
      pDisplay.current  = makeProgram(gl, VERT, DISPLAY);
    } catch (e) {
      console.warn(e);
      return;
    }

    /* --- Quad buffer ---------------------------------------------- */
    const q = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, q);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    quadBuf.current = q;

    /* --- FBOs ----------------------------------------------------- */
    vel.current      = makeDoubleFBO(gl, SIM_W, SIM_H);
    pressure.current = makeDoubleFBO(gl, SIM_W, SIM_H);
    density.current  = makeDoubleFBO(gl, SIM_W, SIM_H);
    divergRef.current = makeFBO(gl, SIM_W, SIM_H);

    /* --- Canvas sizing -------------------------------------------- */
    const resize = () => {
      const r = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(r.width  * dpr);
      canvas.height = Math.round(r.height * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    /* --- Image texture -------------------------------------------- */
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRatio.current = img.naturalWidth / img.naturalHeight;
      const t = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      imageTex.current = t;
      readyRef.current = true;
    };
    img.src = src;

    /* --- Pointer -------------------------------------------------- */
    const onMove = (e: PointerEvent) => {
      const r = wrapper.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top)  / r.height;
      const p  = ptr.current;
      p.dx = 8 * (nx - p.x);
      p.dy = 8 * (ny - p.y);
      p.x  = nx;
      p.y  = ny;
      p.moved = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    /* --- Helpers -------------------------------------------------- */
    const bind = (tex: WebGLTexture, unit: number) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
    };

    const pass = (
      prog: WebGLProgram,
      fbo: WebGLFramebuffer | null,
      w: number,
      h: number,
      setup: (u: (n: string) => WebGLUniformLocation | null) => void
    ) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, w, h);
      gl.useProgram(prog);
      const u = (n: string) => gl.getUniformLocation(prog, n);
      setup(u);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf.current);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    /* --- Render loop ---------------------------------------------- */
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      if (!readyRef.current) return;

      const V  = vel.current!;
      const P  = pressure.current!;
      const D  = density.current!;
      const Dv = divergRef.current!;
      const p  = ptr.current;
      const canvasRatio = canvas.width / canvas.height;

      /* 1 — Splat velocity + density */
      if (p.moved) {
        p.moved = false;

        pass(pSplat.current!, V.write.fbo, V.read.w, V.read.h, (u) => {
          bind(V.read.tex, 1);
          gl.uniform1i(u("u_input_texture"), 1);
          gl.uniform2f(u("u_point"), p.x, 1 - p.y); // flip Y for WebGL
          gl.uniform3f(u("u_point_value"), p.dx, -p.dy, 0);
          gl.uniform1f(u("u_point_size"), CURSOR_SIZE);
          gl.uniform1f(u("u_ratio"), canvasRatio);
        });
        V.swap();

        pass(pSplat.current!, D.write.fbo, D.read.w, D.read.h, (u) => {
          bind(D.read.tex, 1);
          gl.uniform1i(u("u_input_texture"), 1);
          gl.uniform2f(u("u_point"), p.x, 1 - p.y);
          gl.uniform3f(u("u_point_value"), CURSOR_POWER, CURSOR_POWER, CURSOR_POWER);
          gl.uniform1f(u("u_point_size"), CURSOR_SIZE);
          gl.uniform1f(u("u_ratio"), canvasRatio);
        });
        D.swap();
      }

      /* 2 — Divergence */
      pass(pDiv.current!, Dv.fbo, Dv.w, Dv.h, (u) => {
        bind(V.read.tex, 1);
        gl.uniform1i(u("u_velocity_texture"), 1);
        gl.uniform2f(u("u_texel"), V.tx, V.ty);
      });

      /* 3 — Pressure (Jacobi, 16 iterations) */
      gl.useProgram(pPressure.current!);
      const pu = (n: string) => gl.getUniformLocation(pPressure.current!, n);
      gl.uniform2f(pu("u_texel"), V.tx, V.ty);
      bind(Dv.tex, 1); gl.uniform1i(pu("u_divergence_texture"), 1);
      for (let i = 0; i < 16; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, P.write.fbo);
        gl.viewport(0, 0, P.read.w, P.read.h);
        bind(P.read.tex, 2); gl.uniform1i(pu("u_pressure_texture"), 2);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        P.swap();
      }

      /* 4 — Gradient subtract */
      pass(pGrad.current!, V.write.fbo, V.read.w, V.read.h, (u) => {
        bind(P.read.tex, 1); gl.uniform1i(u("u_pressure_texture"), 1);
        bind(V.read.tex, 2); gl.uniform1i(u("u_velocity_texture"), 2);
        gl.uniform2f(u("u_texel"), V.tx, V.ty);
      });
      V.swap();

      /* 5 — Advect velocity */
      pass(pAdvect.current!, V.write.fbo, V.read.w, V.read.h, (u) => {
        bind(V.read.tex, 1);
        gl.uniform1i(u("u_velocity_texture"), 1);
        gl.uniform1i(u("u_input_texture"), 1);
        gl.uniform2f(u("u_texel"), V.tx, V.ty);
        gl.uniform2f(u("u_output_textel"), V.tx, V.ty);
        gl.uniform1f(u("u_dt"), DT);
        gl.uniform1f(u("u_dissipation"), VEL_DISSIPATION);
      });
      V.swap();

      /* 6 — Advect density */
      pass(pAdvect.current!, D.write.fbo, D.read.w, D.read.h, (u) => {
        bind(V.read.tex, 1); gl.uniform1i(u("u_velocity_texture"), 1);
        bind(D.read.tex, 2); gl.uniform1i(u("u_input_texture"), 2);
        gl.uniform2f(u("u_texel"), V.tx, V.ty);
        gl.uniform2f(u("u_output_textel"), D.tx, D.ty);
        gl.uniform1f(u("u_dt"), 8 * DT);
        gl.uniform1f(u("u_dissipation"), DEN_DISSIPATION);
      });
      D.swap();

      /* 7 — Display */
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(pDisplay.current!);
      const du = (n: string) => gl.getUniformLocation(pDisplay.current!, n);
      bind(D.read.tex, 1);         gl.uniform1i(du("u_output_texture"), 1);
      bind(V.read.tex, 2);         gl.uniform1i(du("u_velocity_texture"), 2);
      bind(imageTex.current!, 3);  gl.uniform1i(du("u_image_texture"), 3);
      gl.uniform1f(du("u_ratio"), canvasRatio);
      gl.uniform1f(du("u_img_ratio"), imgRatio.current);
      gl.uniform1f(du("u_disturb_power"), DISTURB_POWER);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      readyRef.current = false;
      [pAdvect, pDiv, pPressure, pGrad, pSplat, pDisplay]
        .forEach(r => { if (r.current) gl.deleteProgram(r.current); });
      if (quadBuf.current) gl.deleteBuffer(quadBuf.current);
      if (imageTex.current) gl.deleteTexture(imageTex.current);
      [vel, pressure, density].forEach(r => {
        if (r.current) {
          gl.deleteTexture(r.current.read.tex); gl.deleteFramebuffer(r.current.read.fbo);
          gl.deleteTexture(r.current.write.tex); gl.deleteFramebuffer(r.current.write.fbo);
        }
      });
      if (divergRef.current) {
        gl.deleteTexture(divergRef.current.tex);
        gl.deleteFramebuffer(divergRef.current.fbo);
      }
    };
  }, [src, webgl]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", ...style }}
      role="img"
      aria-label={alt}
    >
      {/* Fallback static image — always rendered; hidden only on WebGL devices */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 30%",
          display: webgl ? "none" : "block",
          pointerEvents: "none",
        }}
      />
      {/* WebGL canvas */}
      {webgl && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            display: "block",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
