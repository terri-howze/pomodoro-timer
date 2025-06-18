import '../styles/globals.css';
import localFont from 'next/font/local';
import TitleUpdate from './titleUpdate';



const myFont = localFont({
  src: '../public/fonts/PressStart2P-Regular.ttf',
});

export const metadata = {
  title: 'My app',
  description: 'A Next.js 15 app using local fonts',
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
