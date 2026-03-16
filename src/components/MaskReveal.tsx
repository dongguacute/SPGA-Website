import { useEffect, useRef, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";

// 导入背景图片
import backgroundImage from "@/assets/home/background.jpg";
import mobileBackground from "@/assets/home/mobile.jpg";

// 静态导入所有 tile 图片
import tile_r0_c0 from "@/assets/home/tile_r0_c0.jpg";
import tile_r0_c1 from "@/assets/home/tile_r0_c1.jpg";
import tile_r0_c2 from "@/assets/home/tile_r0_c2.jpg";
import tile_r0_c3 from "@/assets/home/tile_r0_c3.jpg";
import tile_r0_c4 from "@/assets/home/tile_r0_c4.jpg";
import tile_r0_c5 from "@/assets/home/tile_r0_c5.jpg";
import tile_r1_c0 from "@/assets/home/tile_r1_c0.jpg";
import tile_r1_c1 from "@/assets/home/tile_r1_c1.jpg";
import tile_r1_c2 from "@/assets/home/tile_r1_c2.jpg";
import tile_r1_c3 from "@/assets/home/tile_r1_c3.jpg";
import tile_r1_c4 from "@/assets/home/tile_r1_c4.jpg";
import tile_r1_c5 from "@/assets/home/tile_r1_c5.jpg";
import tile_r2_c0 from "@/assets/home/tile_r2_c0.jpg";
import tile_r2_c1 from "@/assets/home/tile_r2_c1.jpg";
import tile_r2_c2 from "@/assets/home/tile_r2_c2.jpg";
import tile_r2_c3 from "@/assets/home/tile_r2_c3.jpg";
import tile_r2_c4 from "@/assets/home/tile_r2_c4.jpg";
import tile_r2_c5 from "@/assets/home/tile_r2_c5.jpg";
import tile_r3_c0 from "@/assets/home/tile_r3_c0.jpg";
import tile_r3_c1 from "@/assets/home/tile_r3_c1.jpg";
import tile_r3_c2 from "@/assets/home/tile_r3_c2.jpg";
import tile_r3_c3 from "@/assets/home/tile_r3_c3.jpg";
import tile_r3_c4 from "@/assets/home/tile_r3_c4.jpg";
import tile_r3_c5 from "@/assets/home/tile_r3_c5.jpg";
import tile_r4_c0 from "@/assets/home/tile_r4_c0.jpg";
import tile_r4_c1 from "@/assets/home/tile_r4_c1.jpg";
import tile_r4_c2 from "@/assets/home/tile_r4_c2.jpg";
import tile_r4_c3 from "@/assets/home/tile_r4_c3.jpg";
import tile_r4_c4 from "@/assets/home/tile_r4_c4.jpg";
import tile_r4_c5 from "@/assets/home/tile_r4_c5.jpg";
import tile_r5_c0 from "@/assets/home/tile_r5_c0.jpg";
import tile_r5_c1 from "@/assets/home/tile_r5_c1.jpg";
import tile_r5_c2 from "@/assets/home/tile_r5_c2.jpg";
import tile_r5_c3 from "@/assets/home/tile_r5_c3.jpg";
import tile_r5_c4 from "@/assets/home/tile_r5_c4.jpg";
import tile_r5_c5 from "@/assets/home/tile_r5_c5.jpg";

// 图片映射
const tileImages: Record<string, StaticImageData> = {
  tile_r0_c0,
  tile_r0_c1,
  tile_r0_c2,
  tile_r0_c3,
  tile_r0_c4,
  tile_r0_c5,
  tile_r1_c0,
  tile_r1_c1,
  tile_r1_c2,
  tile_r1_c3,
  tile_r1_c4,
  tile_r1_c5,
  tile_r2_c0,
  tile_r2_c1,
  tile_r2_c2,
  tile_r2_c3,
  tile_r2_c4,
  tile_r2_c5,
  tile_r3_c0,
  tile_r3_c1,
  tile_r3_c2,
  tile_r3_c3,
  tile_r3_c4,
  tile_r3_c5,
  tile_r4_c0,
  tile_r4_c1,
  tile_r4_c2,
  tile_r4_c3,
  tile_r4_c4,
  tile_r4_c5,
  tile_r5_c0,
  tile_r5_c1,
  tile_r5_c2,
  tile_r5_c3,
  tile_r5_c4,
  tile_r5_c5,
};

interface TileData {
  file: string;
  row: number;
  col: number;
  center_x: number;
  center_y: number;
  distance_to_tree: number;
}

interface ContentStage {
  name: string;
  tiles: string[];
}

interface RevealConfig {
  tiles: TileData[];
  contentStages: ContentStage[];
}

const revealConfig: RevealConfig = {
  tiles: [
    { file: "tile_r2_c3.jpg", row: 2, col: 3, center_x: 1193.5, center_y: 535.0, distance_to_tree: 169.56514972127968 },
    { file: "tile_r2_c2.jpg", row: 2, col: 2, center_x: 852.5, center_y: 535.0, distance_to_tree: 171.56439024459593 },
    { file: "tile_r3_c3.jpg", row: 3, col: 3, center_x: 1193.5, center_y: 749.0, distance_to_tree: 269.32645618282663 },
    { file: "tile_r3_c2.jpg", row: 3, col: 2, center_x: 852.5, center_y: 749.0, distance_to_tree: 270.5896154696259 },
    { file: "tile_r1_c3.jpg", row: 1, col: 3, center_x: 1193.5, center_y: 321.0, distance_to_tree: 276.69466926560034 },
    { file: "tile_r1_c2.jpg", row: 1, col: 2, center_x: 852.5, center_y: 321.0, distance_to_tree: 277.92434222284305 },
    { file: "tile_r4_c3.jpg", row: 4, col: 3, center_x: 1193.5, center_y: 963.0, distance_to_tree: 455.9749335215699 },
    { file: "tile_r4_c2.jpg", row: 4, col: 2, center_x: 852.5, center_y: 963.0, distance_to_tree: 456.7221693765259 },
    { file: "tile_r0_c3.jpg", row: 0, col: 3, center_x: 1193.5, center_y: 107.0, distance_to_tree: 464.7144714768413 },
    { file: "tile_r0_c2.jpg", row: 0, col: 2, center_x: 852.5, center_y: 107.0, distance_to_tree: 465.44767697347027 },
    { file: "tile_r2_c4.jpg", row: 2, col: 4, center_x: 1534.5, center_y: 535.0, distance_to_tree: 510.5216351928682 },
    { file: "tile_r2_c1.jpg", row: 2, col: 1, center_x: 511.5, center_y: 535.0, distance_to_tree: 512.5215507664044 },
    { file: "tile_r3_c4.jpg", row: 3, col: 4, center_x: 1534.5, center_y: 749.0, distance_to_tree: 551.7397393699316 },
    { file: "tile_r3_c1.jpg", row: 3, col: 1, center_x: 511.5, center_y: 749.0, distance_to_tree: 553.5907694317166 },
    { file: "tile_r1_c4.jpg", row: 1, col: 4, center_x: 1534.5, center_y: 321.0, distance_to_tree: 555.3736940115186 },
    { file: "tile_r1_c1.jpg", row: 1, col: 1, center_x: 511.5, center_y: 321.0, distance_to_tree: 557.2126524048067 },
    { file: "tile_r5_c3.jpg", row: 5, col: 3, center_x: 1193.5, center_y: 1177.5, distance_to_tree: 659.9387016988776 },
    { file: "tile_r5_c2.jpg", row: 5, col: 2, center_x: 852.5, center_y: 1177.5, distance_to_tree: 660.4552142272784 },
    { file: "tile_r4_c4.jpg", row: 4, col: 4, center_x: 1534.5, center_y: 963.0, distance_to_tree: 663.1690131482321 },
    { file: "tile_r4_c1.jpg", row: 4, col: 1, center_x: 511.5, center_y: 963.0, distance_to_tree: 664.7098163860678 },
    { file: "tile_r0_c4.jpg", row: 0, col: 4, center_x: 1534.5, center_y: 107.0, distance_to_tree: 669.2081440030448 },
    { file: "tile_r0_c1.jpg", row: 0, col: 1, center_x: 511.5, center_y: 107.0, distance_to_tree: 670.7350743773579 },
    { file: "tile_r5_c4.jpg", row: 5, col: 4, center_x: 1534.5, center_y: 1177.5, distance_to_tree: 816.9449736671376 },
    { file: "tile_r5_c1.jpg", row: 5, col: 1, center_x: 511.5, center_y: 1177.5, distance_to_tree: 818.196241741552 },
    { file: "tile_r2_c5.jpg", row: 2, col: 5, center_x: 1876.5, center_y: 535.0, distance_to_tree: 852.5129559132811 },
    { file: "tile_r2_c0.jpg", row: 2, col: 0, center_x: 170.5, center_y: 535.0, distance_to_tree: 853.5129407337653 },
    { file: "tile_r3_c5.jpg", row: 3, col: 5, center_x: 1876.5, center_y: 749.0, distance_to_tree: 877.8170310491817 },
    { file: "tile_r3_c0.jpg", row: 3, col: 0, center_x: 170.5, center_y: 749.0, distance_to_tree: 878.7882224973205 },
    { file: "tile_r1_c5.jpg", row: 1, col: 5, center_x: 1876.5, center_y: 321.0, distance_to_tree: 880.1056413863054 },
    { file: "tile_r1_c0.jpg", row: 1, col: 0, center_x: 170.5, center_y: 321.0, distance_to_tree: 881.0743101464257 },
    { file: "tile_r4_c5.jpg", row: 4, col: 5, center_x: 1876.5, center_y: 963.0, distance_to_tree: 951.808352558434 },
    { file: "tile_r4_c0.jpg", row: 4, col: 0, center_x: 170.5, center_y: 963.0, distance_to_tree: 952.7041198609356 },
    { file: "tile_r0_c5.jpg", row: 0, col: 5, center_x: 1876.5, center_y: 107.0, distance_to_tree: 956.0259096907363 },
    { file: "tile_r0_c0.jpg", row: 0, col: 0, center_x: 170.5, center_y: 107.0, distance_to_tree: 956.9177289610637 },
    { file: "tile_r5_c5.jpg", row: 5, col: 5, center_x: 1876.5, center_y: 1177.5, distance_to_tree: 1064.6807455758744 },
    { file: "tile_r5_c0.jpg", row: 5, col: 0, center_x: 170.5, center_y: 1177.5, distance_to_tree: 1065.4816234923999 },
  ],
  contentStages: [
    {
      name: "sky",
      tiles: [
        "tile_r0_c0.jpg", "tile_r0_c1.jpg", "tile_r0_c2.jpg", "tile_r0_c3.jpg", "tile_r0_c4.jpg", "tile_r0_c5.jpg",
        "tile_r1_c0.jpg", "tile_r1_c1.jpg", "tile_r1_c4.jpg", "tile_r1_c5.jpg"
      ]
    },
    {
      name: "ground_environment",
      tiles: [
        "tile_r2_c0.jpg", "tile_r2_c1.jpg", "tile_r2_c4.jpg", "tile_r2_c5.jpg",
        "tile_r3_c0.jpg", "tile_r3_c1.jpg", "tile_r3_c4.jpg", "tile_r3_c5.jpg",
        "tile_r4_c0.jpg", "tile_r4_c1.jpg", "tile_r4_c2.jpg", "tile_r4_c3.jpg", "tile_r4_c4.jpg", "tile_r4_c5.jpg",
        "tile_r5_c0.jpg", "tile_r5_c1.jpg", "tile_r5_c2.jpg", "tile_r5_c3.jpg", "tile_r5_c4.jpg", "tile_r5_c5.jpg"
      ]
    },
    {
      name: "sakura_tree",
      tiles: [
        "tile_r1_c2.jpg", "tile_r1_c3.jpg",
        "tile_r2_c2.jpg", "tile_r2_c3.jpg",
        "tile_r3_c2.jpg", "tile_r3_c3.jpg"
      ]
    }
  ]
};

const typedRevealConfig = revealConfig;

// 定义优先加载的图片（樱花树核心区域）
const PRIORITY_TILES = new Set([
  "tile_r2_c2.jpg",
  "tile_r2_c3.jpg",
  "tile_r3_c2.jpg",
  "tile_r3_c3.jpg",
]);

// 定义预加载的图片（第二优先级）
const PRELOAD_TILES = new Set([
  "tile_r1_c2.jpg",
  "tile_r1_c3.jpg",
  "tile_r4_c2.jpg",
  "tile_r4_c3.jpg",
]);

interface MaskRevealProps {
  className?: string;
  children?: React.ReactNode;
}

export default function MaskReveal({
  className = "",
  children,
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const revealOrder = typedRevealConfig.tiles;

  const tileStageMap: Record<string, number> = useMemo(() => {
    const map: Record<string, number> = {};
    typedRevealConfig.contentStages.forEach((stage, index) => {
      stage.tiles.forEach((tileName) => {
        map[tileName] = index + 1;
      });
    });
    return map;
  }, []);

  const totalImages = useMemo(() => revealOrder.length + 1, [revealOrder.length]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
        setIsReady(true);
      }
      return newCount;
    });
  };

  const getLoadingPriority = (fileName: string): boolean => {
    return PRIORITY_TILES.has(fileName);
  };

  const shouldPreload = (fileName: string): boolean => {
    return PRELOAD_TILES.has(fileName);
  };

  useEffect(() => {
    if (!containerRef.current || !isReady) return;

    const stageTiles: Record<number, HTMLDivElement[]> = {};
    tilesRef.current.forEach((el, fileName) => {
      const stage = tileStageMap[fileName] ?? 1;
      if (!stageTiles[stage]) stageTiles[stage] = [];
      stageTiles[stage].push(el);
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationComplete(true);
      },
    });

    const sortedStages = Object.keys(stageTiles)
      .map(Number)
      .sort((a, b) => a - b);

    sortedStages.forEach((stage) => {
      tl.to(
        stageTiles[stage],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.03,
        },
        stage <= 2 ? 0 : 0.72
      );
    });

    return () => {
      tl.kill();
    };
  }, [tileStageMap, isReady]);

  const setTileRef = (fileName: string) => (el: HTMLDivElement | null) => {
    if (el) {
      tilesRef.current.set(fileName, el);
    } else {
      tilesRef.current.delete(fileName);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* 背景图片 */}
      <Image
        src={isMobile ? mobileBackground : backgroundImage}
        alt="background"
        fill
        style={{ objectFit: "cover" }}
        priority
        unoptimized
        onLoad={handleImageLoad}
      />

      {/* 毛玻璃遮罩层 */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
          backdropFilter: "blur(8px) saturate(150%)",
          WebkitBackdropFilter: "blur(8px) saturate(150%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] hidden dark:block"
        style={{
          background: "linear-gradient(180deg, rgba(24, 24, 27, 0.5) 0%, rgba(24, 24, 27, 0.6) 50%, rgba(24, 24, 27, 0.8) 100%)",
          backdropFilter: "blur(8px) saturate(150%)",
          WebkitBackdropFilter: "blur(8px) saturate(150%)",
        }}
      />

      {/* Tile 网格 - 仅在桌面端显示 */}
      {!isMobile && (
        <div className="absolute inset-0 z-[2] grid grid-cols-6 grid-rows-6">
          {revealOrder.map((tile) => {
            const imageName = tile.file.replace(".jpg", "");
            const imageSrc = tileImages[imageName];
            const isPriority = getLoadingPriority(tile.file);
            const shouldPreloadTile = shouldPreload(tile.file);

            return (
              <div
                key={tile.file}
                ref={setTileRef(tile.file)}
                className="relative w-full h-full overflow-hidden"
                style={{
                  gridRow: tile.row + 1,
                  gridColumn: tile.col + 1,
                  opacity: 0,
                  transform: "translateY(40px)",
                }}
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={`tile-${tile.row}-${tile.col}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority={isPriority}
                    loading={isPriority || shouldPreloadTile ? "eager" : "lazy"}
                    unoptimized
                    onLoad={handleImageLoad}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 前景内容 */}
      {children && animationComplete && (
        <div className="absolute inset-0 z-[3] flex items-center justify-center animate-[fadeIn_0.8s_ease-out_forwards]">
          {children}
        </div>
      )}
    </div>
  );
}
