"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperienceStore } from "@/store/useExperienceStore";

const GRID = 18;

export default function GlassFragments() {
  const phase = useExperienceStore((s) => s.phase);

  const group = useRef<THREE.Group>(null);

  const progress = useRef(0);

  const pieces = useMemo(() => {
    const data = [];

    const size = 40 / GRID;

    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        const start = new THREE.Vector3(
          -20 + x * size + size / 2,
          -1.49,
          -20 + y * size + size / 2
        );

        data.push({
          start,
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 8,
            Math.random() * 4 + 1,
            (Math.random() - 0.5) * 8
          ),
        });
      }
    }

    return data;
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

    const target = phase === "transition" ? 1 : 0;

    progress.current = THREE.MathUtils.lerp(
      progress.current,
      target,
      delta * 2
    );

    group.current.children.forEach((child, i) => {
      const piece = pieces[i];

      child.position.copy(piece.start);

      child.position.addScaledVector(
        piece.velocity,
        progress.current
      );

      child.rotation.x = -Math.PI / 2 + progress.current * 2;
      child.rotation.y = progress.current * 2;
    });
  });

  return (
    <group ref={group}>
      {pieces.map((piece, i) => (
        <mesh
          key={i}
          position={piece.start}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[40 / GRID, 40 / GRID]} />

          <meshPhysicalMaterial
            color="#9EEBFF"
            transmission={1}
            roughness={0}
            thickness={0.08}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}