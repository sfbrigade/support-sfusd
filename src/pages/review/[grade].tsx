import fs from "fs";
import path from "path";

import { useState } from "react";
import Card from "@/components/schoolPageComponents/Card";

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

type ImageList = {
  category: string;
  images: string[];
};

const ImageListComponent = ({ category, images }: ImageList) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (image: string) => {
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
            <Card title={image} description={image} img={image} index={index} />
          </div>
        ))}

        {hoveredImage && (
          <div
            className="fixed z-50 overflow-hidden rounded-lg shadow-xl"
            style={{
              top: tooltipPosition.y + 20,
              left: tooltipPosition.x + 20,
              maxWidth: "500px",
              maxHeight: "500px",
              pointerEvents: "none",
            }}
          >
            <img
              src={hoveredImage}
              alt="Full preview"
              className="h-full w-full object-contain"
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
   * Get image file names from a subdirectory of /public/stock-images based
   * on the category name.
   * @param category subdirectory of /public/stock-images e.g. "HS/event"
   * @returns array of image file names
   */
  const getImageFileNamesFromCategory = (category: string): string[] => {
    const dir = path.join(process.cwd(), `public/stock-images/${category}`);
    return fs
      .readdirSync(dir)
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => `/stock-images/${category}/${file}`);
  };

  const images: ImageList[] = [];
  const categories =
    grade?.grade == "K5"
      ? ["event", "classroom", "tutoring"]
      : ["event", "mentoring", "tutoring"];

  for (const category of categories) {
    images.push({
      category,
      images: getImageFileNamesFromCategory(`${grade?.grade}/${category}`),
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
