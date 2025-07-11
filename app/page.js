"use client";
import { useStateStore } from "@/store/Store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useEffect } from 'react';
export default function Home() {
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
  const resetCycles = useStateStore((state) => state.resetCycles)
  const resetShortBreak = useStateStore((state) => state.resetShortBreak)
  const resetLongBreak = useStateStore((state) => state.resetLongBreak)
  const copyrightSymbol = "\u00A9";

  useEffect(() => {

    setTimeout(() => setVisible(true), 100); // Delay for effect
  }, []);
  const nextPage = () => {
    setnoClick(false)
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
    router.push("/selection/cycles")
  }
  const homePage = () => {
    resetCycles()
    resetShortBreak()
    resetLongBreak()
    router.push("/")
  }

  return (
    <>
      <a onClick={homePage}>
        <div className="ml-24 mt-5 text-4xl drop-shadow-2xl mb-0 pl-2 flex">
          <img src='/PJ Logo.png' className='h-20 -mt-2' ></img>
          <h1 className='text-textColor mt-4 ml-4'>Productivity Jam</h1>
        </div></a>
      <div className={`flex justify-center`}>
        <div className='bg-overlay w-screen h-mainDivVh ml-24 mr-24 mt-2 text-lavender flex justify-center rounded-lg'>
          <div className={`flex justify-end bottom-0 w-innerboxW h-innerboxH transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="w-innerboxW h-innerboxH text-center">
              <h2 className='pr-4 mt-20  text-4xl'>Welcome </h2>
              <div className="justify-evenly pt-32">
                <h3 className='text-3xl '>
                  Ready to start studying?
                </h3>
              </div>
              <div className='flex justify-evenly pt-20'>
                <button onClick={nextPage} className='text-3xl border-2 border-lavender hover:bg-lavender hover:text-textColor'>Yes</button>
                {noClick === false ? <button onClick={() => { setnoClick(true) }} className='text-3xl border-2 border-lavender hover:bg-lavender hover:text-textColor'> No</button> :
                  <h1>Too Bad (ˆ𐃷ˆ)</h1>}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='h-6 align-middle text-center flex justify-evenly'>

        <p>Copyright {copyrightSymbol} 2025 Terri Howze</p>
        <div className="flex">
          <p><a href="https://github.com/terri-howze/pomodoro-timer">Github</a></p>
          <a href="https://github.com/terri-howze/pomodoro-timer"><img width={25} height={25} src="/github.png"></img></a>
        </div>
        <p> Designs by <a href='https://www.quintinodesigns.com'>Quintino Designs</a></p>
      </div>

    </>
  );
}
