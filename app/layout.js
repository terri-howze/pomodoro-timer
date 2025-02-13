import { Press_Start_2P } from "next/font/google";
const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400" });

import "./globals.css";


export const metadata = {
  title: "Retro Arcade",
  description: "A cool app with Press Start 2P font",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={pressStart2P.className}>
      <body>{children}</body>
    </html>
  );
}
