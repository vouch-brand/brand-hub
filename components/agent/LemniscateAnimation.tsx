"use client";

import { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

const FPS = 12;
const FRAME_DURATION = 1000 / FPS;

export default function LemniscateAnimation({ className = "w-[200px]" }: { className?: string }) {
  const idleContainerRef = useRef<HTMLDivElement>(null);
  const workingContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const workingReadyRef = useRef(false);

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

    const playRange = (anim: AnimationItem, from: number, to: number, onComplete: () => void) => {
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
      }, FRAME_DURATION);
    };

    const loopIdleSegment = () => {
      playRange(idleAnim, 22, 48, () => {
        timeoutRef.current = setTimeout(loopIdleSegment, 1000);
      });
    };

    const startIdleSequence = () => {
      idleContainer.style.display = "block";
      workingContainer.style.display = "none";
      playRange(idleAnim, 0, 22, () => {
        timeoutRef.current = setTimeout(loopIdleSegment, 1000);
      });
    };

    const loopWorking = () => {
      playRange(workingAnim, 21, 56, loopWorking);
    };

    const startWorking = () => {
      if (!workingReadyRef.current) {
        // Working animation not parsed yet — retry shortly
        timeoutRef.current = setTimeout(startWorking, 50);
        return;
      }
      idleContainer.style.display = "none";
      workingContainer.style.display = "block";
      clearTicker();
      loopWorking();
    };

    workingAnim.addEventListener("DOMLoaded", () => {
      workingReadyRef.current = true;
    });

    // When idle animation is ready, check which state we're in
    idleAnim.addEventListener("DOMLoaded", () => {
      if (document.body.classList.contains("agent-working")) {
        startWorking();
      } else {
        startIdleSequence();
      }
    });

    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("agent-working")) {
        startWorking();
      } else {
        clearTicker();
        startIdleSequence();
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // Hide working container until needed
    workingContainer.style.display = "none";

    return () => {
      clearTicker();
      observer.disconnect();
      idleAnim.destroy();
      workingAnim.destroy();
    };
  }, []);

  return (
    <div className={className} style={{ position: "relative", aspectRatio: "1080/490" }} aria-hidden="true">
      <div ref={idleContainerRef} style={{ position: "absolute", inset: 0 }} />
      <div ref={workingContainerRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
