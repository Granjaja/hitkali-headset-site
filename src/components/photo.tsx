import React from 'react'
import Image from 'next/image'

export default function Photo() {
  return (
    <Image 
    className="rounded-full object-cover w-[350px] h-[350px]"
    src="/photos/audio-7276511_1280.jpg"
    width={350}
    height={350}
    alt="Audio Product Image"
    />
  )
}
