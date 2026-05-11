"use client";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    products: Stripe.Product[]
}

export const Carousel = ({ products }: Props) => {
    const [current, setCurrent] = useState<number>(0);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [products.length]);

    const currentProduct = products[current];
    const price = currentProduct.default_price as Stripe.Price;

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
                {/* Image Container */}
                {currentProduct.images && currentProduct.images[0] && (
                    <div className="relative w-full h-96 bg-gray-100">
                        <Image
                            alt={currentProduct.name}
                            src={currentProduct.images[0]}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{currentProduct.name}</h3>
                    <p className="text-xl">
                        {price?.unit_amount 
                            ? `$${(price.unit_amount / 100).toFixed(2)}` 
                            : "Price not available"}
                    </p>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === current 
                                    ? "w-6 bg-white" 
                                    : "bg-white/50 hover:bg-white/80"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => setCurrent((prev) => (prev - 1 + products.length) % products.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition"
                    aria-label="Previous slide"
                >
                    ←
                </button>
                <button
                    onClick={() => setCurrent((prev) => (prev + 1) % products.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition"
                    aria-label="Next slide"
                >
                    →
                </button>
            </Card>
        </div>
    );
};