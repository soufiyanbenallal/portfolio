import { useState } from "react";
import { supportItems } from "./SupportSection/supportItems";
import SupportCard from "./SupportSection/SupportCard";
import ModalRenderer from "./handlers/renderModal";

export type SupportAppPropsType = {
  single?: boolean;
};


export const SupportApp = ({ single = false }: SupportAppPropsType): JSX.Element => {
  const [modalId, setModalId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <ModalRenderer modalId={modalId} onClose={() => setModalId(null)} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center font-bold text-xs transition-colors"
        title="Support & Feedback"
      >
        ?
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-popover border border-border rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-2">
          {supportItems.map((item) => (
            <SupportCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              onClick={() => {
                setModalId(item.id);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportApp;
