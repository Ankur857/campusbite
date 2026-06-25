import Image from "next/image";

export default function SuggestCard({
  name,
  price,
  img,
  onAddToCart,
}: {
  name: string;
  price: string;
  img: string;
  onAddToCart?: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1">
      <div className="h-28 overflow-hidden">
        <Image
          src={img}
          alt={name}
          width={300}
          height={200}
          className="h-full w-full object-cover transition group-hover:scale-110"
        />
      </div>

      <div className="flex items-center justify-between p-3">
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-orange-600 font-bold">{price}</p>
        </div>

        <button 
          onClick={onAddToCart}
          className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-110 transition"
        >
          +
        </button>
      </div>
    </div>
  );
}