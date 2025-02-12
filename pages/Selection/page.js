"use client";
import Image from "next/image";
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
          {/* Box Options for number of cycles*/}
          <div className="flex">
            Cycles
            <a onClick={() => setCycles(3)}><div tabIndex="0" className="pl-2 size-12  bg-gray-50 hover:bg-red-500 active:bg-red-500">3</div></a>
            <a onClick={() => setCycles(5)}><div tabIndex="0" className="pl-2 size-12  bg-gray-50 hover:bg-red-500 active:bg-red-500">5</div></a>
            <a onClick={() => setCycles(7)}><div tabIndex="0" className="pl-2 size-12  bg-gray-50 hover:bg-red-500 active:bg-red-500">7</div></a>
          </div>
          {cycles}
          <div>
            {/* Box Options for number of Short break time*/}
            <div className="flex">
              Short Break
              <a onClick={() => setShortBreak(5)}><div tabIndex="0" className="pl-2 size-12  bg-gray-50 hover:bg-red-500 active:bg-red-500">5</div></a>
              <a onClick={() => setShortBreak(7)}><div tabIndex="0" className="pl-2 size-12  bg-gray-50 hover:bg-red-500 active:bg-red-500">7</div></a>
              <a onClick={() => setShortBreak(10)}><div tabIndex="0" className="pl-2 size-12  bg-gray-50 hover:bg-red-500 active:bg-red-500">10</div></a>
              </div>
              {shortBreak}
          </div>
          <div>
            {/* Box Options for number of long break time*/}
            <div className="flex">
              Long Break
              <a onClick={() => setLongBreak(15)}><div className="pl-2 size-12 bg-gray-50">15</div></a>
              <a onClick={() => setLongBreak(20)}><div className="size-12 bg-blue-400">20</div></a>
              <a onClick={() => setLongBreak(25)}><div className="size-12 bg-lime-200">25</div></a>
            </div>
          </div>
          {longBreak}
        </div>
        <button className="w-40 h-20 bg-gray-200 border-2 border-gray-400 shadow-lg rounded-lg hover:bg-gray-300 active:shadow-none transition"onClick={() => router.push('/TimerPage')}>Start</button>
      </div>
    </>
  );
}
