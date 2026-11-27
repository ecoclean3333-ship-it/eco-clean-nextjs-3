'use client';

import { Component, Suspense, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const PHASE_MS = 5000;
const STAGES = [
  {
    short: 'Before',
    title: 'Before cleaning',
    detail: 'Sediment and residue may collect on the tank floor and inner surfaces.',
  },
  {
    short: 'Deep clean',
    title: 'Deep water tank cleaning',
    detail: 'A controlled cleaning process removes accumulated deposits.',
  },
  {
    short: 'Disinfect',
    title: 'Potable water tank disinfection',
    detail: 'An appropriate disinfection stage follows cleaning when required.',
  },
  {
    short: 'Complete',
    title: 'Clean tank, ready for checks',
    detail: 'The tank is rinsed and checked before it is returned to service.',
  },
] as const;

type Vec3 = [number, number, number];

type Props = {
  /** Height of the animation block in pixels; fits inside your existing image slot. */
  height?: number;
  /** Optional extra class for the outer wrapper. */
  className?: string;
  /** Automatically cycle through all four cleaning stages. */
  autoPlay?: boolean;
};

function Pipe({
  from,
  to,
  radius = 0.045,
  color = '#d9e9e4',
}: {
  from: Vec3;
  to: Vec3;
  radius?: number;
  color?: string;
}) {
  const { center, length, rotation } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const difference = b.clone().sub(a);
    return {
      center: a.clone().add(b).multiplyScalar(0.5),
      length: difference.length(),
      rotation: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        difference.normalize()
      ),
    };
  }, [from[0], from[1], from[2], to[0], to[1], to[2]]);

  return (
    <mesh position={center} quaternion={rotation}>
      <cylinderGeometry args={[radius, radius, length, 10]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

function TankScene({ stage, isPlaying, reduceMotion }: { stage: number; isPlaying: boolean; reduceMotion: boolean }) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.zoom = Math.min(1, size.width / (size.height * 1.4));
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);

  const grimeRef = useRef<THREE.Group>(null);
  const sprayRef = useRef<THREE.Group>(null);
  const dropletsRef = useRef<THREE.Group>(null);
  const sanitationRef = useRef<THREE.Points>(null);
  const sanitationMaterialRef = useRef<THREE.PointsMaterial>(null);
  const waterMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const waterRef = useRef<THREE.Mesh>(null);
  const shimmerRef = useRef<THREE.Mesh>(null);

  const grime = useMemo(() => {
    return Array.from({ length: 46 }, (_, i) => {
      // Deterministic locations so nothing changes unexpectedly between renders.
      const a = i * 2.39996323;
      const r = 0.25 + Math.sqrt((i + 0.5) / 46) * 1.58;
      return {
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        size: 0.08 + (i % 7) * 0.025,
        color: i % 3 === 0 ? '#766b4b' : i % 3 === 1 ? '#6d8a60' : '#a49b72',
      };
    });
  }, []);

  const droplets = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      radius: 0.05 + (i % 5) * 0.024,
      angle: (i * 2.39996323) % (Math.PI * 2),
      offset: (i % 13) / 13,
    }));
  }, []);

  const sanitationPositions = useMemo(() => {
    const arr = new Float32Array(62 * 3);
    for (let i = 0; i < 62; i += 1) {
      const angle = i * 2.39996323;
      const radius = 0.23 + ((i * 17) % 89) / 89 * 1.7;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = -0.98 + ((i * 29) % 101) / 101 * 2.1;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, []);

  const sprayStart = useMemo<Vec3>(() => [0.80, 1.75, 0.25], []);
  const sprayEnd = useMemo<Vec3>(() => [-0.55, -0.88, 0.38], []);
  const sprayAxis = useMemo(() => {
    const a = new THREE.Vector3(...sprayStart);
    const b = new THREE.Vector3(...sprayEnd);
    const direction = b.clone().sub(a);
    return {
      center: a.clone().add(b).multiplyScalar(0.5),
      length: direction.length(),
      rotation: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, -1, 0),
        direction.normalize()
      ),
    };
  }, [sprayStart, sprayEnd]);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();
    const targetGrime = [1, 0.27, 0.06, 0.002][stage];
    const movement = Math.min(delta, 0.05);

    if (grimeRef.current) {
      const next = reduceMotion ? targetGrime : THREE.MathUtils.damp(grimeRef.current.scale.x, targetGrime, 3.3, movement);
      grimeRef.current.scale.setScalar(next);
      grimeRef.current.visible = next > 0.008;
    }
    if (sprayRef.current) {
      sprayRef.current.visible = stage === 1;
      if (!reduceMotion && isPlaying) sprayRef.current.rotation.y = Math.sin(time * 1.65) * 0.17;
    }
    if (dropletsRef.current) {
      dropletsRef.current.visible = stage === 1;
      if (!reduceMotion && isPlaying) {
        dropletsRef.current.children.forEach((child, i) => {
          const d = droplets[i];
          const t = (time * 0.8 + d.offset) % 1;
          const spread = 0.10 + 0.42 * t;
          child.position.set(
            sprayStart[0] + (sprayEnd[0] - sprayStart[0]) * t + Math.cos(d.angle) * spread,
            sprayStart[1] + (sprayEnd[1] - sprayStart[1]) * t,
            sprayStart[2] + (sprayEnd[2] - sprayStart[2]) * t + Math.sin(d.angle) * spread
          );
        });
      }
    }
    if (sanitationMaterialRef.current) {
      const opacity = stage === 2 ? 0.85 : 0;
      sanitationMaterialRef.current.opacity = reduceMotion ? opacity : THREE.MathUtils.damp(
        sanitationMaterialRef.current.opacity,
        opacity,
        3,
        movement
      );
    }
    if (sanitationRef.current && !reduceMotion && isPlaying) {
      sanitationRef.current.rotation.y += movement * 0.2;
      sanitationRef.current.position.y = Math.sin(time * 0.7) * 0.06;
    }
    if (waterMaterialRef.current) {
      const targetColor = new THREE.Color(stage === 0 ? '#7c9d75' : stage === 1 ? '#6baea2' : '#63d9d0');
      waterMaterialRef.current.color.lerp(targetColor, reduceMotion ? 1 : 1 - Math.exp(-2.3 * movement));
    }
    if (waterRef.current && !reduceMotion && isPlaying) {
      waterRef.current.position.y = -1.04 + Math.sin(time * 1.6) * 0.012;
    }
    if (shimmerRef.current) {
      shimmerRef.current.visible = stage === 3;
      if (!reduceMotion && isPlaying) shimmerRef.current.rotation.z += movement * 0.18;
    }
  });

  return (
    <group>
      {/* Ground and tank support */}
      <mesh position={[0, -1.36, 0]} receiveShadow>
        <cylinderGeometry args={[2.6, 2.65, 0.16, 70]} />
        <meshStandardMaterial color="#c3d9cf" roughness={0.86} />
      </mesh>
      <mesh position={[0, -1.22, 0]}>
        <cylinderGeometry args={[2.25, 2.25, 0.13, 72]} />
        <meshStandardMaterial color="#4c8076" metalness={0.3} roughness={0.33} />
      </mesh>
      <mesh position={[0, -1.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.17, 72]} />
        <meshStandardMaterial color="#6c9d89" roughness={0.7} />
      </mesh>

      {/* Sediment and debris near the bottom. Shrinks as cleaning proceeds. */}
      <group ref={grimeRef} position={[0, -1.075, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.11, 64]} />
          <meshStandardMaterial color="#777b53" transparent opacity={0.78} roughness={1} />
        </mesh>
        {grime.map((d, i) => (
          <mesh key={i} position={[d.x, 0.018 + d.size * 0.15, d.z]} scale={[1.5, 0.5, 1.1]}>
            <sphereGeometry args={[d.size, 8, 6]} />
            <meshStandardMaterial color={d.color} roughness={1} />
          </mesh>
        ))}
      </group>

      {/* Water changes from murky to clean over the four stages. */}
      <mesh ref={waterRef} position={[0, -1.04, 0]}>
        <cylinderGeometry args={[2.13, 2.13, 0.18, 64]} />
        <meshPhysicalMaterial
          ref={waterMaterialRef}
          color="#7c9d75"
          transparent
          opacity={0.39}
          metalness={0.04}
          roughness={0.12}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Central guide pole and pressure lance. */}
      <Pipe from={[1.50, 1.90, 0.25]} to={[0.79, 1.73, 0.25]} radius={0.065} color="#d2dedc" />
      <Pipe from={[0.79, 1.73, 0.25]} to={[0.66, 1.40, 0.25]} radius={0.044} color="#d2dedc" />
      <mesh position={[0.67, 1.39, 0.25]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshStandardMaterial color="#7bc947" metalness={0.25} roughness={0.25} />
      </mesh>

      {/* Jet cone (visible only during deep cleaning). */}
      <group ref={sprayRef} visible={false}>
        <mesh position={sprayAxis.center} quaternion={sprayAxis.rotation}>
          <cylinderGeometry args={[0.035, 0.56, sprayAxis.length, 20, 1, true]} />
          <meshBasicMaterial color="#9ff0ec" transparent opacity={0.33} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={sprayEnd}>
          <sphereGeometry args={[0.32, 16, 8]} />
          <meshBasicMaterial color="#d8ffff" transparent opacity={0.32} depthWrite={false} />
        </mesh>
      </group>
      <group ref={dropletsRef} visible={false}>
        {droplets.map((d, i) => (
          <mesh key={i} position={[sprayStart[0], sprayStart[1], sprayStart[2]]}>
            <sphereGeometry args={[d.radius, 7, 6]} />
            <meshBasicMaterial color="#c7fff9" transparent opacity={0.9} />
          </mesh>
        ))}
      </group>

      {/* Abstract disinfection particles, not a literal chemical depiction. */}
      <points ref={sanitationRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sanitationPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={sanitationMaterialRef}
          color="#97ffe0"
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
        />
      </points>

      {/* Clean-water glint in final stage. */}
      <mesh ref={shimmerRef} position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.78, 0.82, 64]} />
        <meshBasicMaterial color="#d5fffa" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Semi-transparent tank wall. Kept last to preserve see-through view. */}
      <mesh position={[0, 0.11, 0]} renderOrder={4}>
        <cylinderGeometry args={[2.24, 2.24, 2.58, 72, 1, true]} />
        <meshPhysicalMaterial
          color="#6cc2ae"
          metalness={0.08}
          roughness={0.17}
          transparent
          opacity={0.20}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {([-1.18, 0.08, 1.4] as const).map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.24, 0.048, 9, 78]} />
          <meshStandardMaterial color="#d0e6dc" metalness={0.52} roughness={0.28} />
        </mesh>
      ))}
      {/* Top entry rim, not a representation of personnel entering the tank. */}
      <mesh position={[0, 1.43, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.23, 0.09, 12, 80]} />
        <meshStandardMaterial color="#a3c9be" metalness={0.48} roughness={0.28} />
      </mesh>
    </group>
  );
}

