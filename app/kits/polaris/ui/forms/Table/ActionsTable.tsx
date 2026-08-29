import { useNavigate } from "react-router";

type TargetType = "_blank" | "_self";

export type ActionsTablePropsType = {
  edit?: { label?: string; to: string };
  external?: { label?: string; target?: TargetType; to: string };
  delete?: { active: boolean; label?: string };
  onDelete?: () => void;
};

// Compatibility alias
export type ActionsTableProps = ActionsTablePropsType;

export const ActionsTable = ({
  edit,
  external,
  delete: deleteProp,
  onDelete,
}: ActionsTablePropsType): JSX.Element => {
  const navigate = useNavigate();

  const handleEdit = () => edit && navigate(edit.to);
  const handleExternalLink = () =>
    external && window.open(external.to, external.target ?? "_blank");

  return (
    <div className="flex items-center gap-2">
      {external && (
        <s-button variant="tertiary" onClick={handleExternalLink}>
          {external.label || "Open"} ↗
        </s-button>
      )}
      {edit && (
        <s-button variant="tertiary" onClick={handleEdit}>
          {edit.label || "Edit"}
        </s-button>
      )}
      {deleteProp && (
        <s-button variant="tertiary" onClick={onDelete}>
          {deleteProp.label || "Delete"}
        </s-button>
      )}
    </div>
  );
};

export default ActionsTable;
