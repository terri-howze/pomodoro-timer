"use client";
import { useStateStore } from "@/store/Store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function cycles() {

    const setCycles = useStateStore((state) => state.setCycles)
    const cycles = useStateStore((state) => state.cycles)
    const router = useRouter()
    const [visible, setVisible] = useState(false)
    const resetCycles = useStateStore((state) => state.resetCycles)
    const resetShortBreak = useStateStore((state) => state.resetShortBreak)
    const resetLongBreak = useStateStore((state) => state.resetLongBreak)

    useEffect(() => {
        setTimeout(() => setVisible(true), 100); // Delay for effect
    }, []);

    const nextPage = () => {
        router.push("shortbreak/")
    }

    const previousPage = () => {
        router.push("/")
    }

    const homePage = () => {
        resetCycles()
        resetShortBreak()
        resetLongBreak()
        router.push("/")
    }

    return (
        <>
            <a onClick={homePage}><div className="m-5  text-4xl drop-shadow-2xl mb-0">
                Productivity Jam
            </div></a>
            <div className="w-touchscreenW h-touchscreenH bg-lavender flex justify-center">


                <div className='bg-overlay w-innerboxW h-innerboxH '>
                    <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
                        <div className="w-innerboxW h-innerboxH text-center">
                            <h2 className='pr-4 mt-20 text-4xl'>Cycles</h2>
                            <div className="flex justify-evenly pt-24">
                                <a onClick={() => setCycles(3)}><div tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-black active:bg-buttons ${cycles === 3 ? 'bg-buttons' : ''}`}>3</div></a>
                                <a onClick={() => setCycles(4)}><div tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-black active:bg-buttons ${cycles === 4 ? 'bg-buttons' : ''}`}>4</div></a>
                                <a onClick={() => setCycles(5)}><div tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-black active:bg-buttons ${cycles === 5 ? 'bg-buttons' : ''}`}>5</div></a>
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