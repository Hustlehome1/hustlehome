"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SEGMENTS = 15;
const LAG_FRAMES = 2; // each segment trails the one ahead by ~2 frames
const HISTORY_LENGTH = SEGMENTS * LAG_FRAMES + 4;
const HEAD_RADIUS = 2.5; // 5px-diameter dot, matching the .live-dot scale
const HEAD_WIDTH = 4;
const TAIL_WIDTH = 0.5;
const LIME_RGB = "199, 255, 58";
const IDLE_THRESHOLD = 180; // ms of no movement before the snake starts coiling
const IDLE_COIL_RADIUS = 9;
const IDLE_COIL_SPEED = 0.004; // radians / ms
const MAX_DT = 48;

type Vec = { x: number; y: number };

export default function CursorSnake() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Gate on route + media queries before ever touching the canvas.
  useEffect(() => {
    if (pathname === "/checkout") {
      setEnabled(false);
      return;
    }
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(pointerFine && !reduceMotion);
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();

    const cursor: Vec = { x: 0, y: 0 };
    let hasCursor = false;
    let lastMoveTime = performance.now();
    const history: Vec[] = [];
    let idleMultiplier = 1;
    let windowFade = 1;
    let windowFadeTarget = 1;

    function onMouseMove(e: MouseEvent) {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      hasCursor = true;
      lastMoveTime = performance.now();
      idleMultiplier = 1; // snaps back to full opacity the instant it moves again
    }
    window.addEventListener("mousemove", onMouseMove);

    function onLeave() {
      windowFadeTarget = 0;
    }
    function onEnter() {
      windowFadeTarget = 1;
    }
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    function onResize() {
      resizeCanvas();
    }
    window.addEventListener("resize", onResize);

    let raf = 0;
    let lastTime = performance.now();

    function frame(now: number) {
      const dt = Math.min(now - lastTime, MAX_DT);
      lastTime = now;

      // ~200ms fade toward the leave/enter target.
      windowFade += (windowFadeTarget - windowFade) * Math.min(1, dt / 70);

      const idleFor = now - lastMoveTime;
      let head: Vec;
      if (hasCursor && idleFor > IDLE_THRESHOLD) {
        const coilT = idleFor - IDLE_THRESHOLD;
        const radius = Math.min(IDLE_COIL_RADIUS, (coilT / 500) * IDLE_COIL_RADIUS);
        const angle = coilT * IDLE_COIL_SPEED;
        head = {
          x: cursor.x + Math.cos(angle) * radius,
          y: cursor.y + Math.sin(angle) * radius,
        };
        const fadeT = Math.min(1, coilT / 900);
        idleMultiplier = 1 - fadeT * 0.7; // eases down to a 0.3 floor
      } else {
        head = { x: cursor.x, y: cursor.y };
      }

      history.unshift(head);
      if (history.length > HISTORY_LENGTH) history.length = HISTORY_LENGTH;

      ctx!.clearRect(0, 0, width, height);

      if (hasCursor && windowFade > 0.01) {
        ctx!.lineCap = "round";
        const chain: Vec[] = [head];
        for (let i = 0; i < SEGMENTS; i++) {
          const idx = Math.min((i + 1) * LAG_FRAMES, history.length - 1);
          chain.push(history[idx]);
        }
        for (let i = 0; i < chain.length - 1; i++) {
          const t = i / (chain.length - 2);
          const alpha = Math.max(0, 0.7 - t * 0.65) * idleMultiplier * windowFade;
          ctx!.strokeStyle = `rgba(${LIME_RGB}, ${alpha})`;
          ctx!.lineWidth = HEAD_WIDTH - t * (HEAD_WIDTH - TAIL_WIDTH);
          ctx!.beginPath();
          ctx!.moveTo(chain[i].x, chain[i].y);
          ctx!.lineTo(chain[i + 1].x, chain[i + 1].y);
          ctx!.stroke();
        }

        ctx!.beginPath();
        ctx!.arc(head.x, head.y, HEAD_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${LIME_RGB}, ${0.7 * windowFade})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55]"
    />
  );
}
