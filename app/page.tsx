import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black py-16 px-4 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Welcome to my ecommerce
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Discover the latest products at the best prices.
              </p>
              <Button asChild variant="default">
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>

            {/* Right Image */}
            <div className="flex-1 w-full">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  alt="Banner Image"
                  src={products.data[0]?.images[0] || "/placeholder.jpg"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-4 md:py-24">
        <div className="max-w-7xl mx-auto">
          <Carousel  products={products.data}/>
        </div>
      </section>
    </div>
  );
}