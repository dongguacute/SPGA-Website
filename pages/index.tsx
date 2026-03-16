import { Geist, Geist_Mono } from "next/font/google";
import MaskReveal from "./components/MaskReveal";
import { Navbar } from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-background text-foreground`}
    >
      <Navbar />

      {/* 第一板块：全屏背景动画 */}
      <section className="relative h-screen w-full">
        <MaskReveal>
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 text-white drop-shadow-lg opacity-0 translate-y-8 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
              加入SPGA
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 drop-shadow-md mb-10 opacity-0 translate-y-8 animate-[slideUp_0.8s_ease-out_0.4s_forwards]">
              创造无限
            </p>
            <a
              href="https://wj.qq.com/s2/25771755/a5c2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 text-lg md:text-xl font-semibold text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 opacity-0 translate-y-8 animate-[slideUp_0.8s_ease-out_0.6s_forwards] hover:bg-[#FF9EB3]"
              style={{ backgroundColor: "#FFB7C5" }}
            >
              加入我们
            </a>
          </div>
        </MaskReveal>
      </section>

     
    </div>
  );
}
