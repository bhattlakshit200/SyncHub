// "use client";

// import { useEffect } from "react";
// import { useExperienceStore } from "@/store/useExperienceStore";

// export default function ScrollController() {
//   const phase = useExperienceStore((state) => state.phase);
//   const isAnimating = useExperienceStore((state) => state.isAnimating);

//   const setPhase = useExperienceStore((state) => state.setPhase);
//   const setAnimating = useExperienceStore((state) => state.setAnimating);



//   useEffect(() => {
//     function handleWheel(e: WheelEvent) {
//       if (isAnimating) return;

//       // Scroll Down
//       if (e.deltaY > 0 && phase === "hero") {
//         setAnimating(true);
//         setPhase("transition");
//         return;
//       }

//       // Scroll Up
//       if (e.deltaY < 0 && phase === "transition") {
//         setAnimating(true);
//         setPhase("hero");
//         return;
//       }
//     }
//     window.addEventListener("wheel", handleWheel, { passive: true });

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//     };
//   }, [phase, isAnimating, setAnimating, setPhase]);

//   return null;
// }


"use client";

import { useEffect } from "react";
import { useExperienceStore } from "@/store/useExperienceStore";

export default function ScrollController() {
  const phase = useExperienceStore((state) => state.phase);
  const setPhase = useExperienceStore((state) => state.setPhase);

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if (e.deltaY > 0 && phase === "hero") {
        setPhase("transition");
      }

      if (e.deltaY < 0 && phase === "transition") {
        setPhase("hero");
      }
    }

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [phase, setPhase]);

  return null;
}