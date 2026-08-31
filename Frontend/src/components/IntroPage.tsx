import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { INTRO_LOGO_B64 } from '@/data/introLogo';

interface IntroPageProps {
  onEnter: () => void;
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [skipped, setSkipped] = useState(false);
  const [timeline, setTimeline] = useState({
    eyebrow: false,
    headline: false,
    tagline: false,
    cta: false,
  });

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETTINGS
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    mountRef.current.appendChild(renderer.domElement);

    // BACKGROUND SPHERE
    const bgGeo = new THREE.SphereGeometry(60, 32, 32);
    const bgMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        top: { value: new THREE.Color(0xffffff) },
        bottom: { value: new THREE.Color(0xf0f0f8) }
      },
      vertexShader: "varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: "varying vec3 vPos; uniform vec3 top; uniform vec3 bottom; void main(){ float h = normalize(vPos).y * 0.5 + 0.5; gl_FragColor = vec4(mix(bottom, top, h), 1.0); }"
    });
    scene.add(new THREE.Mesh(bgGeo, bgMat));

    // LIGHTS
    scene.add(new THREE.AmbientLight(0x5b2ec7, 0.6));
    const key = new THREE.PointLight(0x2f6bf0, 1.4, 30);
    key.position.set(4, 3, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xf5a623, 0.9, 30);
    rim.position.set(-5, -2, 4);
    scene.add(rim);

    // LOGO PLANE
    const loader = new THREE.TextureLoader();
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    let logoMesh: THREE.Mesh | null = null;

    loader.load('data:image/png;base64,' + INTRO_LOGO_B64, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const geo = new THREE.PlaneGeometry(3.5, 3.5, 40, 40);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        roughness: 0.35,
        metalness: 0.15,
        emissive: 0x1a1440,
        emissiveIntensity: 0.15
      });
      logoMesh = new THREE.Mesh(geo, mat);
      logoMesh.position.set(0, 3.0, 0);
      logoGroup.add(logoMesh);
      setLoading(false);
    });

    // TIMELINE ANIMATION
    const clock = new THREE.Clock();
    let t = 0;
    let textRevealed = false;

    const easeOutBack = (x: number) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    };

    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

    const revealText = () => {
      if (textRevealed) return;
      textRevealed = true;
      setTimeline(prev => ({ ...prev, eyebrow: true }));
      setTimeout(() => setTimeline(prev => ({ ...prev, headline: true })), 220);
      setTimeout(() => setTimeline(prev => ({ ...prev, tagline: true })), 520);
      setTimeout(() => setTimeline(prev => ({ ...prev, cta: true })), 820);
    };

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      t += dt;

      if (logoMesh) {
        const lp = clamp01((t - 1.6) / 1.6);
        const le = easeOutBack(lp);
        logoMesh.scale.setScalar(0.72 + 0.28 * Math.min(le, 1));
        // @ts-ignore
        logoMesh.material.opacity = clamp01((t - 1.6) / 1.1);
        logoMesh.rotation.y = (1 - clamp01(lp)) * 0.9;
        logoGroup.position.y = 0.15 * Math.sin(t * 0.5);
      }

      camera.position.x = Math.sin(t * 0.12) * 0.35;
      camera.position.y = Math.cos(t * 0.1) * 0.2;
      camera.lookAt(0, 1.5, 0);

      key.intensity = 1.2 + Math.sin(t * 1.3) * 0.2;

      renderer.render(scene, camera);

      if (t > 2.7) {
        revealText();
      }
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const skipIntro = () => {
    setSkipped(true);
    setTimeline({
      eyebrow: true,
      headline: true,
      tagline: true,
      cta: true,
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-white select-none">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500 animate-pulse">
            Loading —
          </span>
        </div>
      )}

      {/* 3D Stage container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      
      {/* Texture grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-10 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* Logo Shine Overlay Effect */}
      <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-80 h-80 pointer-events-none z-[8] rounded-full overflow-hidden">
        <div className="absolute inset-[-20px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.18)_70%,rgba(255,255,255,0)_100%)] animate-[pulse_3s_ease-in-out_infinite]" />
      </div>

      {/* Skip Button */}
      {!skipped && (
        <button
          onClick={skipIntro}
          className="absolute top-6 right-6 z-20 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 bg-transparent border border-slate-900/10 px-4 py-2 rounded-full hover:border-slate-900 hover:text-slate-900 transition-all duration-300 pointer-events-auto"
        >
          Skip intro
        </button>
      )}

      {/* Typography Overlay HUD */}
      <div className="absolute inset-0 z-20 grid grid-rows-[58%_42%] pointer-events-none text-center">
        <div className="spacer" />
        <div className="flex flex-col items-center justify-start px-6 pt-3">
          <div className="bg-transparent border-none p-0">
            {/* Institution Tagline */}
            <div
              className={`font-mono text-[11px] uppercase tracking-[0.35em] text-slate-500 mb-2 transition-all duration-1000 ${
                timeline.eyebrow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              Vignan's Institute of Information Technology
            </div>

            {/* E-CELL Big title */}
            <h1
              className={`font-sans font-extrabold text-[clamp(40px,7vw,84px)] leading-[0.95] tracking-tight text-slate-900 mb-2 transition-all duration-[1100ms] ${
                timeline.headline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              E<span className="text-amber-500">-CELL</span>
            </h1>

            {/* Sub tagline */}
            <p
              className={`font-sans font-medium text-[clamp(13px,1.5vw,16px)] tracking-wide text-slate-600 mb-6 transition-all duration-[1000ms] delay-150 ${
                timeline.tagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Fostering innovation <b className="text-slate-900 font-semibold">where ideas take flight.</b>
            </p>

            {/* Enter site CTA */}
            <button
              onClick={onEnter}
              className={`pointer-events-auto inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-900 border border-slate-900/35 px-7 py-3.5 rounded-full hover:border-amber-500 hover:text-amber-500 transition-all duration-300 group ${
                timeline.cta ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Enter site
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
