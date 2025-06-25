"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false);

  const canvasRefs = {
    banner: useRef<HTMLCanvasElement>(null), // 1440 x 256
    card: useRef<HTMLCanvasElement>(null), // 400 x 160
    mobileCard: useRef<HTMLCanvasElement>(null), // 160 x 160
    mobileBanner: useRef<HTMLCanvasElement>(null), // 390 x 192
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setShowImage(true);

    const img = new Image();
    img.onload = () => {
      const targets = {
        banner: [1440, 256],
        card: [400, 160],
        mobileCard: [160, 160],
        mobileBanner: [390, 192],
      };

      Object.entries(canvasRefs).forEach(([key, ref]) => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const [targetW, targetH] = targets[key as keyof typeof canvasRefs];
        const targetRatio = targetW / targetH;
        const imageRatio = img.width / img.height;

        let sx = 0,
          sy = 0,
          sWidth = img.width,
          sHeight = img.height;

        if (imageRatio > targetRatio) {
          sWidth = img.height * targetRatio;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / targetRatio;
          sy = (img.height - sHeight) / 2;
        }

        canvas.width = targetW;
        canvas.height = targetH;
        ctx.clearRect(0, 0, targetW, targetH);
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);
      });
    };

    img.src = url;
  };

  return (
    <main className="mx-auto">
      <h1 className="p-6 text-3xl font-semibold">Image Cropping Preview</h1>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mx-6 mb-8 cursor-pointer rounded-lg border-2 border-dashed border-gray-400 py-12 text-center text-gray-600 hover:border-gray-600"
      >
        Drop your image here (JPEG, PNG, WebP)
      </div>

      {showImage && imageUrl && (
        <section className="space-y-12">
          <div>
            <h2 className="mb-2 text-xl font-medium">
              Original Image (Uncropped)
            </h2>
            <img
              src={imageUrl}
              alt="Original Upload"
              className="max-w-full rounded border shadow-md"
            />
          </div>

          <div>
            <h2 className="mx-6 mb-2 text-xl font-medium">
              Desktop Banner 45:8 (1440 × 256)
            </h2>
            <canvas ref={canvasRefs.banner} className="h-[256] w-[1440]" />
          </div>

          <div>
            <h2 className="mx-6 mb-2 text-xl font-medium">
              Desktop Card 5:2 (400 × 160)
            </h2>
            <canvas
              ref={canvasRefs.card}
              className="mx-6 mb-6 h-[160] w-[400]"
            />
          </div>

          <div>
            <h2 className="mx-6 mb-2 text-xl font-medium">
              Mobile Card 1:1 (160 × 160)
            </h2>
            <canvas
              ref={canvasRefs.mobileCard}
              className="mx-6 mb-6 h-[160] w-[160]"
            />
          </div>

          <div>
            <h2 className="mx-6 mb-2 text-xl font-medium">
              Mobile Banner 65:32 (iPhone 12) (390 × 192)
            </h2>
            <canvas
              ref={canvasRefs.mobileBanner}
              className="mx-6 mb-6 h-[192] w-[390]"
            />
          </div>
        </section>
      )}
    </main>
  );
}
