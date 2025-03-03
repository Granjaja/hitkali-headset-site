import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        {/* Brand */}
        <div className="flex items-center justify-center md:justify-start">
          <h1 className="text-2xl font-bold">Hitkali</h1>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-xl font-bold mb-2">Contacts</h3>
          <p>📞 +254 745 124 918</p>
          <p>📧 crysfonalysis@gmail.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-500">
              <FaFacebook size={24} />
            </Link>
            <Link href="#" className="hover:text-sky-500">
              <FaTwitter size={24} />
            </Link>
            <Link href="#" className="hover:text-pink-500">
              <FaInstagram size={24} />
            </Link>
            <Link href="#" className="hover:text-blue-700">
              <FaLinkedin size={24} />
            </Link>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-xl font-bold mb-2">Products</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/products/earphone" className="hover:underline">
                🎧 Earphones
              </Link>
            </li>
            <li>
              <Link href="/products/headphone" className="hover:underline">
                🎶 Headphones
              </Link>
            </li>
            <li>
              <Link href="/products/earbuds" className="hover:underline">
                🎵 Earbuds
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} Hitkali. All Rights Reserved.
      </div>
    </footer>
  );
}
