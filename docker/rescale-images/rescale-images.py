#!/usr/bin/env python
import logging
import os
from PIL import Image
import pillow_avif  # required for AVIF support

logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)


target_aspect_ratio = (16, 9)
target_resolution = (800, 450)


def crop_to_aspect(image, aspect_ratio):
    """Crops an image to the specified aspect ratio while keeping the center."""
    width, height = image.size
    target_w, target_h = aspect_ratio

    # Determine new dimensions based on aspect ratio
    new_width = width
    new_height = int(width * target_h / target_w)

    if new_height > height:
        new_height = height
        new_width = int(height * target_w / target_h)

    left = (width - new_width) // 2
    top = (height - new_height) // 2
    right = left + new_width
    bottom = top + new_height

    return image.crop((left, top, right, bottom))


def resize_image(image: Image.Image, target_resolution):
    """Resizes an image to the specified resolution."""
    return image.resize(target_resolution, Image.LANCZOS)


def process_images(input_folder: str, output_folder: str) -> None:
    """Recursively finds and processes images in the nested directory structure."""
    logger.debug(f"Processing images in {input_folder}")
    for root, _, files in os.walk(input_folder):
        for file in files:
            if file.lower().endswith(
                (".png", ".jpg", ".jpeg", ".bmp", ".gif", ".webp")
            ):
                input_path = os.path.join(root, file)
                rel_path = os.path.relpath(input_path, input_folder)

                jpg_rel_path = ".".join(rel_path.split(".")[:-1] + ["jpg"])
                webp_rel_path = ".".join(rel_path.split(".")[:-1] + ["webp"])
                avif_rel_path = ".".join(rel_path.split(".")[:-1] + ["avif"])

                # Construct output path
                jpg_output_path = os.path.join(output_folder + "/jpg", jpg_rel_path)
                webp_output_path = os.path.join(output_folder + "/webp", webp_rel_path)
                avif_output_path = os.path.join(output_folder + "/avif", avif_rel_path)

                # Ensure output directory exists
                os.makedirs(os.path.dirname(jpg_output_path), exist_ok=True)
                os.makedirs(os.path.dirname(webp_output_path), exist_ok=True)
                os.makedirs(os.path.dirname(avif_output_path), exist_ok=True)

                # Open image and process
                with Image.open(input_path) as img:
                    img_cropped = crop_to_aspect(img, target_aspect_ratio)
                    img_resized = resize_image(img_cropped, target_resolution)

                    img_resized.save(jpg_output_path, quality=95)
                    img_resized.save(webp_output_path, quality=95)
                    img_resized.save(avif_output_path, quality=95)

                logger.debug(f"Processed: {input_path}")


def main():
    logger.debug("Starting main function")
    process_images("./stock-images", "./scaled-stock-images")


if __name__ == "__main__":
    main()
