import { create } from "zustand";

type ExperiencePhase =
  | "hero"
  | "transition"
  | "about";

interface ExperienceStore {
  phase: ExperiencePhase;
  isAnimating: boolean;

  setPhase: (phase: ExperiencePhase) => void;
  setAnimating: (value: boolean) => void;
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  phase: "hero",
  isAnimating: false,

  setPhase: (phase) => {
    console.log("Phase →", phase);

    set({ phase });
  },

  setAnimating: (value) => {
    console.log("Animating →", value);

    set({
      isAnimating: value,
    });
  },
}));