import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
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
        {revealOrder.map((tile, index) => {
          const imageName = tile.file.replace(".png", "");
          const imageSrc = tileImages[imageName];

          return (
            <div
              key={tile.file}
              className="relative w-full h-full overflow-hidden"
              style={{
                gridRow: tile.row + 1,
                gridColumn: tile.col + 1,
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? "scale(1)" : "scale(0.8)",
                transitionDelay: `${index * 50}ms`,
                transitionDuration: "600ms",
                transitionProperty: "opacity, transform",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
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
