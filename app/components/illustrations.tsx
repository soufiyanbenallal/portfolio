type IllustrationProps = {
  className?: string;
};

export function TvIcon({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 24 18" width="22" height="17" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="1" y="3" width="18" height="13" />
        <path d="M19 7 L23 4" />
        <path d="M19 12 L23 15" />
        <path d="M5 16 L5 17" />
      </g>
    </svg>
  );
}

export function HeroSystemIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 500"
      width="100%"
      height="auto"
      role="img"
      aria-label="Flat vector diagram of a four-layer delivery system: storefront, integration, services and delivery"
    >
      <g fill="var(--ink)" opacity=".22">
        <circle cx="26" cy="26" r="3" />
        <circle cx="46" cy="26" r="3" />
        <circle cx="66" cy="26" r="3" />
        <circle cx="26" cy="46" r="3" />
        <circle cx="46" cy="46" r="3" />
        <circle cx="66" cy="46" r="3" />
        <circle cx="26" cy="66" r="3" />
        <circle cx="46" cy="66" r="3" />
        <circle cx="66" cy="66" r="3" />
        <circle cx="514" cy="454" r="3" />
        <circle cx="534" cy="454" r="3" />
        <circle cx="514" cy="474" r="3" />
        <circle cx="534" cy="474" r="3" />
      </g>

      <g stroke="var(--ink)" strokeWidth="3">
        <circle cx="492" cy="52" r="44" fill="var(--secondary)" />
        <rect x="40" y="36" width="452" height="410" rx="16" fill="var(--paper)" />
        <rect x="40" y="36" width="452" height="34" rx="16" fill="var(--ink)" />

        <g className="hero-system__floating-row">
          <rect x="76" y="92" width="380" height="76" rx="16" fill="var(--accent)" />
          <circle cx="110" cy="130" r="13" fill="var(--paper)" />
          <rect x="384" y="112" width="58" height="34" rx="16" fill="var(--paper)" />
        </g>

        <rect x="76" y="182" width="380" height="76" rx="16" fill="var(--paper)" />
        <circle cx="110" cy="220" r="13" fill="var(--tertiary)" />
        <rect x="384" y="202" width="58" height="34" rx="16" fill="var(--tertiary)" />

        <rect x="76" y="272" width="380" height="76" rx="16" fill="var(--secondary)" />
        <circle cx="110" cy="310" r="13" fill="var(--tertiary)" />
        <rect x="384" y="292" width="58" height="34" rx="16" fill="var(--paper)" />

        <rect x="76" y="362" width="380" height="76" rx="16" fill="var(--ink)" />
        <circle cx="110" cy="400" r="13" fill="var(--accent)" />
        <rect x="384" y="382" width="58" height="34" rx="16" fill="var(--paper)" />

        <path d="M110 168 L110 182" fill="none" />
        <path d="M110 258 L110 272" fill="none" />
        <path d="M110 348 L110 362" fill="none" />
        <path d="M456 130 L516 130 L516 400 L470 400" fill="none" />
        <path d="M456 400 L474 390 L474 410 Z" fill="var(--ink)" />
      </g>

      <g fontFamily="Roboto, sans-serif" fontWeight="700">
        <text x="142" y="126" fill="var(--paper)" fontSize="17">Storefront &amp; interface</text>
        <text x="142" y="216" fill="var(--ink)" fontSize="17">App &amp; integration layer</text>
        <text x="142" y="306" fill="var(--ink)" fontSize="17">Services, automation &amp; AI</text>
        <text x="142" y="396" fill="var(--paper)" fontSize="17">Delivery &amp; team</text>
      </g>

      <g fontFamily="Roboto Mono, monospace" fontSize="10.5">
        <text x="60" y="58" fill="var(--paper)" letterSpacing="1.4">FOUR LAYERS · ONE OWNER</text>
        <text x="470" y="58" textAnchor="end" fill="var(--paper)">FIG. 01</text>
        <text x="142" y="148" fill="var(--paper)">REACT · TYPESCRIPT · LIQUID · OS 2.0</text>
        <text x="142" y="238" fill="var(--ink)" opacity=".75">SHOPIFY APIS · WEBHOOKS · OAUTH</text>
        <text x="142" y="328" fill="var(--ink)">NODE.JS · LARAVEL · AI · JOBS</text>
        <text x="142" y="418" fill="var(--paper)">CI/CD · REVIEW · MENTORING</text>
        <text x="413" y="134" textAnchor="middle" fill="var(--ink)" fontWeight="500">8 YRS</text>
        <text x="413" y="224" textAnchor="middle" fill="var(--ink)" fontWeight="500">3 YRS</text>
        <text x="413" y="314" textAnchor="middle" fill="var(--ink)" fontWeight="500">TOP</text>
        <text x="413" y="404" textAnchor="middle" fill="var(--ink)" fontWeight="500">LEAD</text>
        <text x="524" y="265" textAnchor="middle" transform="rotate(90 524 265)" fill="var(--ink)" opacity=".75">FEEDBACK LOOP</text>
        <text x="42" y="482" fill="var(--ink)" opacity=".75">HOW THE WORK FITS TOGETHER</text>
      </g>
    </svg>
  );
}

