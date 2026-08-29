import { useCallback, useEffect, useState, type ReactNode } from "react";

export type CustomInputPropsType = {
  label?: string;
  labelHidden?: boolean;
  value?: string | string[];
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean | number;
  error?: string | boolean | Error;
  type?: string;
  name?: string;
  id?: string;
  tag?: boolean;
  required?: boolean;
  autoComplete?: string;
  onInputChange?: (value: string | string[]) => void;
  [key: string]: unknown;
};

// Compatibility alias
export type InputProps = CustomInputPropsType;

export function Input({
  value: initialValue,
  placeholder,
  helpText,
  label,
  disabled,
  readOnly,
  multiline,
  error: externalError,
  type = "text",
  name,
  id: idProp,
  tag = false,
  required,
  onInputChange,
}: CustomInputPropsType): ReactNode {
  const [value, setValue] = useState<string>(
    Array.isArray(initialValue) ? initialValue.join(", ") : ((initialValue as string) ?? "")
  );
  const [error, setError] = useState<string | undefined>(
    typeof externalError === "string" ? externalError : undefined
  );

  useEffect(() => {
    if (tag && Array.isArray(initialValue)) {
      setValue(initialValue.join(", "));
    } else {
      setValue((initialValue as string) ?? "");
    }
  }, [initialValue, tag]);

  useEffect(() => {
    setError(typeof externalError === "string" ? externalError : undefined);
  }, [externalError]);

  const handleChange = useCallback(
    (newValue: string) => {
      let processedValue: string | string[] = newValue;

      if (tag) {
        processedValue = newValue.split(",").map((t) => t.trim());
      }

      if (onInputChange) onInputChange(processedValue);
      setValue(newValue);
    },
    [onInputChange, tag]
  );

  if (multiline) {
    return (
      <s-stack direction="block" gap="small-200">
        {label && <s-text type="strong">{label}</s-text>}
        <textarea
          id={idProp}
          name={name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={typeof multiline === "number" ? multiline : 4}
          style={{
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            padding: "8px 12px",
            fontFamily: "inherit",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        {helpText && <s-text tone="neutral">{helpText}</s-text>}
        {error && <s-text tone="critical">{error}</s-text>}
      </s-stack>
    );
  }

  return (
    <s-stack direction="block" gap="small-200">
      {type === "email" ? (
        <s-email-field
          id={idProp}
          label={label}
          name={name}
          value={value}
          onInput={(e: any) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      ) : type === "password" ? (
        <s-password-field
          id={idProp}
          label={label}
          name={name}
          value={value}
          onInput={(e: any) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      ) : type === "number" ? (
        <s-number-field
          id={idProp}
          label={label}
          name={name}
          value={value}
          onInput={(e: any) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      ) : (
        <s-text-field
          id={idProp}
          label={label}
          name={name}
          value={value}
          onInput={(e: any) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      )}
      {helpText && <s-text tone="neutral">{helpText}</s-text>}
      {error && <s-text tone="critical">{error}</s-text>}
    </s-stack>
  );
}

export default Input;
