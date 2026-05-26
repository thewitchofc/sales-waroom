export const cinematicEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export const pageTransitionReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const introSequence = {
  logo: { duration: 0.7, delay: 0.1 },
  brand: { duration: 0.6, delay: 0.35 },
  status: { duration: 0.5, delay: 0.55 },
  exit: { duration: 0.55, delay: 1.6 },
};
