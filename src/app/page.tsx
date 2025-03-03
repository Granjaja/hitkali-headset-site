
import Photo from "@/components/photo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";





export default function Home() {
  return (
    
  <div className=" flex flex-col items-center justify-center p-2 max-w-full bg-gray-100 min-h-screen">

    {/* Hero section */}
    <div className="flex flex-row items-center justify-between gap-10 w-full max-w-full bg-white p-7 rounded-2xl shadow-md">
    <div className="text-center md:text-left space-y-4 max-w-xl">
  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
    Immerse Yourself in Next Level Sound
  </h1>
  <p className="text-lg text-gray-600">
    Find the Perfect Headset for Work, Play, and Everything in Between.
  </p>
  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
    Buy Now
  </Button>
</div>

      <div className="flex justify-center md:justify-end">
        <Photo />
      </div>
    </div>



    {/* Browse by Category */}
<div className="text-center my-12 w-full max-w-6xl">
  <h2 className="text-3xl font-bold text-gray-800">Browse by Category</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 mt-6">
    {[
      { name: "Earphones", src: "/photos/music-4334557_1280.jpg", link: "/products/earphone" },
      { name: "Headphones", src: "/photos/headphone-4576092_1280.jpg", link: "/products/headphone" },
      { name: "Earbuds", src: "/photos/earphones-5193970_1280.jpg", link: "/products/earbuds" }
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


    {/* why choose us section */}
    <section className="bg-white py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Audio Gear?</h2>
        <p className="text-gray-600 mb-12">Experience crystal-clear sound with cutting-edge technology, built for audiophiles and everyday users alike.</p>
        
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
    
  </div>)
    
}
