"use client";

import { useEffect, useRef } from "react";

const SNAKE_COUNT = 5;
const POINT_COUNT = 40; // body segments trailing the head
const BODY_COLOR = "rgba(199, 255, 58, 0.4)";
const HEAD_COLOR = "#C7FF3A";
const EYE_COLOR = "#0A0A0A";
const STATIC_COLOR = "rgba(199, 255, 58, 0.15)";
const HEAD_WIDTH = 3.5;
const TAIL_WIDTH = 0.5;
const MAX_DT = 48; // ms — clamp so a stalled tab doesn't jump the chain

type Vec = { x: number; y: number };

type Snake = {
  head: Vec;
  heading: number;
  baseHeading: number;
  steerAmp: number;
  steerFreq: number;
  steerPhase: number;
  speed: number; // px / ms
  spacing: number; // px between consecutive body points
  segments: Vec[]; // POINT_COUNT points trailing the head
  spawnTime: number;
  duration: number; // ms to cross the viewport
};

// A snake spawns fully off-screen on a diagonal chord and travels toward
// the opposite edge, wiggling its heading as it goes. The body doesn't
// follow a formula — it chases the head frame to frame, like a rope.
function makeSnake(width: number, height: number, now: number): Snake {
  const angleDeg = 20 + Math.random() * 50; // stay off dead-flat/vertical
  const flip = Math.random() < 0.5 ? 1 : -1;
  const quadrant = Math.floor(Math.random() * 4) * 90;
  const baseHeading = ((angleDeg * flip + quadrant) * Math.PI) / 180;
  const dir: Vec = { x: Math.cos(baseHeading), y: Math.sin(baseHeading) };
  const perp: Vec = { x: -dir.y, y: dir.x };

  const spacing = 10 + Math.random() * 6;
  const bodyLength = spacing * POINT_COUNT;

  const diag = Math.hypot(width, height);
  const reach = diag / 2 + bodyLength;
  const lateralOffset = (Math.random() - 0.5) * diag * 0.8;

  const cx = width / 2 + perp.x * lateralOffset;
  const cy = height / 2 + perp.y * lateralOffset;
  const head: Vec = { x: cx - dir.x * reach, y: cy - dir.y * reach };

  const duration = 15000 + Math.random() * 10000; // 15-25s per crossing
  const travelDistance = diag + bodyLength;

  const segments: Vec[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    segments.push({ x: head.x - dir.x * spacing * (i + 1), y: head.y - dir.y * spacing * (i + 1) });
  }

  return {
    head,
    heading: baseHeading,
    baseHeading,
    steerAmp: 0.35 + Math.random() * 0.45, // radians of wiggle either side of baseHeading
    steerFreq: (2 * Math.PI) / (2200 + Math.random() * 1800), // one wiggle every ~2.2-4s
    steerPhase: Math.random() * Math.PI * 2,
    speed: travelDistance / duration,
    spacing,
    segments,
    spawnTime: now,
    duration,
  };
}

// Head steers with a sine wobble around the base heading; the head moves
// on that heading, and each body point is pulled to a fixed distance
// behind the point ahead of it — a rigid chain, not an independent curve.
function stepSnake(snake: Snake, dt: number, now: number) {
  snake.heading =
    snake.baseHeading + snake.steerAmp * Math.sin(now * snake.steerFreq + snake.steerPhase);

  snake.head.x += Math.cos(snake.heading) * snake.speed * dt;
  snake.head.y += Math.sin(snake.heading) * snake.speed * dt;

  // Rigid link: each segment is held exactly `spacing` behind the point ahead of it.
  let leader = snake.head;
  for (const seg of snake.segments) {
    const dx = leader.x - seg.x;
    const dy = leader.y - seg.y;
    const angle = Math.atan2(dy, dx);
    seg.x = leader.x - Math.cos(angle) * snake.spacing;
    seg.y = leader.y - Math.sin(angle) * snake.spacing;
    leader = seg;
  }
}

function drawBody(ctx: CanvasRenderingContext2D, snake: Snake) {
  const chain = [snake.head, ...snake.segments];
  ctx.lineCap = "round";
  ctx.strokeStyle = BODY_COLOR;
  for (let i = 0; i < chain.length - 1; i++) {
    const t = i / (chain.length - 2);
    ctx.lineWidth = HEAD_WIDTH - t * (HEAD_WIDTH - TAIL_WIDTH);
    ctx.beginPath();
    ctx.moveTo(chain[i].x, chain[i].y);
    ctx.lineTo(chain[i + 1].x, chain[i + 1].y);
    ctx.stroke();
  }
}

