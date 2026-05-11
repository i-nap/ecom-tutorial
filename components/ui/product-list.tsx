"use client"
import Stripe from "stripe";
import { ProductCard } from "./product-cart";
import { useState } from "react";

interface props {
    products: Stripe.Product[];
}

export const ProductList = ({ products }: props) => {
    const [searchTerm,setSearchTerm]=useState<string>("")
    const filteredProduct =products.filter((product)=>{
        const term = searchTerm.toLowerCase()
        const nameMatch =product.name.toLowerCase().includes(term)
        const descriptionMatch =product.description ? product.description.toLowerCase().includes(term) 
        :false ;
        return nameMatch || descriptionMatch ;
    })
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProduct.map((product, key) => {
                        return (
                            <li key={key} className="list-none">
                                <ProductCard product={product} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};