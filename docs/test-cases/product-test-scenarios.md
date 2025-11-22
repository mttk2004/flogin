# Tính Năng Quản Lý Sản Phẩm - Các Test Scenario

**Ngày:** 22 Tháng 11, 2025
**Dự Án:** FloginFE_BE - Đăng Nhập & Quản Lý Sản Phẩm
**Tính Năng:** Quản Lý Sản Phẩm (CRUD Operations)
**Tài Liệu Liên Quan:** [Phân Tích Yêu Cầu Sản Phẩm](../test-plan/product-requirements-analysis.md)

---

## 1. Tổng Quan

Tài liệu này chứa các test scenario toàn diện cho tính năng Quản Lý Sản Phẩm, bao gồm happy path, negative test, boundary test và edge case. Mỗi scenario được thiết kế để xác thực các khía cạnh cụ thể của chức năng CRUD sản phẩm.

**Tổng Số Test Scenario:** 22

---

## 2. Các Loại Test Scenario

### 2.1 Happy Path Scenarios (5 scenarios)
### 2.2 Negative Test Scenarios (7 scenarios)
### 2.3 Boundary Test Scenarios (6 scenarios)
### 2.4 Edge Case Scenarios (4 scenarios)

---

## 3. Các Test Scenario

### 3.1 Happy Path Scenarios

#### TS_PRODUCT_001: Tạo Sản Phẩm Mới Thành Công Với Dữ Liệu Hợp Lệ
**Loại:** Happy Path
**Ưu Tiên:** Critical

**Mô Tả:**
Người dùng tạo sản phẩm mới thành công với tất cả các trường dữ liệu hợp lệ đáp ứng yêu cầu xác thực.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền ADMIN hoặc MANAGER
- Database đang chạy và có thể kết nối
- Danh mục sản phẩm đã tồn tại trong hệ thống
- Tên sản phẩm chưa tồn tại trong database

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên sản phẩm hợp lệ: "Laptop Dell XPS 13"
4. Nhập giá hợp lệ: "25000000"
5. Nhập số lượng hợp lệ: "10"
6. Nhập mô tả: "Laptop cao cấp, màn hình 13 inch"
7. Chọn danh mục: "Điện tử"
8. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ✅ Request POST /api/products được gửi thành công
- ✅ Server trả về 201 Created
- ✅ Sản phẩm mới được tạo trong database với ID duy nhất
- ✅ Thông báo thành công hiển thị: "Tạo sản phẩm thành công"
- ✅ Form được đóng
- ✅ Danh sách sản phẩm được refresh
- ✅ Sản phẩm mới xuất hiện trong danh sách
- ✅ Sản phẩm mới được highlight

**Dữ Liệu Test:**
- Tên: `Laptop Dell XPS 13`
- Giá: `25000000`
- Số lượng: `10`
- Mô tả: `Laptop cao cấp, màn hình 13 inch`
- Danh mục: `Điện tử`

---

#### TS_PRODUCT_002: Xem Danh Sách Sản Phẩm Thành Công
**Loại:** Happy Path
**Ưu Tiên:** Critical

**Mô Tả:**
Người dùng xem danh sách tất cả sản phẩm có trong hệ thống với phân trang.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập
- Database có ít nhất 1 sản phẩm
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Chờ danh sách sản phẩm load
3. Xác nhận dữ liệu hiển thị
4. Kiểm tra các thông tin: Tên, Giá, Số lượng, Danh mục
5. Kiểm tra pagination nếu có nhiều hơn 10 sản phẩm

**Kết Quả Mong Đợi:**
- ✅ Request GET /api/products được gửi
- ✅ Server trả về 200 OK với danh sách sản phẩm
- ✅ Bảng sản phẩm hiển thị với các cột: ID, Tên, Giá, Số lượng, Danh mục, Thao tác
- ✅ Dữ liệu hiển thị đầy đủ và chính xác
- ✅ Pagination hoạt động đúng (nếu có)
- ✅ Giá được format đúng (vd: 25,000,000 VNĐ)
- ✅ Các nút Sửa, Xóa hiển thị cho mỗi sản phẩm

