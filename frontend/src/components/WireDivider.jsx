export default function WireDivider({ flip = false }) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 40" className="w-full h-8" preserveAspectRatio="none">
        <path
          d="M0 20 L280 20 L310 4 L340 36 L370 20 L1200 20"
          fill="none"
          stroke="#1E56E3"
          strokeWidth="2"
        />
        <circle cx="340" cy="36" r="4" fill="#FFC93C" />
      </svg>
    </div>
  );
}
