"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import logoImage from "../assets/logo/logo.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const links = linksRef.current;
    const logo = logoRef.current;

    if (!nav || !links || !logo) return;

    // 链接hover效果
    const linkElements = links.querySelectorAll("a");
    const handleMouseEnter = (link: Element) => {
      gsap.to(link, {
        y: -2,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    const handleMouseLeave = (link: Element) => {
      gsap.to(link, {
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    linkElements.forEach((link) => {
      link.addEventListener("mouseenter", () => handleMouseEnter(link));
      link.addEventListener("mouseleave", () => handleMouseLeave(link));
    });

    // 设置初始状态（展开状态 - 顶部时显示）
    gsap.set(nav, {
      width: "calc(100vw - 2rem)",
      maxWidth: 1152,
      opacity: 1,
      y: 0,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 12,
      paddingBottom: 12,
    });

    gsap.set(links, {
      opacity: 1,
      width: "auto",
    });

    gsap.set(logo, {
      opacity: 1,
      scale: 1,
    });

    // 创建滚动动画
    // progress = 0 在顶部（展开），progress = 1 滚动150px（收缩）
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=150",
        scrub: 0.5,
      },
    });

    // 导航栏收缩
    scrollTl.to(
      nav,
      {
        width: 180,
        maxWidth: 180,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        duration: 1,
        ease: "power2.out",
      },
      0
    );

    // 导航选项收起
    scrollTl.to(
      links,
      {
        opacity: 0,
        width: 0,
        duration: 1,
        ease: "power2.out",
      },
      0
    );

    // Logo 缩小
    scrollTl.to(
      logo,
      {
        scale: 0.75,
        duration: 1,
        ease: "power2.out",
      },
      0
    );

    // 初始化函数：播放入场动画
    const initAnimations = () => {
      const scrollY = window.scrollY;
      const isAtTop = scrollY < 10;

      // 入场动画（从上方淡入）
      gsap.fromTo(
        nav,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        logo,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          delay: 0.5,
        }
      );

      // 刷新 ScrollTrigger 以同步当前滚动位置
      ScrollTrigger.refresh();
    };

    // 等待浏览器完成 hash 滚动后再初始化
    const scrollToHash = window.location.hash;
    if (scrollToHash) {
      const waitForScroll = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            initAnimations();
          });
        });
      };

      if (document.readyState === "complete") {
        waitForScroll();
      } else {
        window.addEventListener("load", waitForScroll, { once: true });
      }
    } else {
      initAnimations();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      linkElements.forEach((link) => {
        link.removeEventListener("mouseenter", () => handleMouseEnter(link));
        link.removeEventListener("mouseleave", () => handleMouseLeave(link));
      });
    };
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={navRef}
        className="flex items-center bg-white/40 dark:bg-zinc-800/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full"
        style={{
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 12,
          width: 180,
        }}
      >
        {/* Logo 区域 */}
        <div ref={leftRef} className="shrink-0">
          <Link href="/" className="block">
            <Image
              ref={logoRef}
              src={logoImage}
              alt="SPGA Logo"
              className="rounded-lg w-auto h-8"
            />
          </Link>
        </div>

        {/* 中间导航选项 */}
        <div
          ref={linksRef}
          className="flex-1 flex items-center justify-center gap-6 overflow-hidden"
          style={{ width: 0, opacity: 0 }}
        >
          <Link
            href="#about"
            className="text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
          >
            简介
          </Link>
          <Link
            href="#members"
            className="text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
          >
            成员
          </Link>
        </div>

        {/* 右侧主题切换 */}
        <div ref={rightRef} className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
