import Image from "next/image";
import { Star, Plus } from "lucide-react";
import { toast } from "sonner";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface FoodItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    isVeg: boolean;
    isPopular?: boolean;
    category?: string;
}

interface FoodCardProps {
    item: FoodItem;
}

export default function FoodCard({ item }: FoodCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        try {
            await addToCart({
                id: String(item.id),
                name: item.name,
                price: item.price,
                category: item.category || "General",
                veg: item.isVeg,
                image: item.image,
                description: item.description,
                available: true,
            });
            toast.success(`${item.name} added to cart!`);
        } catch (error) {
            console.error("Failed to add to cart:", error);
            toast.error("Failed to add item to cart");
        }
    };
    return (
        <Card className="group overflow-hidden rounded-2xl border-0 py-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden">
                <div className="relative h-52 bg-muted">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {item.isPopular && (
                    <Badge className="absolute left-3 top-3 bg-orange-500 hover:bg-orange-500">
                        Best Seller
                    </Badge>
                )}

                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium shadow">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {item.rating}
                </div>
            </div>

            <CardContent className="p-4">
                {/* Title */}
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div
                                className={`flex h-4 w-4 items-center justify-center rounded-sm border ${item.isVeg
                                        ? "border-green-600"
                                        : "border-red-600"
                                    }`}
                            >
                                <div
                                    className={`h-2 w-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"
                                        }`}
                                />
                            </div>

                            <h3 className="text-lg font-semibold">
                                {item.name}
                            </h3>
                        </div>

                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {item.description}
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Starting from
                        </p>
                        <p className="text-xl font-bold">
                            ₹{item.price}
                        </p>
                    </div>

                    <Button
                        size="sm"
                        className="rounded-xl bg-orange-500 hover:bg-orange-600"
                        onClick={handleAddToCart}
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        Add
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}