import { useState, useEffect, type ReactNode } from "react";

export type TogglePropsType = {
  stateKey?: string;
  id?: string | number;
  onChange?: (isChecked: boolean, id?: string | number) => void;
  active: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
};

export const Toggle = ({ id, onChange, active, disabled = false }: TogglePropsType): ReactNode => {
  const [checked, setChecked] = useState<boolean>(active);

  useEffect(() => {
    setChecked(active);
  }, [active]);

  const handleChecked = (value: boolean) => {
    setChecked(value);
    if (onChange) {
      onChange(value, id);
    }
  };

  return (
    <s-switch
      checked={checked}
      disabled={disabled}
      onChange={(e: any) => handleChecked(e.target.checked)}
    />
  );
};

export default Toggle;
