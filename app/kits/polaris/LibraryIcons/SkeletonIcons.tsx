export function SkeletonIcons(): JSX.Element {
  return (
    <div className="grid grid-cols-6 gap-3 p-4">
      {Array.from({ length: 18 }).map((_, index) => (
        <div key={index} className="bg-muted/60 h-12 w-12 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}

export default SkeletonIcons;
