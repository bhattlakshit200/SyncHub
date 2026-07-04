"use client";

import { useEffect } from "react";
import { useExperienceStore } from "@/store/useExperienceStore";
import ShapeBlur from "@/components/layout/ShapeBlur";

export default function Home() {
  const scrollProgress = useExperienceStore((state) => state.scrollProgress);

  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("dragstart", preventDefault);
    document.addEventListener("selectstart", preventDefault);

    return () => {
      document.removeEventListener("touchmove", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("selectstart", preventDefault);
    };
  }, []);

  const t = scrollProgress > 2.0 ? Math.min(1.0, scrollProgress - 2.0) : 0.0;
  const textScale = 1.0 + t * 0.5; // Scales up by 50% (up to 1.5x)
  const effectActive = t; // Fade in the hover effect from 0.0 to 1.0

  return (
    <main className="min-h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
      <div 
        style={{ 
          transform: `scale(${textScale})`,
          transition: "transform 0.1s ease-out",
          width: "750px",
          height: "200px",
        }} 
        className="relative origin-center select-none flex items-center justify-center pointer-events-auto"
      >
        <ShapeBlur className="w-full h-full" circleSize={0.2} effectActive={effectActive} gradientStrength={effectActive} />
      </div>
    </main>
  );
}