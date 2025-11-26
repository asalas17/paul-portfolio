"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

type MagneticHoverProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticHover({
  children,
  className,
  strength = 14,
}: MagneticHoverProps) {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updatePointerPreference = () => {
      setHasFinePointer(mediaQuery.matches);
    };

    updatePointerPreference();
    mediaQuery.addEventListener("change", updatePointerPreference);

    return () => mediaQuery.removeEventListener("change", updatePointerPreference);
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer) return;

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (left + width / 2);
    const offsetY = event.clientY - (top + height / 2);

    const normalizedX = (offsetX / (width / 2)) * strength;
    const normalizedY = (offsetY / (height / 2)) * strength;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={hasFinePointer ? { scale: 1.02 } : undefined}
      whileTap={{ scale: hasFinePointer ? 0.99 : 0.97, y: hasFinePointer ? 0 : -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
