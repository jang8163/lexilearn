import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LexiLearn - 영어 발음 연습 AI 시스템",
  description: "표현과 단어로 영어 실력을 향상시켜보세요! 실용적인 영어 표현을 듣고 따라 말하며 AI 발음 평가를 받을 수 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
