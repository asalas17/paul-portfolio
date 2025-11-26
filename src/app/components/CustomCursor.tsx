"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ACTIVE_CLASS = "cursor-ring--active";

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updatePointerPreference = () => {
      setHasFinePointer(mediaQuery.matches);
    };

    updatePointerPreference();
    mediaQuery.addEventListener("change", updatePointerPreference);

    return () => mediaQuery.removeEventListener("change", updatePointerPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer) {
      return undefined;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (dot) {
        dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
    };

    let isPointerDown = false;

    const handlePointerDown = () => {
      isPointerDown = true;
      ring?.classList.add(ACTIVE_CLASS);
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      ring?.classList.remove(ACTIVE_CLASS);
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (ring) {
        const scale = isPointerDown ? 0.9 : 1;
        ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      animationFrame.current = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    animationFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [hasFinePointer, prefersReducedMotion]);

  if (prefersReducedMotion || !hasFinePointer) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
