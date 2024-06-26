import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import '@/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>NWSearch</title>
        <link rel="icon" href="nw.png" />
      </head>
      <body className={inter.className}>
        <Image
          src={'/nw.png'}
          height={33}
          width={64}
          alt="NW"
          className="inline"
        />
        <h1 className="text-3xl inline-block font-serif">Search</h1>
        {children}
      </body>
    </html>
  );
}
