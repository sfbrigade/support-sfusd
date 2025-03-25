import fs from "fs";
import path from "path";
import { imageSizeFromFile } from "image-size/fromFile";

import { useState } from "react";
import Card from "@/components/schoolPageComponents/Card";

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

type ImageInfo = {
  path: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
};

type ImageList = {
  category: string;
  images: ImageInfo[];
};

const ImageListComponent = ({ category, images }: ImageList) => {
  const [hoveredImage, setHoveredImage] = useState<ImageInfo | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (image: ImageInfo) => {
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl font-medium text-blue-500">{category}</h2>

      <div className="relative grid gap-8 sm:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(image)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <Card
              title={image.path}
              description={image.path}
              img={image.path}
              index={index}
            />
          </div>
        ))}

        {hoveredImage && (
          <div
            className="fixed z-50 overflow-hidden rounded-lg bg-blue-300 p-3 shadow-xl transition-opacity duration-1000 ease-in-out"
            style={{
              top: tooltipPosition.y + 20,
              left: tooltipPosition.x + 20,
              pointerEvents: "none",
              opacity: hoveredImage ? 1 : 0,
            }}
          >
            <div className="mb-1">
              <div className="text-xl text-white">Original Image</div>
              {hoveredImage.width && hoveredImage.height && (
                <div className="text-sm">
                  {hoveredImage.width} × {hoveredImage.height} px
                  {hoveredImage.aspectRatio && ` (${hoveredImage.aspectRatio})`}
                </div>
              )}
            </div>
            <img
              src={hoveredImage.path || ""}
              alt="Full preview"
              className="h-full max-h-[500px] w-full max-w-[500px] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};
// Define static paths
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { grade: "HS" } },
      { params: { grade: "MS" } },
      { params: { grade: "K5" } },
    ], // Predefined pages
    fallback: "blocking", // If a page isn't pre-generated, generate it on demand
  };
};

export const getStaticProps = (async ({ params: grade }) => {
  /**
   * Get image file information from a subdirectory of /public/stock-images based
   * on the category name.
   * @param category subdirectory of /public/stock-images e.g. "HS/event"
   * @returns array of image file information
   */
  const getImageInfoFromCategory = async (
    category: string,
  ): Promise<ImageInfo[]> => {
    const dir = path.join(process.cwd(), `public/stock-images/${category}`);
    const files = fs
      .readdirSync(dir)
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    const imagePromises = files.map(async (file) => {
      const fullPath = path.join(dir, file);
      const publicPath = `/stock-images/${category}/${file}`;

      // Get image dimensions
      try {
        const dimensions = await imageSizeFromFile(fullPath);
        const width = dimensions.width;
        const height = dimensions.height;

        // Calculate aspect ratio and simplify if possible
        let aspectRatio = "";
        if (width && height) {
          // Find greatest common divisor for aspect ratio simplification
          const gcd = (a: number, b: number): number =>
            b === 0 ? a : gcd(b, a % b);
          const divisor = gcd(width, height);
          aspectRatio = `${width / divisor}:${height / divisor}`;
        }

        return {
          path: publicPath,
          width,
          height,
          aspectRatio,
        };
      } catch (e) {
        // Return just the path if dimensions can't be determined
        console.error(`Error getting dimensions for ${fullPath}:`, e);
        return { path: publicPath };
      }
    });

    // Wait for all promises to resolve and return the array of results
    return Promise.all(imagePromises);
  };

  const images: ImageList[] = [];
  const categories =
    grade?.grade == "K5"
      ? ["event", "classroom", "tutoring"]
      : ["event", "mentoring", "tutoring"];

  for (const category of categories) {
    const categoryImages = await getImageInfoFromCategory(
      `${grade?.grade}/${category}`,
    );
    images.push({
      category,
      images: categoryImages,
    });
  }
  return { props: { images } };
}) satisfies GetStaticProps<{
  images: ImageList[];
}>;

const ReviewImages = ({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageList = images.map((image) => (
    <ImageListComponent key={image.category} {...image} />
  ));
  return (
    <div className="relative mx-auto flex flex-col gap-10 p-6 pt-2 md:py-20 lg:w-4/5 2xl:w-2/3">
      {imageList}
    </div>
  );
};

export default ReviewImages;
