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
    <div className="bg-card border-border flex items-center justify-between gap-3 rounded-xl border p-3">
      <h4 className="text-foreground text-xs font-semibold">{title}</h4>
      <button
        type="button"
        onClick={handleLoadIcon}
        className="border-border bg-muted/20 hover:border-primary flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border p-1 transition-colors"
      >
        {state.selectedIcon ? (
          <img src={state.selectedIcon} alt="icon" className="h-full w-full object-contain" />
        ) : (
          <span className="text-muted-foreground text-xs">Select</span>
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
