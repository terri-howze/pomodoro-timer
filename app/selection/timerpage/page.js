"use client";
import React from 'react'
import { useStateStore } from '@/store/Store';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function page() {

  const cycles = useStateStore((state) => state.cycles)
  const studyTime = 1
  const shortBreak = useStateStore((state) => state.shortBreak)
  const longBreak = useStateStore((state) => state.longBreak)
  const [timeInMinutes, setTimeInMinutes] = useState(0)
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const router = useRouter()
  const resetCycles = useStateStore((state) => state.resetCycles)
  const resetShortBreak = useStateStore((state) => state.resetShortBreak)
  const resetLongBreak = useStateStore((state) => state.resetLongBreak)
  const [visible, setVisible] = useState(false)
  const [timerLabel, setLabel] = useState("")

  function countdownTimer(countdownTime) {
    return new Promise((resolve, reject) => {
      let countdown = countdownTime

      const timer = setInterval(() => {
        countdown--
        setTimeInMinutes(Math.floor(countdown / 60))
        setTimeInSeconds(countdown % 60)
        if (countdown < 0) {
          clearInterval(timer)
          resolve('countdown finished')
        }
      }, 1000);
    })
  }

  async function countdownCall() {
    for (let i = 1; i <= cycles; i++) {
      setLabel(`Study Time #${i}`)
      await countdownTimer(studyTime * 60)
      if (i !== cycles) {
        setLabel(`Break #${i}`)
        await countdownTimer(shortBreak * 60)
        setLabel(`Break #${i}`)
      }
    }
    setLabel("Long Break")
    await countdownTimer(longBreak * 60)
    resetCycles()
    resetShortBreak()
    resetLongBreak()
    router.push('/')
  }

  const homePage = () => {
    resetCycles()
    resetShortBreak()
    resetLongBreak()
    router.push("/")
  }

  useEffect(() => {
    countdownCall(); // ✅ Called inside useEffect to prevent infinite renders
    setTimeout(() => setVisible(true), 100); // Delay for effect
  }, []);
  return (
    <>
      <div className='flex'>
        <a onClick={homePage}><div className="m-5 font-pixel text-4xl drop-shadow-2xl mb-0">
          Productivity Jam
        </div></a>
        <div>Pause</div>
        <div>Resume</div>
      </div>
      <div className={`w-touchscreenW h-touchscreenH bg-lavender flex justify-center`}>


        <div className='bg-overlay w-innerboxW h-innerboxH '>
          <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
            <div className="w-innerboxW h-innerboxH text-center">
              <h2 className='pr-4 mt-20 font-pixel text-4xl'>{timerLabel}</h2>
              <div className="flex justify-evenly pt-36">
                <h3 className='font-pixel'>
                  {timeInMinutes}:{timeInSeconds}
                </h3>
              </div>
            </div>
            <img className={`h-imageH transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} src='/pixel.png'></img>
          </div>
        </div>
      </div>


    </>
  )
}
