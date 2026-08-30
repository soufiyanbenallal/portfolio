import type { ReactNode, SVGProps } from "react";

export type AiRecommendationIllustrationPropsType = SVGProps<SVGSVGElement>;

export function AiRecommendationIllustration(
  props: AiRecommendationIllustrationPropsType
): ReactNode {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
      {...props}
    >
      <defs>
        <linearGradient id="ai-rec-purple" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>

        <linearGradient id="ai-rec-pink" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>

        <linearGradient id="ai-rec-orange" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FDBA74" />
          <stop offset="1" stopColor="#F97316" />
        </linearGradient>

        <linearGradient id="ai-rec-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>

        <filter id="ai-rec-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="14"
            floodColor="#64748B"
            floodOpacity=".18"
          />
        </filter>

        <filter id="ai-rec-softShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="8"
            floodColor="#64748B"
            floodOpacity=".14"
          />
        </filter>
      </defs>

      {/* Main application window */}
      <g filter="url(#ai-rec-shadow)">
        <rect x="120" y="80" width="600" height="350" rx="28" fill="white" />

        {/* Header */}
        <rect x="120" y="80" width="600" height="62" rx="28" fill="#FAFAFF" />
        <rect x="120" y="115" width="600" height="27" fill="#FAFAFF" />

        {/* Header icon */}
        <rect x="148" y="99" width="30" height="30" rx="10" fill="url(#ai-rec-purple)" />
        <path
          d="M157 108H169M163 102V114"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Header text */}
        <rect x="192" y="102" width="125" height="10" rx="5" fill="#1E293B" />
        <rect x="192" y="118" width="78" height="6" rx="3" fill="#CBD5E1" />

        {/* Status badge */}
        <rect x="610" y="101" width="78" height="26" rx="13" fill="#DCFCE7" />
        <circle cx="625" cy="114" r="4" fill="#22C55E" />
        <rect x="634" y="111" width="38" height="6" rx="3" fill="#16A34A" />

        {/* Bundle title */}
        <rect x="154" y="168" width="180" height="12" rx="6" fill="#334155" />
        <rect x="154" y="190" width="120" height="7" rx="3.5" fill="#CBD5E1" />

        {/* Product cards */}
        <g filter="url(#ai-rec-softShadow)">
          {/* Product 1 */}
          <rect x="154" y="225" width="125" height="150" rx="18" fill="#FFF7ED" />
          <rect x="170" y="242" width="93" height="70" rx="12" fill="url(#ai-rec-orange)" />
          <circle cx="216.5" cy="277" r="18" fill="white" opacity=".9" />
          <path
            d="M207 278L214 285L228 269"
            stroke="#F97316"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="170" y="326" width="75" height="8" rx="4" fill="#475569" />
          <rect x="170" y="342" width="45" height="6" rx="3" fill="#94A3B8" />

          {/* Plus */}
          <circle cx="303" cy="299" r="17" fill="#EDE9FE" />
          <path
            d="M296 299H310M303 292V306"
            stroke="#7C3AED"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Product 2 */}
          <rect x="327" y="225" width="125" height="150" rx="18" fill="#EFF6FF" />
          <rect x="343" y="242" width="93" height="70" rx="12" fill="url(#ai-rec-blue)" />
          <circle cx="389.5" cy="277" r="18" fill="white" opacity=".9" />
          <path
            d="M380 278L387 285L401 269"
            stroke="#2563EB"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="343" y="326" width="75" height="8" rx="4" fill="#475569" />
          <rect x="343" y="342" width="45" height="6" rx="3" fill="#94A3B8" />

          {/* Plus */}
          <circle cx="476" cy="299" r="17" fill="#FCE7F3" />
          <path
            d="M469 299H483M476 292V306"
            stroke="#E11D48"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Product 3 */}
          <rect x="500" y="225" width="125" height="150" rx="18" fill="#FDF2F8" />
          <rect x="516" y="242" width="93" height="70" rx="12" fill="url(#ai-rec-pink)" />
          <circle cx="562.5" cy="277" r="18" fill="white" opacity=".9" />
          <path
            d="M553 278L560 285L574 269"
            stroke="#E11D48"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="516" y="326" width="75" height="8" rx="4" fill="#475569" />
          <rect x="516" y="342" width="45" height="6" rx="3" fill="#94A3B8" />
        </g>

        {/* Bundle launch button */}
        <rect x="568" y="168" width="120" height="38" rx="12" fill="url(#ai-rec-purple)" />
        <path
          d="M585 187L590 192L601 180"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="610" y="184" width="55" height="6" rx="3" fill="white" opacity=".9" />
      </g>

      {/* Floating bundle badge */}
      <g filter="url(#ai-rec-softShadow)">
        <rect x="55" y="55" width="155" height="78" rx="22" fill="white" />
        <rect x="70" y="70" width="42" height="42" rx="14" fill="#F3E8FF" />
        <path d="M82 84H100V100H82V84Z" fill="url(#ai-rec-purple)" />
        <rect x="125" y="75" width="62" height="9" rx="4.5" fill="#334155" />
        <rect x="125" y="92" width="45" height="6" rx="3" fill="#CBD5E1" />
      </g>

      {/* Floating sparkle */}
      <g transform="translate(675 395)">
        <path
          d="M18 0L22 14L36 18L22 22L18 36L14 22L0 18L14 14L18 0Z"
          fill="#FBBF24"
        />
        <circle cx="48" cy="8" r="6" fill="#A78BFA" />
        <circle cx="4" cy="48" r="5" fill="#FB7185" />
      </g>
    </svg>
  );
}

export default AiRecommendationIllustration;
