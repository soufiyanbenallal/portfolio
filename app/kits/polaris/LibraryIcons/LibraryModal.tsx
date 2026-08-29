import { useState } from "react";
import Dropzone from "./Dropzone";
import { useUpdateState } from "~/commons/utils/state/hooks/useUpdateState";
import SkeletonIcons from "./SkeletonIcons";

export type LibraryIconItemType = {
  url: string;
  path?: string;
};

export type LibraryModalPropsType = {
  stateKey: string;
  loading: boolean;
  icons: LibraryIconItemType[];
  onSelectIcon: (path: string) => void;
  isOpen?: boolean;
  onHide?: () => void;
};

// Compatibility alias
export type LibraryModalProps = LibraryModalPropsType;

export const LibraryModal = ({
  stateKey,
  loading,
  icons,
  onSelectIcon,
  onHide,
}: LibraryModalPropsType): JSX.Element => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const updateState = useUpdateState();

  const handleSelect = (url: string) => {
    setSelectedIcon(url);
    onSelectIcon(url);
    if (stateKey) {
      updateState(stateKey, url);
    }
  };

  return (
    <s-modal id="library_icon" heading="Select an icon or upload your own" onHide={onHide}>
      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        {loading ? (
          <SkeletonIcons />
        ) : (
          <div className="flex flex-wrap gap-3 items-center">
            <Dropzone icon_path={stateKey} />
            {icons.map((icon, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(icon.url)}
                className={`w-12 h-12 rounded-xl p-1 border transition-all ${
                  selectedIcon === icon.url
                    ? "border-primary ring-2 ring-primary/20 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={icon.url}
                  alt="Icon"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </s-modal>
  );
};

export default LibraryModal;
