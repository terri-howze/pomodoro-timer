

import "./globals.css";


export const metadata = {
  title: "Retro Arcade",
  description: "A cool app with Press Start 2P font",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>{children}</body>
    </html>
  );
}
