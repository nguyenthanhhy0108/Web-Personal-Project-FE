from PIL import Image
import os

def convert_png_to_jpg(directory):
    # Lặp qua tất cả các file trong thư mục
    for filename in os.listdir(directory):
        if filename.endswith(".png"):
            # Đường dẫn đầy đủ của file
            png_path = os.path.join(directory, filename)
            # Đổi tên đuôi file từ .png sang .jpg
            jpg_path = os.path.join(directory, filename[:-4] + ".jpg")
            
            # Mở file PNG và chuyển đổi sang JPG
            with Image.open(png_path) as img:
                rgb_img = img.convert("RGB")  # Chuyển sang chế độ màu RGB cho JPG
                rgb_img.save(jpg_path, "JPEG")  # Lưu với đuôi .jpg
                
            # Xóa file PNG sau khi chuyển đổi thành công
            os.remove(png_path)
            print(f"Đã chuyển {filename} sang {filename[:-4] + '.jpg'}")

# Chỉ định thư mục bạn muốn chuyển đổi
directory = r'D:\Java_project\Front-End\project-front-end\public\images\car-logo' # Thay đổi đường dẫn thành thư mục của bạn
convert_png_to_jpg(directory)
