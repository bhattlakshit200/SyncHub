"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useCameraStore } from "@/store/useCameraStore";
import { useExperienceStore } from "@/store/useExperienceStore";

export default function CameraController() {
  const { camera } = useThree();

  const section = useCameraStore((state) => state.section);
  const phase = useExperienceStore((state) => state.phase);
  useFrame((state, delta) => {
  if (phase === "hero") {
    easing.damp3(
      camera.position,
      [0, 0, 8],
      0.18,
      delta
    );

    camera.lookAt(0, 0, 0);
  }

  if (phase === "transition") {
    easing.damp3(
      camera.position,
      [0, 0, 2.5],
      0.12,
      delta
    );

    camera.lookAt(0, 0, 0);
  }
});

  return null;
}
