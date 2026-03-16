import { Geist, Geist_Mono } from "next/font/google";
import MaskReveal from "@/components/MaskReveal";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-background text-foreground`}
    >
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

      {/* 第二板块：关于SPGA */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20 bg-gradient-to-b from-background to-background/95">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* 左边 Logo */}
          <div className="flex-shrink-0">
            <Image src={logo} alt="SPGA" width={256} height={256} />
          </div>
          
          {/* 右边文字 */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              关于我们
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              SPGA（樱花生电联盟）服务器是Bilibili(b站)UP主，羊石_Demo（Demo_YS）在2026年初创立的Minecraft离线生电服务器，现在服务器由Gudupao运营，属于Gudupao旗下产品之一，由旗下工作室樱花生电联盟管理工作室负责。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
