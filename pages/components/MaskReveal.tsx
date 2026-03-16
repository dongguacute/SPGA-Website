import { useEffect, useRef, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import revealConfig from "../assets/home/reveal_config.json";

// 导入背景图片
import backgroundImage from "../assets/home/background.jpg";

// 静态导入所有 tile 图片
import tile_r0_c0 from "../assets/home/tile_r0_c0.jpg";
import tile_r0_c1 from "../assets/home/tile_r0_c1.jpg";
import tile_r0_c2 from "../assets/home/tile_r0_c2.jpg";
import tile_r0_c3 from "../assets/home/tile_r0_c3.jpg";
import tile_r0_c4 from "../assets/home/tile_r0_c4.jpg";
import tile_r0_c5 from "../assets/home/tile_r0_c5.jpg";
import tile_r1_c0 from "../assets/home/tile_r1_c0.jpg";
import tile_r1_c1 from "../assets/home/tile_r1_c1.jpg";
import tile_r1_c2 from "../assets/home/tile_r1_c2.jpg";
import tile_r1_c3 from "../assets/home/tile_r1_c3.jpg";
import tile_r1_c4 from "../assets/home/tile_r1_c4.jpg";
import tile_r1_c5 from "../assets/home/tile_r1_c5.jpg";
import tile_r2_c0 from "../assets/home/tile_r2_c0.jpg";
import tile_r2_c1 from "../assets/home/tile_r2_c1.jpg";
import tile_r2_c2 from "../assets/home/tile_r2_c2.jpg";
import tile_r2_c3 from "../assets/home/tile_r2_c3.jpg";
import tile_r2_c4 from "../assets/home/tile_r2_c4.jpg";
import tile_r2_c5 from "../assets/home/tile_r2_c5.jpg";
import tile_r3_c0 from "../assets/home/tile_r3_c0.jpg";
import tile_r3_c1 from "../assets/home/tile_r3_c1.jpg";
import tile_r3_c2 from "../assets/home/tile_r3_c2.jpg";
import tile_r3_c3 from "../assets/home/tile_r3_c3.jpg";
import tile_r3_c4 from "../assets/home/tile_r3_c4.jpg";
import tile_r3_c5 from "../assets/home/tile_r3_c5.jpg";
import tile_r4_c0 from "../assets/home/tile_r4_c0.jpg";
import tile_r4_c1 from "../assets/home/tile_r4_c1.jpg";
import tile_r4_c2 from "../assets/home/tile_r4_c2.jpg";
import tile_r4_c3 from "../assets/home/tile_r4_c3.jpg";
import tile_r4_c4 from "../assets/home/tile_r4_c4.jpg";
import tile_r4_c5 from "../assets/home/tile_r4_c5.jpg";
import tile_r5_c0 from "../assets/home/tile_r5_c0.jpg";
import tile_r5_c1 from "../assets/home/tile_r5_c1.jpg";
import tile_r5_c2 from "../assets/home/tile_r5_c2.jpg";
import tile_r5_c3 from "../assets/home/tile_r5_c3.jpg";
import tile_r5_c4 from "../assets/home/tile_r5_c4.jpg";
import tile_r5_c5 from "../assets/home/tile_r5_c5.jpg";

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

const typedRevealConfig = revealConfig as RevealConfig;

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

  const totalImages = revealOrder.length + 1;

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

    Object.keys(stageTiles)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((stage) => {
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
        src={backgroundImage}
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

      {/* Tile 网格 */}
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

      {/* 前景内容 */}
      {children && animationComplete && (
        <div className="absolute inset-0 z-[3] flex items-center justify-center animate-[fadeIn_0.8s_ease-out_forwards]">
          {children}
        </div>
      )}
    </div>
  );
}
