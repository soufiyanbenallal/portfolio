import { useCallback, useEffect, useState, type ReactNode } from "react";

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
  onChange,
}: CustomCheckboxPropsType): ReactNode {
  const [checked, setChecked] = useState(checkedProp);

  useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const handleChange = useCallback(
    (newChecked: boolean) => {
      setChecked(newChecked);
      if (isChecked) isChecked(newChecked);
      if (onChange) onChange(newChecked);
    },
    [isChecked, onChange]
  );

  return (
    <s-stack direction="block" gap="small-200">
      <s-checkbox
        id={idProp}
        label={label}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e: any) => handleChange(e.target.checked)}
      />
      {helpText && <s-text tone="neutral">{helpText}</s-text>}
      {error && typeof error === "string" && (
        <s-text tone="critical">{error}</s-text>
      )}
    </s-stack>
  );
}

export default CheckBox;
