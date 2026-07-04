"use client";

import { useEffect } from "react";
import { useExperienceStore } from "@/store/useExperienceStore";
import ShapeBlur from "@/components/layout/ShapeBlur";
import { SparklesCore } from "@/components/ui/sparkles";

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
    <main className="min-h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none relative">
      
      {/* SyncHub Text Div (centered exactly in the viewport) */}
      <div 
        style={{ 
          transform: `scale(${textScale})`,
          transition: "transform 0.1s ease-out",
          width: "750px",
          height: "180px",
        }} 
        className="relative origin-center select-none flex items-center justify-center pointer-events-auto"
      >
        <ShapeBlur className="w-full h-full" circleSize={0.2} effectActive={effectActive} gradientStrength={effectActive} />

        {/* Aceternity Sparkles Container - positioned directly underneath the text */}
        <div 
          style={{ 
            opacity: t,
            transition: "opacity 0.2s ease-out",
            width: "450px",
            height: "150px",
            position: "absolute",
            top: "135px", // Minimize gap, aligns exactly at the bottom baseline of the letters
            left: "50%",
            transform: "translateX(-50%)",
            maskImage: "radial-gradient(ellipse at top, black 25%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at top, black 25%, transparent 75%)",
          }}
          className="pointer-events-none select-none flex flex-col items-center justify-start overflow-hidden"
        >
          {/* Glow Line Gradients (from Aceternity layout) at the top of the container */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[40px]">
            <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-neutral-400 to-transparent h-[2px] blur-sm" />
            <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-neutral-300 to-transparent h-px" />
            <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[4px] blur-sm" />
            <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
          </div>

          {/* Sparkles Canvas */}
          <SparklesCore
            background="transparent"
            minSize={0.15}
            maxSize={0.6}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

      </div>
    </main>
  );
}