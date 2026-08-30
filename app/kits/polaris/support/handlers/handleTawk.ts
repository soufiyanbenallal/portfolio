import { useEffect, useRef } from "react";

export type UseTawkPropsType = {
  appUrl?: string;
  isTawkActive?: boolean;
};

export const useTawk = ({ appUrl, isTawkActive }: UseTawkPropsType): void => {
  const hasToggled = useRef(false);

  useEffect(() => {
    if (!appUrl || typeof window === "undefined") return;

    const tawkApi = (window as any).Tawk_API || {};

    if (tawkApi.toggle && isTawkActive && !hasToggled.current) {
      tawkApi.toggle();
      hasToggled.current = true;
    } else if (!isTawkActive && hasToggled.current && tawkApi.toggle) {
      tawkApi.toggle();
      hasToggled.current = false;
    }
  }, [appUrl, isTawkActive]);
};

export default useTawk;
