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
    <div className="p-4 bg-card rounded-xl border border-border shadow-xs space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        <div className="md:col-span-5 space-y-1">
          <label className="text-[10px] uppercase font-bold text-muted-foreground">
            {labelField}
          </label>
          <div>{renderField}</div>
        </div>

        <div className="md:col-span-3 space-y-1">
          <label className="text-[10px] uppercase font-bold text-muted-foreground">
            {labelOperator}
          </label>
          <div>{renderOperator}</div>
        </div>

        <div className="md:col-span-3 space-y-1">
          <label className="text-[10px] uppercase font-bold text-muted-foreground">
            {labelValue}
          </label>
          <div>{renderValue}</div>
        </div>

        <div className="md:col-span-1 flex items-center justify-end gap-1">
          {renderActions}
          {showDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-xs"
              title="Delete Condition"
            >
              🗑
            </button>
          )}
        </div>
      </div>

      {renderFooter && <div className="pt-2 border-t border-border/40">{renderFooter}</div>}
    </div>
  );
}

export default ConditionItem;
