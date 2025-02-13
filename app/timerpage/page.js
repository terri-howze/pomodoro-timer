"use client";
import React from 'react'
import { useStateStore } from '../../store/Store'
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

  function countdownTimer(countdownTime) {
    return new Promise((resolve, reject) => {
      let countdown = countdownTime * 60

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
    for (let i = 1; i < cycles; i++) {
      await countdownTimer(studyTime)
      if (i !== cycles) {
        await countdownTimer(shortBreak)
      }
    }
    await countdownTimer(longBreak)
    router.push('selection/')
  }

  useEffect(() => {
    countdownCall(); // ✅ Called inside useEffect to prevent infinite renders
  }, []);
  return (
    <>
      <div>
        <h3>
          {timeInMinutes}:{timeInSeconds}
        </h3>
        <button className="w-40 h-20 bg-gray-200 border-2 border-gray-400 shadow-lg rounded-lg hover:bg-gray-300 active:shadow-none transition" onClick={() => router.push('selection/')}>Start</button>

      </div>
    </>
  )
}
