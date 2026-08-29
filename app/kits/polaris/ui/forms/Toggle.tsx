import { useState, useEffect } from "react";
import { useUpdateState } from "~/commons/utils/state/hooks/useUpdateState";

export type TogglePropsType = {
  stateKey?: string;
  id?: string | number;
  onChange?: (isChecked: boolean, id?: string | number) => void;
  active: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
};

// Compatibility alias
export type ToggleProps = TogglePropsType;

export const Toggle = ({
  stateKey,
  id,
  onChange,
  active,
  disabled = false,
}: TogglePropsType): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(active);
  const updateState = useUpdateState();

  useEffect(() => {
    setChecked(active);
  }, [active]);

  const handleChecked = (value: boolean) => {
    setChecked(value);
    if (stateKey) updateState(stateKey, value);
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