function SceneUnavailable() {
  return <p className="eco-tank3d__fallback">The 3D view is unavailable on this device. Use the stage buttons to explore the cleaning process.</p>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { unavailable: boolean }> {
  state = { unavailable: false };

  static getDerivedStateFromError() {
    return { unavailable: true };
  }

  render() {
    return this.state.unavailable ? <SceneUnavailable /> : this.props.children;
  }
}

export default function EcoCleanWaterTank3D({
  height = 440,
  className = '',
  autoPlay = true,
}: Props) {
  const [playing, setPlaying] = useState(autoPlay);
  const [elapsed, setElapsed] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const holderRef = useRef<HTMLElement>(null);
  const duration = STAGES.length * PHASE_MS;
  const stage = Math.floor(elapsed / PHASE_MS) % STAGES.length;
  const stageProgress = (elapsed % PHASE_MS) / PHASE_MS;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduceMotion(media.matches);
      if (media.matches) setPlaying(false);
    };
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    const element = holderRef.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '160px',
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const interval = window.setInterval(() => {
      setElapsed((previous) => (previous + 80) % duration);
    }, 80);
    return () => window.clearInterval(interval);
  }, [playing, inView, duration]);

  function chooseStage(index: number) {
    setElapsed(index * PHASE_MS);
    setPlaying(false);
  }

  return (
    <section
      ref={holderRef}
      className={`eco-tank3d ${className}`}
      style={{ height: `${height}px` }}
      aria-label="Interactive 3D water tank cleaning process"
    >
      <style>{`
        .eco-tank3d { position:relative; width:100%; min-height:0; overflow:hidden; isolation:isolate;
          border-radius:22px; background:radial-gradient(circle at 62% 38%, #e4f9ea 0%, #c9e8dc 44%, #e8f0df 100%);
          color:#103e32; font-family:inherit; box-sizing:border-box; }
        .eco-tank3d *, .eco-tank3d *::before, .eco-tank3d *::after { box-sizing:border-box; }
        .eco-tank3d__canvas { position:absolute; inset:0 0 108px; }
        .eco-tank3d__fallback { margin:76px auto 0; padding:0 18px; max-width:32rem; text-align:center; }
        .eco-tank3d__top { position:absolute; z-index:2; inset:16px 18px auto; display:flex;
          justify-content:space-between; align-items:center; gap:10px; pointer-events:none; }
        .eco-tank3d__brand { color:#115740; background:rgba(255,255,255,.78); padding:7px 11px;
          border-radius:999px; font-weight:800; letter-spacing:.055em; font-size:11px; }
        .eco-tank3d__hint { color:#315e51; font-size:11px; font-weight:650; background:rgba(255,255,255,.58);
          padding:7px 10px; border-radius:999px; }
        .eco-tank3d__panel { position:absolute; z-index:3; bottom:13px; left:13px; right:13px;
          padding:14px 16px; border-radius:16px; background:rgba(255,255,251,.93);
          border:1px solid rgba(10,72,50,.13); box-shadow:0 10px 30px rgba(10,70,48,.12);
          backdrop-filter:blur(14px); }
        .eco-tank3d__information { display:flex; align-items:center; justify-content:space-between; gap:12px;
          margin-bottom:11px; }
        .eco-tank3d__title { font-size:16px; line-height:1.2; font-weight:800; color:#0b4a36; }
        .eco-tank3d__detail { font-size:14px; line-height:1.38; color:#38675a; margin-top:4px; }
        .eco-tank3d__toggle { display:flex; align-items:center; justify-content:center; flex-shrink:0;
          border:0; color:#fff; background:#0a573c; border-radius:999px; min-width:64px;
          min-height:34px; cursor:pointer; padding:7px 12px; font-size:12px; font-weight:750; }
        .eco-tank3d__toggle:focus-visible,.eco-tank3d__stage:focus-visible { outline:3px solid #75bc28; outline-offset:2px; }
        .eco-tank3d__steps { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:7px; }
        .eco-tank3d__stage { cursor:pointer; display:flex; flex-direction:column; align-items:flex-start; gap:7px;
          padding:3px 0; border:0; background:transparent; color:#52766a; text-align:left;
          font:inherit; font-size:14px; font-weight:600; line-height:1.2; min-width:0; }
        .eco-tank3d__bar { display:block; width:100%; height:4px; overflow:hidden; background:#d0dfd6; border-radius:100px; }
        .eco-tank3d__fill { display:block; height:100%; background:#73b72a; border-radius:100px;
          transition:width 80ms linear; }
        .eco-tank3d__stage[aria-pressed="true"] { color:#0a5038; font-weight:800; }
        @media (max-width:560px) {
          .eco-tank3d { border-radius:16px; }
          .eco-tank3d__top { inset:12px 12px auto; }
          .eco-tank3d__brand,.eco-tank3d__hint { font-size:9px; padding:6px 8px; }
          .eco-tank3d__panel { bottom:9px; left:9px; right:9px; padding:11px 12px; }
          .eco-tank3d__title { font-size:14px; }
          .eco-tank3d__canvas { bottom:130px; }
          .eco-tank3d__steps { gap:5px; }
          
        }
        @media (prefers-reduced-motion:reduce) {
          .eco-tank3d__fill { transition:none; }
        }
      `}</style>
      <div className="eco-tank3d__canvas">
        <SceneBoundary>
          <Canvas
            fallback={<SceneUnavailable />}
            frameloop={inView ? 'always' : 'never'}
            dpr={[1, 1.65]}
            camera={{ position: [5.8, 4.2, 6.7], fov: 43, near: 0.1, far: 80 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          >
            <ambientLight intensity={1.35} />
            <hemisphereLight args={['#f4fff4', '#6c8e84', 1.3]} />
            <directionalLight position={[5, 9, 6]} intensity={2.2} />
            <directionalLight position={[-4, 3, -5]} intensity={0.9} color="#b8fff0" />
            <Suspense fallback={null}>
              <TankScene stage={stage} isPlaying={playing && inView} reduceMotion={reduceMotion} />
            </Suspense>
            <OrbitControls
              target={[0, 0.12, 0]}
              enablePan={false}
              enableZoom={false}
              enableDamping
              autoRotate={playing && inView && !reduceMotion}
              autoRotateSpeed={0.35}
              minPolarAngle={0.58}
              maxPolarAngle={1.46}
            />
          </Canvas>
        </SceneBoundary>
      </div>
      <div className="eco-tank3d__top">
        <span className="eco-tank3d__brand">ECO CLEAN UAE</span>
        <span className="eco-tank3d__hint">Drag to rotate</span>
      </div>
      <div className="eco-tank3d__panel">
        <div className="eco-tank3d__information">
          <div aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
            <div className="eco-tank3d__title">{STAGES[stage].title}</div>
            <div className="eco-tank3d__detail">{STAGES[stage].detail}</div>
          </div>
          <button
            type="button"
            className="eco-tank3d__toggle"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? 'Pause water tank animation' : 'Play water tank animation'}
          >
            {playing ? 'Ⅱ Pause' : '▶ Play'}
          </button>
        </div>
        <div className="eco-tank3d__steps" role="group" aria-label="Water tank cleaning stages">
          {STAGES.map((step, i) => (
            <button
              type="button"
              className="eco-tank3d__stage"
              key={step.short}
              aria-pressed={stage === i}
              aria-label={`Show step ${i + 1}: ${step.title}`}
              onClick={() => chooseStage(i)}
            >
              <span className="eco-tank3d__bar">
                <span
                  className="eco-tank3d__fill"
                  style={{ width: `${i < stage ? 100 : i === stage ? stageProgress * 100 : 0}%` }}
                />
              </span>
              <span>{step.short}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
