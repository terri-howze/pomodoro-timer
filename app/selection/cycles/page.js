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
    const copyrightSymbol = "\u00A9";

    useEffect(() => {
        setTimeout(() => setVisible(true), 100); // Delay for effect
    }, []);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const navEntries = performance.getEntriesByType('navigation')
            const alreadyVisited = sessionStorage.getItem('alreadyVisited');

            if (navEntries.length > 0 && navEntries[0].type === 'reload' && !alreadyVisited) {
                sessionStorage.setItem('alreadyVisited', 'true');
                router.replace('/');
            }

        }
    }, []);

    useEffect(() => {
        const resetVisited = () => sessionStorage.removeItem('alreadyVisited');
        window.addEventListener('beforeunload', resetVisited);
        return () => window.removeEventListener('beforeunload', resetVisited);
    }, []);


    const nextPage = () => {
        if (cycles != 0) {
            router.push("/selection/shortbreak")
        }
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

            <div onClick={homePage} className="ml-24 mt-5 text-4xl drop-shadow-2xl mb-0 pl-2 flex">
                <img src='/PJ Logo.png' className='h-20 -mt-2' ></img>
                <h1 className='text-textColor mt-4 ml-4'>Productivity Jam</h1>
            </div>
            <div className={`flex justify-center`}>
                <div className='bg-overlay w-screen h-mainDivVh ml-24 mr-24 mt-2 text-lavender flex justify-center rounded-lg'>
                    <div className={`flex justify-end bottom-0 w-innerboxW h-innerboxH transition-opacity duration-1000 `}>
                        <div className="w-innerboxW h-innerboxH text-center">
                            <h2 className='pr-4 mt-20 text-4xl'>Cycles</h2>
                            <div className="flex justify-evenly pt-24">
                                <div onClick={() => setCycles(3)} tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-lavender active:bg-buttons hover:bg-lavender hover:text-textColor ${cycles === 3 ? 'bg-buttons text-textColor' : ''}`}>3</div>
                                <div onClick={() => setCycles(4)} tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-lavender active:bg-buttons hover:bg-lavender hover:text-textColor ${cycles === 4 ? 'bg-buttons text-textColor' : ''}`}>4</div>
                                <div onClick={() => setCycles(5)} tabIndex="0" className={`size-20 flex items-center justify-center rounded-lg text-3xl border-2 border-lavender active:bg-buttons  hover:bg-lavender hover:text-textColor ${cycles === 5 ? 'text-textColor bg-buttons ' : ''}`}>5</div>
                            </div>
                            <div className=" flex justify-evenly pt-20 ">
                                <button onClick={previousPage} className="px-4 py-2 text-2xl border-2 border-lavender hover:bg-lavender hover:text-textColor shadow-md  active:bg-buttons ">
                                    ← Previous
                                </button>
                                <button onClick={nextPage} className="px-4 py-2 text-2xl border-2 border-lavender hover:bg-lavender hover:text-textColor shadow-md  active:bg-buttons">
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-6 align-middle text-center flex justify-evenly'>

                <p>Copyright {copyrightSymbol} 2025 Terri Howze</p>
                <div className="flex">
                    <p><a href="https://github.com/terri-howze/pomodoro-timer">Github</a></p>
                    <a href="https://github.com/terri-howze/pomodoro-timer"><img width={25} height={25} src="/github.png"></img></a>
                </div>
                <p> Designs by <a href='https://www.quintinodesigns.com'>Quintino Designs</a></p>
            </div>

        </>

    )
}