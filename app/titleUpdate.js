"use client";
import '../styles/globals.css';
import { useStateStore } from '@/store/Store';
import Head from 'next/head';
import { useState } from 'react';
import { useEffect } from 'react';




export default function TitleUpdate({ children }) {
    const timeRemaining = useStateStore((state) => state.timeRemaining)
    const [title, setTitle] = useState('My App');

    useEffect(() => {
      setTitle(timeRemaining > 0 ? `${String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:${String(timeRemaining % 60).padStart(2, '0')}` : 'My App');
    }, [timeRemaining]);
  
  return (
    <>
    <Head>
      <title>
        Title
        {title}
      </title>
    </Head>
    </>
  );
}
