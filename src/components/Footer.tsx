"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoImage from "@/assets/logo/logo.png";
import gudupaoLogo from "@/assets/logo/gudupao.png";
import { memo } from "react";

export const Footer = memo(function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isActive = (path: string) => pathname === path;

  return (
    <footer className="bg-white/40 dark:bg-zinc-800/60 backdrop-blur-xl border-t border-white/20 dark:border-zinc-700/50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="block">
            <Image
              src={logoImage}
              alt="SPGA Logo"
              className="rounded-lg w-auto h-12"
            />
          </Link>
        </div>

        {/* 导航链接 */}
        <nav className="flex justify-center items-center gap-8 mb-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/")
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            首页
          </Link>
          <Link
            href="/members"
            className={`text-sm font-medium transition-colors ${
              isActive("/members")
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            成员
          </Link>
          <a
            href="https://space.bilibili.com/642078584"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
          >
            联系
          </a>
        </nav>

        {/* 分隔线 */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-700/50 mb-6" />

        {/* 版权信息 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <p>&copy; {currentYear} SPGA Server All rights reserved.</p>
          <span className="hidden sm:inline">·</span>
          <p className="flex items-center gap-1.5">
            Maintained by{" "}
            <a
              href="https://gudupao.top"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src={gudupaoLogo}
                alt="Gudupao"
                className="h-5 w-auto rounded"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
});
