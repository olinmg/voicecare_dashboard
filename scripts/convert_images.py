from PIL import Image
import os
from pathlib import Path

def convert_to_jpg(image_dir):
    # Get the absolute path to the images directory
    base_dir = Path(__file__).parent.parent
    image_path = base_dir / 'src' / 'assets' / 'images'
    
    # Create directory if it doesn't exist
    image_path.mkdir(parents=True, exist_ok=True)
    
    # Convert each PNG file to JPG
    for file in image_path.glob('*.png'):
        try:
            # Open PNG image
            with Image.open(file) as img:
                # Convert to RGB if necessary (in case of RGBA images)
                if img.mode in ('RGBA', 'LA'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[-1])
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Create JPG filename
                jpg_path = file.with_suffix('.jpg')
                
                # Save as JPG with 85% quality
                img.save(jpg_path, 'JPEG', quality=85, optimize=True)
                
                print(f"Converted {file.name} to {jpg_path.name}")
                
                # Optionally, remove the original PNG file
                # os.remove(file)
                
        except Exception as e:
            print(f"Error converting {file.name}: {str(e)}")

if __name__ == "__main__":
    convert_to_jpg('src/assets/images') 