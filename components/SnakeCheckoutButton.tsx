"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type SnakeCheckoutButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

// The site's showpiece CTA — a small lime snake permanently loops the
// button's perimeter (same head + tapered-tail language as the background
// snakes). Pauses on hover via native SMIL timing control rather than CSS,
// since animateMotion isn't something animation-play-state can touch.
export default function SnakeCheckoutButton({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}: SnakeCheckoutButtonProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => svgRef.current?.pauseAnimations?.()}
      onMouseLeave={() => svgRef.current?.unpauseAnimations?.()}
      className={`btn-checkout relative inline-flex items-center border border-lime bg-void px-8 py-4 font-mono text-body-sm uppercase tracking-wide text-lime disabled:cursor-not-allowed disabled:opacity-40 ${
        reduceMotion ? "btn-checkout-static" : ""
      } ${className}`.trim()}
    >
      <span className="relative z-10">{children}</span>
      {!reduceMotion && (
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <g opacity="0.9">
            <line x1="-11" y1="0" x2="-3" y2="0" stroke="#C7FF3A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="-6" y1="0" x2="-2" y2="0" stroke="#C7FF3A" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
            <circle cx="0" cy="0" r="1.8" fill="#C7FF3A" />
            <animateMotion dur="4s" repeatCount="indefinite" rotate="auto" path="M 2 2 H 98 V 98 H 2 Z" />
          </g>
        </svg>
      )}
    </button>
  );
}
