import Image from "next/image";

export default function CartItem({
  title,
  tag,
  price,
  qty,
  image,
}: {
  title: string;
  tag: string;
  price: string;
  qty: number;
  image: string;
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
          <button className="px-3">-</button>
          <span className="px-2 text-sm font-bold">{qty}</span>
          <button className="px-3">+</button>
        </div>

        <button className="text-xs text-gray-500">Remove</button>
      </div>
    </div>
  );
}