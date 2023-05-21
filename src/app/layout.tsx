import ModalContextProvider from '@/contexts/modalContext';
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
        className={`custom-scrollbar relative overflow-y-scroll bg-slate-100${inter.className}`}
      >
        <ModalContextProvider>{children}</ModalContextProvider>
      </body>
    </html>
  );
}
