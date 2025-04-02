# rescale-images  

This repository contains scripts to automatically resize and standardize stock volunteer images. The original images vary in aspect ratios and are of very high resolution, resulting in large file sizes. These scripts will **automatically crop and scale** all images in a directory to a standardized **800x450 resolution**.

The script creates JPG, WEBP and AVIF versions of these scaled down images.

## How It Works  

- The **original images** should be placed in the [`stock-images`](stock-images) folder.  
- The **processed images** (resized and cropped) will be saved in the [`scaled-stock-images`](scaled-stock-images) folder.  

## Usage  

### Running with Python  

Ensure you have Python installed, then install the required dependencies (primarily Pillow):  

```bash
pip install -r requirements.txt
python rescale-images.py
```

### Running with Docker  

You can use Docker to run the script in an isolated environment. The [`launch.sh`](launch.sh) script will:  

- Start a Python-based container  
- Install the necessary dependencies  
- Process the images in [`stock-images`](stock-images)  

Run it with:  

```bash
./launch.sh
```

Alternatively, you can execute the script directly in Docker:  

```bash
docker run --rm \
    -v "$PWD":/usr/src/app \
    -w /usr/src/app \
    python \
    sh -c "pip install -r requirements.txt && python rescale-images.py"
```

## Notes  

- Ensure the unprocessed images are placed in the correct input directory ([`stock-images`](stock-images)) before running the script.  
- The script **automatically clips these images to fit a 16:9 aspect ratio** by finding the best central fit in the original image. If the image is taller that 16:9, the image will be clipped equally from the top and bottom to fit. If the image is too wide, it'll be clipped from both right and left sides so that the center of the image is retained after clipping.
- After clipping, the image is resized (scaled) to a 800x450 resolution.

> The aspect ratio adjusts automatically, but don’t rely on the autocropper if the original image is far from 16:9. It works reasonably well when the subject is centered, but if not, the results are usually poor. In those cases, manual cropping is recommended.
