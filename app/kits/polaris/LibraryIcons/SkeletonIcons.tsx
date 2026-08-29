export function SkeletonIcons(): JSX.Element {
  return (
    <div className="grid grid-cols-6 gap-3 p-4">
      {Array.from({ length: 18 }).map((_, index) => (
        <div key={index} className="w-12 h-12 rounded-xl bg-muted/60 animate-pulse" />
      ))}
    </div>
  );
}

export default SkeletonIcons;
