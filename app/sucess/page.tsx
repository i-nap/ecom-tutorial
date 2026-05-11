"use client";
import Link from "next/link";
import { useCartStore } from "../store/cart-store";
import { useEffect } from "react";
import { clear } from "console";

export default  function SucessPage() {
    const{clearCart} = useCartStore();
    useEffect (() => {
        clearCart();
    },[clearCart])
    return <div>
    <h1>payment sucessful !
    </h1>
    <p> thanks for purcased . your order is being processed</p>
    <Link href={"/products"}>
    COntinue shopping </Link>
    </div>
}