
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Building,
  CheckCircle,
  ChevronRight,
  CircleHelp,
  Coins,
  Heart,
  HomeIcon,
  LayoutGrid,
  Minus,
  Package,
  Plus,
  Printer,
  ShieldCheck,
  Share2,
  ShoppingCart,
  Star,
  Store,
  Ticket,
  Truck,
  UserCog,
  Verified,
  Video,
  Warehouse,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { NestSearch } from '@/components/nest-search';

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="w-[94%] mx-auto flex h-14 items-center">
      <div className="mr-4 hidden md:flex">
        <Link href="/modules/mall" className="mr-6 flex items-center space-x-2">
          <Store className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">NestMall</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Shop All
          </Link>
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Categories
          </Link>
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Wholesale Hub
          </Link>
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Become a Vendor
          </Link>
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            My Orders
          </Link>
          <Link
            href="/"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            SG-Nest
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <Button variant="outline" asChild>
          <Link href="/modules/mall">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Link>
        </Button>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" /> My Cart (0)
        </Button>
      </div>
    </div>
  </header>
);

const ProductImageGallery = ({ images }: { images: string[] }) => (
  <Card>
    <CardContent className="p-4">
      <Tabs defaultValue="photos">
        <TabsContent value="photos">
          <Carousel>
            <CarouselContent>
              {images.map((src, i) => (
                <CarouselItem key={i}>
                  <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={src}
                      alt={`Product image ${i + 1}`}
                      width={800}
                      height={800}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </TabsContent>
        <TabsContent value="video">
          <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted">
            <p className="text-muted-foreground">Video coming soon</p>
          </div>
        </TabsContent>
        <div className="mt-2 flex justify-center">
          <TabsList>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="video">
              <Video className="mr-2 h-4 w-4" /> Video
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </CardContent>
  </Card>
);

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        className="h-8 w-14 border-x-0 text-center"
        value={quantity}
        readOnly
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => setQuantity(quantity + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

const ProductPurchaseCard = () => (
  <Card className="sticky top-20">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-3xl !text-primary">KES 120,000</CardTitle>
        <Badge variant="secondary">In Stock</Badge>
      </div>
      <CardDescription className="line-through">KES 135,000</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center text-yellow-500">
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-muted-foreground" />
        </div>
        <span className="text-sm text-muted-foreground">(4.5/5, 235 reviews)</span>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="quantity">Quantity</Label>
          <QuantitySelector />
        </div>
        <Button size="lg" className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button size="lg" variant="secondary" className="w-full">
          Buy Now
        </Button>
        <Button size="lg" variant="outline" className="w-full">
          <Coins className="mr-2 h-4 w-4" /> Buy in Installments (BNPL)
        </Button>
      </div>

      <Separator />

      <div className="flex justify-around text-sm">
        <Button variant="ghost" size="sm" className="flex-col h-auto">
          <Heart className="h-5 w-5" />
          <span>Save for Later</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-auto">
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-auto">
          <Printer className="h-5 w-5" />
          <span>Print</span>
        </Button>
      </div>

      <Separator />

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="!text-lg !text-foreground">
            Wholesale Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>1-5 units</TableCell>
                <TableCell className="text-right font-medium">
                  KES 120,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>6-20 units</TableCell>
                <TableCell className="text-right font-medium">
                  KES 115,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20+ units</TableCell>
                <TableCell className="text-right font-medium">
                  KES 110,000
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </CardContent>
  </Card>
);

const VendorCard = () => (
  <Card>
    <CardHeader className="flex-row items-center gap-4">
      <Avatar className="h-14 w-14">
        <AvatarImage
          src="https://picsum.photos/100/100?random=v1"
          alt="Kariuki's Electronics"
        />
        <AvatarFallback>KE</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle className="!text-lg !text-foreground">
          Sold by Kariuki's Electronics
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-yellow-500">
          4.8/5.0 <Star className="h-4 w-4 fill-current" />
          <span className="text-muted-foreground">(10k orders)</span>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-2 text-sm text-green-600 font-semibold mb-4">
        <BadgeCheck className="h-5 w-5" />
        <span>KYC Verified Vendor</span>
      </div>
      <Button className="w-full" variant="outline">
        Visit Vendor Store <Store className="ml-2 h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const LogisticsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="!text-lg !text-foreground flex items-center gap-2">
        <Truck className="h-5 w-5" /> Logistics & Delivery
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 text-sm">
      <div className="flex items-start gap-4">
        <Package className="h-6 w-6 text-primary mt-1" />
        <div>
          <h4 className="font-semibold">Courier Options</h4>
          <p className="text-muted-foreground">
            Fargo, G4S, Sendy, Pick-Up Point
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Zap className="h-6 w-6 text-primary mt-1" />
        <div>
          <h4 className="font-semibold">Estimated Delivery</h4>
          <p className="text-muted-foreground">
            2-5 business days within Nairobi.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <ShieldCheck className="h-6 w-6 text-primary mt-1" />
        <div>
          <h4 className="font-semibold">Escrow Protection</h4>
          <p className="text-muted-foreground">
            Your payment is held securely until you confirm delivery.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProductDetails = () => (
  <Card>
    <CardContent className="p-4">
      <Accordion type="single" collapsible defaultValue="description">
        <AccordionItem value="description">
          <AccordionTrigger className="text-lg font-semibold">
            Description
          </AccordionTrigger>
          <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              Experience the future of mobile technology with the Samsung Galaxy
              S24. Featuring a stunning Dynamic AMOLED 2X display, a
              professional-grade camera system, and the fastest processor ever
              in a Galaxy, it's designed to elevate your everyday.
            </p>
            <p>
              Whether you're capturing breathtaking photos, gaming on the go, or
              multitasking with ease, the Galaxy S24 delivers unparalleled
              performance. Its sleek design and durable build make it the
              perfect companion for your life's adventures.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="specs">
          <AccordionTrigger className="text-lg font-semibold">
            Specifications
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>Display</TableHead>
                  <TableCell>6.2" Dynamic AMOLED 2X</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Processor</TableHead>
                  <TableCell>Snapdragon 8 Gen 3 for Galaxy</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>RAM</TableHead>
                  <TableCell>8GB</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Storage</TableHead>
                  <TableCell>256GB</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Main Camera</TableHead>
                  <TableCell>50MP Wide, 12MP Ultrawide, 10MP Telephoto</TableCell>
                </TableRow>
                 <TableRow>
                  <TableHead>Warranty</TableHead>
                  <TableCell>24 Months</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq">
          <AccordionTrigger className="text-lg font-semibold">
            FAQ
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            <h4 className="font-semibold">Is it new or refurbished?</h4>
            <p className="text-sm text-muted-foreground">All our products are brand new and sealed.</p>
             <h4 className="font-semibold mt-2">What is the return policy?</h4>
            <p className="text-sm text-muted-foreground">We offer a 7-day return policy for defective items.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
);

const ProductCard = ({ product }: { product: any }) => (
    <Card className="overflow-hidden group">
        <CardContent className="p-0">
            <div className="relative">
                 <Image src={product.image} alt={product.title} width={300} height={300} className="w-full h-48 object-cover"/>
                 <Badge className="absolute top-2 left-2">Related</Badge>
            </div>
            <div className="p-4">
                <h3 className="font-semibold truncate">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="mt-2 font-bold text-primary">KES {product.price.toLocaleString()}</p>
            </div>
        </CardContent>
    </Card>
);


const RelatedProducts = () => {
    const products = [
        {title: "Galaxy Watch 6", category: "Wearables", price: 35000, image: "https://picsum.photos/300/300?random=50"},
        {title: "Galaxy Buds Pro 2", category: "Audio", price: 22000, image: "https://picsum.photos/300/300?random=51"},
        {title: "Anker Power Bank", category: "Accessories", price: 8000, image: "https://picsum.photos/300/300?random=52"},
        {title: "iPhone 15 Pro", category: "Smartphones", price: 150000, image: "https://picsum.photos/300/300?random=53"},
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>You Might Also Like</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map(p => <ProductCard key={p.title} product={p} />)}
                </div>
            </CardContent>
        </Card>
    );
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const productImages = [
    '/mall/s24-1.jpg',
    '/mall/s24-2.jpg',
    '/mall/s24-3.jpg',
  ];

  return (
    <div className="bg-muted/20">
      <Header />
      <main className="w-[94%] mx-auto py-8">
        <div className="mb-4">
            <p className="text-sm text-muted-foreground">
                <Link href="/modules/mall" className="hover:underline">Home</Link> &gt; 
                <Link href="#" className="hover:underline"> Electronics</Link> &gt; 
                <Link href="#" className="hover:underline"> Smartphones</Link>
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <h1 className="text-3xl font-bold text-foreground md:hidden">Samsung Galaxy S24 - 256GB</h1>
             <ProductImageGallery images={productImages} />
             <ProductDetails />
             <RelatedProducts />
          </div>

          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground hidden md:block">Samsung Galaxy S24 - 256GB</h1>
            <ProductPurchaseCard />
            <VendorCard />
            <LogisticsCard />
          </div>
        </div>
      </main>
      <NestSearch />
    </div>
  );
}
