"use client";
import { create } from "zustand";
export const useStateStore = create((set) => ({
    //cycle state + functions
    cycles: 0,
    setCycles: (numcycles) => set({ cycles: numcycles }),
    resetCycles: () => set({ cycles: 0 }),

    //short break state + functions
    shortBreak: 0,
    setShortBreak: (shortBreakTime) => set({ shortBreak: shortBreakTime }),
    resetShortBreak: () => set({ shortBreak: 0 }),

    //long break state + functions
    longBreak: 0,
    setLongBreak: (longBreakTime) => set({ longBreak: longBreakTime }),
    resetLongBreak: () => set({ longBreak: 0 }),

    //Time

    isPaused: false,
    pauseTimer: () => set({ isPaused: true }),
    resumeTimer: () => set({ isPaused: false }),

}))

