import cv2

def resize_video_to_square(input_path, output_path, size=500):
    # Mở video nguồn
    cap = cv2.VideoCapture(input_path)
    
    # Lấy thông tin về chiều rộng, chiều cao và FPS của video
    fps = cap.get(cv2.CAP_PROP_FPS)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Codec video cho file đầu ra
    
    # Tạo đối tượng VideoWriter để ghi video đã được resize
    out = cv2.VideoWriter(output_path, fourcc, fps, (size, size))
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # Lấy kích thước của frame
        h, w, _ = frame.shape
        
        # Tính tỷ lệ để scale video về kích thước vuông
        if h > w:
            scale_factor = size / h
        else:
            scale_factor = size / w
        
        # Resize frame theo tỷ lệ
        resized_frame = cv2.resize(frame, (int(w * scale_factor), int(h * scale_factor)))
        
        # Cắt hoặc pad frame để đảm bảo frame là hình vuông
        h_resized, w_resized, _ = resized_frame.shape
        if h_resized != w_resized:
            if h_resized > w_resized:
                delta = h_resized - w_resized
                resized_frame = resized_frame[delta // 2:delta // 2 + w_resized, :]
            else:
                delta = w_resized - h_resized
                resized_frame = resized_frame[:, delta // 2:delta // 2 + h_resized]
        
        # Ghi frame đã resize vào video đầu ra
        out.write(resized_frame)
    
    # Giải phóng các tài nguyên
    cap.release()
    out.release()
    cv2.destroyAllWindows()

# Sử dụng hàm để resize video
resize_video_to_square(r'D:\Java_project\Front-End\project-front-end\public\videos\hybrid.mp4',
                        r'D:\Java_project\Front-End\project-front-end\public\videos\hybrid_new.mp4', size=500)
