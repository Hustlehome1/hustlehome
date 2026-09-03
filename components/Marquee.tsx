const MARQUEE_TEXT =
  "INSTANT DIGITAL DELIVERY  ·  VERIFIED VENDORS  ·  BASED IN DUBLIN  ·  TRUSTED BY 100+ RESELLERS  ·  ";

export default function Marquee() {
  const block = MARQUEE_TEXT.repeat(3);
  return (
    <div className="marquee-pause overflow-hidden border-y border-lime bg-void py-3">
      <div className="marquee-track flex w-max">
        <span className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.1em] text-lime">
          {block}
        </span>
        <span
          className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.1em] text-lime"
          aria-hidden="true"
        >
          {block}
        </span>
      </div>
    </div>
  );
}
