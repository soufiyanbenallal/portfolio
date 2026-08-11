import styles from "./flat-3d.module.css";

type Flat3DFallbackProps = {
  className?: string;
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function Flat3DFallback({ className }: Flat3DFallbackProps) {
  return (
    <div
      className={joinClassNames(styles.fallback, className)}
      aria-hidden="true"
      data-flat-3d="fallback"
    >
      <svg
        viewBox="0 0 760 590"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        role="presentation"
      >
        <path
          d="M95 403 384 235l282 162-291 169L95 403Z"
          fill="#FFF8ED"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m95 403 280 163v20L95 423v-20Z"
          fill="#21B7C5"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m375 566 291-169v20L375 586v-20Z"
          fill="#6E7CF6"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        <path
          d="m148 172 224-126 226 130-225 130-225-134Z"
          fill="#FFF8ED"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m148 172 225 134v142L148 316V172Z"
          fill="#F3EBDD"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m373 306 225-130v142L373 448V306Z"
          fill="#6E7CF6"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m176 204 169 99M176 245l169 98M402 323l167-97M402 365l167-97"
          stroke="#21B7C5"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="11 12"
        />

        <path
          d="m154 374 212-122 142 81-214 123-140-82Z"
          fill="#FFC847"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m154 374 140 82v18l-140-82v-18Z"
          fill="#E9A91B"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        <path
          d="m228 258 105-61 102 59-105 61-102-59Z"
          fill="#171710"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m246 258 87-50 84 48-87 50-84-48Z"
          fill="#E93665"
        />
        <path d="m330 317 19 11v45l-19 11-20-11v-45l20-11Z" fill="#21B7C5" stroke="#171710" strokeWidth="7" />

        <path
          d="m452 350 91-53 90 52-91 54-90-53Z"
          fill="#FF7B59"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m452 350 90 53v92l-90-53v-92Z"
          fill="#E93665"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m542 403 91-54v92l-91 54v-92Z"
          fill="#6E7CF6"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="m486 308 56-32 55 32-55 33-56-33Z"
          fill="#7FD47A"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        <circle cx="600" cy="135" r="44" fill="#FFC847" stroke="#171710" strokeWidth="8" />
        <circle cx="600" cy="135" r="70" stroke="#E93665" strokeWidth="10" strokeDasharray="20 15" />
        <path
          d="m127 158 33-52 34 52-34 52-33-52Z"
          fill="#21B7C5"
          stroke="#171710"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path d="m104 83 23-13M628 69l19-27M668 102l35-7" stroke="#171710" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

