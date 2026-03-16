import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import { memo } from "react";

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

interface Member {
  name: string;
  role: string;
  avatar: string;
  isPlayer?: boolean;
}

const teamMembers: Member[] = [
  {
    name: "Demo_YS",
    role: "服主",
    avatar: "https://mc-heads.net/avatar/Demo_YS",
  },
  {
    name: "RimeRin",
    role: "运营总监",
    avatar: "https://mc-heads.net/avatar/RimeRin",
  },
  {
    name: "Mycatcher",
    role: "管理员",
    avatar: "https://mc-heads.net/avatar/Mycatcher",
  },
  {
    name: "LDX2010",
    role: "Gudupao Member",
    avatar: "https://mc-heads.net/avatar/LDX2010",
  },
  {
    name: "Cherry_Cute",
    role: "Gudupao Member",
    avatar: "https://mc-heads.net/avatar/Cherry_Cute",
  },
];

const players: Member[] = [
  { name: "whnet", role: "玩家", avatar: "https://mc-heads.net/avatar/whnet", isPlayer: true },
  { name: "Alot__Clef", role: "玩家", avatar: "https://mc-heads.net/avatar/Alot__Clef", isPlayer: true },
  { name: "45545554", role: "玩家", avatar: "https://mc-heads.net/avatar/45545554", isPlayer: true },
  { name: "luckgogo", role: "玩家", avatar: "https://mc-heads.net/avatar/luckgogo", isPlayer: true },
  { name: "I_WA", role: "玩家", avatar: "https://mc-heads.net/avatar/I_WA", isPlayer: true },
  { name: "Satsukiovog", role: "玩家", avatar: "https://mc-heads.net/avatar/Satsukiovog", isPlayer: true },
  { name: "zintur", role: "玩家", avatar: "https://mc-heads.net/avatar/zintur", isPlayer: true },
];

const MemberCard = memo(function MemberCard({ member }: { member: Member }) {
  return (
    <div className="group bg-white/40 dark:bg-zinc-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20 dark:border-zinc-700/50">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white/50 dark:ring-zinc-600/50 shadow-md group-hover:ring-primary/50 transition-all duration-300">
            <Image
              src={member.avatar}
              alt={member.name}
              width={80}
              height={80}
              className="pixelated"
              unoptimized
              loading="lazy"
            />
          </div>
          {!member.isPlayer && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-800" title="在线" />
          )}
        </div>
        <h3 className="text-lg font-bold text-center text-zinc-900 dark:text-white mb-1">
          {member.name}
        </h3>
        <span className={`text-sm px-3 py-1 rounded-full ${
          member.isPlayer 
            ? "bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300" 
            : "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground font-medium"
        }`}>
          {member.role}
        </span>
      </div>
    </div>
  );
});

export default function Members() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-background text-foreground`}
    >
      <main className="pt-24 px-8 max-w-6xl mx-auto pb-16">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
            成员列表
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            认识我们的团队与玩家社区
          </p>
        </div>

        {/* 团队核心成员 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">团队核心</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {teamMembers.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* 玩家列表 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-zinc-500 to-transparent rounded-full" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">玩家社区</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {players.map((player) => (
              <MemberCard key={player.name} member={player} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