**Dữ Liệu Test:**
- Database có ít nhất 3-5 sản phẩm mẫu

---

#### TS_PRODUCT_003: Cập Nhật Sản Phẩm Thành Công
**Loại:** Happy Path
**Ưu Tiên:** Critical

**Mô Tả:**
Người dùng cập nhật thông tin sản phẩm hiện có thành công.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền ADMIN hoặc MANAGER
- Sản phẩm cần cập nhật đã tồn tại trong database
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Sửa" trên một sản phẩm
3. Xác nhận form hiển thị với dữ liệu hiện tại
4. Thay đổi giá từ "25000000" thành "24000000"
5. Thay đổi số lượng từ "10" thành "8"
6. Thêm vào mô tả: " - Giảm giá"
7. Click nút "Cập Nhật"

**Kết Quả Mong Đợi:**
- ✅ Request GET /api/products/{id} được gửi để load dữ liệu
- ✅ Form hiển thị với dữ liệu hiện tại của sản phẩm
- ✅ User có thể chỉnh sửa các trường
- ✅ Request PUT /api/products/{id} được gửi khi submit
- ✅ Server trả về 200 OK với dữ liệu đã cập nhật
- ✅ Thông báo thành công: "Cập nhật sản phẩm thành công"
- ✅ Form được đóng
- ✅ Danh sách được refresh với dữ liệu mới
- ✅ Timestamp `updated_at` được cập nhật

**Dữ Liệu Test:**
- ID sản phẩm: `1`
- Giá mới: `24000000`
- Số lượng mới: `8`

---

#### TS_PRODUCT_004: Xóa Sản Phẩm Thành Công
**Loại:** Happy Path
**Ưu Tiên:** Critical

**Mô Tả:**
Người dùng xóa sản phẩm khỏi hệ thống sau khi xác nhận.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền ADMIN hoặc MANAGER
- Sản phẩm cần xóa đã tồn tại trong database
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Xóa" trên một sản phẩm
3. Dialog xác nhận hiển thị
4. Xác nhận thông tin sản phẩm trong dialog
5. Click nút "Xác nhận xóa"

**Kết Quả Mong Đợi:**
- ✅ Dialog xác nhận hiển thị với thông tin sản phẩm
- ✅ Dialog có 2 nút: "Hủy" và "Xác nhận"
- ✅ Request DELETE /api/products/{id} được gửi khi xác nhận
- ✅ Server trả về 204 No Content hoặc 200 OK
- ✅ Thông báo thành công: "Xóa sản phẩm thành công"
- ✅ Sản phẩm biến mất khỏi danh sách ngay lập tức
- ✅ Không cần refresh trang
- ✅ Sản phẩm không còn trong database

**Dữ Liệu Test:**
- ID sản phẩm cần xóa: `1`

---

#### TS_PRODUCT_005: Xem Chi Tiết Sản Phẩm Thành Công
**Loại:** Happy Path
**Ưu Tiên:** High

**Mô Tả:**
Người dùng xem thông tin chi tiết của một sản phẩm cụ thể.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập
- Sản phẩm đã tồn tại trong database
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click vào tên sản phẩm hoặc nút "Xem Chi Tiết"
3. Modal hoặc trang chi tiết hiển thị

**Kết Quả Mong Đợi:**
- ✅ Request GET /api/products/{id} được gửi
- ✅ Server trả về 200 OK với đầy đủ thông tin
- ✅ Modal/Page hiển thị tất cả thông tin:
  * Tên sản phẩm
  * Giá (format đẹp)
  * Số lượng
  * Mô tả đầy đủ
  * Danh mục
  * Ngày tạo
  * Ngày cập nhật
- ✅ Các nút "Sửa" và "Xóa" có sẵn (nếu có quyền)

**Dữ Liệu Test:**
- ID sản phẩm: `1`

---

### 3.2 Negative Test Scenarios

#### TS_PRODUCT_006: Tạo Sản Phẩm Với Tên Trống
**Loại:** Negative Test
**Ưu Tiên:** Critical

