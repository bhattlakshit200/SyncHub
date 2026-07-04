"use client";

import { useExperienceStore } from "@/store/useExperienceStore";
import ExperienceCanvas from "../world/ExperienceCanvas";

export default function Experience() {
  const scrollProgress = useExperienceStore((state) => state.scrollProgress);

  // Fade out the 3D scene from 1.0 to 0.0 as scrollProgress goes from 2.0 to 3.0
  const opacity = scrollProgress > 2.0 ? Math.max(0.0, 1.0 - (scrollProgress - 2.0)) : 1.0;

  return (
    <div 
      style={{ 
        opacity,
        visibility: opacity === 0 ? "hidden" : "visible",
        transition: "opacity 0.1s ease-out, visibility 0.1s ease-out",
      }} 
      className="fixed inset-0 -z-0"
    >
      <ExperienceCanvas />
    </div>
  );
}