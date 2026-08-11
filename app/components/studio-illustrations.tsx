import type { SVGProps } from "react";

const studioColor = {
  ink: "var(--studio-ink, #171710)",
  paper: "var(--studio-paper, #FFF8ED)",
  pink: "var(--studio-pink, #E93665)",
  yellow: "var(--studio-yellow, #FFC847)",
  aqua: "var(--studio-aqua, #21B7C5)",
  blue: "var(--studio-blue, #6E7CF6)",
  leaf: "var(--studio-leaf, #7FD47A)",
  coral: "var(--studio-coral, #FF7B59)",
} as const;

type StudioIllustrationProps = Omit<
  SVGProps<SVGSVGElement>,
  "aria-hidden" | "aria-label" | "role" | "title"
> & {
  decorative?: boolean;
  title?: string;
};

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export function StudioHeroIllustration({
  className,
  decorative = false,
  title = "A product studio scene transforming a hand-drawn blueprint into a colorful shipped interface",
  ...props
}: StudioIllustrationProps) {
  return (
    <svg
      {...props}
      className={classes("studio-hero-art", className)}
      viewBox="0 0 720 600"
      width="100%"
      height="auto"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <g stroke={studioColor.ink} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="18" width="684" height="564" rx="8" fill={studioColor.paper} />

        <g className="studio-hero-art__blueprint-grid" stroke={studioColor.blue} strokeWidth="1" opacity="0.22">
          <path d="M48 18V582M78 18V582M108 18V582M138 18V582M168 18V582M198 18V582M228 18V582M258 18V582M288 18V582M318 18V582M348 18V582" />
          <path d="M18 48H360M18 78H360M18 108H360M18 138H360M18 168H360M18 198H360M18 228H360M18 258H360M18 288H360M18 318H360M18 348H360M18 378H360M18 408H360M18 438H360M18 468H360M18 498H360M18 528H360M18 558H360" />
        </g>

        <path d="M360 18V582" strokeDasharray="7 8" />

        <g className="studio-hero-art__sun">
          <circle cx="566" cy="122" r="70" fill={studioColor.yellow} />
          <path d="M566 34V18M566 226v-16M654 122h18M460 122h18M628 60l13-13M491 197l13-13M628 184l13 13M491 47l13 13" />
        </g>

        <g className="studio-hero-art__plan-notes" fill="none" stroke={studioColor.blue} strokeWidth="2">
          <path d="M52 94H318M52 86v16M318 86v16" />
          <path d="M84 128V338M76 128h16M76 338h16" />
          <path d="M112 144h188v148H112z" strokeDasharray="9 7" />
          <path d="M128 162h156v18H128M128 196h88v74h-88zM232 196h52v32h-52zM232 242h52v28h-52z" strokeDasharray="6 6" />
          <circle cx="112" cy="144" r="5" fill={studioColor.paper} />
          <circle cx="300" cy="144" r="5" fill={studioColor.paper} />
          <circle cx="112" cy="292" r="5" fill={studioColor.paper} />
          <circle cx="300" cy="292" r="5" fill={studioColor.paper} />
        </g>

        <g className="studio-hero-art__wire-cube" fill={studioColor.paper} strokeDasharray="7 6">
          <path d="m58 410 72-42 72 42-72 42z" />
          <path d="m58 410 72 42v82l-72-42zM202 410l-72 42v82l72-42z" />
          <path d="M130 452v82" />
          <path d="m82 424 48-28 48 28-48 28z" />
        </g>

        <g className="studio-hero-art__finished-window">
          <rect x="392" y="142" width="262" height="194" rx="7" fill={studioColor.paper} />
          <path d="M392 177h262" fill="none" />
          <circle cx="412" cy="160" r="5" fill={studioColor.pink} strokeWidth="2.5" />
          <circle cx="430" cy="160" r="5" fill={studioColor.yellow} strokeWidth="2.5" />
          <circle cx="448" cy="160" r="5" fill={studioColor.aqua} strokeWidth="2.5" />
          <rect x="414" y="198" width="92" height="116" rx="3" fill={studioColor.pink} />
          <rect x="526" y="198" width="106" height="48" rx="3" fill={studioColor.aqua} />
          <rect x="526" y="264" width="48" height="50" rx="3" fill={studioColor.yellow} />
          <rect x="590" y="264" width="42" height="50" rx="3" fill={studioColor.leaf} />
          <path d="M432 219h56M432 236h38M432 281h52M544 219h68M544 285h14M608 284h7" fill="none" strokeWidth="3" />
        </g>

        <g className="studio-hero-art__finished-block">
          <path d="m370 412 92-52 92 52-92 54z" fill={studioColor.yellow} />
          <path d="m370 412 92 54v92l-92-54z" fill={studioColor.coral} />
          <path d="m554 412-92 54v92l92-54z" fill={studioColor.pink} />
          <path d="m412 411 50-29 50 29-50 29z" fill={studioColor.paper} />
          <path d="M462 440v118" fill="none" />
        </g>

        <g className="studio-hero-art__floating-block studio-hero-art__floating-block--blue">
          <path d="m568 386 44-25 44 25-44 26z" fill={studioColor.blue} />
          <path d="m568 386 44 26v42l-44-26z" fill={studioColor.aqua} />
          <path d="m656 386-44 26v42l44-26z" fill={studioColor.leaf} />
        </g>

        <g className="studio-hero-art__bridge">
          <path d="M198 411c65-26 109-27 172 1" fill="none" strokeDasharray="9 8" />
          <path d="m350 399 20 13-23 7" fill={studioColor.paper} />
        </g>

        <g className="studio-hero-art__cursor">
          <path d="m333 237 34 76-24-11-13 25-14-8 14-25-25-5z" fill={studioColor.ink} />
          <path d="m339 244 20 54-17-8-12 22-6-3 12-22-18-3z" fill={studioColor.paper} stroke="none" />
        </g>

        <g className="studio-hero-art__spark" fill={studioColor.pink}>
          <path d="m649 70 7 17 17 7-17 7-7 17-7-17-17-7 17-7z" />
          <path d="m302 366 5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill={studioColor.aqua} />
          <circle cx="665" cy="344" r="7" fill={studioColor.coral} />
        </g>

        <path d="M48 58h96" strokeWidth="7" />
        <path d="M576 546h76" strokeWidth="7" />
      </g>

      <g
        fill={studioColor.ink}
        fontFamily="var(--font-roboto-mono, 'Roboto Mono'), monospace"
        fontWeight="700"
        letterSpacing="2"
      >
        <text x="48" y="77" fontSize="12">BLUEPRINT / 01</text>
        <text x="388" y="77" fontSize="12">SHIPPED / 02</text>
        <text x="184" y="118" textAnchor="middle" fontSize="10" fill={studioColor.blue}>266 UNITS</text>
        <text x="66" y="237" textAnchor="middle" transform="rotate(-90 66 237)" fontSize="10" fill={studioColor.blue}>210 UNITS</text>
        <text x="48" y="562" fontSize="10">SKETCH → SYSTEM → SIGNAL</text>
        <text x="652" y="562" textAnchor="end" fontSize="10">SB / STUDIO</text>
      </g>
    </svg>
  );
}

