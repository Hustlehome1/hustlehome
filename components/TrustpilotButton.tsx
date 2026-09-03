import Star from "@/components/Star";

export default function TrustpilotButton({ className = "" }: { className?: string }) {
  return (
    <a
      // TODO: Replace "#" with real Trustpilot profile URL once account is set up
      // e.g. https://www.trustpilot.com/review/hustlehome.co
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View our Trustpilot reviews"
      className={`btn-trustpilot ${className}`.trim()}
    >
      <Star className="h-3.5 w-3.5" />
      <span>Trustpilot</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
