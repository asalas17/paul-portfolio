"use client";

import { useEffect, useRef } from "react";

const ACTIVE_CLASS = "cursor-ring--active";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number>();

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
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
        dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    };

    const handlePointerDown = () => {
      ring?.classList.add(ACTIVE_CLASS);
    };

    const handlePointerUp = () => {
      ring?.classList.remove(ACTIVE_CLASS);
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (ring) {
        ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
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
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
