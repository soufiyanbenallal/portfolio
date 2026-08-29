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
      className="w-10 h-10 rounded-xl bg-card border border-border hover:border-primary/50 shadow-xs flex items-center justify-center text-base hover:scale-105 transition-all cursor-pointer"
    >
      <span>{icon}</span>
    </button>
  );
};

export default SupportCard;
