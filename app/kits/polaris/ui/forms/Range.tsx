import { useCallback, useEffect, useState, type ReactNode } from "react";

export type CustomRangePropsType = {
  label?: string;
  labelHidden?: boolean;
  id?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  output?: boolean;
  helpText?: string;
  error?: string | boolean;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  stateKey?: string;
  onChange?: (value: number) => void;
};

export type RangeProps = CustomRangePropsType;

export function Range({
  label,
  id: idProp,
  value: initialValue = 0,
  min = 0,
  max = 100,
  step = 1,
  output = true,
  helpText,
  error,
  disabled,
  prefix,
  suffix,
  onChange,
}: CustomRangePropsType): ReactNode {
  const [rangeValue, setRangeValue] = useState<number>(initialValue);

  useEffect(() => {
    setRangeValue(initialValue);
  }, [initialValue]);

  const handleRangeSliderChange = useCallback(
    (value: number) => {
      setRangeValue(value);
      if (onChange) onChange(value);
    },
    [onChange]
  );

  return (
    <s-stack direction="block" gap="small-200">
      {label && (
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-text type="strong">{label}</s-text>
          {output && <s-text tone="neutral">{rangeValue}</s-text>}
        </s-stack>
      )}
      <s-stack direction="inline" gap="small-200" alignItems="center">
        {prefix && <s-text tone="neutral">{prefix}</s-text>}
        <input
          type="range"
          id={idProp}
          min={min}
          max={max}
          step={step}
          value={rangeValue}
          disabled={disabled}
          onChange={(e) => handleRangeSliderChange(Number(e.target.value))}
          style={{ width: "100%", cursor: "pointer" }}
        />
        {suffix && <s-text tone="neutral">{suffix}</s-text>}
      </s-stack>
      {helpText && <s-text tone="neutral">{helpText}</s-text>}
      {error && typeof error === "string" && <s-text tone="critical">{error}</s-text>}
    </s-stack>
  );
}

export default Range;
