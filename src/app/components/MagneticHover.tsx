"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import React, { useSyncExternalStore } from "react";

function subscribeToPointer(callback: () => void) {
  const query = window.matchMedia("(pointer: fine)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerPointerSnapshot() {
  return false;
}

type MagneticHoverProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticHover({ children, className, strength = 14 }: MagneticHoverProps) {
  const hasFinePointer = useSyncExternalStore(subscribeToPointer, getPointerSnapshot, getServerPointerSnapshot);
  const prefersReducedMotion = useReducedMotion();
  const enabled = hasFinePointer && !prefersReducedMotion;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - left - width / 2) / (width / 2)) * strength);
    y.set(((event.clientY - top - height / 2) / (height / 2)) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={enabled ? { x: springX, y: springY } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={enabled ? { scale: 1.02 } : undefined}
      whileTap={enabled ? { scale: 0.99 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
