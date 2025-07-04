// client/src/components/Carousel.tsx
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Github, Dribbble, Twitter, Instagram, Linkedin} from "lucide-react"

const features = [
  {
    icon: Github,
    name: "GitHub",
    slogan: "Showcase your code."
  },
  {
    icon: Dribbble,
    name: "Dribbble",
    slogan: "Display your design."
  },
  {
    icon: Twitter,
    name: "Twitter",
    slogan: "Share your thoughts."
  },
  {
    icon: Instagram,
    name: "Instagram",
    slogan: "Tell your stories."
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    slogan: "Build your network."
  }
];

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {features.map((feature, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-white dark:bg-slate-900 shadow-lg border-transparent dark:border-slate-800">
                <CardContent className="flex flex-col aspect-square items-center justify-center gap-4 p-6 rounded-lg">
                  <feature.icon className="w-12 h-12 text-gray-800 dark:text-white"/>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {feature.slogan}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer"/>
      <CarouselNext className="cursor-pointer"/>
    </Carousel>
  )
}