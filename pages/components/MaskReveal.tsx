import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import contentRevealConfig from "../assets/home/content_reveal_order.json";

// 静态导入所有 tile 图片
import tile_r0_c0 from "../assets/home/tile_r0_c0.png";
import tile_r0_c1 from "../assets/home/tile_r0_c1.png";
import tile_r0_c2 from "../assets/home/tile_r0_c2.png";
import tile_r0_c3 from "../assets/home/tile_r0_c3.png";
import tile_r0_c4 from "../assets/home/tile_r0_c4.png";
import tile_r0_c5 from "../assets/home/tile_r0_c5.png";
import tile_r1_c0 from "../assets/home/tile_r1_c0.png";
import tile_r1_c1 from "../assets/home/tile_r1_c1.png";
import tile_r1_c2 from "../assets/home/tile_r1_c2.png";
import tile_r1_c3 from "../assets/home/tile_r1_c3.png";
import tile_r1_c4 from "../assets/home/tile_r1_c4.png";
import tile_r1_c5 from "../assets/home/tile_r1_c5.png";
import tile_r2_c0 from "../assets/home/tile_r2_c0.png";
import tile_r2_c1 from "../assets/home/tile_r2_c1.png";
import tile_r2_c2 from "../assets/home/tile_r2_c2.png";
import tile_r2_c3 from "../assets/home/tile_r2_c3.png";
import tile_r2_c4 from "../assets/home/tile_r2_c4.png";
import tile_r2_c5 from "../assets/home/tile_r2_c5.png";
import tile_r3_c0 from "../assets/home/tile_r3_c0.png";
import tile_r3_c1 from "../assets/home/tile_r3_c1.png";
import tile_r3_c2 from "../assets/home/tile_r3_c2.png";
import tile_r3_c3 from "../assets/home/tile_r3_c3.png";
import tile_r3_c4 from "../assets/home/tile_r3_c4.png";
import tile_r3_c5 from "../assets/home/tile_r3_c5.png";
import tile_r4_c0 from "../assets/home/tile_r4_c0.png";
import tile_r4_c1 from "../assets/home/tile_r4_c1.png";
import tile_r4_c2 from "../assets/home/tile_r4_c2.png";
import tile_r4_c3 from "../assets/home/tile_r4_c3.png";
import tile_r4_c4 from "../assets/home/tile_r4_c4.png";
import tile_r4_c5 from "../assets/home/tile_r4_c5.png";
import tile_r5_c0 from "../assets/home/tile_r5_c0.png";
import tile_r5_c1 from "../assets/home/tile_r5_c1.png";
import tile_r5_c2 from "../assets/home/tile_r5_c2.png";
import tile_r5_c3 from "../assets/home/tile_r5_c3.png";
import tile_r5_c4 from "../assets/home/tile_r5_c4.png";
import tile_r5_c5 from "../assets/home/tile_r5_c5.png";

// 图片映射
const tileImages: Record<string, any> = {
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

interface ContentGroup {
  stage: number;
  name: string;
  tiles: string[];
}

interface ContentRevealConfig {
  animation: string;
  description: string;
  groups: ContentGroup[];
}

const typedContentConfig = contentRevealConfig as ContentRevealConfig;

interface MaskRevealProps {
  revealOrder: TileData[];
  gridCols?: number;
  gridRows?: number;
  tileWidth?: number;
  tileHeight?: number;
}

export default function MaskReveal({
  revealOrder,
  gridCols = 6,
  gridRows = 6,
  tileWidth = 341,
  tileHeight = 214,
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<Map<string, HTMLDivElement>>(new Map());

  // 根据配置文件构建 tile 到 stage 的映射
  const tileStageMap: Record<string, number> = {};
  typedContentConfig.groups.forEach((group) => {
    group.tiles.forEach((tileName) => {
      tileStageMap[tileName] = group.stage;
    });
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // 等待 DOM 准备好后开始动画
    const timer = setTimeout(() => {
      // 按 stage 分组 tiles
      const stageTiles: Record<number, HTMLDivElement[]> = {};
      tilesRef.current.forEach((el, fileName) => {
        const stage = tileStageMap[fileName] ?? 1;
        if (!stageTiles[stage]) stageTiles[stage] = [];
        stageTiles[stage].push(el);
      });

      // 创建 GSAP timeline
      const tl = gsap.timeline();

      // 按 stage 顺序动画
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
              stagger: 0.03, // 同组内轻微错开，更自然
            },
            stage === 1 ? 0 : "-=0.4" // stage 1 立即开始，后续 stage 稍微重叠
          );
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [tileStageMap]);

  // 设置 tile ref 的辅助函数
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
      className="relative overflow-hidden"
      style={{
        width: "100%",
        maxWidth: `${gridCols * tileWidth}px`,
        aspectRatio: `${gridCols * tileWidth} / ${gridRows * tileHeight}`,
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          width: "100%",
          height: "100%",
        }}
      >
        {revealOrder.map((tile) => {
          const imageName = tile.file.replace(".png", "");
          const imageSrc = tileImages[imageName];

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
                  unoptimized
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
