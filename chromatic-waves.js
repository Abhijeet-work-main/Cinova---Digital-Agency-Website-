/**
 * ChromaticWaves — Vanilla JS WebGL2 port of the Originkit component.
 * No OGL, no npm. Pure WebGL2 + requestAnimationFrame.
 *
 * Settings (matching screenshot):
 *   frequency:2, speed:2, background:#FFFFFF
 *   colors:["#000000","#B6F500","#B6F500","#B6F500"]
 *   cellSize:5, gamma:6, paletteBias:1
 */

(function () {
  "use strict";

  var CONFIG = {
    frequency: 2,
    speed: 2,
    bgColor: "#FFFFFF",
    colors: ["#B6F500"],
    cellSize: 3,
    gamma: 7,
    paletteBias: 5,
    fps: 30,
  };

  function mapLinear(v, a, b, c, d) {
    if (b === a) return c;
    return c + ((v - a) / (b - a)) * (d - c);
  }
  function mapFreq(ui) {
    return mapLinear(ui, 1, 10, 0.3, 6);
  }
  function mapSpeed(ui) {
    return ui * 0.05;
  }
  function mapCell(ui) {
    return mapLinear(ui, 1, 100, 6, 60);
  }
  function mapGamma(ui) {
    return mapLinear(ui, 1, 20, 0.5, 8);
  }
  function mapBias(ui) {
    return ui * 0.05;
  }

  function hexToRgba(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3)
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    if (hex.length === 6)
      return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
        1,
      ];
    if (hex.length === 8)
      return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
        parseInt(hex.slice(6, 8), 16) / 255,
      ];
    return [0, 0, 0, 1];
  }

  function buildPalette(colorList) {
    var MAX = 10,
      rgb = [],
      alpha = [];
    for (var i = 0; i < MAX; i++) {
      var c = colorList[i];
      if (c) {
        var rgba = hexToRgba(c);
        rgb.push(rgba[0], rgba[1], rgba[2]);
        alpha.push(rgba[3]);
      } else {
        rgb.push(0, 0, 0);
        alpha.push(0);
      }
    }
    return { rgb: new Float32Array(rgb), alpha: new Float32Array(alpha) };
  }

  var PERLIN_VERT = [
    "#version 300 es",
    "in vec2 uv;",
    "in vec2 position;",
    "out vec2 vUv;",
    "void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}",
  ].join("\n");

  var PERLIN_FRAG = [
    "#version 300 es",
    "precision mediump float;",
    "uniform float uFrequency;",
    "uniform float uTime;",
    "uniform float uSpeed;",
    "uniform float uValue;",
    "uniform vec2 uResolution;",
    "in vec2 vUv;",
    "out vec4 fragColor;",
    "vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}",
    "vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}",
    "vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}",
    "vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}",
    "float snoise(vec3 v){",
    "  const vec2 C=vec2(1./6.,1./3.);",
    "  const vec4 D=vec4(0.,.5,1.,2.);",
    "  vec3 i=floor(v+dot(v,C.yyy));",
    "  vec3 x0=v-i+dot(i,C.xxx);",
    "  vec3 g=step(x0.yzx,x0.xyz);",
    "  vec3 l=1.-g;",
    "  vec3 i1=min(g.xyz,l.zxy);",
    "  vec3 i2=max(g.xyz,l.zxy);",
    "  vec3 x1=x0-i1+C.xxx;",
    "  vec3 x2=x0-i2+C.yyy;",
    "  vec3 x3=x0-D.yyy;",
    "  i=mod289v3(i);",
    "  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));",
    "  float n_=0.142857142857;",
    "  vec3 ns=n_*D.wyz-D.xzx;",
    "  vec4 j=p-49.*floor(p*ns.z*ns.z);",
    "  vec4 x_=floor(j*ns.z);",
    "  vec4 y_=floor(j-7.*x_);",
    "  vec4 x=x_*ns.x+ns.yyyy;",
    "  vec4 y=y_*ns.x+ns.yyyy;",
    "  vec4 h=1.-abs(x)-abs(y);",
    "  vec4 b0=vec4(x.xy,y.xy);",
    "  vec4 b1=vec4(x.zw,y.zw);",
    "  vec4 s0=floor(b0)*2.+1.;",
    "  vec4 s1=floor(b1)*2.+1.;",
    "  vec4 sh=-step(h,vec4(0.));",
    "  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;",
    "  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;",
    "  vec3 p0=vec3(a0.xy,h.x);",
    "  vec3 p1=vec3(a0.zw,h.y);",
    "  vec3 p2=vec3(a1.xy,h.z);",
    "  vec3 p3=vec3(a1.zw,h.w);",
    "  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));",
    "  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;",
    "  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);",
    "  m=m*m;",
    "  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));",
    "}",
    "vec3 hsv2rgb(vec3 c){",
    "  vec4 K=vec4(1.,2./3.,1./3.,3.);",
    "  vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);",
    "  return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);",
    "}",
    "void main(){",
    "  vec2 uv=vUv;",
    "  float aspect=uResolution.x/max(uResolution.y,1.);",
    "  uv=(uv-.5)*vec2(aspect,1.)+.5;",
    "  float hue=abs(snoise(vec3(uv*uFrequency,uTime*uSpeed)));",
    "  vec3 rainbowColor=hsv2rgb(vec3(hue,1.,uValue));",
    "  fragColor=vec4(rainbowColor,1.);",
    "}",
  ].join("\n");

  var DOT_VERT = [
    "#version 300 es",
    "in vec2 uv;",
    "in vec2 position;",
    "out vec2 vUv;",
    "void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}",
  ].join("\n");

  var DOT_FRAG = [
    "#version 300 es",
    "precision highp float;",
    "uniform vec2 uResolution;",
    "uniform sampler2D uTexture;",
    "uniform int uPaletteCount;",
    "uniform vec3 uPalette[10];",
    "uniform float uPaletteAlpha[10];",
    "uniform float uCellSize;",
    "uniform float uGamma;",
    "uniform float uPaletteBias;",
    "out vec4 fragColor;",
    "void main(){",
    "  vec2 pix=gl_FragCoord.xy;",
    "  float cell=max(uCellSize,1.);",
    "  vec2 cellIdx=floor(pix/cell);",
    "  vec2 cellCenter=(cellIdx+.5)*cell;",
    "  vec3 col=texture(uTexture,cellCenter/uResolution.xy).rgb;",
    "  float gray=.3*col.r+.59*col.g+.11*col.b;",
    "  gray=pow(clamp(gray,.0001,1.),uGamma);",
    "  vec2 cellUV=fract(pix/cell)-.5;",
    "  float dist=length(cellUV);",
    "  float radius=clamp(gray+uPaletteBias,0.,1.)*.5;",
    "  float aa=fwidth(dist)+1e-4;",
    "  float mark=1.-smoothstep(radius-aa,radius+aa,dist);",
    "  float g2=clamp(gray+uPaletteBias,0.,1.);",
    "  int cnt=max(uPaletteCount,1);",
    "  vec3 dotCol;",
    "  float dotOpacity;",
    "  if(cnt<=1){dotCol=uPalette[0];dotOpacity=uPaletteAlpha[0];}",
    "  else{",
    "    float scaled=g2*float(cnt-1);",
    "    int seg=int(floor(scaled));",
    "    seg=clamp(seg,0,cnt-2);",
    "    float f=clamp(scaled-float(seg),0.,1.);",
    "    dotCol=mix(uPalette[seg],uPalette[seg+1],f);",
    "    dotOpacity=mix(uPaletteAlpha[seg],uPaletteAlpha[seg+1],f);",
    "  }",
    "  fragColor=vec4(dotCol,mark*dotOpacity);",
    "}",
  ].join("\n");

  function compileShader(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error("ChromaticWaves shader error:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function linkProg(gl, vs, fs) {
    var v = compileShader(gl, gl.VERTEX_SHADER, vs);
    var f = compileShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    var p = gl.createProgram();
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.error("ChromaticWaves link error:", gl.getProgramInfoLog(p));
      return null;
    }
    return p;
  }

  function makeVao(gl, prog) {
    var verts = new Float32Array([
      -1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1,
    ]);
    var vbo = gl.createBuffer();
    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    var pos = gl.getAttribLocation(prog, "position");
    var uv = gl.getAttribLocation(prog, "uv");
    if (pos >= 0) {
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 16, 0);
    }
    if (uv >= 0) {
      gl.enableVertexAttribArray(uv);
      gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 16, 8);
    }
    gl.bindVertexArray(null);
    return vao;
  }

  function makeFBO(gl, w, h) {
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      w,
      h,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    var fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      tex,
      0,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { tex: tex, fb: fb };
  }

  function initChromaticWaves(container) {
    var canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;display:block;pointer-events:none;";
    container.appendChild(canvas);

    var gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      console.warn("ChromaticWaves: WebGL2 not supported");
      return;
    }

    var perlinProg = linkProg(gl, PERLIN_VERT, PERLIN_FRAG);
    var dotProg = linkProg(gl, DOT_VERT, DOT_FRAG);
    if (!perlinProg || !dotProg) return;

    var perlinVao = makeVao(gl, perlinProg);
    var dotVao = makeVao(gl, dotProg);

    var palette = buildPalette(CONFIG.colors);
    var paletteCount = Math.min(10, CONFIG.colors.length);

    var freq = mapFreq(CONFIG.frequency);
    var spd = mapSpeed(CONFIG.speed);
    var cellSz = mapCell(CONFIG.cellSize);
    var gam = mapGamma(CONFIG.gamma);
    var bias = mapBias(CONFIG.paletteBias);

    var uTime = gl.getUniformLocation(perlinProg, "uTime");
    var uFreq = gl.getUniformLocation(perlinProg, "uFrequency");
    var uSpd = gl.getUniformLocation(perlinProg, "uSpeed");
    var uVal = gl.getUniformLocation(perlinProg, "uValue");
    var uResP = gl.getUniformLocation(perlinProg, "uResolution");

    var uResD = gl.getUniformLocation(dotProg, "uResolution");
    var uTex = gl.getUniformLocation(dotProg, "uTexture");
    var uPalCnt = gl.getUniformLocation(dotProg, "uPaletteCount");
    var uPal = gl.getUniformLocation(dotProg, "uPalette");
    var uPalA = gl.getUniformLocation(dotProg, "uPaletteAlpha");
    var uCell = gl.getUniformLocation(dotProg, "uCellSize");
    var uGamma = gl.getUniformLocation(dotProg, "uGamma");
    var uBias = gl.getUniformLocation(dotProg, "uPaletteBias");

    var fbW = 0,
      fbH = 0,
      fbo = null,
      fbTex = null;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.floor((container.clientWidth || window.innerWidth) * dpr);
      var h = Math.floor((container.clientHeight || window.innerHeight) * dpr);
      if (w === fbW && h === fbH) return;
      canvas.width = w;
      canvas.height = h;
      fbW = w;
      fbH = h;
      if (fbo) gl.deleteFramebuffer(fbo);
      if (fbTex) gl.deleteTexture(fbTex);
      var f = makeFBO(gl, w, h);
      fbo = f.fb;
      fbTex = f.tex;
    }

    function draw(t) {
      if (!fbo) return;
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, fbW, fbH);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(perlinProg);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform1f(uFreq, freq);
      gl.uniform1f(uSpd, spd);
      gl.uniform1f(uVal, 1.0);
      gl.uniform2f(uResP, fbW, fbH);
      gl.bindVertexArray(perlinVao);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, fbW, fbH);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(dotProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fbTex);
      gl.uniform1i(uTex, 0);
      gl.uniform2f(uResD, fbW, fbH);
      gl.uniform1i(uPalCnt, paletteCount);
      gl.uniform3fv(uPal, palette.rgb);
      gl.uniform1fv(uPalA, palette.alpha);
      gl.uniform1f(uCell, cellSz);
      gl.uniform1f(uGamma, gam);
      gl.uniform1f(uBias, bias);
      gl.bindVertexArray(dotVao);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    var frameInterval = 1000 / CONFIG.fps;
    var lastT = 0,
      rafId = null;
    function loop(t) {
      rafId = requestAnimationFrame(loop);
      if (t - lastT < frameInterval) return;
      lastT = t;
      resize();
      draw(t);
    }
    rafId = requestAnimationFrame(loop);
    resize();
    return function () {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }

  function mount() {
    var el = document.getElementById("chromatic-waves-container");
    if (el) initChromaticWaves(el);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
