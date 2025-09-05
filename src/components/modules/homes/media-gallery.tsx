
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Video, Map } from 'lucide-react';

interface MediaGalleryProps {
    title: string;
}

export function MediaGallery({ title }: MediaGalleryProps) {
  const images = [
      { src: "https://picsum.photos/1200/800?random=51", hint: "modern kenyan living room" },
      { src: "https://picsum.photos/1200/800?random=52", hint: "house exterior nairobi" },
      { src: "https://picsum.photos/1200/800?random=53", hint: "luxury african kitchen" },
      { src: "https://picsum.photos/1200/800?random=54", hint: "spacious bedroom kenya" },
      { src: "https://picsum.photos/1200/800?random=55", hint: "garden view apartment" },
  ];

  return (
    <Card>
      <CardContent className="p-2">
        <Tabs defaultValue="photos" className="w-full">
          <TabsContent value="photos">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                       <Card className="overflow-hidden">
                         <CardContent className="flex aspect-[3/2] items-center justify-center p-0">
                           <Image
                             src={image.src}
                             alt={`${title} - view ${index + 1}`}
                             width={1200}
                             height={800}
                             className="w-full h-full object-cover"
                             data-ai-hint={image.hint}
                           />
                         </CardContent>
                       </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </TabsContent>
          <TabsContent value="video">
             <div className="flex aspect-[3/2] items-center justify-center rounded-lg border bg-muted">
                <p className="text-muted-foreground">Video tour coming soon</p>
             </div>
          </TabsContent>
          <TabsContent value="map">
             <div className="flex aspect-[3/2] items-center justify-center rounded-lg border bg-muted">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.812437034789!2d36.82194607496586!3d-1.286389998699933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d5b958466b%3A0x4477353a2588b9c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1721935560174!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                ></iframe>
             </div>
          </TabsContent>
           <div className="flex justify-center mt-2">
            <TabsList>
                <TabsTrigger value="photos"><Camera className="mr-2 h-4 w-4" /> Photos</TabsTrigger>
                <TabsTrigger value="video"><Video className="mr-2 h-4 w-4" />Video</TabsTrigger>
                <TabsTrigger value="map"><Map className="mr-2 h-4 w-4" />Map</TabsTrigger>
            </TabsList>
           </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
