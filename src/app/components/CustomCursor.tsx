"use client";

import { useEffect, useRef } from "react";

const ACTIVE_CLASS = "custom-cursor-active";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let visible = false;
    let pressed = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame: number | null = null;

    const drawRing = () => {
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${pressed ? 0.9 : 1})`;
    };

    const hide = () => {
      visible = false;
      pressed = false;
      root.classList.remove(ACTIVE_CLASS);
      ring.classList.remove("cursor-ring--active");
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    const animateRing = () => {
      frame = null;
      if (!visible) return;
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < 0.1) {
        currentX = targetX;
        currentY = targetY;
      } else {
        frame = requestAnimationFrame(animateRing);
      }
      drawRing();
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        drawRing();
        visible = true;
        root.classList.add(ACTIVE_CLASS);
      } else if (frame === null) {
        frame = requestAnimationFrame(animateRing);
      }
    };

    const down = (event: PointerEvent) => {
      move(event);
      if (!visible) return;
      pressed = true;
      ring.classList.add("cursor-ring--active");
      drawRing();
    };
    const up = () => {
      pressed = false;
      ring.classList.remove("cursor-ring--active");
      drawRing();
    };
    const out = (event: PointerEvent) => {
      if (event.relatedTarget === null) hide();
    };
    const updatePreferences = () => {
      if (!finePointer.matches || reducedMotion.matches) hide();
    };
    const updateVisibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointerout", out);
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", hide);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", updateVisibility);
    finePointer.addEventListener("change", updatePreferences);
    reducedMotion.addEventListener("change", updatePreferences);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerout", out);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", hide);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", updateVisibility);
      finePointer.removeEventListener("change", updatePreferences);
      reducedMotion.removeEventListener("change", updatePreferences);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
