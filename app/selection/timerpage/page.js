"use client";
import React from 'react'
import { useStateStore } from '@/store/Store';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function page() {

  const cycles = useStateStore((state) => state.cycles)
  const studyTime = 1
  const shortBreak = useStateStore((state) => state.shortBreak)
  const longBreak = useStateStore((state) => state.longBreak)
  const router = useRouter()
  const resetCycles = useStateStore((state) => state.resetCycles)
  const resetShortBreak = useStateStore((state) => state.resetShortBreak)
  const resetLongBreak = useStateStore((state) => state.resetLongBreak)
  const [visible, setVisible] = useState(false)
  const [timerLabel, setLabel] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(0)

  const [isPaused, setPaused] = useState(false)
  const isPausedRef = useRef(isPaused)


  const pauseTime = async () => {
    setPaused(true)
  };

  // Resume Timer
  const resumeTime = () => {
    setPaused(false)
    countdownTimer(timeRemaining)
  };

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);


  function countdownTimer(countdownTime) {
    return new Promise((resolve, reject) => {
      let countdown = countdownTime

      const timer = setInterval(() => {
        if (isPausedRef.current) {
          return; // Do nothing while paused (interval keeps running)
        }
        countdown--
        setTimeRemaining(countdown)
        // setTimeInMinutes(Math.floor(countdown / 60))
        // setTimeInSeconds(countdown % 60)
        if (countdown < 1) {
          clearInterval(timer)
          resolve('countdown finished')
        }

      }, 1000);
    })
  }

  // Starts a while loop that calls the setInterval function to countdown, it goes through study and break until it reaches the number of cycles selected
  //Once it finishes the last study cycle it will run  long break then clear all values and return to the home page

  async function countdownCall() {
    let cycle = 1; // Track progress to resume later

    while (cycle <= cycles) {
      setLabel(`Study Time #${cycle}`);
      //await waitForResume(); // NEW: Wait if paused
      await countdownTimer(studyTime * 60);

      if (cycle !== cycles) {
        setLabel(`Break #${cycle}`);
        //await waitForResume(); // NEW: Wait if paused
        await countdownTimer(shortBreak * 60);
      }

      cycle++; // Move to the next cycle
    }

    setLabel("Long Break");
    // await waitForResume(); // NEW: Wait if paused
    await countdownTimer(longBreak * 60);

    resetCycles();
    resetShortBreak();
    resetLongBreak();
    router.push('/');
  }

  //Called in conjucntion with the countdown function to check if isPaused is true or not, if it is true it stops the interval
  // function waitForResume() {
  //   return new Promise(resolve => {
  //     const checkResume = setInterval(() => {
  //       if (!isPausedRef.current) {
  //         clearInterval(checkResume);
  //         resolve();
  //       }
  //     }, 500); // Check every 500ms
  //   });
  // }



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
        <a onClick={homePage}><div className="m-5 text-4xl drop-shadow-2xl mb-0 pl-2">
          Productivity Jam
        </div></a>

        <button onClick={pauseTime} className={`px-4 py-2  pr-6 border-2 border-black text-black  text-2xl shadow-md ${isPaused ? "bg-buttons" : ''} active:bg-buttons`}>
          Pause
        </button>
        <div></div>
        <button onClick={resumeTime} className={`px-4 py-2  pr-6 border-2 border-black text-black  text-2xl shadow-md ${!isPaused ? "bg-buttons" : ''} active:bg-buttons`}>
          Resume
        </button>


      </div>



      <div className={`w-touchscreenW h-touchscreenH bg-lavender flex justify-center`}>


        <div className='bg-overlay w-innerboxW h-innerboxH '>
          <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
            <div className="w-innerboxW h-innerboxH text-center">
              <h2 className='pr-4 mt-20 text-4xl'>{timerLabel}</h2>
              <div className='pt-24'>
                <h1 className='text-4xl'>Time Remaining</h1>
              </div>
              <div className="flex justify-evenly pt-10">
                <h3 className='text-3xl'>

                  {String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:{String(timeRemaining % 60).padStart(2, '0')}
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
