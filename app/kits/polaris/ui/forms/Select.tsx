import { useCallback, useEffect, useState, type ReactNode } from "react";

export type SelectOptionType = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type CustomSelectPropsType = {
  options: SelectOptionType[];
  label?: string;
  labelHidden?: boolean;
  disabled?: boolean;
  helpText?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  value?: string;
  error?: string | boolean;
  required?: boolean;
  stateKey?: string;
  onChange?: (value: string) => void;
};

export type SelectProps = CustomSelectPropsType;

export function Select({
  options,
  label,
  disabled,
  helpText,
  placeholder,
  id: idProp,
  name,
  value: initialValue = "",
  error,
  required,
  onChange,
}: CustomSelectPropsType): ReactNode {
  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  const handleSelectChange = useCallback(
    (value: string) => {
      setSelected(value);
      if (onChange) onChange(value);
    },
    [onChange]
  );

  return (
    <s-stack direction="block" gap="small-200">
      <s-select
        id={idProp}
        name={name}
        label={label}
        value={selected}
        disabled={disabled}
        required={required}
        onChange={(e: any) => handleSelectChange(e.target.value)}
      >
        {placeholder && (
          <s-option value="" disabled>
            {placeholder}
          </s-option>
        )}
        {options.map((opt) => (
          <s-option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </s-option>
        ))}
      </s-select>
      {helpText && <s-text tone="neutral">{helpText}</s-text>}
      {error && typeof error === "string" && <s-text tone="critical">{error}</s-text>}
    </s-stack>
  );
}

export default Select;
