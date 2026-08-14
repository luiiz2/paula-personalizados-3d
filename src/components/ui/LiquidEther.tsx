import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';
import { prefersReducedMotion } from '@/lib/utils';

export interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  colors?: string[];
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  isBounce?: boolean;
  resolution?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  colors = ['#b100f6', '#ff00b2', '#f900e7'],
  autoDemo = true,
  autoSpeed = 0.1,
  autoIntensity = 2.5,
  isBounce = false,
  resolution = 0.5,
  className = '',
  style,
}: LiquidEtherProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion()) return;

    // Safely verify WebGL context availability (e.g. in jsdom test environments or headless browsers)
    if (
      typeof window === 'undefined' ||
      navigator.userAgent.includes('jsdom') ||
      import.meta.env.MODE === 'test' ||
      (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test')
    ) {
      return;
    }
    try {
      const testCanvas = document.createElement('canvas');
      const glContext = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!glContext || typeof (glContext as WebGLRenderingContext).getExtension !== 'function') return;
    } catch {
      return;
    }

    let animationFrameId: number;
    let renderer: Renderer | null = null;

    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 1.5) * resolution,
        alpha: true,
        premultipliedAlpha: false,
      });

      const gl = renderer.gl;
      if (!gl) return;

      container.appendChild(gl.canvas);
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      gl.canvas.style.display = 'block';

      const geometry = new Triangle(gl);

      const parsedColors = colors.map((c) => new Color(c));
      const color1 = parsedColors[0] || new Color('#b100f6');
      const color2 = parsedColors[1] || new Color('#ff00b2');
      const color3 = parsedColors[2] || new Color('#f900e7');

      const vert = /* glsl */ `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const frag = /* glsl */ `
        precision highp float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uAutoSpeed;
        uniform float uAutoIntensity;
        uniform float uMouseForce;
        uniform float uAlpha;
        varying vec2 vUv;

        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / uResolution.xy;
          st.y *= uResolution.y / uResolution.x;

          float t = uTime * uAutoSpeed;

          vec2 mouseNorm = uMouse / uResolution;
          float dist = distance(vUv, mouseNorm);
          float mouseEffect = smoothstep(0.5, 0.0, dist) * (uMouseForce * 0.06);

          vec2 q = vec2(0.0);
          q.x = snoise(st + vec2(0.0, t * 0.4) + (vUv - mouseNorm) * mouseEffect * 2.2);
          q.y = snoise(st + vec2(1.0, t * 0.3) + (vUv - mouseNorm) * mouseEffect * 2.2);

          vec2 r = vec2(0.0);
          r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t + mouseEffect * 0.5);
          r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t + mouseEffect * 0.5);

          float f = snoise(st + r * uAutoIntensity);

          vec3 color = mix(uColor1, uColor2, clamp(f * f * 4.0, 0.0, 1.0));
          color = mix(color, uColor3, clamp(length(q), 0.0, 1.0));
          color = mix(color, uColor1, clamp(length(r.x), 0.0, 1.0));

          float alpha = smoothstep(-0.15, 0.85, f + mouseEffect * 0.5);
          gl_FragColor = vec4(color, alpha * 0.95);
        }
      `;

      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
          uMouse: { value: [gl.canvas.width * 0.5, gl.canvas.height * 0.5] },
          uColor1: { value: color1 },
          uColor2: { value: color2 },
          uColor3: { value: color3 },
          uAutoSpeed: { value: autoSpeed },
          uAutoIntensity: { value: autoIntensity },
          uMouseForce: { value: mouseForce },
        },
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry, program });

      const handleResize = () => {
        if (!container || !renderer) return;
        const width = container.clientWidth || 1080;
        const height = container.clientHeight || 1080;
        renderer.setSize(width, height);
        program.uniforms.uResolution.value = [width, height];
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      let mouseX = gl.canvas.width * 0.5;
      let mouseY = gl.canvas.height * 0.5;

      const targetElement = container.parentElement || container;

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        try {
          if (!gl.canvas) return;
          const rect = gl.canvas.getBoundingClientRect();
          const clientX = 'touches' in e ? e.touches[0]?.clientX ?? mouseX : (e as MouseEvent).clientX;
          const clientY = 'touches' in e ? e.touches[0]?.clientY ?? mouseY : (e as MouseEvent).clientY;

          if (
            rect.width > 0 &&
            rect.height > 0 &&
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
          ) {
            mouseX = clientX - rect.left;
            mouseY = rect.height - (clientY - rect.top);
          }
        } catch {
          // Guard para ambientes sem DOM ativo
        }
      };

      targetElement.addEventListener('mousemove', handlePointerMove as unknown as EventListener);
      targetElement.addEventListener('touchmove', handlePointerMove as unknown as EventListener, { passive: true });

      let isDisposed = false;
      const startTime = performance.now();

      const update = (time: number) => {
        if (isDisposed) return;
        animationFrameId = requestAnimationFrame(update);

        const elapsed = (time - startTime) * 0.001;
        program.uniforms.uTime.value = elapsed;

        program.uniforms.uMouse.value[0] += (mouseX - program.uniforms.uMouse.value[0]) * 0.12;
        program.uniforms.uMouse.value[1] += (mouseY - program.uniforms.uMouse.value[1]) * 0.12;

        if (renderer && gl && mesh) {
          try {
            renderer.render({ scene: mesh });
          } catch {
            // Guard para descarte durante HMR
          }
        }
      };

      animationFrameId = requestAnimationFrame(update);

      return () => {
        isDisposed = true;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        targetElement.removeEventListener('mousemove', handlePointerMove as unknown as EventListener);
        targetElement.removeEventListener('touchmove', handlePointerMove as unknown as EventListener);
        if (gl.canvas && gl.canvas.parentElement) {
          gl.canvas.parentElement.removeChild(gl.canvas);
        }
      };
    } catch {
      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }
  }, [autoIntensity, autoSpeed, colors, resolution, isViscous, viscous, mouseForce, cursorSize, autoDemo, isBounce]);

  return (
    <div
      ref={containerRef}
      className={`liquid-ether-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  );
}
