import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden transition-colors duration-300">
      <button
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-850 text-gray-700 dark:text-zinc-300 transition-colors disabled:opacity-30 cursor-pointer"
        disabled={quantity <= 1}
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center font-bold text-gray-900 dark:text-white text-sm">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-850 text-gray-700 dark:text-zinc-300 transition-colors cursor-pointer"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
