import { useEffect, useState } from "react";
import APIService from "~/commons/service/APIService";
import { useUpdateState } from "~/commons/utils/state/hooks/useUpdateState";
import LibraryModal from "./LibraryModal";

export type LibraryIconsPropsType = {
  url: string;
  title: string;
  endpoint: string;
  stateKey: string;
};

// Compatibility alias
export type LibraryIconsProps = LibraryIconsPropsType;

export const LibraryIcons = ({
  url,
  title,
  endpoint,
  stateKey,
}: LibraryIconsPropsType): JSX.Element => {
  const [state, setState] = useState({
    selectedIcon: url,
    icons: [],
    loading: false,
    loaded: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateIcon = useUpdateState();

  const handleSelectIcon = (path: string) => {
    handleUpdateIcon(stateKey, path);
    setState((prevState) => ({ ...prevState, selectedIcon: path }));
  };

  const handleLoadIcon = async () => {
    setIsModalOpen(true);
    if (!state.loaded) {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const http = new APIService();
        const response = await http.get(endpoint);
        setState((prevState) => ({
          ...prevState,
          icons: response,
          loaded: true,
          loading: false,
        }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    }
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, selectedIcon: url }));
  }, [url]);

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-card rounded-xl border border-border">
      <h4 className="text-xs font-semibold text-foreground">{title}</h4>
      <button
        type="button"
        onClick={handleLoadIcon}
        className="w-10 h-10 rounded-lg border border-border p-1 bg-muted/20 hover:border-primary transition-colors flex items-center justify-center overflow-hidden"
      >
        {state.selectedIcon ? (
          <img src={state.selectedIcon} alt="icon" className="w-full h-full object-contain" />
        ) : (
          <span className="text-xs text-muted-foreground">Select</span>
        )}
      </button>

      {isModalOpen && (
        <LibraryModal
          loading={state.loading}
          icons={state.icons}
          stateKey={stateKey}
          onSelectIcon={handleSelectIcon}
          isOpen={isModalOpen}
          onHide={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LibraryIcons;
