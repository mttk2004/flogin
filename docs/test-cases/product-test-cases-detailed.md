# Tính Năng Quản Lý Sản Phẩm - Các Test Case Chi Tiết

**Ngày:** 22/11/2025
**Dự Án:** FloginFE_BE
**Giai Đoạn Test:** System Testing
**Người Test:** Mai Trần Tuấn Kiệt
**Tài liệu liên quan:**
- product-requirements-analysis.md
- product-test-scenarios.md
- product-priority-classification.md

---

## 1. Tổng Quan

Tài liệu này chứa 5 test cases chi tiết được lựa chọn từ danh sách các test scenarios trong file `product-test-scenarios.md`. Các test cases này bao gồm:

1. **TC_PRODUCT_001** - Tạo sản phẩm mới thành công với dữ liệu hợp lệ (Happy Path - Critical)
2. **TC_PRODUCT_002** - Tạo sản phẩm với các trường bắt buộc trống (Negative Test - Critical)
3. **TC_PRODUCT_003** - Cập nhật sản phẩm thành công (Happy Path - Critical)
4. **TC_PRODUCT_004** - Tạo sản phẩm với tên trùng lặp (Negative Test - High)
5. **TC_PRODUCT_005** - Tạo sản phẩm với giá trị biên (Boundary Test - High)

### Tiêu Chí Lựa Chọn

Các test cases được chọn dựa trên:
- **Độ ưu tiên cao:** Tất cả đều là Critical hoặc High priority
- **Đa dạng loại test:** Happy path, Negative test, Boundary test
- **Bao phủ yêu cầu chính:** CRUD operations, validation, error handling
- **Khả năng tái sử dụng:** Có thể làm template cho các test cases khác

---

## 2. Tham Chiếu Template Test Case

Mỗi test case chi tiết phải bao gồm các trường sau:

| Trường | Mô Tả | Bắt Buộc |
|--------|-------|----------|
| Test Case ID | Mã định danh duy nhất (TC_PRODUCT_XXX) | ✅ |
| Tên Test Case | Tên mô tả rõ ràng | ✅ |
| Ưu Tiên | Critical/High/Medium/Low | ✅ |
| Loại Test | Happy Path/Negative/Boundary/Security | ✅ |
| Scenario Liên Quan | Tham chiếu đến test scenarios | ✅ |
| Yêu Cầu | Tham chiếu đến requirements | ✅ |
| Điều Kiện Tiên Quyết | Các điều kiện cần có trước khi test | ✅ |
| Các Bước Test | Danh sách các bước thực hiện | ✅ |
| Dữ Liệu Test | Input data cụ thể | ✅ |
| Kết Quả Mong Đợi | Expected results cho mỗi bước | ✅ |
| Kết Quả Thực Tế | Actual results (điền sau khi test) | ✅ |
| Trạng Thái | Pass/Fail/Blocked/Chưa Chạy | ✅ |
| Ghi Chú | Thông tin bổ sung | ❌ |

---

## 3. Các Test Case Chi Tiết

### Test Case 1: TC_PRODUCT_001 - Tạo Sản Phẩm Mới Thành Công

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_PRODUCT_001 |
| **Tên Test Case** | Tạo Sản Phẩm Mới Thành Công Với Dữ Liệu Hợp Lệ |
| **Ưu Tiên** | 🔴 Critical |
| **Loại Test** | Happy Path |
| **Scenario Liên Quan** | TS_PRODUCT_001 |
| **Yêu Cầu** | REQ_PROD_CREATE_001, REQ_PROD_VALID_001 |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ User đã đăng nhập với quyền ADMIN hoặc MANAGER
2. ✅ Database đang chạy và có thể kết nối
3. ✅ Backend API đang hoạt động (port 8080)
4. ✅ Frontend application đang chạy (port 5173)
5. ✅ Danh mục "Điện tử" đã tồn tại trong database
6. ✅ Tên sản phẩm "Laptop Dell XPS 13" chưa tồn tại

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Mở Browser | Mở Chrome/Firefox/Edge |
| 2 | Truy cập trang Quản Lý | Điều hướng đến `http://localhost:5173/products` |
| 3 | Kiểm tra trang hiển thị | Xác nhận danh sách sản phẩm và nút "Thêm Sản Phẩm" hiển thị |
| 4 | Click nút "Thêm Sản Phẩm" | Mở form tạo sản phẩm mới |
| 5 | Kiểm tra form | Xác nhận form hiển thị đầy đủ các trường |
| 6 | Nhập tên sản phẩm | Nhập: `Laptop Dell XPS 13` |
| 7 | Nhập giá | Nhập: `25000000` |
| 8 | Nhập số lượng | Nhập: `10` |
| 9 | Nhập mô tả | Nhập: `Laptop cao cấp, màn hình 13 inch, RAM 16GB` |
| 10 | Chọn danh mục | Chọn `Điện tử` từ dropdown |
| 11 | Kiểm tra validation | Xác nhận không có error message |
| 12 | Click nút "Lưu" | Submit form |
| 13 | Chờ response | Đợi loading indicator biến mất |
| 14 | Kiểm tra thông báo | Xác nhận thông báo thành công |
| 15 | Kiểm tra danh sách | Xác nhận sản phẩm mới xuất hiện |

