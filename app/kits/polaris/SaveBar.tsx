import { SaveBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useState, useCallback } from "react";
import { hasChanged } from "~/commons/service/toDeepString";

type StringObjectType = string | Record<string, unknown>;

export type CustomSaveBarPropsType = {
  id?: string;
  initialData: StringObjectType;
  currentData: StringObjectType;
  onSave?: (current: StringObjectType, initial: StringObjectType) => void;
  onDiscard?: (initial: StringObjectType) => void;
  onSaved?: (value: boolean) => void;
  saveText?: string;
  discardText?: string;
  disabled?: boolean;
  loading?: boolean | string;
  isSaved?: boolean;
};

// Compatibility alias
export type CustomSaveBarProps = CustomSaveBarPropsType;
export type CustomSaveBar = CustomSaveBarPropsType;

export function CustomSaveBar({
  id = "custom-save-bar",
  initialData,
  currentData,
  onSave,
  onDiscard,
  onSaved,
  saveText = "Save",
  discardText = "Discard",
  disabled = false,
  loading = false,
  isSaved = false,
}: CustomSaveBarPropsType): JSX.Element {
  const shopify = useAppBridge();
  const [hasChanges, setHasChanges] = useState(false);

  const initialDataString = JSON.stringify(initialData);
  const currentDataString = JSON.stringify(currentData);

  useEffect(() => {
    const dataChanged = hasChanged(initialData, currentData);
    setHasChanges(dataChanged);

    if (dataChanged) {
      shopify.saveBar.show(id);
    } else {
      shopify.saveBar.hide(id);
    }
  }, [initialDataString, currentDataString, id, shopify.saveBar, initialData, currentData]);

  useEffect(() => {
    if (isSaved) {
      shopify.saveBar.hide(id);
      if (onSaved) {
        onSaved(true);
      }
    }
  }, [isSaved, shopify.saveBar, id, onSaved]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(currentData, initialData);
    }
  }, [onSave, currentData, initialData]);

  const handleDiscard = useCallback(() => {
    if (onDiscard) {
      onDiscard(initialData);
    }
    shopify.saveBar.hide(id);
  }, [onDiscard, initialData, shopify.saveBar, id]);

  return (
    <SaveBar id={id}>
      <button variant="primary" onClick={handleSave} loading={loading ? "" : undefined}>
        {saveText}
      </button>
      <button onClick={handleDiscard} disabled={disabled || !hasChanges}>
        {discardText}
      </button>
    </SaveBar>
  );
}

export default CustomSaveBar;
