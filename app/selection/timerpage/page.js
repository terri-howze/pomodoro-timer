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
  const timeRemaining = useStateStore((state) => state.timeRemaining)
  const setTimeRemaining = useStateStore((state) => state.setTimeRemaining)
  const clearTimer = useStateStore((state) => state.clearTimer)
  const copyrightSymbol = "\u00A9";

  const [isPaused, setPaused] = useState(false)
  const isPausedRef = useRef(isPaused)

  //Pause Timer
  const pauseTime = async () => {
    setPaused(true)
  };

  // Resume Timer
  const resumeTime = () => {
    setPaused(false)
    countdownTimer(timeRemaining)
  };

  //Return to HomePage
  const homePage = () => {
    resetCycles()
    resetShortBreak()
    resetLongBreak()
    clearTimer();
    setTimeRemaining(0)
    router.push("/")
  }

  //Updated Paused ref each time isPaused changes, allows me to 
  // access isPuased value within setInterval Function for timer countdown
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);


  function countdownTimer(countdownTime) {
    return new Promise((resolve, reject) => {

      let countdown = countdownTime
      const { setTimer, clearTimer } = useStateStore.getState();
      clearTimer()

      const intervalId = setInterval(() => {
        if (isPausedRef.current) {
          return;
        }
        countdown--;
        setTimeRemaining(countdown);

        if (countdown < 1) {
          clearInterval(intervalId);
          clearTimer(); // Clear from Zustand
          resolve('countdown finished');
        }
      }, 1000);

      setTimer(intervalId); // Store in Zustand
    });
  }

  // Starts a while loop that calls the setInterval function to countdown, it goes through study and break until it reaches the number of cycles selected
  //Once it finishes the last study cycle it will run  long break then clear all values and return to the home page

  async function countdownCall() {
    let cycle = 1; // Track progress to resume later

    while (cycle <= cycles) {
      setLabel(`Study Time #${cycle}`);
      //await waitForResume(); // NEW: Wait if paused
      await countdownTimer(studyTime * 60);
      if (Notification.permission === 'granted') {
        new Notification(
          "Productivity Jam", {
          body: "Timer Stopped, Break Time!",
          icon: '/favicon/PJ Logo.png'
        })
      }
      if (cycle !== cycles) {
        setLabel(`Break #${cycle}`);
        //await waitForResume(); // NEW: Wait if paused
        await countdownTimer(shortBreak * 60);
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === 'granted'){
        if (Notification.permission === 'granted') {
          new Notification(
            "Productivity Jam", {
            body: "Break Time Over, Get Back To Studying",
            icon: '/favicon/PJ Logo.png'
          })
        }
      }
        cycle++; // Move to the next cycle
      }
    }

    setLabel("Long Break");
    // await waitForResume(); // NEW: Wait if paused
    await countdownTimer(longBreak * 60);

    resetCycles();
    resetShortBreak();
    resetLongBreak();
    clearTimer();
    setTimeRemaining(0)
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

  useEffect(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.title = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }, [timeRemaining]);




  //Initiates the countdown to start the timer, also fades in picture
  useEffect(() => {
    countdownCall(); // ✅ Called inside useEffect to prevent infinite renders
    setTimeout(() => setVisible(true), 100); // Delay for effect
  }, []);

  //Ask for permission to show notifications, for alerting user of timer stops
  if (typeof window !== "undefined" && "Notification" in window) {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

  return (
    <>

      <div className='flex'>
        <a onClick={homePage}>
                <div className="ml-24 mt-5 text-4xl drop-shadow-2xl mb-0 pl-2 flex">
                    <img src='/PJ Logo.png' className='h-20 -mt-2' ></img>
                    <h1 className='text-overlay mt-4 ml-4'>Productivity Jam</h1>
                </div></a>
<div>
        <button onClick={pauseTime} className={` px-4 py-2  pr-6 border-2 border-black text-black  text-2xl shadow-md ${isPaused ? "bg-buttons" : ''} active:bg-buttons`}>
          Pause
        </button>
        
        <button onClick={resumeTime} className={`px-4 py-2  pr-6 border-2 border-black text-black  text-2xl shadow-md ${!isPaused ? "bg-buttons" : ''} active:bg-buttons`}>
          Resume
        </button>
</div>

      </div>



            <div className={`flex justify-center`}>


                <div className='bg-overlay w-screen h-mainDivVh ml-24 mr-24 mt-2 text-lavender flex justify-center rounded-lg'>
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
          </div>
        </div>
      </div>
      <div className='h-6 align-middle text-center'>
        <p> Copyright {copyrightSymbol} 2025 Terri Howze</p>
      </div>

    </>
  )
}
