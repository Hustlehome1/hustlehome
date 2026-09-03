"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { REVIEW_SCREENSHOTS, type ReviewScreenshot } from "@/lib/reviewScreenshots";

function MetaLine({ shot }: { shot: ReviewScreenshot }) {
  return (
    <p className="mt-3 px-1 pb-1 font-mono text-meta text-ash">
      SOURCE: Instagram DM &nbsp;·&nbsp; RECEIVED: {shot.receivedDate} &nbsp;·&nbsp; No.{" "}
      {shot.reportNo}
    </p>
  );
}

function ShotCard({
  shot,
  onOpen,
}: {
  shot: ReviewScreenshot;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="review-shot p-2">
      <button
        type="button"
        onClick={() => onOpen(shot.id)}
        className="block w-full"
        aria-label={`Open full-size screenshot: ${shot.alt}`}
      >
        <Image
          src={shot.image}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 640px) 90vw, 45vw"
          className="h-auto w-full"
        />
      </button>
      <MetaLine shot={shot} />
    </div>
  );
}

export default function ReviewsGallery() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openShot = REVIEW_SCREENSHOTS.find((s) => s.id === openId) ?? null;

  useEffect(() => {
    if (!openShot) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openShot]);

  const columnOne = REVIEW_SCREENSHOTS.filter((_, i) => i % 2 === 0);
  const columnTwo = REVIEW_SCREENSHOTS.filter((_, i) => i % 2 === 1);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-6">
          {columnOne.map((shot) => (
            <ShotCard key={shot.id} shot={shot} onOpen={setOpenId} />
          ))}
        </div>
        <div className="flex flex-col gap-6 sm:mt-[60px]">
          {columnTwo.map((shot) => (
            <ShotCard key={shot.id} shot={shot} onOpen={setOpenId} />
          ))}
        </div>
      </div>

      {openShot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-size review screenshot"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 p-6"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={openShot.image}
              alt={openShot.alt}
              width={openShot.width}
              height={openShot.height}
              sizes="100vw"
              className="max-h-[90vh] w-auto max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="absolute -top-10 right-0 font-mono text-meta uppercase tracking-wide text-bone hover:text-lime"
            >
              Close (Esc)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