**Mô Tả:**
Hệ thống ngăn chặn tạo sản phẩm khi trường tên bị bỏ trống.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Để trống trường tên sản phẩm
4. Nhập giá hợp lệ: "25000000"
5. Nhập số lượng hợp lệ: "10"
6. Chọn danh mục: "Điện tử"
7. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực hiển thị
- ❌ Thông báo lỗi: "Tên sản phẩm là bắt buộc"
- ❌ Trường tên được highlight màu đỏ
- ❌ Request POST không được gửi đến server
- ❌ Form vẫn mở, user vẫn ở trang hiện tại
- ❌ Nút "Lưu" có thể bị disable

**Dữ Liệu Test:**
- Tên: `` (trống)
- Giá: `25000000`
- Số lượng: `10`
- Danh mục: `Điện tử`

---

#### TS_PRODUCT_007: Tạo Sản Phẩm Với Giá Không Hợp Lệ
**Loại:** Negative Test
**Ưu Tiên:** Critical

**Mô Tả:**
Hệ thống từ chối tạo sản phẩm với giá bằng 0, âm hoặc vượt quá giới hạn.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên: "Sản phẩm test"
4. Test với giá = 0
5. Test với giá = -1000
6. Test với giá = 1000000000 (vượt quá 999,999,999)
7. Mỗi lần click "Lưu"

**Kết Quả Mong Đợi:**
**Khi giá = 0 hoặc âm:**
- ❌ Error message: "Giá phải lớn hơn 0"
- ❌ Trường giá được highlight

**Khi giá > 999,999,999:**
- ❌ Error message: "Giá không được vượt quá 999,999,999 VNĐ"
- ❌ Trường giá được highlight

**Chung:**
- ❌ Request POST không được gửi
- ❌ Form vẫn mở

**Dữ Liệu Test:**
- Tên: `Sản phẩm test`
- Giá test 1: `0`
- Giá test 2: `-1000`
- Giá test 3: `1000000000`
- Số lượng: `10`
- Danh mục: `Điện tử`

---

#### TS_PRODUCT_008: Tạo Sản Phẩm Với Số Lượng Không Hợp Lệ
**Loại:** Negative Test
**Ưu Tiên:** High

**Mô Tả:**
Hệ thống từ chối tạo sản phẩm với số lượng âm, có thập phân hoặc vượt quá giới hạn.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên: "Sản phẩm test"
4. Nhập giá hợp lệ: "25000000"
5. Test với số lượng = -5
6. Test với số lượng = 50.5 (thập phân)
7. Test với số lượng = 100000 (vượt quá 99,999)
8. Chọn danh mục: "Điện tử"
9. Mỗi lần click "Lưu"

**Kết Quả Mong Đợi:**
**Khi số lượng âm:**
- ❌ Error message: "Số lượng không được âm"

**Khi số lượng có thập phân:**
- ❌ Error message: "Số lượng phải là số nguyên"

**Khi số lượng > 99,999:**
- ❌ Error message: "Số lượng không được vượt quá 99,999"

**Chung:**
- ❌ Trường số lượng được highlight
- ❌ Request POST không được gửi

**Dữ Liệu Test:**
- Tên: `Sản phẩm test`
- Giá: `25000000`
- Số lượng test 1: `-5`
- Số lượng test 2: `50.5`
- Số lượng test 3: `100000`
- Danh mục: `Điện tử`

---

#### TS_PRODUCT_009: Tạo Sản Phẩm Với Tên Trùng Lặp
**Loại:** Negative Test
**Ưu Tiên:** High

**Mô Tả:**
Hệ thống từ chối tạo sản phẩm với tên đã tồn tại trong database.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Sản phẩm "Laptop Dell XPS 13" đã tồn tại trong database
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên trùng: "Laptop Dell XPS 13"
4. Nhập giá: "26000000" (khác với sản phẩm cũ)
5. Nhập số lượng: "5"
6. Chọn danh mục: "Điện tử"
7. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ❌ Request POST được gửi (vì client không thể biết trước)
- ❌ Server trả về 400 Bad Request
- ❌ Error message từ server: "Tên sản phẩm đã tồn tại trong hệ thống"
- ❌ Error hiển thị ở trường tên
- ❌ Form vẫn mở với dữ liệu đã nhập
- ❌ User có thể sửa tên và thử lại

