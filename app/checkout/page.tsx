"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../store/cart-store";
import Link from "next/link";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
    // Get all the functions you need from the store
    const { items, addItem, removeItem, clearCart } = useCartStore();
    
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    if (items.length === 0) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
                <Link href="/products" className="text-blue-500 hover:underline mt-4 inline-block">
                    Continue Shopping
                </Link>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            {/* Clear Cart Button */}
            <div className="mb-4 flex justify-end">
                <Button 
                    variant="destructive" 
                    onClick={clearCart}
                >
                    Clear Entire Cart
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {items.map((item, index) => (
                            <li key={index} className="border-b pb-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-gray-500 ml-2">
                                            ${(item.price / 100).toFixed(2)} each
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        {/* Remove single item */}
                                        <Button
                                            variant="outline"
                                            className="w-12 h-12 text-xl"
                                            onClick={() => {
                                                if (item.quantity === 1) {
                                                    removeItem(item.id); // Remove if last item
                                                } else {
                                                    addItem({...item, quantity: -1}); // Decrease quantity
                                                }
                                            }}
                                        >
                                            -
                                        </Button>
                                        
                                        <span className="text-xl font-semibold w-12 text-center">
                                            {item.quantity}
                                        </span>
                                        
                                        {/* Add one more */}
                                        <Button
                                            variant="outline"
                                            className="w-12 h-12 text-xl"
                                            onClick={() => addItem({...item, quantity: 1})}
                                        >
                                            +
                                        </Button>
                                        
                                        {/* Remove button */}
                                        <Button
                                            variant="destructive"
                                            className="ml-4"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    
                                    <span className="font-semibold min-w-[100px] text-right">
                                        ${((item.price * item.quantity) / 100).toFixed(2)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>${(total / 100).toFixed(2)}</span>
                        </div>
                    </div>
                    
                    {/* Checkout Actions */}
                    <div className="mt-6 flex gap-4 justify-end">
                        <Button variant="outline" onClick={clearCart}>
                            Cancel Order
                        </Button>
                        
                    </div>
                </CardContent>
            </Card>
            <form action = {checkoutAction} className  ="max-w-md mx-auto">
                <input type ="hidden" name ="items" value={JSON.stringify(items)} />
                <Button variant={"default"}  > Proceed to Payment</Button>
            </form>
        </div>
    );
}