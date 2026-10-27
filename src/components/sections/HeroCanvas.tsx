'use client';

import { useEffect, useRef } from 'react';

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

// Domain-warped fbm noise mapped onto the brand palette (ink → wine → crimson → coral).
const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/r;vec2 p=uv;p.x*=r.x/r.y;float s=t*.05;
 vec2 q=vec2(fbm(p*1.5+s),fbm(p*1.5+vec2(5.2,1.3)-s));
 vec2 w=vec2(fbm(p*1.3+2.2*q+vec2(1.7,9.2)+s*1.4),fbm(p*1.3+2.2*q+vec2(8.3,2.8)-s));
 float f=fbm(p*1.1+2.6*w+(m-.5)*.35);
 vec3 bg=vec3(.027,.027,.043),wine=vec3(.30,.03,.12),red=vec3(.89,.086,.30),coral=vec3(1.,.42,.29);
 float k=f*length(w);
 vec3 c=mix(bg,wine,smoothstep(.25,.75,f));
 c=mix(c,red,smoothstep(.45,.95,k*1.35));
 c=mix(c,coral,smoothstep(.9,1.25,k*1.55)*.55);
 float mask=smoothstep(.05,1.05,uv.x*.85+uv.y*.55);
 c=mix(bg,c,mask);
 c+=red*.10*(1.-smoothstep(0.,.45,distance(uv,m)));
 c*=1.-.28*length(uv-vec2(.6,.55));
 gl_FragColor=vec4(c,1.);}`;

/** Animated WebGL gradient behind the hero. Falls back to the CSS gradient if WebGL is unavailable. */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) { cv.style.display = 'none'; return; }

    const compile = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pr, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.style.display = 'none'; return; }
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uM = gl.getUniformLocation(pr, 'm');

    const SCALE = 0.5; // half resolution: the gradient is soft, so this is invisible and much cheaper
    const size = () => {
      cv.width = Math.max(2, cv.clientWidth * SCALE);
      cv.height = Math.max(2, cv.clientHeight * SCALE);
      gl.viewport(0, 0, cv.width, cv.height);
    };
    size();
    addEventListener('resize', size);

    const mouse = { x: 0.7, y: 0.6 }, target = { x: 0.7, y: 0.6 };
    const hero = cv.parentElement!;
    const onMove = (e: PointerEvent) => {
      const b = cv.getBoundingClientRect();
      target.x = (e.clientX - b.left) / b.width;
      target.y = 1 - (e.clientY - b.top) / b.height;
    };
    hero.addEventListener('pointermove', onMove);

    let visible = true, raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      gl.uniform2f(uR, cv.width, cv.height);
      gl.uniform1f(uT, (now - start) / 1000 + 20);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) raf = requestAnimationFrame(frame);
    });
    io.observe(cv);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener('resize', size);
      hero.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas id="gl" ref={ref} aria-hidden="true" />;
}
