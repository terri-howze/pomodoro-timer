"use client";
import { useStateStore } from '../../store/Store'
import { useRouter } from "next/navigation";

export default function longBreak() {
    const shortBreak = useStateStore((state) => state.shortBreak)
    const setShortBreak = useStateStore((state) => state.setShortBreak)
    const router = useRouter()

    const nextPage = () => {
        router.push("longbreak/")
    }

    const previousPage = () => {
        router.push("cycles/")
    }

    return (
        <>
            <div>
                <h2>Short Break Time</h2>
            </div>
            <div>
                {/* Box Options for number of long break time*/}
                <div className="flex">
                    <a onClick={() => setShortBreak(4)}><div className="pl-2 size-12 bg-gray-50">4</div></a>
                    <a onClick={() => setShortBreak(5)}><div className="size-12 bg-blue-400">5</div></a>
                    <a onClick={() => setShortBreak(6)}><div className="size-12 bg-lime-200">6</div></a>
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
