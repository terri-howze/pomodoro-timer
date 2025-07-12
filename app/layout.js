import '../styles/globals.css';
import localFont from 'next/font/local';
import TitleUpdate from './titleUpdate';



const myFont = localFont({
  src: '../public/fonts/PressStart2P-Regular.ttf',
});

export const metadata = {
  title: 'Productivity Jam Pomodoro Timer',
  description: 'A peaceful pomodoro study timer with cozy pixel art. Focus your mind, take gentle breaks, and build better habits—one calm session at a time.',
  keywords: ['pomodoro', 'timer', 'productivity', 'stardew valley', 'focus', 'study', 'cozy'],
  authors: [ { name: 'Terri Howze', url: 'https://github.com/terri-howze/' }],
  creator: 'Terri Howze',
  icons: {
    icon: '/favicon/PJ Logo.png'
  }
};

export default function RootLayout({ children }) {


  return (
    <>

      <html lang="en">
        <body className={myFont.className}>
          <TitleUpdate />
          {children}</body>
      </html>
    </>
  );
}
