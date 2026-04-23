"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function OrbitAssembly() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y += delta * 0.22;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.18;
  });

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <Float speed={1.8} rotationIntensity={1.1} floatIntensity={1.4}>
        <mesh>
          <icosahedronGeometry args={[1.3, 3]} />
          <meshStandardMaterial
            color="#76e4f7"
            emissive="#154b5c"
            emissiveIntensity={1.25}
            metalness={0.35}
            roughness={0.12}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.7, 0.2, 0]}>
        <torusGeometry args={[2.05, 0.05, 18, 160]} />
        <meshStandardMaterial color="#ff9f5a" emissive="#ff9f5a" emissiveIntensity={1.6} />
      </mesh>

      <mesh rotation={[Math.PI / 1.9, 0, Math.PI / 3]}>
        <torusGeometry args={[2.6, 0.03, 12, 120]} />
        <meshStandardMaterial color="#9be2b0" emissive="#9be2b0" emissiveIntensity={1.2} />
      </mesh>

      <FloatingTile position={[2.2, 0.7, 0.4]} color="#091929" emissive="#76e4f7" />
      <FloatingTile position={[-2.1, -0.5, -0.2]} color="#111c2b" emissive="#ff9f5a" />
      <FloatingTile position={[0.4, 2.2, -0.3]} color="#0f202a" emissive="#9be2b0" />
      <FloatingTile position={[0.6, -2.15, 0.2]} color="#151d31" emissive="#76e4f7" wide />

      <Sparkles count={32} size={3.2} scale={6} color="#76e4f7" speed={0.4} />
    </group>
  );
}

function FloatingTile({
  position,
  color,
  emissive,
  wide = false,
}: {
  position: [number, number, number];
  color: string;
  emissive: string;
  wide?: boolean;
}) {
  return (
    <Float speed={2.2} rotationIntensity={1.1} floatIntensity={1.1} position={position}>
      <RoundedBox args={wide ? [1.35, 0.34, 0.22] : [0.82, 0.52, 0.22]} radius={0.1}>
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.45} />
      </RoundedBox>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="relative h-[20rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(118,228,247,0.18),transparent_30rem),linear-gradient(180deg,rgba(11,20,35,0.96),rgba(7,13,24,0.96))] sm:h-[24rem] md:h-[32rem]">
      <div className="absolute inset-4 rounded-[1.6rem] orbit-border" />
      <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 5, 4]} intensity={1.9} color="#f4f1e8" />
        <pointLight position={[-4, -3, -2]} intensity={1.3} color="#ff9f5a" />
        <pointLight position={[3, 2, 2]} intensity={1.25} color="#76e4f7" />
        <OrbitAssembly />
        <ContactShadows position={[0, -2.6, 0]} blur={2.8} opacity={0.38} scale={9} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0">
        <div className="floating-medium absolute left-4 top-5 rounded-full border border-white/10 bg-[#081424]/80 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/75 sm:left-5 sm:text-xs md:left-7 md:top-7">
          React
        </div>
        <div className="floating-fast absolute right-4 top-12 rounded-full border border-white/10 bg-[#0b192c]/80 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/75 sm:right-5 sm:text-xs md:right-8 md:top-16">
          Node.js
        </div>
        <div className="floating-slow absolute bottom-10 left-5 rounded-full border border-white/10 bg-[#0e1e30]/80 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/75 sm:left-7 sm:text-xs">
          TensorFlow
        </div>
        <div className="floating-medium absolute bottom-6 right-5 rounded-full border border-white/10 bg-[#111d33]/80 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/75 sm:right-8 sm:text-xs">
          MySQL
        </div>
      </div>
    </div>
  );
}