#### Dữ Liệu Test

```json
{
  "test_data": {
    "name": "Laptop Dell XPS 13",
    "price": 25000000,
    "quantity": 10,
    "description": "Laptop cao cấp, màn hình 13 inch, RAM 16GB",
    "categoryId": 1,
    "categoryName": "Điện tử",
    "expectedId": "auto_generated"
  }
}
```

#### Kết Quả Mong Đợi

| Bước | Kết Quả Mong Đợi |
|------|------------------|
| 1-3 | ✅ Trang quản lý sản phẩm hiển thị với danh sách hiện có và nút "Thêm Sản Phẩm" |
| 4 | ✅ Modal/Form tạo sản phẩm mở với các trường: Tên, Giá, Số lượng, Mô tả, Danh mục |
| 5 | ✅ Form trống, không có dữ liệu cũ, các trường bắt buộc được đánh dấu |
| 6 | ✅ Tên sản phẩm hiển thị trong input field |
| 7 | ✅ Giá hiển thị với format đúng (có thể tự động format) |
| 8 | ✅ Số lượng hiển thị trong input field |
| 9 | ✅ Mô tả hiển thị trong textarea |
| 10 | ✅ Danh mục "Điện tử" được chọn trong dropdown |
| 11 | ✅ Không có error message, nút "Lưu" được enable |
| 12 | ✅ Loading indicator hiển thị, nút "Lưu" bị disable tạm thời |
| 13 | ✅ API call POST `/api/products` được gửi với status 201 Created |
| 14 | ✅ Thông báo thành công: "Tạo sản phẩm thành công" hiển thị (toast/alert) |
| 15 | ✅ Form đóng, danh sách refresh, sản phẩm mới xuất hiện ở đầu/cuối danh sách với highlight |

**Response API Mong Đợi:**
```json
{
  "success": true,
  "message": "Tạo sản phẩm thành công",
  "data": {
    "id": 1,
    "name": "Laptop Dell XPS 13",
    "price": 25000000,
    "quantity": 10,
    "description": "Laptop cao cấp, màn hình 13 inch, RAM 16GB",
    "categoryId": 1,
    "categoryName": "Điện tử",
    "createdAt": "2025-11-22T10:30:00Z",
    "updatedAt": "2025-11-22T10:30:00Z"
  }
}
```

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Môi Trường: [Dev/Test/Staging]
Browser: [Chrome/Firefox/Edge] Version: [x.x]
Kết Quả: [Pass/Fail]
Chi Tiết: [Ghi chú về kết quả thực tế]
Screenshots: [Link đến screenshots nếu có]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

- Test case này là baseline cho tất cả các test cases khác về tạo sản phẩm
- Cần verify sản phẩm được lưu đúng trong database (check trực tiếp DB nếu cần)
- Kiểm tra timestamp `createdAt` và `updatedAt` được set đúng
- Monitor API response time (nên < 1 giây)
- Verify giá được format đúng khi hiển thị: "25,000,000 VNĐ"

---

