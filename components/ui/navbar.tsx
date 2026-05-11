"use client"
import Link from "next/link";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/app/store/cart-store";
import { useEffect, useState } from "react";

export const Navbar = () => {   
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const { items } = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return (
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                <div>
                    <Link href="/" className="font-bold text-xl">
                        My Ecommerce
                    </Link>
                </div>
                
                {/* Desktop Menu - Hidden on mobile */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="hover:text-gray-600 transition">
                        Home
                    </Link>
                    <Link href="/products" className="hover:text-gray-600 transition">
                        Products
                    </Link>
                    <Link href="/checkout" className="hover:text-gray-600 transition">
                        Checkout
                    </Link>
                </div>
                
                <div className="flex items-center space-x-4">
                    <Link href="/checkout" className="hover:text-gray-600 transition relative">
                        <ShoppingCartIcon className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="md:hidden p-2 rounded-md hover:bg-gray-100"
                    >
                        {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t py-4 px-4">
                    <ul className="flex flex-col space-y-3">
                        <li>
                            <Link href="/" onClick={() => setMobileOpen(false)} className="hover:text-gray-600 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" onClick={() => setMobileOpen(false)} className="hover:text-gray-600 transition">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/checkout" onClick={() => setMobileOpen(false)} className="hover:text-gray-600 transition">
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};