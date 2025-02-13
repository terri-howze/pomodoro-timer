"use client";
import { useStateStore } from '../../store/Store'
import { useRouter } from "next/navigation";

export default function longBreak() {

    const setCycles = useStateStore((state) => state.setCycles)
    const router = useRouter()

    const nextPage = () => {
        router.push("shortbreak/")
    }

    const previousPage = () => {
        router.push("selection")
    }

    return (
        <>
            <div>
                <h2>Cycles</h2>
            </div>
            <div>
                {/* Box Options for number of long break time*/}
                <div className="flex">
                    <a onClick={() => setCycles(3)}><div className="pl-2 size-12 bg-gray-50">3</div></a>
                    <a onClick={() => setCycles(4)}><div className="size-12 bg-blue-400">4</div></a>
                    <a onClick={() => setCycles(5)}><div className="size-12 bg-lime-200">5</div></a>
                </div>

            </div>
            <div>
                <button className='bg-slate-950' onClick={previousPage}></button>

            </div>
            <div>
                <button className='bg-slate-950' onClick={nextPage}></button>
            </div>
        </>
    )
}
