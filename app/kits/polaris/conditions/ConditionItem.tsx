import React from "react";

export type ConditionItemPropsType = {
  labelField?: string;
  labelOperator?: string;
  labelValue?: string;
  renderField: React.ReactNode;
  renderOperator: React.ReactNode;
  renderValue: React.ReactNode;
  onDelete: () => void;
  deleteText?: string;
  renderActions?: React.ReactNode;
  showDelete?: boolean;
  renderFooter?: React.ReactNode;
};

export function ConditionItem({
  labelField = "Field",
  labelOperator = "Operator",
  labelValue = "Value",
  renderField,
  renderOperator,
  renderValue,
  onDelete,
  renderActions,
  showDelete = true,
  renderFooter,
}: ConditionItemPropsType): JSX.Element {
  return (
    <div className="bg-card border-border space-y-3 rounded-xl border p-4 shadow-xs">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-12">
        <div className="space-y-1 md:col-span-5">
          <label className="text-muted-foreground text-[10px] font-bold uppercase">
            {labelField}
          </label>
          <div>{renderField}</div>
        </div>

        <div className="space-y-1 md:col-span-3">
          <label className="text-muted-foreground text-[10px] font-bold uppercase">
            {labelOperator}
          </label>
          <div>{renderOperator}</div>
        </div>

        <div className="space-y-1 md:col-span-3">
          <label className="text-muted-foreground text-[10px] font-bold uppercase">
            {labelValue}
          </label>
          <div>{renderValue}</div>
        </div>

        <div className="flex items-center justify-end gap-1 md:col-span-1">
          {renderActions}
          {showDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="text-destructive hover:bg-destructive/10 rounded-lg p-2 text-xs transition-colors"
              title="Delete Condition"
            >
              🗑
            </button>
          )}
        </div>
      </div>

      {renderFooter && <div className="border-border/40 border-t pt-2">{renderFooter}</div>}
    </div>
  );
}

export default ConditionItem;