function drawHead(ctx: CanvasRenderingContext2D, snake: Snake) {
  const dir: Vec = { x: Math.cos(snake.heading), y: Math.sin(snake.heading) };
  const perp: Vec = { x: -dir.y, y: dir.x };
  const { head } = snake;

  const tipLen = 9;
  const backLen = 4.5;
  const halfWidth = 3.2;

  const tip: Vec = { x: head.x + dir.x * tipLen, y: head.y + dir.y * tipLen };
  const backCenter: Vec = { x: head.x - dir.x * backLen, y: head.y - dir.y * backLen };
  const left: Vec = { x: backCenter.x + perp.x * halfWidth, y: backCenter.y + perp.y * halfWidth };
  const right: Vec = { x: backCenter.x - perp.x * halfWidth, y: backCenter.y - perp.y * halfWidth };

  ctx.beginPath();
  ctx.moveTo(tip.x, tip.y);
  ctx.lineTo(left.x, left.y);
  ctx.lineTo(right.x, right.y);
  ctx.closePath();
  ctx.fillStyle = HEAD_COLOR;
  ctx.fill();

  const eyeCenter: Vec = { x: head.x + dir.x * 1.5, y: head.y + dir.y * 1.5 };
  const eyeSpread = 2.1;
  ctx.fillStyle = EYE_COLOR;
  for (const side of [1, -1]) {
    ctx.beginPath();
    ctx.arc(
      eyeCenter.x + perp.x * eyeSpread * side,
      eyeCenter.y + perp.y * eyeSpread * side,
      0.9,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

// Non-animated decorative curves for prefers-reduced-motion — a plain sine
// wave threaded through points and stroked once, no head, no simulation.
function staticPath(width: number, height: number, seed: number): Vec[] {
  const angle = ((seed * 47) % 140) * (Math.PI / 180) - Math.PI / 4;
  const dir: Vec = { x: Math.cos(angle), y: Math.sin(angle) };
  const perp: Vec = { x: -dir.y, y: dir.x };
  const diag = Math.hypot(width, height);
  const cx = width / 2 + perp.x * (((seed * 137) % 100) / 100 - 0.5) * diag * 0.8;
  const cy = height / 2 + perp.y * (((seed * 137) % 100) / 100 - 0.5) * diag * 0.8;
  const amplitude = 40 + (seed % 5) * 8;
  const points: Vec[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    const along = (i - POINT_COUNT / 2) * 18;
    const wave = amplitude * Math.sin(i * 0.35 + seed);
    points.push({
      x: cx + dir.x * along + perp.x * wave,
      y: cy + dir.y * along + perp.y * wave,
    });
  }
  return points;
}

function strokeStatic(ctx: CanvasRenderingContext2D, points: Vec[]) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
  ctx.stroke();
}

export default function SnakeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Long slithering canvas animations are the single heaviest thing on
    // the page for mobile GPUs — fewer snakes and a capped DPR keep frame
    // time sane on phones without changing how the desktop version looks.
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
    const snakeCount = isMobile ? 2 : SNAKE_COUNT;

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

    if (reduceMotion) {
      resizeCanvas();
      const draw = () => {
        ctx!.clearRect(0, 0, width, height);
        ctx!.lineWidth = 1.5;
        ctx!.lineCap = "round";
        ctx!.strokeStyle = STATIC_COLOR;
        for (let i = 0; i < 5; i++) {
          strokeStatic(ctx!, staticPath(width, height, i + 1));
        }
      };
      draw();
      const onResize = () => draw();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    resizeCanvas();
    let snakes = Array.from({ length: snakeCount }, () =>
      makeSnake(width, height, performance.now())
    );
    let raf = 0;
    let lastTime = performance.now();

    function frame(now: number) {
      const dt = Math.min(now - lastTime, MAX_DT);
      lastTime = now;

      snakes = snakes.map((snake) =>
        now - snake.spawnTime > snake.duration ? makeSnake(width, height, now) : snake
      );

      ctx!.clearRect(0, 0, width, height);
      for (const snake of snakes) {
        stepSnake(snake, dt, now);
        drawBody(ctx!, snake);
        drawHead(ctx!, snake);
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1]"
    />
  );
}
