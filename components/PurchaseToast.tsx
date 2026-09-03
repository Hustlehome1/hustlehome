"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/products";

const NAMES = [
  "Marcus T.",
  "Aisha R.",
  "Diego F.",
  "Sofia L.",
  "Kwame O.",
  "Amelia B.",
  "Yuki M.",
  "Rafael G.",
  "Zainab K.",
  "Oscar H.",
  "Nina C.",
  "Elias V.",
  "Priya S.",
  "Tomás A.",
  "Lena W.",
  "Mateo J.",
  "Chidinma E.",
  "Finn D.",
  "Iris N.",
  "Rohan P.",
];

const CITIES = [
  "London",
  "Manchester",
  "Dublin",
  "Berlin",
  "Paris",
  "Amsterdam",
  "Barcelona",
  "Milan",
  "Warsaw",
  "Copenhagen",
  "Vienna",
  "Prague",
  "Rotterdam",
  "Lyon",
  "Munich",
  "Stockholm",
  "Oslo",
  "Zurich",
  "Lisbon",
  "Athens",
];

const PRODUCT_NAMES = PRODUCTS.map((p) => p.name);

// Weighted so "just now" shows up roughly half the time.
const TIME_AGO = ["just now", "just now", "just now", "just now", "1m ago", "2m ago", "4m ago", "6m ago"];

const FIRST_DELAY = 8000;
const MIN_INTERVAL = 25000;
const MAX_INTERVAL = 45000;
const VISIBLE_DURATION = 5000;
const EXIT_DURATION = 300;

function pick<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}

function randomInterval() {
  return MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
}

type ToastData = { name: string; city: string; product: string; timeAgo: string };

export default function PurchaseToast() {
  const pathname = usePathname();
  const isCheckout = pathname === "/checkout";
  const [toast, setToast] = useState<ToastData | null>(null);
  const [phase, setPhase] = useState<"hidden" | "open" | "closing">("hidden");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (isCheckout) return;

    function clearTimers() {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    }

    function scheduleNext() {
      const id = window.setTimeout(showToast, randomInterval());
      timers.current.push(id);
    }

    function showToast() {
      setToast({
        name: pick(NAMES),
        city: pick(CITIES),
        product: pick(PRODUCT_NAMES),
        timeAgo: pick(TIME_AGO),
      });
      setPhase("hidden");

      const openId = window.setTimeout(() => setPhase("open"), 20);
      timers.current.push(openId);

      const hideId = window.setTimeout(() => {
        setPhase("closing");
        const unmountId = window.setTimeout(() => {
          setToast(null);
          setPhase("hidden");
          scheduleNext();
        }, EXIT_DURATION);
        timers.current.push(unmountId);
      }, VISIBLE_DURATION);
      timers.current.push(hideId);
    }

    const firstId = window.setTimeout(showToast, FIRST_DELAY);
    timers.current.push(firstId);

    return () => {
      clearTimers();
      setToast(null);
      setPhase("hidden");
    };
  }, [isCheckout]);

  if (isCheckout || !toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`purchase-toast pointer-events-none fixed bottom-4 left-4 z-[58] w-[min(340px,calc(100vw-32px))] border-t border-r border-b border-iron border-l-4 border-l-lime bg-graphite px-4 py-[14px] sm:bottom-6 sm:left-6 ${
        phase === "open" ? "open" : phase === "closing" ? "closing" : ""
      }`}
    >
      <div className="flex items-center gap-1.5">
        <span className="live-dot" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-wide text-lime">Live</span>
      </div>
      <p className="mt-2 font-display text-body-sm text-bone">{toast.name} just bought</p>
      <p className="mt-1 text-body-sm">
        <span className="text-white">{toast.product}</span>{" "}
        <span className="font-mono text-meta text-ash">· {toast.timeAgo}</span>
      </p>
      <p className="mt-1 font-mono text-[11px] text-ash">from {toast.city}</p>
    </div>
  );
}
