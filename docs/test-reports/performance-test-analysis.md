# Báo cáo Phân tích Kiểm thử Hiệu năng

**Ngày:** 27 tháng 11, 2025
**Dự án:** FloginFE_BE

---

## 1. Tổng quan

Báo cáo này tóm tắt kết quả của các bài kiểm thử hiệu năng được thực hiện trên Login API theo các yêu cầu trong phần điểm thưởng của đề bài. Công cụ được sử dụng là k6.

## 2. Môi trường Kiểm thử

- **Công cụ:** k6
- **Mục tiêu:** Backend server đang chạy tại `http://localhost:8080`
- **Kịch bản:** `performance/login-test.js`
- **Loại kịch bản:** Tăng tải người dùng ảo (ramping-vus) từ 100 lên đến 1500 người dùng đồng thời qua nhiều giai đoạn.

## 3. Kết quả Chính

### 3.1. Kết quả Hiệu năng của Login API

#### Tóm tắt
- **Độ ổn định:** ✅ Xuất sắc. Ứng dụng cực kỳ ổn định, xử lý **0.00% request thất bại**. Mọi nỗ lực đăng nhập cuối cùng đều thành công.
- **Hiệu năng:** ❌ Kém. API gặp phải tình trạng "nghẽn cổ chai" (bottleneck) nghiêm trọng khi chịu tải cao. Thời gian phản hồi ở phân vị thứ 95 (`p(95)`) đạt tới **23.99 giây**, không đạt được mục tiêu <800ms đã đề ra.

#### Các chỉ số chi tiết:
- **Thời gian phản hồi (p95):** 23.99 giây (Mục tiêu: <800ms) - **THẤT BẠI**
- **Tỷ lệ request lỗi:** 0.00% (Mục tiêu: <1%) - **ĐẠT**
- **Thời gian phản hồi trung bình:** 13.22 giây
- **Thời gian phản hồi trung vị (50%):** 15.1 giây
- **Thời gian phản hồi chậm nhất:** 25.66 giây

### 3.2. Phân tích Nguyên nhân

Nguyên nhân chính của việc hiệu năng chậm là do việc sử dụng **BCrypt** để hash mật khẩu trong `AuthService`.

BCrypt được thiết kế để **chạy chậm và tiêu tốn nhiều CPU** nhằm tăng cường bảo mật, chống lại các cuộc tấn công dò mật khẩu (brute-force). Tuy nhiên, ưu điểm này lại trở thành nhược điểm về hiệu năng khi có quá nhiều request đăng nhập cùng lúc. CPU của server bị quá tải với các phép tính toán BCrypt đắt đỏ, dẫn đến thời gian chờ đợi của tất cả người dùng bị kéo dài.

## 4. Đề xuất Cải thiện

1.  **Triển khai Rate Limiting (Giới hạn tần suất):** Cần có một cơ chế giới hạn số lần đăng nhập từ một địa chỉ IP trong một khoảng thời gian nhất định (ví dụ: 10 lần/phút). Đây là giải pháp tiêu chuẩn trong ngành để chống tấn công brute-force và bảo vệ hiệu năng hệ thống khỏi bị quá tải bởi các yêu cầu hashing.

2.  **Cân nhắc Thuật toán Hashing Hiện đại hơn:** Trong tương lai, có thể nghiên cứu nâng cấp từ BCrypt lên **Argon2**. Argon2 là thuật toán chiến thắng trong Cuộc thi Hash Mật khẩu và được xem là an toàn hơn trước các hình thức tấn công bằng GPU hiện đại.

3.  **Tối ưu hóa Tài nguyên:** Trong môi trường production, service xác thực nên được giám sát và có khả năng mở rộng (scale) một cách độc lập với các tài nguyên CPU chuyên dụng để xử lý tải đăng nhập mà không ảnh hưởng đến các phần khác của ứng dụng.

---
*Báo cáo này đáp ứng các yêu cầu của mục 7.1.b và 7.1.d trong đề bài.*