export function CommerceCaseMotif({
  className,
  decorative = true,
  title = "A storefront blueprint becoming a connected commerce package",
  ...props
}: StudioIllustrationProps) {
  return (
    <svg
      {...props}
      className={classes("studio-case-motif studio-case-motif--commerce", className)}
      viewBox="0 0 240 180"
      width="100%"
      height="auto"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <g stroke={studioColor.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path className="studio-case-motif__orbit" d="M25 130C54 160 190 164 218 95" fill="none" strokeDasharray="7 7" />
        <g className="studio-case-motif__sketch" fill={studioColor.paper} strokeDasharray="6 5">
          <path d="M19 49h90v86H19zM13 49h102L104 24H25z" />
          <path d="M39 77h50v58H39zM19 49h90M42 24v25M72 24v25M99 34v15" />
        </g>
        <g className="studio-case-motif__product">
          <path d="m125 72 45-26 45 26-45 27z" fill={studioColor.yellow} />
          <path d="m125 72 45 27v52l-45-27z" fill={studioColor.coral} />
          <path d="m215 72-45 27v52l45-27z" fill={studioColor.pink} />
          <path d="M170 99v52M148 59l45 26" fill="none" />
        </g>
        <circle className="studio-case-motif__node studio-case-motif__node--a" cx="32" cy="151" r="8" fill={studioColor.aqua} />
        <circle className="studio-case-motif__node studio-case-motif__node--b" cx="216" cy="94" r="8" fill={studioColor.blue} />
      </g>
    </svg>
  );
}

export function PlatformCaseMotif({
  className,
  decorative = true,
  title = "A wireframe interface feeding a colorful product system",
  ...props
}: StudioIllustrationProps) {
  return (
    <svg
      {...props}
      className={classes("studio-case-motif studio-case-motif--platform", className)}
      viewBox="0 0 240 180"
      width="100%"
      height="auto"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <g stroke={studioColor.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g className="studio-case-motif__sketch" fill={studioColor.paper} strokeDasharray="6 5">
          <rect x="17" y="25" width="105" height="98" rx="4" />
          <path d="M17 49h105M30 38h1M43 38h1M56 38h1M32 66h72M32 80h47M32 96h31" />
        </g>
        <path className="studio-case-motif__flow" d="M79 143c35 27 65-22 82-43" fill="none" strokeDasharray="8 7" />
        <path d="m150 105 11-5-1 12" fill={studioColor.paper} />
        <g className="studio-case-motif__product">
          <rect x="143" y="36" width="80" height="104" rx="4" fill={studioColor.blue} />
          <rect x="158" y="53" width="50" height="28" rx="2" fill={studioColor.yellow} />
          <rect x="158" y="94" width="21" height="29" rx="2" fill={studioColor.aqua} />
          <rect x="187" y="94" width="21" height="29" rx="2" fill={studioColor.leaf} />
          <path d="M167 67h32M167 107h3M196 107h3" fill="none" />
        </g>
        <path className="studio-case-motif__spark" d="m202 19 5 11 11 5-11 5-5 11-5-11-11-5 11-5z" fill={studioColor.pink} />
      </g>
    </svg>
  );
}

export function RealtimeCaseMotif({
  className,
  decorative = true,
  title = "Three product surfaces connected through one live system",
  ...props
}: StudioIllustrationProps) {
  return (
    <svg
      {...props}
      className={classes("studio-case-motif studio-case-motif--realtime", className)}
      viewBox="0 0 240 180"
      width="100%"
      height="auto"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <g stroke={studioColor.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g className="studio-case-motif__signal" fill="none" strokeDasharray="7 6">
          <path d="M120 79 47 125M120 79l73 46M120 79V31" />
          <circle cx="120" cy="79" r="36" fill={studioColor.yellow} strokeDasharray="0" />
        </g>
        <g className="studio-case-motif__node studio-case-motif__node--a">
          <rect x="18" y="119" width="60" height="42" rx="4" fill={studioColor.aqua} />
          <path d="M29 133h38M29 145h24" />
        </g>
        <g className="studio-case-motif__node studio-case-motif__node--b">
          <rect x="162" y="119" width="60" height="42" rx="4" fill={studioColor.pink} />
          <path d="M173 133h38M173 145h24" />
        </g>
        <g className="studio-case-motif__node studio-case-motif__node--c">
          <rect x="92" y="11" width="56" height="37" rx="4" fill={studioColor.leaf} />
          <path d="M103 25h34M103 35h19" />
        </g>
        <path d="M106 72h28M120 58v42" />
        <circle className="studio-case-motif__pulse" cx="120" cy="79" r="9" fill={studioColor.coral} />
      </g>
    </svg>
  );
}

export function StudioSignalField({
  className,
  decorative = true,
  title = "Abstract signal paths and product system nodes",
  ...props
}: StudioIllustrationProps) {
  return (
    <svg
      {...props}
      className={classes("studio-signal-field", className)}
      viewBox="0 0 1440 900"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <g fill="none" stroke={studioColor.ink} strokeLinecap="round" strokeLinejoin="round">
        <g className="studio-signal-field__track" opacity="0.16" strokeWidth="2">
          <path d="M-50 160C215 16 365 306 608 162S1035 36 1490 220" />
          <path d="M-80 612C202 416 401 756 678 589s476-160 846 25" />
          <path d="M132 950C16 674 312 552 515 708s390 124 484-74 318-187 512-54" />
        </g>

        <g className="studio-signal-field__dash" strokeWidth="3" strokeDasharray="10 15" opacity="0.48">
          <path d="M-24 252C272 104 444 414 718 254s475-72 768 16" stroke={studioColor.blue} />
          <path d="M-20 704C265 527 508 847 796 664s497-125 721 31" stroke={studioColor.pink} />
        </g>

        <g className="studio-signal-field__orbit studio-signal-field__orbit--left" strokeWidth="3" opacity="0.42">
          <ellipse cx="226" cy="404" rx="144" ry="72" transform="rotate(-18 226 404)" stroke={studioColor.aqua} />
          <ellipse cx="226" cy="404" rx="100" ry="45" transform="rotate(28 226 404)" stroke={studioColor.yellow} strokeDasharray="7 10" />
        </g>
        <g className="studio-signal-field__orbit studio-signal-field__orbit--right" strokeWidth="3" opacity="0.38">
          <ellipse cx="1190" cy="425" rx="190" ry="83" transform="rotate(19 1190 425)" stroke={studioColor.coral} />
          <ellipse cx="1190" cy="425" rx="120" ry="52" transform="rotate(-24 1190 425)" stroke={studioColor.leaf} strokeDasharray="8 11" />
        </g>

        <g className="studio-signal-field__float studio-signal-field__float--a" strokeWidth="3">
          <path d="m73 95 40-22 40 22-40 23z" fill={studioColor.yellow} />
          <path d="m73 95 40 23v39l-40-23z" fill={studioColor.coral} />
          <path d="m153 95-40 23v39l40-23z" fill={studioColor.pink} />
        </g>
        <g className="studio-signal-field__float studio-signal-field__float--b" strokeWidth="3">
          <path d="m1294 690 48-27 48 27-48 28z" fill={studioColor.blue} />
          <path d="m1294 690 48 28v44l-48-28z" fill={studioColor.aqua} />
          <path d="m1390 690-48 28v44l48-28z" fill={studioColor.leaf} />
        </g>

        <g className="studio-signal-field__node" strokeWidth="3">
          <circle cx="391" cy="103" r="10" fill={studioColor.pink} />
          <circle cx="715" cy="255" r="12" fill={studioColor.yellow} />
          <circle cx="922" cy="716" r="10" fill={studioColor.aqua} />
          <circle cx="1135" cy="236" r="8" fill={studioColor.leaf} />
          <circle cx="226" cy="404" r="9" fill={studioColor.coral} />
          <circle cx="1190" cy="425" r="9" fill={studioColor.blue} />
        </g>

        <g className="studio-signal-field__spark" strokeWidth="3">
          <path d="m521 77 7 17 17 7-17 7-7 17-7-17-17-7 17-7z" fill={studioColor.yellow} />
          <path d="m1046 782 6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill={studioColor.pink} />
          <path d="m1410 119 5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill={studioColor.aqua} />
        </g>
      </g>
    </svg>
  );
}
