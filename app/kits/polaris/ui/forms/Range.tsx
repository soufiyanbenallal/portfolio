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

// Compatibility alias
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
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold text-foreground">
          <span>{label}</span>
          {output && <span className="text-muted-foreground">{rangeValue}</span>}
        </div>
      )}
      <div className="flex items-center gap-2">
        {prefix && <span className="text-xs text-muted-foreground">{prefix}</span>}
        <input
          type="range"
          id={idProp}
          min={min}
          max={max}
          step={step}
          value={rangeValue}
          disabled={disabled}
          onChange={(e) => handleRangeSliderChange(Number(e.target.value))}
          className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
        />
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
      {error && typeof error === "string" && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default Range;
