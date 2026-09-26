import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's built-in scale. Without this, custom
 * type utilities like `text-label` are read as *text colours*, so
 * `cn("text-label", "text-gray-50")` would silently drop the label style.
 * Registering them as font sizes (and the elevation utilities as shadows)
 * lets them merge like any first-party class.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2-lg",
            "h2-sm",
            "h3-lg",
            "h3-sm",
            "body-xl",
            "body-l",
            "body-m",
            "body-s",
            "price-lg",
            "label",
          ],
        },
      ],
      shadow: [{ "card-shadow": ["", "hover", "3d"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
