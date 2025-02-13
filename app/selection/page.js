"use client";
import { useStateStore } from '../../store/Store'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Selection() {
  const cycles = useStateStore((state) => state.cycles)
  const shortBreak = useStateStore((state) => state.shortBreak)
  const longBreak = useStateStore((state) => state.longBreak)
  const [selected, setSelected] = useState('');
  const setCycles = useStateStore((state) => state.setCycles)
  const setShortBreak = useStateStore((state) => state.setShortBreak)
  const setLongBreak = useStateStore((state) => state.setLongBreak)
  const router = useRouter()



  return (
    <>
      <div className="w-touchscreenW h-touchscreenH bg-lavender">
      <div className="m-5 font-pixel text-4xl drop-shadow-2xl">
          Study timer

        </div>
      <div className='bg-overlay w-innerboxW h-innerboxH  ml-5'>
  
        <Image
        src={"/pixel.png"}
        height={400}
        width={400}
        alt='pixelimage'
        className='float-right'
        />
          </div>
      </div>
    </>
  );
}
