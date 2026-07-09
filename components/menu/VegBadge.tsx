export function VegBadge({ veg }: { veg?: boolean }) {
  if (veg === undefined) return null;
  
  return (
    <div className="flex items-center gap-1">
      <div className={`w-4 h-4 border-2 flex items-center justify-center ${veg ? 'border-green-600' : 'border-red-600'}`}>
        <div className={`w-2 h-2 rounded-sm ${veg ? 'bg-green-600' : 'bg-red-600'}`} />
      </div>
      <span className="text-xs text-gray-600 dark:text-zinc-400 font-bold">{veg ? 'VEG' : 'NON-VEG'}</span>
    </div>
  );
}
