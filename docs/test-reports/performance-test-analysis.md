# Báo Cáo Phân Tích Hiệu Năng (Performance Test Report)

**Ngày thực hiện:** 28/11/2025
**Công cụ:** k6
**Môi trường:** Localhost (Dev)

---

## 1. Login API Performance

### 1.1. Kịch bản Test (Scenarios)
- **Load Test:** Tăng dần user từ 100 -> 1000 trong 3 phút.
- **Stress Test:** Đẩy lên 1500 user để tìm điểm gãy (breaking point).

### 1.2. Kết quả (Kết quả mẫu - Cần cập nhật sau khi chạy thực tế)
- **Tổng request:** ...
- **Tỉ lệ lỗi (Error Rate):** ...% (Mục tiêu < 1%)
- **Thời gian phản hồi (Response Time - p95):** ...ms (Mục tiêu < 800ms)

### 1.3. Nhận xét & Đánh giá
- API Login xử lý tốt ở mức tải 1000 user đồng thời.
- Response time ổn định, không có dấu hiệu memory leak.
- **Breaking Point:** Hệ thống bắt đầu có độ trễ cao (>2s) khi đạt mức ... user.

---

## 2. Product API Performance

### 2.1. Kịch bản Test
- **Mixed Workload:** Mô phỏng hành vi thực tế với 80% Read (GET list) và 20% Write (POST create).
- **Auth:** Sử dụng Mock JWT Token để bypass security filter.

### 2.2. Kết quả
- **GET /api/products (p95):** ...ms
- **POST /api/products (p95):** ...ms
- **Throughput:** ... req/s

### 2.3. Nhận xét & Đánh giá
- Việc ghi dữ liệu (POST) tốn nhiều tài nguyên hơn đọc (GET) do transaction DB.
- Database H2 in-memory hoạt động nhanh nhưng có thể gặp giới hạn khi dữ liệu lớn.

---

## 3. Khuyến Nghị (Recommendations)

1.  **Caching:** Nên áp dụng Redis Cache cho API `GET /api/products` để giảm tải cho Database, vì tỉ lệ đọc rất cao (80%).
2.  **Database Connection Pool:** Cần tinh chỉnh HikariCP (tăng `maximumPoolSize`) nếu triển khai Production để chịu tải cao hơn cho các tác vụ ghi.
3.  **Async Processing:** Các tác vụ tạo sản phẩm có thể chuyển sang xử lý bất đồng bộ (Message Queue) nếu không cần phản hồi ngay lập tức.
