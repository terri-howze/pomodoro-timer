import '../styles/globals.css';
import localFont from 'next/font/local';
import TitleUpdate from './titleUpdate';



const myFont = localFont({
  src: '../public/fonts/PressStart2P-Regular.ttf',
});

export const metadata = {
  title: 'Productivity Jam',
  description: 'A peaceful study timer with cozy pixel art. Focus your mind, take gentle breaks, and build better habits—one calm session at a time.',
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
