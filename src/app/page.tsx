'use client'
import { motion } from "framer-motion"; // Import framer-motion
import Photo from "@/components/Photo";
import { BoomingEffect } from "@/components/BoomingEffect"; // Import BoomingEffect
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-2 max-w-full bg-gray-100 min-h-screen">
      {/* Hero section */}
      <motion.div
        className="relative flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-6xl bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 p-7 rounded-2xl shadow-lg overflow-hidden min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left content */}
        <motion.div
          className="relative z-10 text-center md:text-left space-y-6 max-w-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Immerse Yourself in{" "}
            <span className="text-purple-400">Next-Level Sound</span>
          </h1>
          <p className="text-lg text-gray-300">
            Find the Perfect Headset for Work, Play, and Everything in Between.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full shadow-md transition">
              <Link href="/products">Buy Now</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right content (Photo with BoomingEffect) */}
        <motion.div
          className="relative z-10 flex justify-center md:justify-end p-4 md:p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <Photo />
            <div className="absolute inset-0 flex justify-center items-center">
              <BoomingEffect />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Browse by Category */}
      <div className="text-center my-12 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-800">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 mt-6">
          {[
            { name: "Earphones", src: "/photos/music-4334557_1280.jpg", link: "/products/earphone" },
            { name: "Headphones", src: "/photos/headphone-4576092_1280.jpg", link: "/products/headphone" },
            { name: "Earbuds", src: "/photos/earphones-5193970_1280.jpg", link: "/products/earbuds" },
          ].map((item) => (
            <Link
              href={item.link}
              key={item.name}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer w-full"
            >
              <Image
                src={item.src}
                width={250}
                height={250}
                alt={item.name}
                className="rounded-lg object-cover w-full h-56"
              />
              <span className="text-lg font-semibold mt-4">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Choose Us section */}
      <section className="bg-white py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Audio Gear?</h2>
          <p className="text-gray-600 mb-12">
            Experience crystal-clear sound with cutting-edge technology, built for audiophiles and everyday users alike.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Earphones */}
            <div className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
              <Image
                src="/photos/blue-vacuum-earphones-black-background-close-up_662214-259487.jpg"
                alt="Earphones"
                width={96}
                height={96}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Earphones</h3>
              <p className="text-gray-600">
                Compact and lightweight design with deep bass and noise isolation for an immersive listening experience.
              </p>
            </div>

            {/* Headphones */}
            <div className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
              <Image
                src="/photos/music-5455222_1280.jpg"
                alt="Headphones"
                width={96}
                height={96}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Headphones</h3>
              <p className="text-gray-600">
                Over-ear comfort with high-fidelity sound, active noise cancellation, and long battery life.
              </p>
            </div>

            {/* Earbuds */}
            <div className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
              <Image
                src="/photos/wireless-earbuds-with-neon-cyberpunk-style-lighting.jpg"
                alt="Earbuds"
                width={96}
                height={96}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Earbuds</h3>
              <p className="text-gray-600">
                Truly wireless design with smart touch controls, fast charging, and sweat resistance for active lifestyles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}