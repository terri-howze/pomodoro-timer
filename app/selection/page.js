"use client";
import { useStateStore } from '../../store/Store'
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      <div className="w-screen h-screen bg-cyan-950 ">

        <div className=" bg-slate-50 m-5">
          Study timer

        </div>
        <button className="w-40 h-20 bg-gray-200 border-2 border-gray-400 shadow-lg rounded-lg hover:bg-gray-300 active:shadow-none transition" onClick={() => router.push('timerpage/')}>Start</button>
      </div>
    </>
  );
}
