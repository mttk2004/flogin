# Tính Năng Login - Các Test Scenario

**Ngày:** 22 Tháng 11, 2025
**Dự Án:** FloginFE_BE - Đăng Nhập & Quản Lý Sản Phẩm
**Tính Năng:** Xác Thực Đăng Nhập Người Dùng
**Tài Liệu Liên Quan:** [Phân Tích Yêu Cầu Login](../test-plan/login-requirements-analysis.md)

---

## 1. Tổng Quan

Tài liệu này chứa các test scenario toàn diện cho tính năng Login, bao gồm happy path, negative test, boundary test và edge case. Mỗi scenario được thiết kế để xác thực các khía cạnh cụ thể của chức năng đăng nhập.

**Tổng Số Test Scenario:** 19

---

## 2. Các Loại Test Scenario

### 2.1 Happy Path Scenarios (2 scenarios)
### 2.2 Negative Test Scenarios (6 scenarios)
### 2.3 Boundary Test Scenarios (6 scenarios)
### 2.4 Edge Case Scenarios (5 scenarios)

---

## 3. Các Test Scenario

### 3.1 Happy Path Scenarios

#### TS_LOGIN_001: Đăng Nhập Thành Công Với Credentials Hợp Lệ
**Loại:** Happy Path
**Ưu Tiên:** Critical

**Mô Tả:**
Người dùng đăng nhập thành công với username và password hợp lệ đáp ứng tất cả yêu cầu xác thực.

**Điều Kiện Tiên Quyết:**
- Tài khoản người dùng tồn tại trong hệ thống
- Ứng dụng đang chạy và có thể truy cập
- Người dùng đang ở trang login

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username hợp lệ (vd: "testuser123")
3. Nhập password hợp lệ (vd: "Pass123")
4. Click nút "Login"

**Kết Quả Mong Đợi:**
- ✅ Request login được gửi đến server
- ✅ Server xác thực thành công
- ✅ JWT token được tạo và trả về
- ✅ Token được lưu vào localStorage
- ✅ Thông báo thành công hiển thị: "Đăng nhập thành công"
- ✅ Người dùng được chuyển hướng đến dashboard
- ✅ Phiên người dùng đang hoạt động

**Dữ Liệu Test:**
- Username: `testuser123`
- Password: `Pass123`

---

#### TS_LOGIN_002: Đăng Nhập Thành Công Với Giá Trị Biên
**Loại:** Happy Path
**Ưu Tiên:** High

**Mô Tả:**
Người dùng đăng nhập thành công sử dụng username và password ở độ dài tối thiểu và tối đa cho phép.

**Điều Kiện Tiên Quyết:**
- Tài khoản người dùng với credentials độ dài biên tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username ở độ dài tối thiểu (3 ký tự): "abc"
3. Nhập password ở độ dài tối thiểu (6 ký tự): "abc123"
4. Click nút Login
5. Xác nhận đăng nhập thành công
6. Logout
7. Đăng nhập lại với credentials độ dài tối đa

**Kết Quả Mong Đợi:**
- ✅ Cả credentials độ dài tối thiểu và tối đa đều được chấp nhận
- ✅ Xác thực thành công
- ✅ Người dùng được chuyển hướng đến dashboard

**Dữ Liệu Test:**
- Min: Username: `abc`, Password: `abc123`
- Max: Username: `User1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678` (50 ký tự)
- Max: Password: `Pass1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234` (100 ký tự)

---

### 3.2 Negative Test Scenarios

#### TS_LOGIN_003: Đăng Nhập Với Username Trống
**Loại:** Negative Test
**Ưu Tiên:** Critical

**Mô Tả:**
Hệ thống ngăn chặn lần thử đăng nhập khi trường username bị bỏ trống.

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy
- Người dùng đang ở trang login

**Các Bước Test:**
1. Điều hướng đến trang login
2. Để trống trường username
3. Nhập password hợp lệ: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực form được hiển thị
- ❌ Thông báo lỗi: "Username là bắt buộc"
- ❌ Request login KHÔNG được gửi đến server
- ❌ Người dùng vẫn ở trang login
- ❌ Trường username được highlight màu đỏ

