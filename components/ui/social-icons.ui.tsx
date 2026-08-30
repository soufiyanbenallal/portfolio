import React from "react";

type IconProps = {
  className?: string;
  size?: number;
};

export const Icons = {
  ArrowUpRight: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ArrowLeft: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Minus: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Close: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Star: ({ className = "w-3.5 h-3.5" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Quote: ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  ),
  Calendar: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Phone: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Lightning: ({ className = "w-4 h-4" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Copy: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  // Social icons
  X: ({ className = "w-4 h-4" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: ({ className = "w-4 h-4" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  Dribbble: ({ className = "w-4 h-4" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.169 11.233c-.322-.053-2.658-.415-5.187.525-.054-.123-.109-.247-.167-.372-.68-1.464-1.477-2.859-2.375-4.148 3.51 1.258 6.554 2.825 7.729 3.995zm-9.351-9.208c1.947 2.531 3.25 5.258 3.823 7.842-2.915-1.026-6.195-.824-9.336-.073 1.109-4.225 3.393-6.903 5.513-7.769zm-7.697 2.083c2.977-.665 6.136-.838 8.948.163-.529 1.488-1.157 2.946-1.874 4.335-4.48-1.517-8.892-1.391-9.743-1.365.498-1.196 1.442-2.28 2.669-3.133zm-3.087 5.767c.725-.021 5.35-.117 10.158 1.547-.123.32-.249.638-.378.955-4.707 1.597-9.458 5.795-10.742 8.784-1.252-3.111-1.059-8.15.962-11.286zm4.846 11.968c1.191-2.646 5.385-6.385 9.771-7.859.988 2.477 1.498 5.176 1.51 7.917-3.663 1.127-7.855.938-11.281-.058zm13.149-1.884c-.033-2.482-.507-4.945-1.408-7.228 2.222-.846 4.254-.537 4.604-.476-.239 3.018-1.472 5.728-3.196 7.704z" />
    </svg>
  ),
  Behance: ({ className = "w-4 h-4" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.029 0-5.5-2.261-5.5-5.5 0-3.212 2.457-5.5 5.5-5.5 3.326 0 5.143 2.502 4.908 5.726h-8.084c.168 1.706 1.478 2.822 3.176 2.822 1.447 0 2.247-.639 2.766-1.548h1.96zm-4.726-5.83c-1.471 0-2.493.993-2.734 2.296h5.362c-.114-1.328-1.122-2.296-2.628-2.296zm-12.726 6.83h-6.274v-12h6.274c3.084 0 4.726 1.516 4.726 3.616 0 1.258-.646 2.378-1.782 2.943 1.534.614 2.056 1.942 2.056 3.256 0 2.203-1.636 3.185-5 3.185zm-3.774-7.215h3.407c1.332 0 2.117-.557 2.117-1.583 0-1.077-.852-1.545-2.193-1.545h-3.331v3.128zm0 5.253h3.582c1.475 0 2.418-.636 2.418-1.802 0-1.19-.949-1.783-2.494-1.783h-3.506v3.585z" />
    </svg>
  ),
  Instagram: ({ className = "w-4 h-4" }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  GitHub: ({ className = "w-4 h-4" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  Figma: ({ className = "w-4 h-4" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-6a3 3 0 0 1 3-3h6a3 3 0 0 1 0 6H9a3 3 0 0 1-3-3zm0 6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm3 3a3 3 0 0 1 3 3v3a3 3 0 0 1-3-3h-3a3 3 0 0 1 3-3zm6-3h3a3 3 0 0 1 0 6h-3v-6z" />
    </svg>
  ),
  Framer: ({ className = "w-4 h-4" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  Stripe: ({ className = "w-10 h-5" }: IconProps) => (
    <svg className={className} viewBox="0 0 60 25" fill="currentColor">
      <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v2.74c-1.17.53-2.73.86-4.57.86-4.14 0-6.19-2.58-6.19-6.42 0-3.69 2.05-6.38 5.73-6.38 3.75 0 5.84 2.69 5.84 6.38v1.22zm-3.39-2.14c0-1.46-.86-2.33-2.45-2.33-1.48 0-2.31.87-2.5 2.33h4.95zm-13.62-5.1h3.35v12.28h-3.35V7.04zm1.68-4.76a1.97 1.97 0 0 1 2.04 1.98c0 1.1-.92 1.98-2.04 1.98a1.98 1.98 0 0 1-2.04-1.98c0-1.09.92-1.98 2.04-1.98zm-11.23 7.8c0-2.47 1.83-3.26 3.63-3.26 1.09 0 2.09.25 2.87.66v2.97c-.78-.45-1.68-.69-2.52-.69-1.03 0-1.58.39-1.58.98 0 1.86 5.6 1.1 5.6 5.25 0 2.66-2.03 3.69-4.22 3.69-1.29 0-2.5-.35-3.35-.86v-3.05c.98.57 2.07.89 3.03.89 1.13 0 1.76-.39 1.76-1.04 0-2.01-5.22-1.25-5.22-5.54zm-9.35 2.06c0-1.39.84-2.17 2.19-2.17.84 0 1.54.27 2.09.68v7.05c-.59.39-1.37.66-2.15.66-1.58 0-2.13-.86-2.13-2.42V9.04zm-3.38 0h-2.19V7.04h2.19V3.5h3.38v3.54h3.69v2h-3.69v5.92c0 .92.35 1.25 1.09 1.25.47 0 .9-.08 1.23-.21v2.36c-.57.25-1.33.39-2.19.39-2.34 0-3.51-1.13-3.51-3.36V9.04z" />
    </svg>
  ),
};
