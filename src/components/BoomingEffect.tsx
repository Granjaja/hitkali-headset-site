"use client"; // Required for client-side animations
import { motion } from "framer-motion";

export function BoomingEffect() {
  const pulseCount = 3; // Number of concentric pulses
  const pulseDuration = 2; // Duration for each pulse

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {Array(pulseCount)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border-2 border-purple-400"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: [0, 1.2, 1.8], // Adjusted scale to fit around Photo
              opacity: [0.6, 0.3, 0.1], // Fade out
            }}
            transition={{
              duration: pulseDuration,
              ease: "easeOut",
              repeat: Infinity,
              delay: index * (pulseDuration / pulseCount), // Staggered start
            }}
            style={{
              width: "150px", // Larger to encompass Photo
              height: "150px",
            }}
          />
        ))}
    </div>
  );
}