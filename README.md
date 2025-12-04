# 🛡️ Dự án Kiểm Thử Phần Mềm - Flogin App

Dự án ứng dụng web **Đăng nhập & Quản lý Sản phẩm** (Login & Product Management), được xây dựng để thực hiện Bài Tập Lớn môn Công Nghệ Phần Mềm. Dự án áp dụng đầy đủ các kỹ thuật kiểm thử: Unit, Integration, Mock, E2E, Performance và Security Testing.

## 🛠️ Công nghệ sử dụng

*   **Frontend:** React, Vite, Vitest, React Testing Library, Cypress.
*   **Backend:** Spring Boot 3.2, JUnit 5, Mockito, H2 Database.
*   **Tools:** Python (Demo Runner), k6 (Performance), GitHub Actions (CI/CD).

---

## 📋 Yêu cầu cài đặt

Đảm bảo máy tính của bạn đã cài đặt:
1.  **Java JDK 17** hoặc cao hơn.
2.  **Node.js** (v18+).
3.  **Maven**.
4.  **Python 3.x** (Để chạy script tự động).

---

## 🚀 Hướng dẫn chạy Test (Recommended)

Dự án đi kèm với một công cụ tự động hóa **`demo_runner.py`**, giúp giảng viên và sinh viên chạy kiểm thử theo từng câu hỏi trong đề bài một cách dễ dàng.

### Cách sử dụng:

Mở terminal tại thư mục gốc của dự án và chạy lệnh:

```bash
python demo_runner.py
```

### Menu chức năng:

Sau khi chạy lệnh, bạn sẽ thấy menu lựa chọn tương ứng với các phần của đồ án:

*   **`1`**: Chạy **Unit Testing** (Câu 2) cho cả Frontend & Backend.
*   **`1a`**: Chạy **Unit Testing với báo cáo Coverage** (Kiểm tra yêu cầu FE >= 90%, BE >= 85%).
    *   *Frontend:* Hiển thị trực tiếp trên terminal.
    *   *Backend:* File báo cáo tại `backend/target/site/jacoco/index.html`.
*   **`2`**: Chạy **Integration Testing** (Câu 3).
*   **`3`**: Chạy **Mock Testing** (Câu 4).
*   **`4`**: Chạy **E2E Automation Testing** (Câu 5) với Cypress.
    *   *Lưu ý:* Script sẽ nhắc bạn bật Frontend Server trước khi chạy.
*   **`5`**: Chạy **Performance Testing** (Bonus) với k6.
*   **`6`**: Chạy **Security Testing** (Bonus).

---

## 📦 Cài đặt thủ công (Manual Setup)

Nếu muốn chạy ứng dụng hoặc test thủ công mà không dùng script:

### 1. Frontend
```bash
cd frontend
npm install
npm run dev      # Chạy ứng dụng
npm test         # Chạy Unit Tests
npx cypress open # Mở giao diện Cypress
```

### 2. Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run # Chạy server Backend
mvn test            # Chạy toàn bộ Tests
```

---

## 📂 Cấu trúc thư mục Test

*   **Frontend Tests:** `frontend/src/tests/` (Unit/Integration/Mock) & `frontend/cypress/e2e/` (E2E).
*   **Backend Tests:** `backend/src/test/java/com/flogin/` (Unit/Integration/Mock/Security).
*   **Performance:** `performance/` (k6 scripts).
*   **Documents:** `docs/` (Kế hoạch, Test cases, Báo cáo).

---

## ⚙️ CI/CD Pipeline

Dự án đã tích hợp GitHub Actions tại thư mục `.github/workflows/`:
*   **`ci.yml`**: Pipeline hoàn chỉnh (Build, Test BE/FE, E2E, Coverage).
*   **`login-tests.yml`**: Pipeline riêng biệt kiểm tra chức năng Login.

*Kết quả test và báo cáo coverage sẽ được upload tự động lên phần Artifacts của GitHub Actions.*