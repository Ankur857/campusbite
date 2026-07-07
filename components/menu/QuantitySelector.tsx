import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
        disabled={quantity <= 1}
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
