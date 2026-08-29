import { useCallback, useEffect, useState } from "react";
import { useUpdateState } from "~/commons/utils/state/hooks/useUpdateState";

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

// Compatibility alias
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
  stateKey,
  onChange,
}: CustomSelectPropsType): JSX.Element {
  const [selected, setSelected] = useState(initialValue);
  const updateState = useUpdateState();

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  const handleSelectChange = useCallback(
    (value: string) => {
      setSelected(value);
      if (stateKey) updateState(stateKey, value);
      if (onChange) onChange(value);
    },
    [stateKey, updateState, onChange]
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-semibold text-foreground block">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <select
        id={idProp}
        name={name}
        value={selected}
        disabled={disabled}
        onChange={(e) => handleSelectChange(e.target.value)}
        className="w-full h-9 rounded-lg border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
      {error && typeof error === "string" && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default Select;
