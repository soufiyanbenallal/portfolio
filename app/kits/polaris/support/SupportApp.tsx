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
        className="bg-primary/10 text-primary hover:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors"
        title="Support & Feedback"
      >
        ?
      </button>

      {isOpen && (
        <div className="bg-popover border-border absolute top-full right-0 z-50 mt-2 flex flex-col gap-2 rounded-2xl border p-2 shadow-xl">
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
