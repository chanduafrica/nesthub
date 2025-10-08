
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getDukaProducts, getDukaHomeContent } from "@/lib/firebase-services";
import { DukaProduct } from "@/lib/mock-data";
import { Barcode, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/modules/duka/product-card";
import { DukaHeroSection } from "@/components/modules/duka/duka-hero-section";


async function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center">
                <Link href="/modules/duka" className="mr-6 flex items-center space-x-2">
                    <Barcode className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">NestDuka</span>
                </Link>
                <div className="relative flex-1 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for products or shops..." className="pl-10" />
                </div>
                <nav className="ml-6 flex items-center space-x-4">
                    <Button variant="ghost" asChild><Link href="#">My Orders</Link></Button>
                </nav>
                 <div className="ml-auto flex items-center gap-4">
                    <Button variant="ghost" size="icon"><Search className="h-5 w-5 md:hidden" /></Button>
                </div>
            </div>
        </header>
    )
}

function CategorySection({ categories }: { categories: any[] }) {
    return (
        <section className="py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Shop by Category</h2>
            </div>
             <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map(cat => (
                    <Link href="#" key={cat.title}>
                        <Card className="text-center hover:shadow-md cursor-pointer transition-shadow h-full flex flex-col items-center justify-center p-2">
                             <div className="relative w-16 h-16 mb-2">
                                <Image src={cat.imageUrl} alt={cat.title} fill className="object-contain" />
                            </div>
                            <p className="font-semibold text-sm">{cat.title}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}

function ProductCarouselSection({ title, products, link = "#" }: { title: string, products: DukaProduct[], link?: string }) {
    return (
        <section className="py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button variant="ghost" asChild>
                    <Link href={link}>View All <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <Carousel
                opts={{ align: "start", skipSnaps: true }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {products.map((product) => (
                        <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                           <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                 <CarouselPrevious className="left-[-1rem] hidden sm:flex" />
                 <CarouselNext className="right-[-1rem] hidden sm:flex" />
            </Carousel>
        </section>
    );
}

export default async function DukaHomePage() {
    const products = await getDukaProducts();
    const dukaHomeContent = await getDukaHomeContent();

    return (
        <div className="bg-muted/30 min-h-screen">
            <Header />
            <main>
                <DukaHeroSection heroSlides={dukaHomeContent.heroSlides} />
                <div className="container">
                    <CategorySection categories={dukaHomeContent.categories} />
                    <ProductCarouselSection title="Top Deals" products={products.slice(0, 8)} />
                    <ProductCarouselSection title="Fresh Produce" products={products.filter(p => p.category === "Fresh Food")} />
                    <ProductCarouselSection title="Beverages" products={products.filter(p => p.category === "Beverages")} />
                </div>
            </main>
        </div>
    )
}
