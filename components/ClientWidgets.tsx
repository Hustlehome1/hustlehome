"use client";

import dynamic from "next/dynamic";

// ssr: false requires a client boundary — app/layout.tsx stays a server
// component, so this wrapper is the client boundary that hosts it.
const PurchaseToast = dynamic(() => import("@/components/PurchaseToast"), { ssr: false });
const CursorSnake = dynamic(() => import("@/components/CursorSnake"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <PurchaseToast />
      <CursorSnake />
    </>
  );
}
