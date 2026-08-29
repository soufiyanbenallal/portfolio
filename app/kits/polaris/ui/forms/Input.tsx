import { useCallback, useEffect, useState } from "react";
import { useUpdateState } from "~/commons/utils/state/hooks/useUpdateState";
import Validator from "../../../utils/validator";
import { validateForm } from "../../../utils/validator/validateForm";
import { useDeleteState } from "../../../utils/state/hooks/useDeleteState";

export type CustomInputPropsType = {
  stateKey?: string;
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
  rules?: any;
  [key: string]: unknown;
};

// Compatibility alias
export type InputProps = CustomInputPropsType;

const validator = new Validator();

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
  stateKey,
  onInputChange,
  rules,
}: CustomInputPropsType): JSX.Element {
  const [value, setValue] = useState<string>(
    Array.isArray(initialValue) ? initialValue.join(", ") : ((initialValue as string) ?? "")
  );
  const [error, setError] = useState<string | undefined>(
    typeof externalError === "string" ? externalError : undefined
  );

  const updateState = useUpdateState();
  const deleteState = useDeleteState();

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

      if (stateKey) updateState(stateKey, processedValue);
      if (onInputChange) onInputChange(processedValue);
      setValue(newValue);

      if (rules && name) {
        const fieldError = validateForm(validator, rules, name, newValue);
        const validationKey = stateKey?.split(".").pop();
        if (validationKey) {
          fieldError === undefined
            ? deleteState(`errors.${validationKey}`)
            : updateState(`errors.${validationKey}`, fieldError);
        }
        setError(fieldError);
      }
    },
    [deleteState, name, onInputChange, rules, stateKey, tag, updateState]
  );

  if (multiline) {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-xs font-semibold text-foreground block">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}
        <textarea
          id={idProp}
          name={name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={typeof multiline === "number" ? multiline : 4}
          className="w-full rounded-lg border border-border bg-card p-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
        />
        {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-1">
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
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default Input;