**Dữ Liệu Test:**
- Username: `` (trống)
- Password: `Pass123`

---

#### TS_LOGIN_004: Đăng Nhập Với Password Trống
**Loại:** Negative Test
**Ưu Tiên:** Critical

**Mô Tả:**
Hệ thống ngăn chặn lần thử đăng nhập khi trường password bị bỏ trống.

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy
- Người dùng đang ở trang login

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username hợp lệ: "testuser123"
3. Để trống trường password
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực form được hiển thị
- ❌ Thông báo lỗi: "Password là bắt buộc"
- ❌ Request login KHÔNG được gửi đến server
- ❌ Người dùng vẫn ở trang login
- ❌ Trường password được highlight màu đỏ

**Dữ Liệu Test:**
- Username: `testuser123`
- Password: `` (trống)

---

#### TS_LOGIN_005: Đăng Nhập Với Định Dạng Username Không Hợp Lệ (Ký Tự Đặc Biệt)
**Loại:** Negative Test
**Ưu Tiên:** High

**Mô Tả:**
Hệ thống từ chối username chứa ký tự đặc biệt vi phạm quy tắc xác thực.

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy
- Người dùng đang ở trang login

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username có ký tự đặc biệt: "user@name!"
3. Nhập password hợp lệ: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực phía client được hiển thị
- ❌ Thông báo lỗi: "Username chỉ được chứa chữ cái và số"
- ❌ Request login KHÔNG được gửi đến server
- ❌ Người dùng vẫn ở trang login

**Dữ Liệu Test:**
- Username: `user@name!`
- Password: `Pass123`

---

#### TS_LOGIN_006: Đăng Nhập Với Định Dạng Password Không Hợp Lệ (Chỉ Chữ Cái)
**Loại:** Negative Test
**Ưu Tiên:** High

**Mô Tả:**
Hệ thống từ chối password chỉ chứa chữ cái mà không có số.

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy
- Người dùng đang ở trang login

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username hợp lệ: "testuser123"
3. Nhập password chỉ có chữ: "Password"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực phía client được hiển thị
- ❌ Thông báo lỗi: "Password phải chứa cả chữ cái và số"
- ❌ Request login KHÔNG được gửi đến server
- ❌ Người dùng vẫn ở trang login

**Dữ Liệu Test:**
- Username: `testuser123`
- Password: `Password` (không có số)

---

#### TS_LOGIN_007: Đăng Nhập Với Định Dạng Password Không Hợp Lệ (Chỉ Số)
**Loại:** Negative Test
**Ưu Tiên:** High

**Mô Tả:**
Hệ thống từ chối password chỉ chứa số mà không có chữ cái.

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy
- Người dùng đang ở trang login

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username hợp lệ: "testuser123"
3. Nhập password chỉ có số: "123456"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực phía client được hiển thị
- ❌ Thông báo lỗi: "Password phải chứa cả chữ cái và số"
- ❌ Request login KHÔNG được gửi đến server
- ❌ Người dùng vẫn ở trang login

**Dữ Liệu Test:**
- Username: `testuser123`
- Password: `123456` (không có chữ)

---

#### TS_LOGIN_008: Đăng Nhập Với Credentials Không Tồn Tại
**Loại:** Negative Test
**Ưu Tiên:** Critical

**Mô Tả:**
Hệ thống từ chối lần thử đăng nhập với credentials không tồn tại trong database.

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy
- Username "nonexistentuser999" KHÔNG tồn tại trong database

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username không tồn tại: "nonexistentuser999"
3. Nhập password: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Server trả về 401 Unauthorized
- ❌ Thông báo lỗi: "Username hoặc password không đúng"
- ❌ Không có token được tạo
- ❌ Người dùng vẫn ở trang login
- ❌ Lần thử thất bại được ghi log để bảo mật

**Dữ Liệu Test:**
- Username: `nonexistentuser999`
- Password: `Pass123`

---

### 3.3 Boundary Test Scenarios

