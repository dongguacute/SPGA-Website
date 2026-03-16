import { Geist, Geist_Mono } from "next/font/google";
import MaskReveal from "./components/MaskReveal";
import revealOrder from "./assets/home/reveal_order.json";

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
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-zinc-50 dark:bg-black`}
    >
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
          SPGA 遮罩渐显效果
        </h1>
        <div className="w-full max-w-5xl">
          <MaskReveal
            revealOrder={revealOrder as any[]}
            gridCols={6}
            gridRows={6}
            imageWidth={2046}
            imageHeight={1285}
            tileWidth={341}
            tileHeight={214}
          />
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full hover:opacity-80 transition-opacity"
        >
          重新播放动画
        </button>
      </main>
    </div>
  );
}
