import '../styles/globals.css';
import localFont from 'next/font/local';

const myFont = localFont({
  src: '../public/fonts/PixelifySans-Bold.ttf',
});

export const metadata = {
  title: 'Productivity Jam',
  description: 'A Next.js 15 app using local fonts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
