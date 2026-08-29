import { useEffect, useState } from "react";
import { useUpdateState } from "../utils/state/hooks/useUpdateState";

export type SortableProductType = {
  index: string;
  id: string;
  title: string;
  image: string;
};

// Compatibility alias
export type Product = SortableProductType;

export type SortableListPropsType = {
  initialProducts: SortableProductType[];
  draggable?: boolean;
  stateKey?: string;
  onMove?: (movedItem: SortableProductType, fromIndex: number, toIndex: number) => void;
};

// Compatibility alias
export type SortableListProps = SortableListPropsType;

export function SortableList({
  initialProducts,
  draggable = true,
  stateKey,
  onMove,
}: SortableListPropsType): JSX.Element {
  const [products, setProducts] = useState<SortableProductType[]>(initialProducts);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHandleActive, setIsHandleActive] = useState(false);

  const updateState = useUpdateState();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    setHoveredIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    if (hoveredIndex !== index) {
      setHoveredIndex(index);
    }
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || hoveredIndex === null) return;
    if (draggedIndex === hoveredIndex) {
      setDraggedIndex(null);
      setHoveredIndex(null);
      return;
    }
    const updated = [...products];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(hoveredIndex, 0, movedItem);

    if (onMove) {
      onMove(movedItem, draggedIndex, hoveredIndex);
    }

    if (stateKey) {
      updateState(stateKey, updated);
    }
    setProducts(updated);
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  let displayProducts = products;
  if (draggedIndex !== null && hoveredIndex !== null && draggedIndex !== hoveredIndex) {
    const temp = [...products];
    const [draggedItem] = temp.splice(draggedIndex, 1);
    temp.splice(hoveredIndex, 0, draggedItem);
    displayProducts = temp;
  }

  return (
    <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
      {displayProducts.map((product, index) => (
        <div
          key={product.id}
          draggable={isHandleActive}
          onDragStart={() => isHandleActive && handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
          onDragEnd={() => {
            setDraggedIndex(null);
            setHoveredIndex(null);
            setIsHandleActive(false);
          }}
          className={`flex items-center gap-3 p-3 transition-colors ${
            hoveredIndex === index && draggedIndex !== null ? "bg-primary/10" : "hover:bg-muted/40"
          }`}
        >
          {draggable && (
            <button
              type="button"
              onMouseDown={() => setIsHandleActive(true)}
              onMouseUp={() => setIsHandleActive(false)}
              onMouseLeave={() => setIsHandleActive(false)}
              className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing p-1"
              aria-label="Drag to reorder"
            >
              ⠿
            </button>
          )}

          <span className="text-xs font-semibold text-muted-foreground w-6">{index + 1}.</span>

          <div className="w-9 h-9 rounded-lg border border-border bg-muted/30 overflow-hidden shrink-0 flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-muted-foreground">📦</span>
            )}
          </div>

          <span className="text-xs font-medium text-foreground truncate">{product.title}</span>
        </div>
      ))}
    </div>
  );
}

export default SortableList;