#### TS_LOGIN_009: Đăng Nhập Với Username Ở Độ Dài Tối Thiểu
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống chấp nhận username ở đúng độ dài tối thiểu cho phép (3 ký tự).

**Điều Kiện Tiên Quyết:**
- Tài khoản người dùng với username 3 ký tự tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username chính xác 3 ký tự: "abc"
3. Nhập password hợp lệ: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ✅ Xác thực username pass
- ✅ Login thành công nếu credentials đúng
- ✅ Người dùng được chuyển hướng đến dashboard

**Dữ Liệu Test:**
- Username: `abc` (3 ký tự - tối thiểu)
- Password: `Pass123`

---

#### TS_LOGIN_010: Đăng Nhập Với Username Dưới Độ Dài Tối Thiểu
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống từ chối username dưới độ dài tối thiểu cho phép (ít hơn 3 ký tự).

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username 2 ký tự: "ab"
3. Nhập password hợp lệ: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực phía client được hiển thị
- ❌ Thông báo lỗi: "Username phải có ít nhất 3 ký tự"
- ❌ Request login KHÔNG được gửi đến server

**Dữ Liệu Test:**
- Username: `ab` (2 ký tự - dưới tối thiểu)
- Password: `Pass123`

---

#### TS_LOGIN_011: Đăng Nhập Với Username Ở Độ Dài Tối Đa
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống chấp nhận username ở đúng độ dài tối đa cho phép (50 ký tự).

**Điều Kiện Tiên Quyết:**
- Tài khoản người dùng với username 50 ký tự tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username chính xác 50 ký tự
3. Nhập password hợp lệ: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ✅ Xác thực username pass
- ✅ Login thành công nếu credentials đúng
- ✅ Người dùng được chuyển hướng đến dashboard

**Dữ Liệu Test:**
- Username: `User1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678` (50 ký tự - tối đa)
- Password: `Pass123`

---

#### TS_LOGIN_012: Đăng Nhập Với Username Vượt Quá Độ Dài Tối Đa
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống từ chối username vượt quá độ dài tối đa cho phép (nhiều hơn 50 ký tự).

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username 51 ký tự
3. Nhập password hợp lệ: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực phía client được hiển thị
- ❌ Thông báo lỗi: "Username không được vượt quá 50 ký tự"
- ❌ Request login KHÔNG được gửi đến server

**Dữ Liệu Test:**
- Username: `User1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789` (51 ký tự - vượt quá tối đa)
- Password: `Pass123`

---

#### TS_LOGIN_013: Đăng Nhập Với Password Ở Độ Dài Tối Thiểu
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống chấp nhận password ở đúng độ dài tối thiểu cho phép (6 ký tự) với thành phần yêu cầu.

**Điều Kiện Tiên Quyết:**
- Tài khoản người dùng tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username hợp lệ: "testuser123"
3. Nhập password chính xác 6 ký tự: "abc123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ✅ Xác thực password pass
- ✅ Login thành công nếu credentials đúng
- ✅ Người dùng được chuyển hướng đến dashboard

**Dữ Liệu Test:**
- Username: `testuser123`
- Password: `abc123` (6 ký tự - tối thiểu, có chữ và số)

---

#### TS_LOGIN_014: Đăng Nhập Với Password Dưới Độ Dài Tối Thiểu
**Loại:** Boundary Test
**Ưu Tiên:** High

**Mô Tả:**
Xác minh hệ thống từ chối password dưới độ dài tối thiểu cho phép (ít hơn 6 ký tự).

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username hợp lệ: "testuser123"
3. Nhập password 5 ký tự: "abc12"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực phía client được hiển thị
- ❌ Thông báo lỗi: "Password phải có ít nhất 6 ký tự"
- ❌ Request login KHÔNG được gửi đến server

**Dữ Liệu Test:**
- Username: `testuser123`
- Password: `abc12` (5 ký tự - dưới tối thiểu)

---

### 3.4 Edge Case Scenarios