export function AderArchitectureIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 360 300" width="100%" height="auto" role="img" aria-label="Flat vector architecture diagram: product surface, services, data and pipeline">
      <g stroke="var(--ink)" strokeWidth="3">
        <rect x="30" y="24" width="300" height="56" rx="16" fill="var(--paper)" />
        <rect x="30" y="106" width="140" height="56" rx="16" fill="var(--tertiary)" />
        <rect x="190" y="106" width="140" height="56" rx="16" fill="var(--paper)" />
        <rect x="30" y="188" width="300" height="56" rx="16" fill="var(--accent)" />
        <path d="M100 80 L100 106" fill="none" />
        <path d="M260 80 L260 106" fill="none" />
        <path d="M100 162 L100 188" fill="none" />
        <path d="M260 162 L260 188" fill="none" />
        <circle cx="52" cy="52" r="9" fill="var(--secondary)" />
        <circle cx="52" cy="216" r="9" fill="var(--paper)" />
      </g>
      <g fontFamily="Roboto, sans-serif" fontSize="14" fontWeight="700">
        <text x="76" y="58" fill="var(--ink)">React · TypeScript surfaces</text>
        <text x="44" y="140" fill="var(--ink)">Node.js</text>
        <text x="204" y="140" fill="var(--ink)">Laravel · APIs</text>
        <text x="76" y="222" fill="var(--paper)">CI/CD · review · deploy</text>
      </g>
      <text x="30" y="278" fontFamily="Roboto Mono, monospace" fontSize="11" fill="var(--ink)">FIG. 02 — ADER PLATFORM</text>
    </svg>
  );
}

export function CommerceIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 360 300" width="100%" height="auto" role="img" aria-label="Flat vector diagram of a Shopify app connected to storefront, webhooks and services">
      <g stroke="var(--paper)" strokeWidth="3">
        <circle cx="180" cy="150" r="58" fill="var(--accent)" />
        <rect x="24" y="30" width="112" height="52" rx="16" fill="var(--tertiary)" />
        <rect x="224" y="30" width="112" height="52" rx="16" fill="var(--paper)" />
        <rect x="24" y="218" width="112" height="52" rx="16" fill="var(--paper)" />
        <rect x="224" y="218" width="112" height="52" rx="16" fill="var(--secondary)" />
        <path d="M136 60 L154.5 98" fill="none" />
        <path d="M224 60 L205.5 98" fill="none" />
        <path d="M136 244 L155.4 202.5" fill="none" />
        <path d="M224 244 L204.6 202.5" fill="none" />
      </g>
      <g fontFamily="Roboto, sans-serif" fontSize="13" fontWeight="700">
        <text x="80" y="62" textAnchor="middle" fill="var(--ink)">Themes</text>
        <text x="280" y="62" textAnchor="middle" fill="var(--ink)">Webhooks</text>
        <text x="80" y="250" textAnchor="middle" fill="var(--ink)">Merchant SaaS</text>
        <text x="280" y="250" textAnchor="middle" fill="var(--ink)">React Native</text>
        <text x="180" y="146" textAnchor="middle" fill="var(--paper)" fontSize="15">Shopify</text>
        <text x="180" y="166" textAnchor="middle" fill="var(--paper)" fontSize="15">app core</text>
      </g>
    </svg>
  );
}

export function ApiIcon({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 120 70" width="120" height="70" role="img" aria-label="Flat vector icon: API endpoints">
      <g stroke="var(--ink)" strokeWidth="3">
        <rect x="4" y="10" width="42" height="22" rx="11" fill="var(--tertiary)" />
        <rect x="4" y="40" width="42" height="22" rx="11" fill="var(--paper)" />
        <circle cx="94" cy="36" r="20" fill="var(--accent)" />
        <path d="M46 21 L74 30" fill="none" />
        <path d="M46 51 L74 42" fill="none" />
      </g>
    </svg>
  );
}

export function RealtimeIcon({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 120 70" width="120" height="70" role="img" aria-label="Flat vector icon: three clients on one realtime backend">
      <g stroke="var(--ink)" strokeWidth="3">
        <rect x="42" y="6" width="36" height="24" rx="12" fill="var(--secondary)" />
        <rect x="6" y="42" width="32" height="22" rx="11" fill="var(--paper)" />
        <rect x="44" y="42" width="32" height="22" rx="11" fill="var(--tertiary)" />
        <rect x="82" y="42" width="32" height="22" rx="11" fill="var(--paper)" />
        <path d="M60 30 L22 42" fill="none" />
        <path d="M60 30 L60 42" fill="none" />
        <path d="M60 30 L98 42" fill="none" />
      </g>
    </svg>
  );
}

export function PlatformIcon({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 120 70" width="120" height="70" role="img" aria-label="Flat vector icon: client platform and database">
      <g stroke="var(--ink)" strokeWidth="3">
        <rect x="8" y="12" width="48" height="46" rx="16" fill="var(--accent)" />
        <ellipse cx="90" cy="22" rx="22" ry="9" fill="var(--paper)" />
        <path d="M68 22 L68 50" fill="none" />
        <path d="M112 22 L112 50" fill="none" />
        <ellipse cx="90" cy="50" rx="22" ry="9" fill="var(--tertiary)" />
        <path d="M56 35 L68 35" fill="none" />
      </g>
    </svg>
  );
}
