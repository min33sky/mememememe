import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '밈 생성기',
  description: 'meme generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`overflow-y-scroll custom-scrollbar px-4 bg-slate-900 text-white ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