### Test Case 2: TC_PRODUCT_002 - Tạo Sản Phẩm Với Trường Bắt Buộc Trống

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_PRODUCT_002 |
| **Tên Test Case** | Tạo Sản Phẩm Với Các Trường Bắt Buộc Trống |
| **Ưu Tiên** | 🔴 Critical |
| **Loại Test** | Negative Test |
| **Scenario Liên Quan** | TS_PRODUCT_006, TS_PRODUCT_007, TS_PRODUCT_012 |
| **Yêu Cầu** | REQ_PROD_VALID_002 (Validation) |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ User đã đăng nhập với quyền phù hợp
2. ✅ Frontend application đang chạy
3. ✅ Backend API đang hoạt động
4. ✅ Browser đã được mở và sẵn sàng

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Mở Browser | Mở Chrome/Firefox/Edge |
| 2 | Truy cập trang Quản Lý | Điều hướng đến `/products` |
| 3 | Click "Thêm Sản Phẩm" | Mở form tạo mới |
| 4 | **Test Case 2a: Tất cả trống** | |
| 5 | Để trống tất cả các trường | Không nhập gì |
| 6 | Click nút "Lưu" | Attempt to submit |
| 7 | Kiểm tra validation | Xác nhận error messages |
| 8 | **Test Case 2b: Chỉ thiếu tên** | |
| 9 | Nhập đầy đủ trừ tên | Giá: 1000, Số lượng: 1, Danh mục: Khác |
| 10 | Click "Lưu" | Submit |
| 11 | Kiểm tra lỗi tên | Chỉ có lỗi tên |
| 12 | **Test Case 2c: Chỉ thiếu giá** | |
| 13 | Nhập đầy đủ trừ giá | Tên: Test, Số lượng: 1, Danh mục: Khác |
| 14 | Click "Lưu" | Submit |
| 15 | **Test Case 2d: Chỉ thiếu danh mục** | |
| 16 | Nhập đầy đủ trừ danh mục | Tên: Test, Giá: 1000, Số lượng: 1 |
| 17 | Click "Lưu" | Submit |

#### Dữ Liệu Test

```json
{
  "test_cases": [
    {
      "case_id": "2a",
      "description": "Tất cả trường bắt buộc trống",
      "name": "",
      "price": "",
      "quantity": "",
      "category": null,
      "expected_errors": [
        "Tên sản phẩm là bắt buộc",
        "Giá sản phẩm là bắt buộc",
        "Số lượng là bắt buộc",
        "Danh mục là bắt buộc"
      ]
    },
    {
      "case_id": "2b",
      "description": "Chỉ thiếu tên sản phẩm",
      "name": "",
      "price": 1000,
      "quantity": 1,
      "category": "Khác",
      "expected_errors": ["Tên sản phẩm là bắt buộc"]
    },
    {
      "case_id": "2c",
      "description": "Chỉ thiếu giá",
      "name": "Sản phẩm test",
      "price": "",
      "quantity": 1,
      "category": "Khác",
      "expected_errors": ["Giá sản phẩm là bắt buộc"]
    },
    {
      "case_id": "2d",
      "description": "Chỉ thiếu danh mục",
      "name": "Sản phẩm test",
      "price": 1000,
      "quantity": 1,
      "category": null,
      "expected_errors": ["Danh mục là bắt buộc"]
    }
  ]
}
```

#### Kết Quả Mong Đợi

**Test Case 2a (Tất cả trống):**
- ✅ Validation messages hiển thị cho tất cả trường bắt buộc
- ✅ Error "Tên sản phẩm là bắt buộc" dưới trường tên
- ✅ Error "Giá sản phẩm là bắt buộc" dưới trường giá
- ✅ Error "Số lượng là bắt buộc" dưới trường số lượng
- ✅ Error "Danh mục là bắt buộc" dưới dropdown danh mục
- ✅ Tất cả trường lỗi được highlight màu đỏ
- ✅ Nút "Lưu" bị disable hoặc không gửi request
- ✅ Không có API call nào được gửi
- ✅ User vẫn ở trang form

**Test Case 2b (Chỉ thiếu tên):**
- ✅ Chỉ có error "Tên sản phẩm là bắt buộc"
- ✅ Các trường khác không có error
- ✅ Không có API call

**Test Case 2c (Chỉ thiếu giá):**
- ✅ Chỉ có error "Giá sản phẩm là bắt buộc"
- ✅ Các trường khác không có error

