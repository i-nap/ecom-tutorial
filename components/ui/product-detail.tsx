"use client"
import Image from "next/image";
import { Button } from "./button";
import { useCartStore } from "@/app/store/cart-store";

// Define serializable types
interface SerializedPrice {
    id: string;
    unit_amount: number | null;
    currency: string;
}

interface SerializedProduct {
    id: string;
    name: string;
    description: string | null;
    images: string[];
    active: boolean;
    created: number;
    default_price: SerializedPrice | string | null;
}

interface Props {
    product: SerializedProduct;
}

export const ProductDetail = ({ product }: Props) => {
    const { items, addItem } = useCartStore();
    
    const price = typeof product.default_price === 'object' && product.default_price !== null
        ? product.default_price
        : null;
    
    const cartItem = items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const onAddItem = () => {
        if (!price || !price.unit_amount) return;
        
        addItem({
            id: product.id,
            name: product.name,
            price: price.unit_amount,
            imageUrl: product.images ? product.images[0] : null,
            quantity: 1,
        });
    };

    const onRemoveItem = () => {
        if (quantity > 0) {
            addItem({
                id: product.id,
                name: product.name,
                price: price?.unit_amount || 0,
                imageUrl: product.images ? product.images[0] : null,
                quantity: -1,
            });
        }
    };
    return (
        <div className="container mx-auto px-4 py-8">
            {product.images && product.images[0] && (
                <div className="relative w-full max-w-2xl mx-auto h-96 bg-gray-100 rounded-lg overflow-hidden mb-8">
                    <Image
                        alt={product.name}
                        src={product.images[0]}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            )}
            
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                </h1>
                
                {product.description && (
                    <p className="text-gray-600 text-lg mb-6">
                        {product.description}
                    </p>
                )}
                
                {price && price.unit_amount && (
                    <p className="text-3xl font-bold text-gray-900 mb-8">
                        ${(price.unit_amount / 100).toFixed(2)}
                    </p>
                )}
                
                <div className="flex items-center gap-4">
                    <Button 
                        variant="outline" 
                        className="w-12 h-12 text-xl"
                        onClick={onRemoveItem}
                        disabled={quantity === 0}
                    >
                        -
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <Button 
                        variant="outline" 
                        className="w-12 h-12 text-xl"
                        onClick={onAddItem}
                        >
                        +
                    </Button>
                    <Button className="flex-1 ml-4" >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};