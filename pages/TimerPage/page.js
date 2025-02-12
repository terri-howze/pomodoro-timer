import React from 'react'
import { CronJob } from 'cron'
import { useStateStore } from '../../store/Store'
import { useState } from "react";
import { useRouter } from 'next/navigation';
const router = useRouter()

export default function page() {

  const cycles = useStateStore((state) => state.cycles)
  const studyTime = 25
  const shortBreak = useStateStore((state) => state.shortBreak)
  const longBreak = useStateStore((state) => state.longBreak)
  const [timeInMinutes, setTimeInMinutes] = useState()
  const [timeInSeconds, setTimeInSeconds] = useState()


  function countdownTimer(countdownTime){
    return new Promise((resolve, reject) =>{
      let countdown = countdownTime * 60

      const timer = setInterval(() =>{
        countdown--
        setTimeInMinutes(countdown/60)
        setTimeInSeconds(countdown % 60)
        if(countdown < 0){
          clearInterval(timer)
          resolve('countdown finished')
        }
      })
    })
  }

  async function countdownCall() {
    for(let i = cycles; i >= 0; cycles--){
    await countdownTimer(studyTime)
    if(i > 0){
      await countdownTimer(shortBreak)
    }
    }
    await countdownTimer(longBreak)
    router.push('/app')
  }
  return (
    <>
    <div>
      <h3>
      {timeInMinutes}:{timeInSeconds}
      </h3>
    </div>
    </>
  )
}