**Test Case 2d (Chỉ thiếu danh mục):**
- ✅ Chỉ có error "Danh mục là bắt buộc"
- ✅ Các trường khác không có error

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Kết Quả Case 2a: [Pass/Fail]
Kết Quả Case 2b: [Pass/Fail]
Kết Quả Case 2c: [Pass/Fail]
Kết Quả Case 2d: [Pass/Fail]
Chi Tiết: [Ghi chú]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

- Validation phải xảy ra ở frontend trước khi gửi request (client-side validation)
- Backend cũng phải có validation tương tự để bảo mật (server-side validation)
- Error messages phải rõ ràng và bằng tiếng Việt
- Số lượng có thể để trống và default về 0 (tùy business requirement)
- Test cả trường hợp để trống (empty string) và null

---

### Test Case 3: TC_PRODUCT_003 - Cập Nhật Sản Phẩm Thành Công

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_PRODUCT_003 |
| **Tên Test Case** | Cập Nhật Sản Phẩm Thành Công |
| **Ưu Tiên** | 🔴 Critical |
| **Loại Test** | Happy Path |
| **Scenario Liên Quan** | TS_PRODUCT_003 |
| **Yêu Cầu** | REQ_PROD_UPDATE_001 |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ User đã đăng nhập với quyền ADMIN hoặc MANAGER
2. ✅ Sản phẩm ID=1 đã tồn tại:
   - Tên: "Laptop Dell XPS 13"
   - Giá: 25000000
   - Số lượng: 10
   - Mô tả: "Laptop cao cấp"
   - Danh mục: "Điện tử"
3. ✅ Application đang chạy
4. ✅ Tên "Laptop Dell XPS 13 (Updated)" chưa tồn tại

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Truy cập trang Quản Lý | Điều hướng đến `/products` |
| 2 | Tìm sản phẩm cần sửa | Tìm sản phẩm "Laptop Dell XPS 13" trong danh sách |
| 3 | Click nút "Sửa" | Click icon/button "Sửa" của sản phẩm đó |
| 4 | Chờ load dữ liệu | API GET `/api/products/1` được gọi |
| 5 | Kiểm tra form | Xác nhận form hiển thị với dữ liệu hiện tại |
| 6 | Kiểm tra pre-fill data | Tất cả trường đã được điền sẵn |
| 7 | Thay đổi tên | Thêm "(Updated)" vào tên: "Laptop Dell XPS 13 (Updated)" |
| 8 | Thay đổi giá | Đổi từ 25000000 thành 24000000 |
| 9 | Thay đổi số lượng | Đổi từ 10 thành 8 |
| 10 | Thay đổi mô tả | Thêm " - Giảm giá 1 triệu" |
| 11 | Giữ nguyên danh mục | Không đổi danh mục |
| 12 | Kiểm tra validation | Xác nhận không có error |
| 13 | Click nút "Cập Nhật" | Submit form |
| 14 | Chờ response | Đợi API PUT hoàn thành |
| 15 | Kiểm tra kết quả | Verify dữ liệu đã update |

#### Dữ Liệu Test

```json
{
  "product_id": 1,
  "original_data": {
    "name": "Laptop Dell XPS 13",
    "price": 25000000,
    "quantity": 10,
    "description": "Laptop cao cấp",
    "categoryId": 1
  },
  "updated_data": {
    "name": "Laptop Dell XPS 13 (Updated)",
    "price": 24000000,
    "quantity": 8,
    "description": "Laptop cao cấp - Giảm giá 1 triệu",
    "categoryId": 1
  }
}
```

#### Kết Quả Mong Đợi

