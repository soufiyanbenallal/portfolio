import { useId, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { cn } from "../../utils";
import styles from "./ui.module.css";

export function Card({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div style={style} className={cn(styles.card, className)}>
      {children}
    </div>
  );
}

export type ButtonVariantType = "primary" | "secondary" | "ghost";

export type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariantType;
};

const buttonVariantClassMap: Record<ButtonVariantType, string> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  ghost: styles.buttonGhost,
};

export function Button({ variant = "primary", className, children, ...rest }: ButtonPropsType) {
  return (
    <button className={cn(styles.button, buttonVariantClassMap[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export type BadgeToneType = "green" | "gray" | "amber";

export function Badge({ tone = "green", children }: { tone?: BadgeToneType; children: ReactNode }) {
  const toneClassMap: Record<BadgeToneType, string> = {
    green: styles.badgeGreen,
    gray: styles.badgeGray,
    amber: styles.badgeAmber,
  };
  return <span className={cn(styles.badge, toneClassMap[tone])}>{children}</span>;
}

export {
  IconTile,
  IconTitle,
  type IconTilePropsType,
  type IconTileToneType,
  type IconTileBorderRadiusType,
  type IconTileSizeType,
} from "@/components/ui/IconTile";

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  const id = useId();
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        styles.toggleSwitch,
        checked ? styles.toggleSwitchChecked : styles.toggleSwitchUnchecked
      )}
    >
      <span
        className={cn(
          styles.toggleThumb,
          checked ? styles.toggleThumbChecked : styles.toggleThumbUnchecked
        )}
      />
    </button>
  );
}
