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
      <div className="max-h-[70vh] space-y-4 overflow-y-auto p-4">
        {loading ? (
          <SkeletonIcons />
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <Dropzone icon_path={stateKey} />
            {icons.map((icon, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(icon.url)}
                className={`h-12 w-12 rounded-xl border p-1 transition-all ${
                  selectedIcon === icon.url
                    ? "border-primary ring-primary/20 scale-105 ring-2"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={icon.url}
                  alt="Icon"
                  className="h-full w-full object-contain"
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
