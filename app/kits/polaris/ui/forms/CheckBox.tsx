import { useUpdateState } from "@/commons/utils/state/hooks/useUpdateState";
import { useCallback, useEffect, useState } from "react";

export type CustomCheckboxPropsType = {
  label: string;
  labelHidden?: boolean;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  helpText?: string;
  error?: string | boolean;
  isChecked?: (value: boolean) => void;
  stateKey?: string;
  onChange?: (value: boolean) => void;
};

// Compatibility alias
export type CustomCheckboxProps = CustomCheckboxPropsType;

export function CheckBox({
  label,
  checked: checkedProp = false,
  disabled,
  id: idProp,
  name,
  value,
  helpText,
  error,
  isChecked,
  stateKey,
  onChange,
}: CustomCheckboxPropsType): JSX.Element {
  const [checked, setChecked] = useState(checkedProp);
  const updateState = useUpdateState();

  useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const handleChange = useCallback(
    (newChecked: boolean) => {
      setChecked(newChecked);
      if (stateKey) updateState(stateKey, newChecked);
      if (isChecked) isChecked(newChecked);
      if (onChange) onChange(newChecked);
    },
    [stateKey, updateState, isChecked, onChange]
  );

  return (
    <div className="space-y-1">
      <s-checkbox
        id={idProp}
        label={label}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e: any) => handleChange(e.target.checked)}
      />
      {helpText && <p className="text-xs text-muted-foreground ml-6">{helpText}</p>}
      {error && typeof error === "string" && (
        <p className="text-xs text-destructive ml-6">{error}</p>
      )}
    </div>
  );
}

export default CheckBox;