#### TS_LOGIN_015: Đăng Nhập Với Username Chứa Khoảng Trắng
**Loại:** Edge Case
**Ưu Tiên:** Medium

**Mô Tả:**
Xác minh hệ thống từ chối username chứa khoảng trắng ở đầu, cuối hoặc giữa.

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Test với khoảng trắng đầu: " testuser"
3. Test với khoảng trắng cuối: "testuser "
4. Test với khoảng trắng giữa: "test user"
5. Click nút Login cho mỗi trường hợp

**Kết Quả Mong Đợi:**
- ❌ Lỗi xác thực phía client được hiển thị cho tất cả trường hợp
- ❌ Thông báo lỗi: "Username chỉ được chứa chữ cái và số"
- ❌ Request login KHÔNG được gửi đến server

**Dữ Liệu Test:**
- Username: ` testuser` (khoảng trắng đầu)
- Username: `testuser ` (khoảng trắng cuối)
- Username: `test user` (khoảng trắng giữa)
- Password: `Pass123`

---

#### TS_LOGIN_016: Đăng Nhập Với Password Chứa Ký Tự Đặc Biệt
**Loại:** Edge Case
**Ưu Tiên:** Medium

**Mô Tả:**
Xác minh hệ thống chấp nhận password chứa ký tự đặc biệt miễn là có cả chữ và số.

**Điều Kiện Tiên Quyết:**
- Tài khoản người dùng với password có ký tự đặc biệt tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username hợp lệ: "testuser123"
3. Nhập password có ký tự đặc biệt: "P@ss123!"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ✅ Xác thực password pass (ký tự đặc biệt được phép)
- ✅ Login thành công nếu credentials đúng
- ✅ Người dùng được chuyển hướng đến dashboard

**Dữ Liệu Test:**
- Username: `testuser123`
- Password: `P@ss123!` (chứa chữ, số và ký tự đặc biệt)

---

#### TS_LOGIN_017: Đăng Nhập Với Username Phân Biệt Hoa Thường
**Loại:** Edge Case
**Ưu Tiên:** Medium

**Mô Tả:**
Xác minh rằng xác thực username có phân biệt chữ hoa chữ thường.

**Điều Kiện Tiên Quyết:**
- Tài khoản người dùng "TestUser123" tồn tại
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username với case khác: "testuser123" (toàn chữ thường)
3. Nhập password đúng: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Xác thực thất bại (giả sử username phân biệt hoa thường)
- ❌ Thông báo lỗi: "Username hoặc password không đúng"
- ❌ Người dùng vẫn ở trang login

**Dữ Liệu Test:**
- Username Đã Đăng Ký: `TestUser123`
- Username Nhập Vào: `testuser123` (case khác)
- Password: `Pass123`

---

#### TS_LOGIN_018: Đăng Nhập Với Password Phân Biệt Hoa Thường
**Loại:** Edge Case
**Ưu Tiên:** Low

**Mô Tả:**
Xác minh rằng xác thực password có phân biệt chữ hoa chữ thường.

**Điều Kiện Tiên Quyết:**
- Tài khoản người dùng tồn tại với password "Pass123"
- Ứng dụng đang chạy

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập username đúng: "testuser123"
3. Nhập password với case khác: "pass123" (toàn chữ thường)
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ Xác thực thất bại (password phân biệt hoa thường)
- ❌ Thông báo lỗi: "Username hoặc password không đúng"
- ❌ Người dùng vẫn ở trang login

**Dữ Liệu Test:**
- Username: `testuser123`
- Password Đúng: `Pass123`
- Password Nhập Vào: `pass123` (case khác)

---

#### TS_LOGIN_019: Đăng Nhập Với Lần Thử SQL Injection
**Loại:** Edge Case / Security
**Ưu Tiên:** Critical

**Mô Tả:**
Xác minh hệ thống được bảo vệ chống tấn công SQL injection trong các trường login.

**Điều Kiện Tiên Quyết:**
- Ứng dụng đang chạy
- Các biện pháp bảo mật đã được triển khai

