"use client";
import { useStateStore } from "@/store/Store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function cycles() {

    const setCycles = useStateStore((state) => state.setCycles)
    const router = useRouter()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => setVisible(true), 100); // Delay for effect
    }, []);

    const nextPage = () => {
        router.push("shortbreak/")
    }

    const previousPage = () => {
        router.push("selection")
    }

    return (
        <>
            <> <div className="m-5 font-pixel text-4xl drop-shadow-2xl mb-0">
                Productivity Jam
            </div>
                <div className="w-touchscreenW h-touchscreenH bg-lavender flex justify-center">


                    <div className='bg-overlay w-innerboxW h-innerboxH '>
                        <div className='flex justify-end bottom-0 w-innerboxW h-innerboxH'>
                            <h2 className='pr-4 mt-20 font-pixel text-3xl'>Cycles</h2>
                            <div className="flex">
                                <a onClick={() => setCycles(3)}><div className="pl-2 size-12 bg-gray-50">3</div></a>
                                <a onClick={() => setCycles(4)}><div className="size-12 bg-blue-400">4</div></a>
                                <a onClick={() => setCycles(5)}><div className="size-12 bg-lime-200">5</div></a>
                            </div>
                            <img className={`h-imageH transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} src='/pixel.png'></img>
                        </div>
                    </div>
                </div>
            </>


            <div>
                <button className='bg-slate-950 text-gray-50' onClick={previousPage}>Previous</button>

            </div>
            <div>
                <button className='bg-slate-950 text-gray-50' onClick={nextPage}>Next</button>
            </div>
        </>

    )
}