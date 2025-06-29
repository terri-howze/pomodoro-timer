"use client";
import { useStateStore } from "@/store/Store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function longBreak() {
    const longBreak = useStateStore((state) => state.longBreak)
    const setLongBreak = useStateStore((state) => state.setLongBreak)
    const router = useRouter()
    const [visible, setVisible] = useState(false)
    const resetCycles = useStateStore((state) => state.resetCycles)
    const resetShortBreak = useStateStore((state) => state.resetShortBreak)
    const resetLongBreak = useStateStore((state) => state.resetLongBreak)
    const copyrightSymbol = "\u00A9";

    const nextPage = () => {
        router.push("timerpage/")
    }

    const previousPage = () => {
        router.push("shortbreak/")
    }

    const homePage = () => {
        resetCycles()
        resetShortBreak()
        resetLongBreak()
        router.push("/")
    }

    useEffect(() => {
        setTimeout(() => setVisible(true), 100); // Delay for effect
    }, []);
    return (
        <>
            <a onClick={homePage}>
                <div className="ml-24 mt-5 text-4xl drop-shadow-2xl mb-0 pl-2 flex">
                    <img src='/PJ Logo.png' className='h-20 -mt-2' ></img>
                    <h1 className='text-overlay mt-4 ml-4'>Productivity Jam</h1>
                </div></a>
            <div className={`flex justify-center`}>
                <div className='bg-overlay w-screen h-mainDivVh ml-24 mr-24 mt-2 text-lavender flex justify-center rounded-lg'>
                    <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
                        <div className="w-innerboxW h-innerboxH text-center">
                            <h2 className='pr-4 mt-20 text-4xl'>Long Break</h2>
                            <div className="flex justify-evenly pt-24">
                                <a onClick={() => setLongBreak(15)}><div tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-black active:bg-buttons ${longBreak === 15 ? 'bg-buttons' : ''}`}>15</div></a>
                                <a onClick={() => setLongBreak(20)}><div tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-black active:bg-buttons ${longBreak === 20 ? 'bg-buttons' : ''}`}>20</div></a>
                                <a onClick={() => setLongBreak(25)}><div tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-black active:bg-buttons ${longBreak === 25 ? 'bg-buttons' : ''}`}>25</div></a>
                            </div>
                            <div className=" flex justify-evenly pt-20">
                                <button onClick={previousPage} className="px-4 py-2 bg-buttons border-2 border-black text-black  text-2xl shadow-md  active:bg-buttons">
                                    ← Previous
                                </button>
                                <button onClick={nextPage} className="px-4 py-2 bg-buttons border-2 border-black text-black  text-2xl shadow-md  active:bg-buttons">
                                    Next →
                                </button>
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
