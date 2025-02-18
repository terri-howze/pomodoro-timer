"use client";
import { useStateStore } from "@/store/Store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function cycles() {

    const setCycles = useStateStore((state) => state.setCycles)
    cycles = useStateStore((state) => state.cycles)
    const router = useRouter()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => setVisible(true), 100); // Delay for effect
    }, []);

    const nextPage = () => {
        router.push("shortbreak/")
    }

    const previousPage = () => {
        router.push("/")
    }

    return (
        <>
            <> <div className="m-5 font-pixel text-4xl drop-shadow-2xl mb-0">
                Productivity Jam
            </div>
                <div className="w-touchscreenW h-touchscreenH bg-lavender flex justify-center">


                    <div className='bg-overlay w-innerboxW h-innerboxH '>
                        <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
                            <div className="w-innerboxW h-innerboxH text-center">
                            <h2 className='pr-4 mt-20 font-pixel text-4xl'>Cycles</h2>
                            <div className="flex justify-evenly pt-36">
                                <a onClick={() => setCycles(3)}><div tabIndex="0" className={` pl-2 size-20 rounded-lg text-center active:bg-violet-700 ${cycles === 3 ? 'bg-violet-700' : 'bg-buttons'}`}>3</div></a>
                                <a onClick={() => setCycles(4)}><div tabIndex="0" className={` pl-2 size-20 rounded-lg text-center active:bg-violet-700 ${cycles === 4 ? 'bg-violet-700' : 'bg-buttons'}`}>4</div></a>
                                <a onClick={() => setCycles(5)}><div tabIndex="0" className={` pl-2 size-20 rounded-lg text-center active:bg-violet-700 ${cycles === 5 ? 'bg-violet-700' : 'bg-buttons'}`}>5</div></a>
                            </div>
                            <div className="h-innerboxH bottom-0">
                                <button>Previous</button>
                                <button>Next</button>
                                </div>
                            </div>
                            <img className={`h-imageH transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} src='/pixel.png'></img>
                        </div>
                    </div>
                </div>
            </>
        </>

    )
}