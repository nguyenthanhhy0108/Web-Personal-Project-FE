import cv2
import os

def resize_images_in_folder(folder_path, reference_image_path, output_folder):
    # Đọc ảnh tham chiếu để lấy kích thước
    reference_image = cv2.imread(reference_image_path)
    reference_height, reference_width = reference_image.shape[:2]

    # Tạo thư mục đầu ra nếu chưa tồn tại
    os.makedirs(output_folder, exist_ok=True)

    # Duyệt qua tất cả các file trong thư mục
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)

        # Kiểm tra nếu file là ảnh (tùy thuộc vào định dạng của bạn, có thể kiểm tra bằng đuôi file)
        if file_name.endswith(('.png', '.jpg', '.jpeg')):
            # Đọc ảnh
            img = cv2.imread(file_path)
            
            if img is not None:
                # Resize ảnh theo kích thước của ảnh tham chiếu
                resized_img = cv2.resize(img, (reference_width, reference_height))

                # Lưu ảnh đã resize vào thư mục đầu ra
                output_path = os.path.join(output_folder, file_name)
                cv2.imwrite(output_path, resized_img)
                print(f"Đã resize và lưu: {output_path}")
            else:
                print(f"Không thể mở ảnh: {file_name}")

# Ví dụ sử dụng
folder_path = r'D:\Java_project\Front-End\project-front-end\public\images\car-logo'  # Thư mục chứa ảnh cần resize
reference_image_path = r'D:\Java_project\Front-End\project-front-end\public\images\car-logo\hyundai.png'  # Đường dẫn đến hyundai.png
output_folder = r'D:\Java_project\Front-End\project-front-end\public\images\car-logo-new'

resize_images_in_folder(folder_path, reference_image_path, output_folder)
