import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Image from "next/image";
import { Button } from "./button";

interface props {
    product: Stripe.Product;
}
export const ProductCard = ({ product }: props) => {
    const price = product.default_price as Stripe.Price;

    return (
        <Link href={`/products/${product.id}`} className="block group">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {product.images && product.images[0] && (
                    <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                        <Image
                            alt={product.name}
                            src={product.images[0]}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            priority
                        />
                    </div>
                )}
                
                <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                        {product.name}
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                    {product.description &&(
                        <p className="yest-gray-600 text-sm mb-2">
                            {product.description}
                        </p>
                    )}
                    {price && price.unit_amount && (
                        <p className="text-xl font-bold text-gray-900 mb-3">
                            {price?.unit_amount 
                                ? `$${(price.unit_amount / 100).toFixed(2)}` 
                                : "Price not available"}
                        </p>
                    )}
                    <Button className="w-full">
                        View Details
                    </Button>
                </CardContent>
            </Card>
        </Link>
    );
    
};
