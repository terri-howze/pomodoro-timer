"use client";
import { useStateStore } from '../../store/Store'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useEffect } from 'react';
export default function Selection() {
  const cycles = useStateStore((state) => state.cycles)
  const shortBreak = useStateStore((state) => state.shortBreak)
  const longBreak = useStateStore((state) => state.longBreak)
  const [selected, setSelected] = useState('');
  const setCycles = useStateStore((state) => state.setCycles)
  const setShortBreak = useStateStore((state) => state.setShortBreak)
  const setLongBreak = useStateStore((state) => state.setLongBreak)
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [noClick, setnoClick] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100); // Delay for effect
  }, []);
  const nextPage = () => {
    router.push("selection/cycles/")
  }
  

  return (
    <> 
    <div className="m-5 text-4xl drop-shadow-2xl mb-0">
      Productivity Jam
    </div>
    <div className={`w-touchscreenW h-touchscreenH bg-lavender flex justify-center`}>


<div className='bg-overlay w-innerboxW h-innerboxH '>
  <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
    <div className="w-innerboxW h-innerboxH text-center">
      <h2 className='pr-4 mt-20  text-4xl'>Welcome </h2>
      <div className="flex justify-evenly pt-32">
        <h1 className='text-3xl'>
          Ready to get Started?
        </h1>
      </div>
      <div className='flex justify-evenly pt-20'>
        <button onClick={nextPage} className='text-3xl outline-double'>Yes</button>
        {noClick === false ? <button onClick={() => {setnoClick(true)}} className='text-3xl outline-double'>No</button> : 
        <h1>Too Bad (ˆ𐃷ˆ)</h1>}
      </div>
    </div>
    <img className={`h-imageH transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} src='/pixel.png'></img>
  </div>
</div>
</div>
    </>
  );
}
