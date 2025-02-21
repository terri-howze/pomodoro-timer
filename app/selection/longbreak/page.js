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
            <a onClick={homePage}><div className="m-5 font-pixel text-4xl drop-shadow-2xl mb-0">
                Productivity Jam
            </div></a>
            <div className={`w-touchscreenW h-touchscreenH bg-lavender flex justify-center transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>


                <div className='bg-overlay w-innerboxW h-innerboxH '>
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
                        <img className={`h-imageH transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} src='/pixel.png'></img>
                    </div>
                </div>
            </div>

        </>
    )
}
