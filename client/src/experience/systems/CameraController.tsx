"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useCameraStore } from "@/store/useCameraStore";
import { useExperienceStore } from "@/store/useExperienceStore";

export default function CameraController() {
  const { camera } = useThree();

  const section = useCameraStore((state) => state.section);
  useFrame((state, delta) => {
    const sp = useExperienceStore.getState().scrollProgress;

    // Camera starts at 8, moves to 3 as scrollProgress goes from 0 to 2
    let targetZ = 8;
    if (sp < 2.0) {
      targetZ = 8 - sp * 2.5; // goes from 8 down to 3
    } else {
      targetZ = 3;
    }

    easing.damp3(
      camera.position,
      [0, 0, targetZ],
      0.18,
      delta
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}
