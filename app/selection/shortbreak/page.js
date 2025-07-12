"use client";
import { useStateStore } from "@/store/Store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function longBreak() {
    const shortBreak = useStateStore((state) => state.shortBreak)
    const setShortBreak = useStateStore((state) => state.setShortBreak)
    const router = useRouter()
    const [visible, setVisible] = useState(false)
    const resetCycles = useStateStore((state) => state.resetCycles)
    const resetShortBreak = useStateStore((state) => state.resetShortBreak)
    const resetLongBreak = useStateStore((state) => state.resetLongBreak)
    const copyrightSymbol = "\u00A9";


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
        if (shortBreak != 0) {
            router.push("/selection/longbreak")
        }
    }

    const previousPage = () => {
        router.push("/selection/cycles")
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

            <div onClick={homePage} className="ml-24 mt-5 text-4xl drop-shadow-2xl mb-0 pl-2 flex cursor-pointer">
                <img src='/PJ Logo.png' className='h-20 -mt-2' ></img>
                <h1 className='text-textColor mt-4 ml-4'>Productivity Jam</h1>
            </div>
            <div className={`flex justify-center`}>

                <div className='bg-overlay w-screen h-mainDivVh ml-24 mr-24 mt-2 text-lavender flex justify-center rounded-lg'>
                    <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
                        <div className="w-innerboxW h-innerboxH text-center">
                            <h2 className='pr-4 mt-20 text-4xl'>Short Break</h2>
                            <div className="flex justify-evenly pt-24">
                                <div onClick={() => setShortBreak(4)} tabIndex="0" className={`size-20 cursor-pointer flex items-center justify-center rounded-lg text-3xl border-2 border-lavender active:bg-buttons hover:bg-lavender hover:text-textColor ${shortBreak === 4 ? 'bg-buttons text-textColor' : ''}`}>4</div>
                                <div onClick={() => setShortBreak(5)} tabIndex="0" className={`size-20 cursor-pointer flex items-center justify-center rounded-lg text-3xl border-2 border-lavender active:bg-buttons hover:bg-lavender hover:text-textColor ${shortBreak === 5 ? 'bg-buttons text-textColor' : ''}`}>5</div>
                                <div onClick={() => setShortBreak(6)} tabIndex="0" className={`size-20 cursor-pointer flex items-center justify-center rounded-lg text-3xl border-2 border-lavender active:bg-buttons hover:bg-lavender hover:text-textColor ${shortBreak === 6 ? 'bg-buttons text-textColor' : ''}`}>6</div>
                            </div>
                            <div className=" flex justify-evenly pt-20">
                                <button onClick={previousPage} className="px-4 py-2 text-2xl border-2 border-lavender hover:bg-lavender hover:text-textColor shadow-md  active:bg-buttons">
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
                <div className=" cursor-pointer flex">
                    <p><a href="https://github.com/terri-howze/pomodoro-timer">Github</a></p>
                    <a href="https://github.com/terri-howze/pomodoro-timer"><img width={25} height={25} src="/github.png"></img></a>
                </div>
                <p className='cursor-pointer'>  <a href='https://www.quintinodesigns.com'>Designs by Quintino Designs</a></p>
            </div>

        </>
    )
}
