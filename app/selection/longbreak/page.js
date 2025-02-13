"use client";
import { useStateStore } from '../../store/Store'
import { useRouter } from "next/navigation";

export default function longBreak() {
    const longBreak = useStateStore((state) => state.longBreak)
    const setLongBreak = useStateStore((state) => state.setLongBreak)
    const router = useRouter()

    return (
        <>
            <div>
                <h2>Long Break Time</h2>
            </div>
            <div>
                {/* Box Options for number of long break time*/}
                <div className="flex">
                    <a onClick={() => setLongBreak(15)}><div className="pl-2 size-12 bg-gray-50">15</div></a>
                    <a onClick={() => setLongBreak(20)}><div className="size-12 bg-blue-400">20</div></a>
                    <a onClick={() => setLongBreak(25)}><div className="size-12 bg-lime-200">25</div></a>
                </div>
            </div>
        </>
    )
}