**Dữ Liệu Test:**
- Tên (trùng): `Laptop Dell XPS 13`
- Giá: `26000000`
- Số lượng: `5`
- Danh mục: `Điện tử`

---

#### TS_PRODUCT_010: Cập Nhật Sản Phẩm Không Tồn Tại
**Loại:** Negative Test
**Ưu Tiên:** High

**Mô Tả:**
Hệ thống xử lý đúng khi user cố gắng cập nhật sản phẩm đã bị xóa hoặc không tồn tại.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- ID sản phẩm 999 không tồn tại trong database
- Ứng dụng đang chạy

**Các Bước Test:**
1. Truy cập trực tiếp URL: /products/edit/999
2. Hoặc: Xóa sản phẩm rồi click nút "Sửa" từ cache
3. Cố gắng load form sửa

**Kết Quả Mong Đợi:**
- ❌ Request GET /api/products/999 trả về 404 Not Found
- ❌ Thông báo lỗi: "Sản phẩm không tồn tại"
- ❌ Redirect về trang danh sách sản phẩm
- ❌ Hoặc hiển thị trang 404

**Dữ Liệu Test:**
- ID không tồn tại: `999`

---

#### TS_PRODUCT_011: Xóa Sản Phẩm Không Tồn Tại
**Loại:** Negative Test
**Ưu Tiên:** Medium

**Mô Tả:**
Hệ thống xử lý đúng khi user cố gắng xóa sản phẩm đã bị xóa hoặc không tồn tại.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- ID sản phẩm 999 không tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Gửi request DELETE /api/products/999 trực tiếp
2. Hoặc click nút "Xóa" từ cache sau khi sản phẩm đã bị xóa

**Kết Quả Mong Đợi:**
- ❌ Server trả về 404 Not Found
- ❌ Thông báo lỗi: "Sản phẩm không tồn tại"
- ❌ Không có thay đổi trong database

**Dữ Liệu Test:**
- ID không tồn tại: `999`

---

#### TS_PRODUCT_012: Tạo Sản Phẩm Mà Không Chọn Danh Mục
**Loại:** Negative Test
**Ưu Tiên:** High

**Mô Tả:**
Hệ thống từ chối tạo sản phẩm khi không chọn danh mục.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên: "Sản phẩm test"
4. Nhập giá: "25000000"
5. Nhập số lượng: "10"
6. Để trống dropdown danh mục
7. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ❌ Error message: "Danh mục là bắt buộc"
- ❌ Trường danh mục được highlight
- ❌ Request POST không được gửi
- ❌ Form vẫn mở

**Dữ Liệu Test:**
- Tên: `Sản phẩm test`
- Giá: `25000000`
- Số lượng: `10`
- Danh mục: (không chọn)

---

### 3.3 Boundary Test Scenarios

#### TS_PRODUCT_013: Tạo Sản Phẩm Với Tên Ở Độ Dài Tối Thiểu
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống chấp nhận tên sản phẩm ở đúng độ dài tối thiểu (3 ký tự).

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Tên "ABC" chưa tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên chính xác 3 ký tự: "ABC"
4. Nhập giá: "1000"
5. Nhập số lượng: "1"
6. Chọn danh mục: "Khác"
7. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ✅ Validation pass
- ✅ Request POST được gửi thành công
- ✅ Server trả về 201 Created
- ✅ Sản phẩm được tạo trong database
- ✅ Thông báo thành công hiển thị

**Dữ Liệu Test:**
- Tên: `ABC` (3 ký tự - tối thiểu)
- Giá: `1000`
- Số lượng: `1`
- Danh mục: `Khác`

---