**Các Bước Test:**
1. Điều hướng đến trang login
2. Nhập SQL độc hại vào username: "admin' OR '1'='1"
3. Nhập password bất kỳ: "Pass123"
4. Click nút Login

**Kết Quả Mong Đợi:**
- ❌ SQL injection được ngăn chặn
- ❌ Lỗi định dạng không hợp lệ hoặc xác thực thất bại
- ❌ Không có truy vấn database nào được thực thi với SQL inject
- ❌ Sự kiện bảo mật được ghi log

**Dữ Liệu Test:**
- Username: `admin' OR '1'='1`
- Password: `Pass123`

---

## 4. Tổng Kết Test Scenario

| Loại | Số Lượng | Scenarios |
|------|----------|-----------|
| **Happy Path** | 2 | TS_LOGIN_001, TS_LOGIN_002 |
| **Negative Tests** | 6 | TS_LOGIN_003, TS_LOGIN_004, TS_LOGIN_005, TS_LOGIN_006, TS_LOGIN_007, TS_LOGIN_008 |
| **Boundary Tests** | 6 | TS_LOGIN_009, TS_LOGIN_010, TS_LOGIN_011, TS_LOGIN_012, TS_LOGIN_013, TS_LOGIN_014 |
| **Edge Cases** | 5 | TS_LOGIN_015, TS_LOGIN_016, TS_LOGIN_017, TS_LOGIN_018, TS_LOGIN_019 |
| **TỔNG** | **19** | |

---

## 5. Phân Tích Độ Bao Phủ Test

### 5.1 Độ Bao Phủ Xác Thực Username
- ✅ Username trống
- ✅ Độ dài tối thiểu (3 ký tự)
- ✅ Dưới độ dài tối thiểu (<3 ký tự)
- ✅ Độ dài tối đa (50 ký tự)
- ✅ Vượt quá độ dài tối đa (>50 ký tự)
- ✅ Ký tự đặc biệt
- ✅ Khoảng trắng (đầu, cuối, giữa)
- ✅ Phân biệt hoa thường
- ✅ Yêu cầu chỉ chữ và số

### 5.2 Độ Bao Phủ Xác Thực Password
- ✅ Password trống
- ✅ Độ dài tối thiểu (6 ký tự)
- ✅ Dưới độ dài tối thiểu (<6 ký tự)
- ✅ Độ dài tối đa (100 ký tự)
- ✅ Chỉ chữ cái (không có số)
- ✅ Chỉ số (không có chữ)
- ✅ Chữ + số (hợp lệ)
- ✅ Ký tự đặc biệt được phép
- ✅ Phân biệt hoa thường

### 5.3 Độ Bao Phủ Luồng Xác Thực
- ✅ Xác thực thành công
- ✅ Xác thực thất bại (sai credentials)
- ✅ User không tồn tại
- ✅ Tạo và lưu trữ token
- ✅ Chuyển hướng sau đăng nhập thành công

### 5.4 Độ Bao Phủ Bảo Mật
- ✅ Ngăn chặn SQL injection
- ✅ Làm sạch input
- ✅ Bảo mật thông báo lỗi (không tiết lộ thông tin)

---

## 6. Ghi Chú Thực Thi Test

**Môi Trường Test:**
- Development: H2 in-memory database
- Testing: H2 test database
- Production: PostgreSQL database

**Yêu Cầu Dữ Liệu Test:**
- Tài khoản user test được tạo sẵn với các tổ hợp username/password khác nhau
- Tài khoản với credentials độ dài biên
- Tài khoản bị vô hiệu hóa/khóa cho negative testing

**Cân Nhắc Tự Động Hóa:**
- Tất cả scenarios đều phù hợp cho tự động hóa
- Ưu tiên: Các scenario Critical và High nên được tự động hóa trước
- Sử dụng data-driven testing cho các boundary và edge case

---

**Trạng Thái Tài Liệu:** ✅ Đã Hoàn Thành
**Tổng Số Scenarios:** 19 (vượt yêu cầu tối thiểu 10)
**Độ Bao Phủ:** Toàn diện (Happy Path, Negative, Boundary, Edge Cases)
