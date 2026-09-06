"use client";

import { useEffect, useRef, useState } from "react";

// A small lime snake parked at the card's top-left corner. Idle it's almost
// invisible; on hover it wakes and traces the perimeter once every ~3s,
// drawing a faint trail behind it. Same head + SMIL-motion language as
// SnakeCheckoutButton, but paused by default and reset to the start point
// on mouse leave instead of looping continuously.
export default function ReviewSnakeBorder({ hovered }: { hovered: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reduceMotion) return;
    if (hovered) {
      svg.unpauseAnimations?.();
    } else {
      svg.pauseAnimations?.();
      svg.setCurrentTime?.(0);
    }
  }, [hovered, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        pathLength={100}
        fill="none"
        stroke="#C7FF3A"
        strokeWidth="1.5"
        strokeOpacity="0.1"
        strokeDasharray="100"
        strokeDashoffset="100"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="100"
          to="0"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
      <g
        style={{
          opacity: hovered ? 0.8 : 0.2,
          transition: `opacity ${hovered ? 200 : 400}ms ease-out`,
        }}
      >
        <line x1="-11" y1="0" x2="-3" y2="0" stroke="#C7FF3A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="-6" y1="0" x2="-2" y2="0" stroke="#C7FF3A" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
        <circle cx="0" cy="0" r="1.8" fill="#C7FF3A" />
        <animateMotion dur="3s" repeatCount="indefinite" rotate="auto" path="M 2 2 H 98 V 98 H 2 Z" />
      </g>
    </svg>
  );
}
