"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GlassMaterial from "../materials/GlassMaterial";

export default function SyncHubLogo() {
  const group = useRef<THREE.Group>(null);

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 200;
    const scale = 4.0; // overall size

    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 2;

      // Lemniscate of Bernoulli (figure-eight / infinity curve)
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (scale * Math.cos(t)) / denom;
      const y = (scale * Math.sin(t) * Math.cos(t)) / denom;

      points.push(new THREE.Vector3(x, y, 0));
    }

    return new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
  }, []);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 400, 0.18, 64, true);
  }, [curve]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;

    group.current.rotation.y = t * 0.2;
    group.current.rotation.x = Math.sin(t * 0.5) * 0.03;
    group.current.position.y = -0.05 + Math.sin(t * 0.8) * 0.06;
  });

  return (
    <group ref={group} scale={0.5}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <GlassMaterial />
      </mesh>
    </group>
  );
}