| Bước | Kết Quả Mong Đợi |
|------|------------------|
| 1-2 | ✅ Danh sách sản phẩm hiển thị, sản phẩm "Laptop Dell XPS 13" có sẵn |
| 3 | ✅ Click vào nút "Sửa", form/modal cập nhật mở |
| 4 | ✅ Loading indicator hiển thị, API GET `/api/products/1` được gọi |
| 5-6 | ✅ Form hiển thị với tất cả trường đã được điền sẵn dữ liệu hiện tại |
| 7-11 | ✅ User có thể chỉnh sửa các trường, giá trị mới hiển thị đúng |
| 12 | ✅ Không có error message, nút "Cập Nhật" được enable |
| 13 | ✅ Loading indicator hiển thị, nút bị disable tạm thời |
| 14 | ✅ API PUT `/api/products/1` được gửi với status 200 OK |
| 15 | ✅ Thông báo: "Cập nhật sản phẩm thành công"<br>✅ Form đóng<br>✅ Danh sách refresh<br>✅ Sản phẩm hiển thị với dữ liệu mới<br>✅ Timestamp `updatedAt` được cập nhật |

**Request API Mong Đợi:**
```json
PUT /api/products/1
{
  "name": "Laptop Dell XPS 13 (Updated)",
  "price": 24000000,
  "quantity": 8,
  "description": "Laptop cao cấp - Giảm giá 1 triệu",
  "categoryId": 1
}
```

**Response API Mong Đợi:**
```json
{
  "success": true,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "id": 1,
    "name": "Laptop Dell XPS 13 (Updated)",
    "price": 24000000,
    "quantity": 8,
    "description": "Laptop cao cấp - Giảm giá 1 triệu",
    "categoryId": 1,
    "categoryName": "Điện tử",
    "createdAt": "2025-11-22T10:30:00Z",
    "updatedAt": "2025-11-22T11:15:00Z"
  }
}
```

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Kết Quả: [Pass/Fail]
Chi Tiết: [Ghi chú]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

- Phải load dữ liệu hiện tại trước khi cho phép edit
- Cho phép update bất kỳ trường nào (trừ ID)
- Validation khi update phải giống như khi create
- Khi check tên trùng, phải loại trừ chính sản phẩm đang sửa
- `updatedAt` timestamp phải được cập nhật
- `createdAt` phải giữ nguyên
- Verify dữ liệu trong database sau khi update

---

### Test Case 4: TC_PRODUCT_004 - Tạo Sản Phẩm Với Tên Trùng Lặp

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_PRODUCT_004 |
| **Tên Test Case** | Tạo Sản Phẩm Với Tên Trùng Lặp |
| **Ưu Tiên** | 🟠 High |
| **Loại Test** | Negative Test |
| **Scenario Liên Quan** | TS_PRODUCT_009 |
| **Yêu Cầu** | REQ_PROD_VALID_003 (Unique name) |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ User đã đăng nhập với quyền phù hợp
2. ✅ Sản phẩm "iPhone 15 Pro" đã tồn tại trong database:
   - ID: 2
   - Tên: "iPhone 15 Pro"
   - Giá: 30000000
   - Số lượng: 5
   - Danh mục: "Điện tử"
3. ✅ Application đang chạy

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Truy cập trang Quản Lý | Điều hướng đến `/products` |
| 2 | Xác nhận sản phẩm tồn tại | Tìm "iPhone 15 Pro" trong danh sách |
| 3 | Click "Thêm Sản Phẩm" | Mở form tạo mới |
| 4 | Nhập tên trùng | Nhập: `iPhone 15 Pro` |
| 5 | Nhập giá khác | Nhập: `29000000` (khác với sản phẩm cũ) |
| 6 | Nhập số lượng | Nhập: `3` |
| 7 | Nhập mô tả | Nhập: `Sản phẩm mới nhập` |
| 8 | Chọn danh mục | Chọn: `Điện tử` |
| 9 | Click nút "Lưu" | Submit form |
| 10 | Chờ response | Đợi API call hoàn thành |
| 11 | Kiểm tra error | Xác nhận error message hiển thị |
| 12 | Kiểm tra form | Form vẫn mở với dữ liệu đã nhập |

#### Dữ Liệu Test

```json
{
  "existing_product": {
    "id": 2,
    "name": "iPhone 15 Pro",
    "price": 30000000,
    "quantity": 5
  },
  "duplicate_attempt": {
    "name": "iPhone 15 Pro",
    "price": 29000000,
    "quantity": 3,
    "description": "Sản phẩm mới nhập",
    "categoryId": 1
  }
}
```

#### Kết Quả Mong Đợi

