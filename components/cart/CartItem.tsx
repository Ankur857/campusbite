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
    <div className="flex items-center gap-4 border-b p-6">
      <div className="h-20 w-20 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h4 className="font-bold">{title}</h4>
        <p className="text-xs text-gray-500">{tag}</p>
        <p className="mt-1 font-bold text-orange-600">{price}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center rounded-full border bg-gray-50">
          <button onClick={() => onUpdateQty && onUpdateQty(qty - 1)} className="px-3 hover:bg-gray-100 rounded-full">-</button>
          <span className="px-2 text-sm font-bold">{qty}</span>
          <button onClick={() => onUpdateQty && onUpdateQty(qty + 1)} className="px-3 hover:bg-gray-100 rounded-full">+</button>
        </div>

        <button onClick={() => onUpdateQty && onUpdateQty(0)} className="text-xs text-gray-500 hover:text-red-500">Remove</button>
      </div>
    </div>
  );
}