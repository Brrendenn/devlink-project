"use client";

import { CarouselSize } from "@/components/Carousel";
import { AccordionDemo } from "@/components/FAQ"
import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // <-- 1. Import from the correct library
import Link from "next/link";

export default function HomePage() {
  return (
    // 2. Use motion.div as the wrapper and move the className to it
    <motion.div
      className="text-center"
      // 3. Define the animation properties
      initial={{ opacity: 0, y: 20 }} // Start invisible and 20px down
      animate={{ opacity: 1, y: 0 }}   // Animate to fully visible and its original position
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1
        className="text-4xl md:text-6xl font-bold 
        bg-clip-text text-transparent 
        bg-gradient-to-r 
        dark:from-purple-600 dark:via-blue-500 dark:to-purple-600
        from-purple-600 via-pink-400 to-violet-600"
      >
        Your Links, All in One Place.
      </h1>
      <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300 font-medium">
        DevLink is the only link you&apos;ll ever need. Create a personalized and
        easily-customizable page to house all the important links you want
        to share with your audience.
      </p>
      <div className="mt-8">
        <Link href="/register">
          <Button className="cursor-pointer" size="lg">Get Started for Free</Button>
        </Link>
      </div>
      <div className="mt-16 w-full max-w-4xl mx-auto">
        <CarouselSize />
      </div>
      <div className="mt-24 w-full max-w-5xl mx-auto">
        <HowItWorks />
      </div>
      <div className="mt-24 w-full max-w-3xl mx-auto">
        <AccordionDemo />
      </div>
    </motion.div>
  );
}