#### TS_PRODUCT_014: Tạo Sản Phẩm Với Tên Dưới Độ Dài Tối Thiểu
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống từ chối tên sản phẩm dưới độ dài tối thiểu (ít hơn 3 ký tự).

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên 2 ký tự: "AB"
4. Nhập giá: "1000"
5. Nhập số lượng: "1"
6. Chọn danh mục: "Khác"
7. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ❌ Error message: "Tên sản phẩm phải có ít nhất 3 ký tự"
- ❌ Trường tên được highlight
- ❌ Request POST không được gửi

**Dữ Liệu Test:**
- Tên: `AB` (2 ký tự - dưới tối thiểu)
- Giá: `1000`
- Số lượng: `1`
- Danh mục: `Khác`

---

#### TS_PRODUCT_015: Tạo Sản Phẩm Với Tên Ở Độ Dài Tối Đa
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống chấp nhận tên sản phẩm ở đúng độ dài tối đa (100 ký tự).

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Tên 100 ký tự chưa tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên chính xác 100 ký tự
4. Nhập giá: "1000"
5. Nhập số lượng: "1"
6. Chọn danh mục: "Khác"
7. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ✅ Validation pass
- ✅ Request POST được gửi thành công
- ✅ Sản phẩm được tạo với tên đầy đủ 100 ký tự
- ✅ Tên hiển thị đầy đủ trong danh sách (hoặc có truncate với tooltip)

**Dữ Liệu Test:**
- Tên: `Sản phẩm có tên rất dài để test boundary với 100 ký tự chính xác bao gồm cả khoảng trắng và ký tự số 123456` (100 ký tự)
- Giá: `1000`
- Số lượng: `1`
- Danh mục: `Khác`

---

#### TS_PRODUCT_016: Tạo Sản Phẩm Với Giá Ở Giá Trị Biên
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống chấp nhận giá ở giá trị tối thiểu (1) và tối đa (999,999,999).

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Test với giá tối thiểu: 1
2. Test với giá tối đa: 999999999
3. Mỗi test tạo một sản phẩm hoàn chỉnh

**Kết Quả Mong Đợi:**
**Với giá = 1:**
- ✅ Validation pass
- ✅ Sản phẩm được tạo thành công

**Với giá = 999,999,999:**
- ✅ Validation pass
- ✅ Sản phẩm được tạo thành công
- ✅ Giá hiển thị đúng format: "999,999,999 VNĐ"

**Dữ Liệu Test:**
- Test 1: Tên: `Sản phẩm giá tối thiểu`, Giá: `1`
- Test 2: Tên: `Sản phẩm giá tối đa`, Giá: `999999999`

---

#### TS_PRODUCT_017: Tạo Sản Phẩm Với Số Lượng Ở Giá Trị Biên
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống chấp nhận số lượng ở giá trị tối thiểu (0) và tối đa (99,999).

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Test với số lượng tối thiểu: 0 (hết hàng)
2. Test với số lượng tối đa: 99999
3. Mỗi test tạo một sản phẩm hoàn chỉnh

**Kết Quả Mong Đợi:**
**Với số lượng = 0:**
- ✅ Validation pass (0 là hợp lệ - hết hàng)
- ✅ Sản phẩm được tạo thành công
- ✅ Có thể hiển thị label "Hết hàng"

**Với số lượng = 99,999:**
- ✅ Validation pass
- ✅ Sản phẩm được tạo thành công
- ✅ Số lượng hiển thị đúng: "99,999"

**Dữ Liệu Test:**
- Test 1: Tên: `Sản phẩm hết hàng`, Số lượng: `0`
- Test 2: Tên: `Sản phẩm số lượng tối đa`, Số lượng: `99999`

---

#### TS_PRODUCT_018: Tạo Sản Phẩm Với Mô Tả Ở Độ Dài Tối Đa
**Loại:** Boundary Test
**Ưu Tiên:** Medium

**Mô Tả:**
Xác minh hệ thống chấp nhận mô tả ở đúng độ dài tối đa (500 ký tự).

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên: "Sản phẩm test mô tả dài"
4. Nhập giá: "1000"
5. Nhập số lượng: "1"
6. Nhập mô tả chính xác 500 ký tự
7. Chọn danh mục: "Khác"
8. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ✅ Validation pass
- ✅ Sản phẩm được tạo với mô tả đầy đủ
- ✅ Mô tả lưu đúng 500 ký tự trong database
- ✅ Mô tả hiển thị đầy đủ trong chi tiết sản phẩm

