"use client";
import Image from "next/image";
import { useStateStore } from '../store/Store'
import { useState } from "react";

export default function Home() {
  const cycles = useStateStore((state) => state.cycles)
  const shortBreak = useStateStore((state) => state.shortBreak)
  const longBreak = useStateStore((state) => state.longBreak)
  const [selected, setSelected] = useState('');
  const setCycles = useStateStore((state) => state.setCycles)

  return (
    <>
      <div className="w-screen h-screen bg-cyan-950 ">

        <div className=" bg-slate-50 m-5">
          Study timer
          {/* Box Options for number of cycles*/}
          <div className="flex">
            Cycles
            <div tabIndex="0" className="pl-2 size-12  bg-gray-50 hover:bg-red-500 active:bg-red-500">
              <button className="size-12 bg-gray-200 border-2 border-gray-400 shadow-lg rounded-lg hover:bg-gray-300 active:shadow-none transition" onClick={() => setCycles(3)}>3</button>
            </div>
            <div className="size-12 bg-blue-400">5</div>
            <div className="size-12 bg-lime-200">7</div>
          </div>
          {cycles}
          <div>
            {/* Box Options for number of Short break time*/}
            <div className="flex">
              Short Break
              <div tabIndex="0" className="pl-2 size-12  bg-gray-50 hover:bg-red-500 active:bg-red-500"></div>
              <div className="size-12 bg-blue-400">7</div>
              <div className="size-12 bg-lime-200">10</div>
            </div>
          </div>
          <div>
            {/* Box Options for number of long break time*/}
            <div className="flex">
              Long Break
              <div className="pl-2 size-12 bg-gray-50">15</div>
              <div className="size-12 bg-blue-400">20</div>
              <div className="size-12 bg-lime-200">25</div>
            </div>
          </div>
        </div>
        <button className="w-40 h-20 bg-gray-200 border-2 border-gray-400 shadow-lg rounded-lg hover:bg-gray-300 active:shadow-none transition">Start</button>
      </div>
    </>
  );
}
