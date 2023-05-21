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
        className={`overflow-y-scroll custom-scrollbar px-2 lg:px-0 bg-slate-100 ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