| Bước | Kết Quả Mong Đợi |
|------|------------------|
| 1-2 | ✅ Sản phẩm "iPhone 15 Pro" hiển thị trong danh sách |
| 3 | ✅ Form tạo mới mở |
| 4-8 | ✅ Các trường được nhập thành công, không có lỗi client-side |
| 9 | ✅ Loading indicator hiển thị |
| 10 | ✅ Request POST `/api/products` được gửi<br>✅ Server trả về 400 Bad Request |
| 11 | ✅ Error message hiển thị: "Tên sản phẩm đã tồn tại trong hệ thống"<br>✅ Error xuất hiện gần trường tên hoặc ở top form<br>✅ Trường tên được highlight màu đỏ |
| 12 | ✅ Form vẫn mở, dữ liệu đã nhập vẫn còn<br>✅ User có thể sửa tên và thử lại<br>✅ Không có sản phẩm mới được tạo trong database |

**Response API Mong Đợi:**
```json
{
  "success": false,
  "errorCode": "PROD_001",
  "message": "Tên sản phẩm đã tồn tại trong hệ thống",
  "field": "name",
  "timestamp": "2025-11-22T11:30:00Z"
}
```

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Kết Quả: [Pass/Fail]
Chi Tiết: [Ghi chú]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

- Client không thể check trùng lặp trước (cần query database)
- Server phải check tên trùng và trả về error rõ ràng
- Error message phải bằng tiếng Việt và thân thiện
- So sánh tên nên case-insensitive: "iPhone 15 Pro" = "iphone 15 pro"
- Hoặc case-sensitive tùy business requirement
- Test cả trường hợp tên có khoảng trắng thừa: "iPhone 15 Pro " vs "iPhone 15 Pro"

---

### Test Case 5: TC_PRODUCT_005 - Tạo Sản Phẩm Với Giá Trị Biên

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_PRODUCT_005 |
| **Tên Test Case** | Tạo Sản Phẩm Với Giá Trị Biên |
| **Ưu Tiên** | 🟠 High |
| **Loại Test** | Boundary Test |
| **Scenario Liên Quan** | TS_PRODUCT_013, TS_PRODUCT_014, TS_PRODUCT_016, TS_PRODUCT_017 |
| **Yêu Cầu** | REQ_PROD_VALID_004 (Boundary values) |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ User đã đăng nhập với quyền phù hợp
2. ✅ Application đang chạy
3. ✅ Database đang hoạt động
4. ✅ Các tên sản phẩm test chưa tồn tại

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | **Test 5a: Tên tối thiểu (3 ký tự)** | |
| 2 | Truy cập form tạo | Click "Thêm Sản Phẩm" |
| 3 | Nhập tên 3 ký tự | Nhập: `ABC` |
| 4 | Nhập dữ liệu hợp lệ | Giá: 1000, Số lượng: 1, Danh mục: Khác |
| 5 | Click "Lưu" | Submit |
| 6 | Verify thành công | Check sản phẩm được tạo |
| 7 | **Test 5b: Tên dưới tối thiểu (2 ký tự)** | |
| 8 | Mở form mới | Click "Thêm Sản Phẩm" |
| 9 | Nhập tên 2 ký tự | Nhập: `AB` |
| 10 | Nhập dữ liệu hợp lệ | Giá: 1000, Số lượng: 1, Danh mục: Khác |
| 11 | Click "Lưu" | Submit |
| 12 | Verify lỗi | Check error message |
| 13 | **Test 5c: Giá tối thiểu (1 VNĐ)** | |
| 14 | Mở form mới | Click "Thêm Sản Phẩm" |
| 15 | Nhập tên | Nhập: `Sản phẩm giá tối thiểu` |
| 16 | Nhập giá tối thiểu | Nhập: `1` |
| 17 | Nhập số lượng | Nhập: `1` |
| 18 | Chọn danh mục | Chọn: `Khác` |
| 19 | Click "Lưu" | Submit |
| 20 | Verify thành công | Check sản phẩm được tạo |
| 21 | **Test 5d: Giá tối đa (999,999,999)** | |
| 22 | Mở form mới | Click "Thêm Sản Phẩm" |
| 23 | Nhập tên | Nhập: `Sản phẩm giá tối đa` |
| 24 | Nhập giá tối đa | Nhập: `999999999` |
| 25 | Nhập số lượng | Nhập: `1` |
| 26 | Click "Lưu" | Submit |
| 27 | Verify thành công | Check giá hiển thị đúng |
| 28 | **Test 5e: Số lượng tối thiểu (0)** | |
| 29 | Mở form mới | Click "Thêm Sản Phẩm" |
| 30 | Nhập dữ liệu | Tên: `Hết hàng`, Giá: 1000 |
| 31 | Nhập số lượng 0 | Nhập: `0` |
| 32 | Click "Lưu" | Submit |
| 33 | Verify thành công | Check sản phẩm tạo được |
| 34 | **Test 5f: Số lượng tối đa (99,999)** | |
| 35 | Mở form mới | Click "Thêm Sản Phẩm" |
| 36 | Nhập dữ liệu | Tên: `Số lượng tối đa`, Giá: 1000 |
| 37 | Nhập số lượng tối đa | Nhập: `99999` |
| 38 | Click "Lưu" | Submit |
| 39 | Verify thành công | Check số lượng hiển thị đúng |

