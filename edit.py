from PIL import Image

def resize_images_to_same_size(image_paths, output_paths, target_width, target_height):
    for img_path, output_path in zip(image_paths, output_paths):
        # Open an image file
        with Image.open(img_path) as img:
            # Resize the image to the target size (target_width x target_height)
            resized_img = img.resize((target_width, target_height), Image.ANTIALIAS)
            
            # Save the resized image
            resized_img.save(output_path)
            print(f"Resized and saved {output_path}")

# List of image paths (input images)
image_paths = [
    r"D:\Java_project\Front-End\project-front-end\public\images\custom-decal.jpg", 
    r"D:\Java_project\Front-End\project-front-end\public\images\interior-cleaning.jpg", 
    r"D:\Java_project\Front-End\project-front-end\public\images\professional-car-wash.jpg",
    r"D:\Java_project\Front-End\project-front-end\public\images\window-tinting.jpg"
]

# List of output paths (resized images)
output_paths = [
    r"D:\Java_project\Front-End\project-front-end\public\images\custom-decal.jpg", 
    r"D:\Java_project\Front-End\project-front-end\public\images\interior-cleaning.jpg", 
    r"D:\Java_project\Front-End\project-front-end\public\images\professional-car-wash.jpg",
    r"D:\Java_project\Front-End\project-front-end\public\images\window-tinting.jpg"
]

# Target width and height (the desired size for all images)
target_width = 1900   # Example width, adjust to your needs
target_height = 1200  # Example height, adjust to your needs

# Call the function to resize the images
resize_images_to_same_size(image_paths, output_paths, target_width, target_height)
