import Image from "next/image";

export default function CartItem({
  title,
  tag,
  price,
  qty,
  image,
  onUpdateQty,
}: {
  title: string;
  tag: string;
  price: string;
  qty: number;
  image: string;
  onUpdateQty?: (newQty: number) => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 p-6 transition-colors duration-300">
      <div className="h-20 w-20 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-950">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h4 className="font-extrabold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-zinc-405 mt-0.5">{tag}</p>
        <p className="mt-1 font-black text-orange-600 dark:text-orange-400">{price}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
          <button onClick={() => onUpdateQty && onUpdateQty(qty - 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-850 rounded-full text-gray-700 dark:text-zinc-300 transition-colors font-bold cursor-pointer">-</button>
          <span className="px-2 text-sm font-bold text-gray-900 dark:text-white">{qty}</span>
          <button onClick={() => onUpdateQty && onUpdateQty(qty + 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-850 rounded-full text-gray-700 dark:text-zinc-300 transition-colors font-bold cursor-pointer">+</button>
        </div>

        <button onClick={() => onUpdateQty && onUpdateQty(0)} className="text-xs text-gray-500 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 font-semibold cursor-pointer">Remove</button>
      </div>
    </div>
  );
}