#### Dữ Liệu Test

```json
{
  "boundary_tests": {
    "test_5a": {
      "name": "ABC",
      "length": 3,
      "price": 1000,
      "quantity": 1,
      "expected": "success"
    },
    "test_5b": {
      "name": "AB",
      "length": 2,
      "price": 1000,
      "quantity": 1,
      "expected": "fail",
      "error": "Tên sản phẩm phải có ít nhất 3 ký tự"
    },
    "test_5c": {
      "name": "Sản phẩm giá tối thiểu",
      "price": 1,
      "quantity": 1,
      "expected": "success"
    },
    "test_5d": {
      "name": "Sản phẩm giá tối đa",
      "price": 999999999,
      "quantity": 1,
      "expected": "success"
    },
    "test_5e": {
      "name": "Sản phẩm hết hàng",
      "price": 1000,
      "quantity": 0,
      "expected": "success"
    },
    "test_5f": {
      "name": "Sản phẩm số lượng tối đa",
      "price": 1000,
      "quantity": 99999,
      "expected": "success"
    }
  }
}
```

#### Kết Quả Mong Đợi

**Test 5a (Tên 3 ký tự - at minimum):**
- ✅ Validation pass
- ✅ Sản phẩm được tạo thành công
- ✅ Tên "ABC" lưu đúng trong database

**Test 5b (Tên 2 ký tự - below minimum):**
- ❌ Error: "Tên sản phẩm phải có ít nhất 3 ký tự"
- ❌ Form không submit
- ❌ Không có sản phẩm được tạo

**Test 5c (Giá = 1 - at minimum):**
- ✅ Validation pass
- ✅ Sản phẩm được tạo
- ✅ Giá hiển thị: "1 VNĐ"

**Test 5d (Giá = 999,999,999 - at maximum):**
- ✅ Validation pass
- ✅ Sản phẩm được tạo
- ✅ Giá hiển thị đúng: "999,999,999 VNĐ"
- ✅ Không bị overflow

**Test 5e (Số lượng = 0 - at minimum):**
- ✅ Validation pass (0 là hợp lệ - hết hàng)
- ✅ Sản phẩm được tạo
- ✅ Có thể hiển thị badge "Hết hàng"

**Test 5f (Số lượng = 99,999 - at maximum):**
- ✅ Validation pass
- ✅ Sản phẩm được tạo
- ✅ Số lượng hiển thị đúng: "99,999"

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Test 5a: [Pass/Fail]
Test 5b: [Pass/Fail]
Test 5c: [Pass/Fail]
Test 5d: [Pass/Fail]
Test 5e: [Pass/Fail]
Test 5f: [Pass/Fail]
Chi Tiết: [Ghi chú]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

**Quan Trọng:**
- Boundary testing rất quan trọng để tìm off-by-one errors
- Test cả giá trị đúng biên (at boundary) và vượt biên (above/below)
- Giá 999,999,999 phải xử lý đúng, không overflow
- Số lượng 0 là hợp lệ (sản phẩm hết hàng)
- Database schema phải support: INT cho quantity, DECIMAL/BIGINT cho price
- Frontend phải format số đúng: 999,999,999 (có dấu phẩy)
- Test cả input type="number" có limit max/min không

