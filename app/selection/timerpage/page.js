"use client";
import React from 'react'
import { useStateStore } from '@/store/Store';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTimerStore } from '@/store/Store';


export default function page() {

  const cycles = useStateStore((state) => state.cycles)
  const studyTime = 1
  const shortBreak = useStateStore((state) => state.shortBreak)
  const longBreak = useStateStore((state) => state.longBreak)
  const router = useRouter()
  const resetCycles = useStateStore((state) => state.resetCycles)
  const resetShortBreak = useStateStore((state) => state.resetShortBreak)
  const resetLongBreak = useStateStore((state) => state.resetLongBreak)
  const { timeRemaining, setTimeRemaining} = useTimerStore()
  
  let isPaused = false
  const [visible, setVisible] = useState(false)
  const [timerLabel, setLabel] = useState("")
 
  const resumeTimer = () =>{
    isPaused = false
    console.log(isPaused)
  }

  const pauseTimer = () =>{
    isPaused = true
    console.log(isPaused)
  }


  function countdownTimer(countdownTime) {
    return new Promise((resolve, reject) => {
      let countdown = countdownTime

      const timer = setInterval(() => {
        if(!isPaused){
        countdown--
        setTimeRemaining(countdown)
        // setTimeInMinutes(Math.floor(countdown / 60))
        // setTimeInSeconds(countdown % 60)
        if (countdown < 1) {
          clearInterval(timer)
          resolve('countdown finished')
        }
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
       <div><button onClick={pauseTimer}>Pause</button></div>
        <a onClick={resumeTimer}><div>Resume</div></a>
      </div>
      <div className={`w-touchscreenW h-touchscreenH bg-lavender flex justify-center`}>


        <div className='bg-overlay w-innerboxW h-innerboxH '>
          <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
            <div className="w-innerboxW h-innerboxH text-center">
              <h2 className='pr-4 mt-20 font-pixel text-4xl'>{timerLabel}</h2>
              <div className="flex justify-evenly pt-36">
                <h3 className='font-pixel'>
                  Time Remaining
                  {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}
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
