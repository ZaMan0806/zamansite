import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";

const myeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={myeongjo.className}>
      <style>{`body { background: #ffffff; color: #000000; }`}</style>
      {children}
    </div>
  );
}
