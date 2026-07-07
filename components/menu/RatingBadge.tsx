import { Star } from 'lucide-react';

export function RatingBadge({ rating }: { rating?: number }) {
  if (!rating) return null;
  
  return (
    <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium">
      <Star size={12} fill="white" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}
