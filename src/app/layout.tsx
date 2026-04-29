import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SeongHeon Sim — Backend Developer Portfolio',
  description:
    '결제 도메인의 신뢰성을 만들어 온 백엔드 개발자 심성헌의 기술 포트폴리오',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
