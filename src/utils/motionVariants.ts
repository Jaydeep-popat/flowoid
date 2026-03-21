/**
 * Shared Framer Motion variants used across all pages.
 * Import and apply these to motion.* components for consistent animations.
 */

/** Standard ease used everywhere */
export const ease = [0.16, 1, 0.3, 1] as const;

/* ── CONTAINER — staggers children ── */
export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

export const containerVariantsFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

/* ── FADE UP (most common) ── */
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const fadeUpSlow = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

export const fadeUpFast = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/* ── FADE LEFT / RIGHT ── */
export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};

/* ── SCALE IN ── */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease } },
};

export const scaleInBounce = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ── BLUR IN ── */
export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 14 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

/* ── ROTATE IN (cards) ── */
export const rotateIn = {
  hidden: { opacity: 0, rotateY: 12, y: 20 },
  visible: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

/* ── SLIDE IN FROM BOTTOM (full card) ── */
export const slideUpCard = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease },
  },
};

/* ── CLIP REVEAL (horizontal wipe) ── */
export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.85, ease },
  },
};

/* ── LINE GROW (horizontal rule / progress bar) ── */
export const lineGrow = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease },
  },
};
