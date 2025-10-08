
'use client';

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DukaHeroSection({ heroSlides }: { heroSlides: any[] }) {
    return (
        <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 4000 })]}
            className="w-full"
        >
            <CarouselContent>
                {heroSlides.map((slide, index) => (
                    <CarouselItem key={index}>
                        <div className="relative h-[50vh] w-full">
                            <Image
                                src={slide.imageUrl}
                                alt={slide.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                                <h2 className="text-4xl font-bold">{slide.title}</h2>
                                <p className="mt-2 text-lg max-w-2xl">{slide.description}</p>
                                <Button size="lg" className="mt-6">Shop Now</Button>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 hidden md:flex" />
            <CarouselNext className="right-4 hidden md:flex" />
        </Carousel>
    );
}
