"use client";

export default function GlassMaterial() {
  return (
    <meshPhysicalMaterial
      color="#7EE7FF"
      metalness={0}
      roughness={0}
      transmission={1}
      thickness={1.5}
      ior={1.45}
      clearcoat={1}
      clearcoatRoughness={0}
      transparent
      opacity={1}
    />
  );
}