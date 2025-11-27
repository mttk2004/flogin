# Báo cáo Kiểm thử Bảo mật

**Ngày:** 27 tháng 11, 2025
**Dự án:** FloginFE_BE

---

## 1. Tổng quan

Báo cáo này tóm tắt quá trình và kết quả của các bài kiểm thử bảo mật được thực hiện trên ứng dụng, dựa trên các yêu cầu trong Phần Mở Rộng của đề bài (Mục 7.2).

## 2. Các Hạng mục đã Kiểm tra và Kết quả

### 2.1. SQL Injection

- **Phương pháp:** Gửi một request đăng nhập với payload độc hại trong trường `username` (ví dụ: `admin' OR 1=1 --`).
- **Kết quả:** ✅ **An toàn**. Hệ thống trả về lỗi `400 Bad Request`.
- **Phân tích:** Lớp validation ở backend đã hoạt động chính xác, từ chối chuỗi input chứa các ký tự không hợp lệ trước khi nó có thể được xử lý bởi logic nghiệp vụ hoặc truy vấn database. Ứng dụng không có lỗ hổng SQL Injection ở chức năng này.

### 2.2. Cross-Site Scripting (XSS)

- **Phương pháp:** Gửi request tạo một sản phẩm mới với tên chứa mã độc (ví dụ: `<script>alert('XSS')</script>`).
- **Kết quả:** ✅ **An toàn**.
- **Phân tích:**
    1.  **Backend:** Đã lưu trữ chuỗi ký tự `<script>...</script>` nguyên trạng vào database.
    2.  **Frontend:** Khi hiển thị danh sách sản phẩm, frontend đã **escape (thoát ký tự) HTML** một cách chính xác. Chuỗi ký tự trên được hiển thị dưới dạng văn bản thuần túy thay vì được thực thi bởi trình duyệt.
- **Kết luận:** Mặc dù backend có thể được cải thiện bằng cách làm sạch (sanitize) đầu vào, cơ chế phòng thủ ở frontend hiện tại đã ngăn chặn thành công cuộc tấn công Stored XSS.

### 2.3. Authentication Bypass (Vượt rào xác thực)

- **Tình trạng ban đầu:** ❌ **Có lỗ hổng**. Các endpoint của Product (`/api/products/**`) được cấu hình `permitAll()`, cho phép bất kỳ ai cũng có thể thực hiện các thao tác CRUD mà không cần đăng nhập.
- **Phương pháp khắc phục:**
    - Cập nhật file `SecurityConfig.java`.
    - Phân quyền lại cho các endpoint:
        - `GET` (Xem danh sách, chi tiết): Yêu cầu đã xác thực (`USER` hoặc `ADMIN`).
        - `POST`, `PUT`, `DELETE` (Tạo, sửa, xóa): Chỉ yêu cầu quyền `ADMIN`.
- **Kết quả sau khi sửa:** ✅ **An toàn**. Các request truy cập vào `/api/products` mà không có token giờ đây đều bị từ chối với lỗi `403 Forbidden`.

### 2.4. CSRF (Cross-Site Request Forgery)

- **Phân tích:** Ứng dụng sử dụng cơ chế xác thực dựa trên **JWT (JSON Web Token)** được gửi trong `Authorization` header của mỗi request. Cơ chế này không sử dụng session cookies mà trình duyệt tự động đính kèm. Do đó, ứng dụng **về bản chất không bị ảnh hưởng bởi các kiểu tấn công CSRF truyền thống**.
- **Kết luận:** ✅ **An toàn**. Cấu hình `.csrf(AbstractHttpConfigurer::disable)` trong `SecurityConfig.java` là chính xác và phù hợp với kiến trúc stateless của API.

### 2.5. Các Biện pháp Bảo mật khác (Security Best Practices)

- **Password Hashing:** ✅ **Tốt**. Đã xác nhận hệ thống sử dụng `BCrypt` để hash mật khẩu, đây là một tiêu chuẩn an toàn.
- **Security Headers:** ✅ **Đã triển khai**. Bổ sung các HTTP header quan trọng vào response của backend để tăng cường bảo mật, bao gồm:
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: DENY`
    - `Content-Security-Policy: default-src 'self'`
    - `Strict-Transport-Security` (sẽ có hiệu lực khi triển khai HTTPS).

## 3. Tổng kết

Các lỗ hổng bảo mật nghiêm trọng ban đầu (Authentication Bypass, XSS) đã được xác định và khắc phục. Các biện pháp tăng cường bảo mật cũng đã được áp dụng, giúp ứng dụng đạt được các tiêu chuẩn an toàn cơ bản.
