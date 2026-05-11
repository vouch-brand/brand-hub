"use client";

import { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

const FPS = 12;
const FRAME_DURATION = 1000 / FPS;

// Idle animation (Mask_attempt_2_fixed.json):
//   Frames 0–22 once, pause 1s, then loop frames 22–48 with 1s pauses
// Working animation (lemniscate-loop-working.json):
//   Loop frames 21–56 continuously at 12fps

export default function LemniscateAnimation({ className = "w-[200px]" }: { className?: string }) {
  const idleContainerRef = useRef<HTMLDivElement>(null);
  const workingContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const idleContainer = idleContainerRef.current;
    const workingContainer = workingContainerRef.current;
    if (!idleContainer || !workingContainer) return;

    const idleAnim = lottie.loadAnimation({
      container: idleContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/assets/Mask_attempt_2_fixed.json",
    });

    const workingAnim = lottie.loadAnimation({
      container: workingContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/assets/lemniscate-loop-working.json",
    });

    const clearTicker = () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    };

    const playRange = (anim: AnimationItem, from: number, to: number, frameDuration: number, onComplete: () => void) => {
      clearTicker();
      let frame = from;
      anim.goToAndStop(frame, true);
      intervalRef.current = setInterval(() => {
        frame++;
        anim.goToAndStop(frame, true);
        if (frame >= to) {
          clearTicker();
          onComplete();
        }
      }, frameDuration);
    };

    const loopIdleSegment = () => {
      playRange(idleAnim, 22, 48, FRAME_DURATION, () => {
        timeoutRef.current = setTimeout(loopIdleSegment, 1000);
      });
    };

    const startIdleSequence = () => {
      playRange(idleAnim, 0, 22, FRAME_DURATION, () => {
        timeoutRef.current = setTimeout(loopIdleSegment, 1000);
      });
    };

    const loopWorking = () => {
      playRange(workingAnim, 21, 56, FRAME_DURATION, loopWorking);
    };

    const showWorking = () => {
      idleContainer.style.display = "none";
      workingContainer.style.display = "block";
      clearTicker();
      loopWorking();
    };

    const showIdle = () => {
      workingContainer.style.display = "none";
      idleContainer.style.display = "block";
      clearTicker();
      startIdleSequence();
    };

    // Start hidden; idle shown by default
    workingContainer.style.display = "none";

    idleAnim.addEventListener("DOMLoaded", () => {
      startIdleSequence();
    });

    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("agent-working")) {
        showWorking();
      } else {
        showIdle();
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearTicker();
      observer.disconnect();
      idleAnim.destroy();
      workingAnim.destroy();
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <div ref={idleContainerRef} style={{ aspectRatio: "1080/490" }} />
      <div ref={workingContainerRef} style={{ aspectRatio: "1/1" }} />
    </div>
  );
}
