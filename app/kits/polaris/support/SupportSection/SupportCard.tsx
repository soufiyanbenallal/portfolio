export type SupportCardPropsType = {
  title: string;
  icon?: string;
  onClick: () => void;
};

export const SupportCard = ({ title, icon = "💬", onClick }: SupportCardPropsType): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="bg-card border-border hover:border-primary/50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border text-base shadow-xs transition-all hover:scale-105"
    >
      <span>{icon}</span>
    </button>
  );
};

export default SupportCard;