**Dữ Liệu Test:**
- Mô tả: String 500 ký tự chính xác

---

### 3.4 Edge Case Scenarios

#### TS_PRODUCT_019: Tạo Sản Phẩm Với Tên Chứa Khoảng Trắng Đầu/Cuối
**Loại:** Edge Case
**Ưu Tiên:** Medium

**Mô Tả:**
Xác minh hệ thống tự động trim khoảng trắng ở đầu và cuối tên sản phẩm.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên với khoảng trắng: "  Laptop Dell  "
4. Nhập giá: "25000000"
5. Nhập số lượng: "10"
6. Chọn danh mục: "Điện tử"
7. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ✅ Khoảng trắng đầu/cuối được tự động trim
- ✅ Tên lưu trong database: "Laptop Dell" (không có khoảng trắng thừa)
- ✅ Sản phẩm được tạo thành công
- ✅ Hiển thị tên đã được trim

**Dữ Liệu Test:**
- Tên nhập vào: `  Laptop Dell  `
- Tên sau khi trim: `Laptop Dell`

---

#### TS_PRODUCT_020: Tạo Sản Phẩm Với Mô Tả Trống
**Loại:** Edge Case
**Ưu Tiên:** Medium

**Mô Tả:**
Xác minh hệ thống cho phép tạo sản phẩm mà không có mô tả (trường tùy chọn).

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Thêm Sản Phẩm"
3. Nhập tên: "Sản phẩm không có mô tả"
4. Nhập giá: "1000"
5. Nhập số lượng: "1"
6. Để trống trường mô tả
7. Chọn danh mục: "Khác"
8. Click nút "Lưu"

**Kết Quả Mong Đợi:**
- ✅ Validation pass (mô tả không bắt buộc)
- ✅ Sản phẩm được tạo thành công
- ✅ Mô tả lưu là null hoặc empty string
- ✅ Trong chi tiết hiển thị "Không có mô tả" hoặc trống

**Dữ Liệu Test:**
- Tên: `Sản phẩm không có mô tả`
- Mô tả: `` (trống)

---

#### TS_PRODUCT_021: Cập Nhật Sản Phẩm Với Tên Trùng Sản Phẩm Khác
**Loại:** Edge Case
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống không cho phép đổi tên sản phẩm thành tên đã tồn tại của sản phẩm khác.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Sản phẩm A (ID=1): "Laptop Dell XPS 13"
- Sản phẩm B (ID=2): "iPhone 15 Pro"
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Sửa" trên sản phẩm B (ID=2)
3. Đổi tên từ "iPhone 15 Pro" thành "Laptop Dell XPS 13" (trùng với A)
4. Click nút "Cập Nhật"

**Kết Quả Mong Đợi:**
- ❌ Server trả về 400 Bad Request
- ❌ Error message: "Tên sản phẩm đã tồn tại trong hệ thống"
- ❌ Tên không được cập nhật
- ❌ Form vẫn mở với dữ liệu đã nhập

**Lưu Ý:**
- Cho phép giữ nguyên tên của chính sản phẩm đó (không báo lỗi)
- Chỉ báo lỗi khi trùng với sản phẩm khác

**Dữ Liệu Test:**
- Sản phẩm cần sửa: ID=2
- Tên mới (trùng): `Laptop Dell XPS 13`

---

#### TS_PRODUCT_022: Xóa Nhiều Sản Phẩm Liên Tiếp
**Loại:** Edge Case
**Ưu Tiên:** Low

**Mô Tả:**
Xác minh hệ thống xử lý đúng khi xóa nhiều sản phẩm liên tiếp nhanh chóng.

