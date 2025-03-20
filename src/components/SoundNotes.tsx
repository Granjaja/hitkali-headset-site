"use client"; // Required for client-side animations
import { motion } from "framer-motion";
import Image from "next/image";

const notes = [
  "/photos/music1.png",
  "/photos/music2.png",
  "/photos/music3.png",
];

export function SoundNotes() {
  const noteDuration = 1.5; // Duration for each note's visibility
  const totalCycle = noteDuration * notes.length; // Total cycle time for all notes

  return (
    <div className="relative flex space-x-12 w-full justify-center"> {/* Spaced out horizontally */}
      {notes.map((note, index) => (
        <motion.div
          key={index}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0], // Fade in, hold, fade out
            scale: [1, 1.3, 1], // Pulse effect
          }}
          transition={{
            duration: noteDuration, // Time for one note's cycle
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: totalCycle - noteDuration, // Delay before restarting this note
            delay: index * noteDuration, // Sequential start
            times: [0, 0.3, 0.7, 1], // Timing: quick fade in, hold, fade out
          }}
        >
          <Image
            src={note}
            alt="Music Note"
            width={50}
            height={50}
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
          {/* Subtle "key press" shadow */}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-purple-500 rounded-full opacity-50"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              delay: index * noteDuration,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}