---

## 4. Bảng Tổng Kết Thực Thi Test

| Test Case ID | Ưu Tiên | Loại Test | Thứ Tự Thực Thi | Thời Gian Ước Tính |
|--------------|---------|-----------|------------------|--------------------|
| TC_PRODUCT_001 | 🔴 Critical | Happy Path | 1 | 5 phút |
| TC_PRODUCT_002 | 🔴 Critical | Negative | 2 | 12 phút (4 sub-cases) |
| TC_PRODUCT_003 | 🔴 Critical | Happy Path | 3 | 6 phút |
| TC_PRODUCT_004 | 🟠 High | Negative | 4 | 4 phút |
| TC_PRODUCT_005 | 🟠 High | Boundary | 5 | 15 phút (6 boundary tests) |

**Tổng Thời Gian Ước Tính:** 42 phút

**Thứ Tự Thực Thi:**
1. Chạy TC_PRODUCT_001 trước để verify baseline functionality (Create)
2. Sau đó chạy negative test TC_PRODUCT_002 (validation)
3. Chạy TC_PRODUCT_003 để verify Update
4. Chạy TC_PRODUCT_004 (duplicate name)
5. Cuối cùng chạy TC_PRODUCT_005 (boundary tests)

---

## 5. Thiết Lập Môi Trường Test

### 5.1. Tạo Test Data

Chạy SQL script sau để chuẩn bị dữ liệu:

```sql
-- Tạo danh mục
INSERT INTO categories (id, name, created_at) VALUES
(1, 'Điện tử', NOW()),
(2, 'Thời trang', NOW()),
(3, 'Gia dụng', NOW()),
(4, 'Sách', NOW()),
(5, 'Khác', NOW());

-- Tạo sản phẩm mẫu cho test update và duplicate
INSERT INTO products (id, name, price, quantity, description, category_id, created_at, updated_at) VALUES
(1, 'Laptop Dell XPS 13', 25000000, 10, 'Laptop cao cấp', 1, NOW(), NOW()),
(2, 'iPhone 15 Pro', 30000000, 5, 'Điện thoại thông minh', 1, NOW(), NOW());

-- Reset auto increment
ALTER TABLE products AUTO_INCREMENT = 3;
```

### 5.2. Thông Tin Môi Trường

| Component | Thông Tin |
|-----------|-----------|
| **Backend** | Spring Boot, port 8080 |
| **Frontend** | React + Vite, port 5173 |
| **Database** | MySQL/PostgreSQL, port 3306/5432 |
| **Browser** | Chrome v120+ / Firefox v115+ / Edge v120+ |
| **OS** | Windows 10/11, macOS 12+, Ubuntu 20.04+ |

### 5.3. Cấu Hình Application

```properties
# application-test.properties
spring.datasource.url=jdbc:mysql://localhost:3306/flogin_test
spring.datasource.username=test_user
spring.datasource.password=test_password
```

---

## 6. Checklist Thực Thi Test

### 6.1. Trước Khi Bắt Đầu Test

- [ ] Môi trường test đã được setup đầy đủ
- [ ] Database có test data (categories và sample products)
- [ ] Backend và Frontend đang chạy
- [ ] Browser và Dev Tools đã mở
- [ ] Test data file đã được chuẩn bị
- [ ] User test đã login với quyền ADMIN/MANAGER

### 6.2. Trong Khi Test

- [ ] Record lại mỗi bước thực hiện
- [ ] Screenshot khi có lỗi
- [ ] Check console logs
- [ ] Monitor Network tab
- [ ] Verify database state sau mỗi operation

### 6.3. Sau Khi Test

- [ ] Update trạng thái test cases (Pass/Fail)
- [ ] Điền kết quả thực tế vào từng test case
- [ ] Tạo defect reports cho các issues tìm thấy
- [ ] Cleanup test data (nếu cần)
- [ ] Update test metrics

---

**Trạng Thái Tài Liệu:** ✅ Đã Hoàn Thành
**Tổng Số Test Cases Chi Tiết:** 5
**Độ Bao Phủ:** Toàn diện các chức năng CRUD cơ bản và validation quan trọng