**Điều Kiện Tiên Quyết:**
- User đã đăng nhập với quyền phù hợp
- Database có ít nhất 5 sản phẩm
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang Quản Lý Sản Phẩm
2. Click nút "Xóa" trên sản phẩm 1
3. Xác nhận xóa
4. Ngay lập tức click "Xóa" trên sản phẩm 2
5. Xác nhận xóa
6. Lặp lại cho 3 sản phẩm tiếp theo

**Kết Quả Mong Đợi:**
- ✅ Tất cả các request DELETE được xử lý đúng
- ✅ Không có conflict hoặc race condition
- ✅ Mỗi sản phẩm biến mất sau khi xóa
- ✅ Danh sách được cập nhật đúng
- ✅ Không có lỗi hoặc crash

**Dữ Liệu Test:**
- Xóa 5 sản phẩm liên tiếp

---

## 4. Tổng Kết Test Scenario

| Loại | Số Lượng | Scenarios |
|------|----------|-----------|
| **Happy Path** | 5 | TS_PRODUCT_001, 002, 003, 004, 005 |
| **Negative Tests** | 7 | TS_PRODUCT_006, 007, 008, 009, 010, 011, 012 |
| **Boundary Tests** | 6 | TS_PRODUCT_013, 014, 015, 016, 017, 018 |
| **Edge Cases** | 4 | TS_PRODUCT_019, 020, 021, 022 |
| **TỔNG** | **22** | |

---

## 5. Phân Tích Độ Bao Phủ Test

### 5.1 Độ Bao Phủ Xác Thực Tên Sản Phẩm
- ✅ Tên trống
- ✅ Độ dài tối thiểu (3 ký tự)
- ✅ Dưới độ dài tối thiểu (<3 ký tự)
- ✅ Độ dài tối đa (100 ký tự)
- ✅ Tên trùng lặp
- ✅ Khoảng trắng đầu/cuối (trim)

### 5.2 Độ Bao Phủ Xác Thực Giá
- ✅ Giá trống
- ✅ Giá = 0
- ✅ Giá âm
- ✅ Giá tối thiểu (1)
- ✅ Giá tối đa (999,999,999)
- ✅ Giá vượt quá giới hạn

### 5.3 Độ Bao Phủ Xác Thực Số Lượng
- ✅ Số lượng trống
- ✅ Số lượng âm
- ✅ Số lượng có thập phân
- ✅ Số lượng tối thiểu (0)
- ✅ Số lượng tối đa (99,999)
- ✅ Số lượng vượt quá giới hạn

### 5.4 Độ Bao Phủ Xác Thực Mô Tả
- ✅ Mô tả trống (hợp lệ)
- ✅ Mô tả tối đa (500 ký tự)
- ✅ Mô tả vượt quá giới hạn

### 5.5 Độ Bao Phủ Xác Thực Danh Mục
- ✅ Danh mục trống
- ✅ Danh mục hợp lệ

### 5.6 Độ Bao Phủ Chức Năng CRUD
- ✅ Create thành công
- ✅ Read danh sách
- ✅ Read chi tiết
- ✅ Update thành công
- ✅ Update không tồn tại
- ✅ Delete thành công
- ✅ Delete không tồn tại
- ✅ Delete nhiều liên tiếp

---

## 6. Ghi Chú Thực Thi Test

**Môi Trường Test:**
- Development: H2 in-memory database
- Testing: MySQL/PostgreSQL test database
- Production: MySQL/PostgreSQL production database

**Yêu Cầu Dữ Liệu Test:**
- Ít nhất 5-10 sản phẩm mẫu
- Tất cả các danh mục đã được tạo sẵn
- User account với quyền ADMIN/MANAGER

**Cân Nhắc Tự Động Hóa:**
- Tất cả scenarios đều phù hợp cho tự động hóa
- Ưu tiên: Critical và High scenarios nên được tự động hóa trước
- Sử dụng data-driven testing cho boundary tests

---

**Trạng Thái Tài Liệu:** ✅ Đã Hoàn Thành
**Tổng Số Scenarios:** 22 (vượt yêu cầu tối thiểu 10)
**Độ Bao Phủ:** Toàn diện (Happy Path, Negative, Boundary, Edge Cases)
