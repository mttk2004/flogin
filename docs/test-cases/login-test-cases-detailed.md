# Tính Năng Login - Các Test Case Chi Tiết

**Ngày:** 22/11/2025
**Dự Án:** FloginFE_BE
**Giai Đoạn Test:** System Testing
**Người Test:** Mai Trần Tuấn Kiệt
**Tài liệu liên quan:**
- login-requirements-analysis.md
- login-test-scenarios.md
- login-priority-classification.md

---

## 1. Tổng Quan

Tài liệu này chứa 5 test cases chi tiết được lựa chọn từ danh sách các test scenarios trong file `login-test-scenarios.md`. Các test cases này bao gồm:

1. **TC_LOGIN_001** - Đăng nhập thành công với credentials hợp lệ (Happy Path - Critical)
2. **TC_LOGIN_002** - Đăng nhập với username và password trống (Negative Test - Critical)
3. **TC_LOGIN_003** - Đăng nhập với username chứa ký tự đặc biệt (Negative Test - High)
4. **TC_LOGIN_004** - Đăng nhập với password không đúng định dạng (Negative Test - High)
5. **TC_LOGIN_005** - Đăng nhập với username ở giá trị biên (Boundary Test - High)

### Tiêu Chí Lựa Chọn

Các test cases được chọn dựa trên:
- **Độ ưu tiên cao:** Tất cả đều là Critical hoặc High priority
- **Đa dạng loại test:** Happy path, Negative test, Boundary test
- **Bao phủ yêu cầu chính:** Authentication, validation, error handling
- **Khả năng tái sử dụng:** Có thể làm template cho các test cases khác

---

## 2. Tham Chiếu Template Test Case

Mỗi test case chi tiết phải bao gồm các trường sau:

| Trường | Mô Tả | Bắt Buộc |
|--------|-------|----------|
| Test Case ID | Mã định danh duy nhất (TC_LOGIN_XXX) | ✅ |
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

### Test Case 1: TC_LOGIN_001 - Đăng Nhập Thành Công Với Credentials Hợp Lệ

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_LOGIN_001 |
| **Tên Test Case** | Đăng Nhập Thành Công Với Credentials Hợp Lệ |
| **Ưu Tiên** | 🔴 Critical |
| **Loại Test** | Happy Path |
| **Scenario Liên Quan** | TS_LOGIN_001 |
| **Yêu Cầu** | REQ_LOGIN_001, REQ_LOGIN_002, REQ_LOGIN_005 |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ Database đang chạy và có thể kết nối được
2. ✅ Backend API đang hoạt động (port 8080)
3. ✅ Frontend application đang chạy (port 5173)
4. ✅ User account đã tồn tại trong database với credentials hợp lệ
5. ✅ Browser đã được cấu hình đúng và cookies được bật

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Mở Browser | Mở Chrome/Firefox/Edge |
| 2 | Truy cập URL | Điều hướng đến `http://localhost:5173` |
| 3 | Kiểm tra trang Login | Xác nhận trang Login hiển thị đầy đủ các thành phần |
| 4 | Click vào trường Username | Focus vào input field Username |
| 5 | Nhập Username | Nhập username hợp lệ: `testuser01` |
| 6 | Click vào trường Password | Focus vào input field Password |
| 7 | Nhập Password | Nhập password hợp lệ: `Test@123` |
| 8 | Click nút "Đăng Nhập" | Submit form |
| 9 | Chờ response | Đợi API call hoàn thành |
| 10 | Kiểm tra kết quả | Xác nhận redirect đến dashboard |

#### Dữ Liệu Test

```json
{
  "test_data": {
    "username": "testuser01",
    "password": "Test@123",
    "expectedUserId": 1,
    "expectedUsername": "testuser01",
    "expectedRole": "USER"
  }
}
```

#### Kết Quả Mong Đợi

| Bước | Kết Quả Mong Đợi |
|------|------------------|
| 1-2 | ✅ Trang login hiển thị với URL `http://localhost:5173` |
| 3 | ✅ Form login hiển thị với 2 input fields (Username, Password) và 1 button "Đăng Nhập" |
| 4 | ✅ Trường Username được focus, cursor nhấp nháy |
| 5 | ✅ Username `testuser01` hiển thị trong input field |
| 6 | ✅ Trường Password được focus |
| 7 | ✅ Password hiển thị dưới dạng ký tự ẩn (dots) |
| 8 | ✅ Button "Đăng Nhập" được click, hiển thị loading indicator |
| 9 | ✅ API call POST `/api/login` được gửi với status 200 OK |
| 10 | ✅ Redirect đến `/dashboard`, hiển thị thông tin user và JWT token được lưu trong localStorage |

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Môi Trường: [Dev/Test/Staging]
Browser: [Chrome/Firefox/Edge] Version: [x.x]
Kết Quả: [Pass/Fail]
Chi Tiết: [Ghi chú về kết quả thực tế]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

- Test case này là baseline cho tất cả các test cases khác
- Cần verify JWT token có expiration time đúng (24 giờ)
- Kiểm tra user session được tạo trong database
- Monitor API response time (không quá 2 giây)

---

### Test Case 2: TC_LOGIN_002 - Đăng Nhập Với Username Và Password Trống

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_LOGIN_002 |
| **Tên Test Case** | Đăng Nhập Với Username Và Password Trống |
| **Ưu Tiên** | 🔴 Critical |
| **Loại Test** | Negative Test |
| **Scenario Liên Quan** | TS_LOGIN_003, TS_LOGIN_004 |
| **Yêu Cầu** | REQ_LOGIN_003 (Validation) |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ Frontend application đang chạy
2. ✅ Backend API đang hoạt động
3. ✅ Browser đã được mở và sẵn sàng
4. ✅ Không có session nào đang active

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Mở Browser | Mở Chrome/Firefox/Edge |
| 2 | Truy cập URL | Điều hướng đến `http://localhost:5173` |
| 3 | Kiểm tra trang Login | Xác nhận trang Login hiển thị |
| 4 | **Test Case 2a: Cả hai trống** | |
| 5 | Để trống Username | Không nhập gì vào trường Username |
| 6 | Để trống Password | Không nhập gì vào trường Password |
| 7 | Click nút "Đăng Nhập" | Attempt to submit |
| 8 | Kiểm tra validation message | Xác nhận error messages hiển thị |
| 9 | **Test Case 2b: Chỉ nhập Username** | |
| 10 | Nhập Username | Nhập `testuser01` |
| 11 | Để trống Password | Không nhập password |
| 12 | Click nút "Đăng Nhập" | Attempt to submit |
| 13 | **Test Case 2c: Chỉ nhập Password** | |
| 14 | Refresh trang và thực hiện tương tự | Chỉ nhập password, để trống username |

#### Dữ Liệu Test

```json
{
  "test_cases": [
    {
      "case_id": "2a",
      "description": "Cả Username và Password đều trống",
      "username": "",
      "password": "",
      "expected_errors": [
        "Username là bắt buộc",
        "Password là bắt buộc"
      ]
    },
    {
      "case_id": "2b",
      "description": "Chỉ nhập Username, Password trống",
      "username": "testuser01",
      "password": "",
      "expected_errors": [
        "Password là bắt buộc"
      ]
    },
    {
      "case_id": "2c",
      "description": "Chỉ nhập Password, Username trống",
      "username": "",
      "password": "Test@123",
      "expected_errors": [
        "Username là bắt buộc"
      ]
    }
  ]
}
```

#### Kết Quả Mong Đợi

**Test Case 2a (Cả hai trống):**
- ✅ Validation messages hiển thị ngay lập tức
- ✅ Error message "Username là bắt buộc" xuất hiện dưới trường Username
- ✅ Error message "Password là bắt buộc" xuất hiện dưới trường Password
- ✅ Nút "Đăng Nhập" bị disable hoặc không gửi request
- ✅ Không có API call nào được gửi đến backend
- ✅ User vẫn ở trang login

**Test Case 2b (Chỉ Username):**
- ✅ Chỉ có error message "Password là bắt buộc" hiển thị
- ✅ Trường Username không có error (vì đã nhập)
- ✅ Không có API call

**Test Case 2c (Chỉ Password):**
- ✅ Chỉ có error message "Username là bắt buộc" hiển thị
- ✅ Trường Password không có error
- ✅ Không có API call

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Kết Quả Case 2a: [Pass/Fail]
Kết Quả Case 2b: [Pass/Fail]
Kết Quả Case 2c: [Pass/Fail]
Chi Tiết: [Ghi chú]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

- Validation phải xảy ra ở frontend trước khi gửi request
- Backend cũng phải có validation tương tự để bảo mật
- Error messages phải rõ ràng và bằng tiếng Việt
- Kiểm tra cả client-side và server-side validation

---

### Test Case 3: TC_LOGIN_003 - Đăng Nhập Với Username Chứa Ký Tự Đặc Biệt

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_LOGIN_003 |
| **Tên Test Case** | Đăng Nhập Với Username Chứa Ký Tự Đặc Biệt |
| **Ưu Tiên** | 🟠 High |
| **Loại Test** | Negative Test |
| **Scenario Liên Quan** | TS_LOGIN_005 |
| **Yêu Cầu** | REQ_LOGIN_003 (Username format validation) |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ Application đang chạy
2. ✅ Biết được quy tắc validation cho username
3. ✅ Không có session active

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Mở trang Login | Truy cập `http://localhost:5173` |
| 2 | Click vào trường Username | Focus vào input |
| 3 | Nhập username với ký tự đặc biệt | Sử dụng data từ test data set |
| 4 | Click vào trường Password | Focus vào password field |
| 5 | Nhập password hợp lệ | Nhập `Test@123` |
| 6 | Click nút "Đăng Nhập" | Submit form |
| 7 | Kiểm tra validation message | Xác nhận error hiển thị |
| 8 | Lặp lại bước 2-7 | Với mỗi username invalid khác |
| 9 | Kiểm tra không có API call | Verify trong Network tab |
| 10 | Kiểm tra user vẫn ở trang login | Không redirect |

#### Dữ Liệu Test

```json
{
  "invalid_usernames": [
    {
      "value": "test@user",
      "description": "Chứa ký tự @"
    },
    {
      "value": "test#user",
      "description": "Chứa ký tự #"
    },
    {
      "value": "test$user",
      "description": "Chứa ký tự $"
    },
    {
      "value": "test user",
      "description": "Chứa khoảng trắng"
    },
    {
      "value": "test!user",
      "description": "Chứa ký tự !"
    },
    {
      "value": "test%user",
      "description": "Chứa ký tự %"
    },
    {
      "value": "test^user",
      "description": "Chứa ký tự ^"
    },
    {
      "value": "test&user",
      "description": "Chứa ký tự &"
    },
    {
      "value": "test*user",
      "description": "Chứa ký tự *"
    }
  ],
  "valid_password": "Test@123",
  "expected_error": "Username chỉ được chứa chữ cái, số và dấu gạch dưới"
}
```

#### Kết Quả Mong Đợi

Với mỗi username invalid:
- ✅ Error message "Username chỉ được chứa chữ cái, số và dấu gạch dưới" hiển thị
- ✅ Error message xuất hiện dưới trường Username
- ✅ Trường Username được highlight màu đỏ
- ✅ Không có API call POST `/api/login` được gửi
- ✅ User vẫn ở trang login
- ✅ Nút "Đăng Nhập" có thể bị disable
- ✅ Console không có error

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Số lượng test cases: 9
Số cases Pass: [Sẽ điền]
Số cases Fail: [Sẽ điền]
Chi Tiết các cases fail: [Sẽ điền]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

- Cần test với tất cả các ký tự đặc biệt phổ biến
- Validation phải real-time (khi user đang nhập)
- Có thể block input của ký tự đặc biệt ngay từ đầu
- Username hợp lệ chỉ chứa: a-z, A-Z, 0-9, underscore (_)
- Test cả trường hợp nhiều ký tự đặc biệt trong 1 username

---

### Test Case 4: TC_LOGIN_004 - Đăng Nhập Với Password Không Đúng Định Dạng

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_LOGIN_004 |
| **Tên Test Case** | Đăng Nhập Với Password Không Đúng Định Dạng |
| **Ưu Tiên** | 🟠 High |
| **Loại Test** | Negative Test |
| **Scenario Liên Quan** | TS_LOGIN_006, TS_LOGIN_007 |
| **Yêu Cầu** | REQ_LOGIN_003 (Password composition) |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ Application đang chạy
2. ✅ Biết quy tắc password: phải có cả chữ và số
3. ✅ Có account test với username `testuser01`

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Mở trang Login | Truy cập `http://localhost:5173` |
| 2 | Nhập Username hợp lệ | Nhập `testuser01` |
| 3 | **Test 4a: Password chỉ có chữ** | |
| 4 | Nhập password chỉ có chữ | Nhập `TestPassword` |
| 5 | Click nút "Đăng Nhập" | Submit form |
| 6 | Kiểm tra validation | Xác nhận error message |
| 7 | **Test 4b: Password chỉ có số** | |
| 8 | Clear password field | Xóa password cũ |
| 9 | Nhập password chỉ có số | Nhập `12345678` |
| 10 | Click nút "Đăng Nhập" | Submit form |
| 11 | Kiểm tra validation | Xác nhận error message |
| 12 | **Test 4c: Password hợp lệ (control)** | |
| 13 | Nhập password hợp lệ | Nhập `Test@123` |
| 14 | Verify login thành công | Đăng nhập được |

#### Dữ Liệu Test

```json
{
  "passwords": {
    "only_letters": {
      "value": "TestPassword",
      "expected_result": "fail",
      "error_message": "Password phải chứa cả chữ và số"
    },
    "only_numbers": {
      "value": "12345678",
      "expected_result": "fail",
      "error_message": "Password phải chứa cả chữ và số"
    },
    "valid": {
      "value": "Test@123",
      "expected_result": "success",
      "error_message": null
    }
  },
  "test_username": "testuser01"
}
```

#### Kết Quả Mong Đợi

**Test 4a (Password chỉ có chữ):**
- ✅ Error message "Password phải chứa cả chữ và số" hiển thị
- ✅ Error xuất hiện dưới trường Password
- ✅ Trường Password được highlight
- ✅ Có thể có API call nhưng trả về 400 Bad Request
- ✅ User vẫn ở trang login

**Test 4b (Password chỉ có số):**
- ✅ Cùng error message như test 4a
- ✅ Validation behavior tương tự

**Test 4c (Password hợp lệ):**
- ✅ Không có error message
- ✅ API call thành công (200 OK)
- ✅ Redirect đến dashboard
- ✅ JWT token được lưu

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Test 4a Result: [Pass/Fail]
Test 4b Result: [Pass/Fail]
Test 4c Result: [Pass/Fail]
Chi Tiết: [Ghi chú]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

- Password composition requirement: phải có cả chữ (a-z, A-Z) và số (0-9)
- Có thể có thêm yêu cầu về ký tự đặc biệt (@, #, $, etc.)
- Test 4c là control test để đảm bảo logic đúng
- Backend validation cũng phải kiểm tra format
- Xem xét thêm test cho password quá ngắn/dài

---

### Test Case 5: TC_LOGIN_005 - Đăng Nhập Với Username Ở Giá Trị Biên

#### Metadata

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Test Case ID** | TC_LOGIN_005 |
| **Tên Test Case** | Đăng Nhập Với Username Ở Giá Trị Biên |
| **Ưu Tiên** | 🟠 High |
| **Loại Test** | Boundary Test |
| **Scenario Liên Quan** | TS_LOGIN_009, TS_LOGIN_010, TS_LOGIN_011, TS_LOGIN_012 |
| **Yêu Cầu** | REQ_LOGIN_003 (Username length: 3-50 chars) |
| **Người Tạo** | Mai Trần Tuấn Kiệt |
| **Ngày Tạo** | 22/11/2025 |

#### Điều Kiện Tiên Quyết

1. ✅ Application đang chạy
2. ✅ Database có test accounts với username ở các giá trị biên
3. ✅ Biết rõ quy tắc: Username phải từ 3-50 ký tự
4. ✅ Không có session active

#### Các Bước Test

| Bước | Hành Động | Chi Tiết |
|------|-----------|----------|
| 1 | Mở trang Login | Truy cập `http://localhost:5173` |
| 2 | **Test 5a: Username 2 ký tự (below minimum)** | |
| 3 | Nhập username 2 ký tự | Nhập `ab` |
| 4 | Nhập password hợp lệ | Nhập `Test@123` |
| 5 | Click "Đăng Nhập" | Submit |
| 6 | Kiểm tra validation error | Verify error message |
| 7 | **Test 5b: Username 3 ký tự (at minimum)** | |
| 8 | Clear và nhập username 3 ký tự | Nhập `abc` |
| 9 | Nhập password | Nhập password của account `abc` |
| 10 | Click "Đăng Nhập" | Submit |
| 11 | Verify login thành công | Check redirect |
| 12 | Logout | Đăng xuất |
| 13 | **Test 5c: Username 50 ký tự (at maximum)** | |
| 14 | Nhập username 50 ký tự | Nhập username dài 50 chars |
| 15 | Nhập password | Nhập password tương ứng |
| 16 | Click "Đăng Nhập" | Submit |
| 17 | Verify login thành công | Check redirect |
| 18 | Logout | Đăng xuất |
| 19 | **Test 5d: Username 51 ký tự (above maximum)** | |
| 20 | Nhập username 51 ký tự | Nhập username dài 51 chars |
| 21 | Kiểm tra validation | Verify error hoặc truncate |

#### Dữ Liệu Test

```json
{
  "boundary_tests": {
    "below_minimum": {
      "username": "ab",
      "length": 2,
      "password": "Test@123",
      "expected_result": "fail",
      "error_message": "Username phải có từ 3 đến 50 ký tự"
    },
    "at_minimum": {
      "username": "abc",
      "length": 3,
      "password": "Abc@123",
      "expected_result": "success",
      "error_message": null
    },
    "at_maximum": {
      "username": "abcdefghij1234567890abcdefghij1234567890abcdefghij",
      "length": 50,
      "password": "Long@123",
      "expected_result": "success",
      "error_message": null
    },
    "above_maximum": {
      "username": "abcdefghij1234567890abcdefghij1234567890abcdefghij1",
      "length": 51,
      "password": "Test@123",
      "expected_result": "fail",
      "error_message": "Username phải có từ 3 đến 50 ký tự"
    }
  },
  "note": "Accounts 'abc' và account 50 ký tự phải được tạo trước trong database"
}
```

#### Kết Quả Mong Đợi

**Test 5a (2 ký tự - below minimum):**
- ✅ Error message "Username phải có từ 3 đến 50 ký tự" hiển thị
- ✅ Form không submit
- ✅ Không có API call
- ✅ User vẫn ở trang login

**Test 5b (3 ký tự - at minimum):**
- ✅ Không có validation error
- ✅ API call POST `/api/login` được gửi
- ✅ Response 200 OK
- ✅ Redirect đến `/dashboard`
- ✅ JWT token được lưu
- ✅ User info hiển thị đúng

**Test 5c (50 ký tự - at maximum):**
- ✅ Tương tự test 5b
- ✅ Login thành công
- ✅ Username 50 ký tự được xử lý đúng
- ✅ Không có truncate hoặc error

**Test 5d (51 ký tự - above maximum):**
- ✅ Error message "Username phải có từ 3 đến 50 ký tự" hiển thị
- ✅ Hoặc input field tự động truncate về 50 ký tự
- ✅ Form không submit với 51 ký tự
- ✅ Backend reject nếu somehow frontend bypass

#### Kết Quả Thực Tế

```
Ngày Thực Thi: [Sẽ điền]
Người Test: [Sẽ điền]
Test 5a (2 chars): [Pass/Fail] - [Chi tiết]
Test 5b (3 chars): [Pass/Fail] - [Chi tiết]
Test 5c (50 chars): [Pass/Fail] - [Chi tiết]
Test 5d (51 chars): [Pass/Fail] - [Chi tiết]
Ghi Chú: [Observations]
```

#### Trạng Thái

⚪ Chưa Chạy

#### Ghi Chú

**Quan Trọng:**
- Boundary testing là critical để tìm off-by-one errors
- Phải tạo test accounts với username 3 ký tự và 50 ký tự trước
- Input field có thể có `maxlength="50"` attribute để ngăn nhập quá 51 chars
- Backend phải validate chặt chẽ để tránh bypass
- Test cả trường hợp username 1 ký tự (nếu có thời gian)
- Kiểm tra cả database schema: VARCHAR(50) hay VARCHAR(255)?

---

## 4. Bảng Tổng Kết Thực Thi Test

| Test Case ID | Ưu Tiên | Loại Test | Thứ Tự Thực Thi | Thời Gian Ước Tính |
|--------------|---------|-----------|------------------|--------------------|
| TC_LOGIN_001 | 🔴 Critical | Happy Path | 1 | 5 phút |
| TC_LOGIN_002 | 🔴 Critical | Negative | 2 | 10 phút (3 sub-cases) |
| TC_LOGIN_003 | 🟠 High | Negative | 3 | 12 phút (9 test values) |
| TC_LOGIN_004 | 🟠 High | Negative | 4 | 8 phút (3 sub-cases) |
| TC_LOGIN_005 | 🟠 High | Boundary | 5 | 8 phút (4 boundary values) |

**Tổng Thời Gian Ước Tính:** 43 phút

**Thứ Tự Thực Thi:**
1. Chạy TC_LOGIN_001 trước để verify baseline functionality
2. Sau đó chạy các negative tests (TC_LOGIN_002, 003, 004)
3. Cuối cùng chạy boundary test (TC_LOGIN_005)

---

## 5. Thiết Lập Môi Trường Test

### 5.1. Tạo Test Users

Chạy SQL script sau để tạo test accounts:

```sql
-- Test user cho TC_LOGIN_001
INSERT INTO users (username, password, role, created_at)
VALUES ('testuser01', '$2a$10$encodedPasswordHashForTest@123', 'USER', NOW());

-- Test user cho TC_LOGIN_005b (3 ký tự)
INSERT INTO users (username, password, role, created_at)
VALUES ('abc', '$2a$10$encodedPasswordHashForAbc@123', 'USER', NOW());

-- Test user cho TC_LOGIN_005c (50 ký tự)
INSERT INTO users (username, password, role, created_at)
VALUES ('abcdefghij1234567890abcdefghij1234567890abcdefghij',
        '$2a$10$encodedPasswordHashForLong@123', 'USER', NOW());

-- Xác nhận passwords:
-- testuser01: Test@123
-- abc: Abc@123
-- user 50 chars: Long@123
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
jwt.secret=test_secret_key_for_jwt_token
jwt.expiration=86400000
```

---

## 6. Checklist Thực Thi Test

### 6.1. Trước Khi Bắt Đầu Test

- [ ] Môi trường test đã được setup đầy đủ
- [ ] Database có test data (test users)
- [ ] Backend và Frontend đang chạy
- [ ] Browser và Dev Tools đã mở
- [ ] Test data file đã được chuẩn bị
- [ ] Không có session nào đang active

### 6.2. Trong Khi Test

- [ ] Record lại mỗi bước thực hiện
- [ ] Screenshot khi có lỗi
- [ ] Check console logs
- [ ] Monitor Network tab
- [ ] Verify database state nếu cần

### 6.3. Sau Khi Test

- [ ] Update trạng thái test cases (Pass/Fail)
- [ ] Điền kết quả thực tế vào từng test case
- [ ] Tạo defect reports cho các issues tìm thấy
- [ ] Cleanup test data (nếu cần)
- [ ] Update test metrics

---

## 7. Template Báo Cáo Defect

Khi tìm thấy lỗi, sử dụng template sau:

```markdown
### Defect Report

**Defect ID:** DEF_LOGIN_XXX
**Test Case ID:** TC_LOGIN_XXX
**Severity:** Critical/High/Medium/Low
**Priority:** P1/P2/P3/P4
**Status:** Open/In Progress/Resolved/Closed

**Mô Tả Ngắn:**
[Tóm tắt 1 dòng về lỗi]

**Các Bước Tái Hiện:**
1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

**Kết Quả Mong Đợi:**
[Mô tả behavior đúng]

**Kết Quả Thực Tế:**
[Mô tả behavior sai]

**Screenshot/Video:**
[Đính kèm]

**Environment:**
- OS: [Windows/macOS/Linux]
- Browser: [Chrome/Firefox/Edge] version [x.x]
- Backend version: [x.x.x]
- Frontend version: [x.x.x]

**Console Logs:**
```
[Paste error logs]
```

**Người Phát Hiện:** [Tên]
**Ngày Phát Hiện:** [DD/MM/YYYY]
```

---

## 8. Các Chỉ Số Test

### 8.1. Test Execution Summary

| Metric | Value |
|--------|-------|
| **Tổng Test Cases** | 5 |
| **Đã Thực Thi** | [Sẽ điền] |
| **Pass** | [Sẽ điền] |
| **Fail** | [Sẽ điền] |
| **Blocked** | [Sẽ điền] |
| **Chưa Chạy** | [Sẽ điền] |

### 8.2. Test Coverage

| Area | Coverage |
|------|----------|
| **Authentication Flow** | 100% |
| **Input Validation** | 100% |
| **Error Handling** | 80% |
| **Boundary Conditions** | 100% |
| **Security** | 60% |

### 8.3. Defect Summary

| Severity | Count | Status |
|----------|-------|--------|
| **Critical** | [Sẽ điền] | [Open/Resolved] |
| **High** | [Sẽ điền] | [Open/Resolved] |
| **Medium** | [Sẽ điền] | [Open/Resolved] |
| **Low** | [Sẽ điền] | [Open/Resolved] |

### 8.4. Pass Rate

```
Pass Rate = (Number of Passed Tests / Total Tests Executed) × 100%
Pass Rate = [Sẽ tính] %
```

**Target Pass Rate:** ≥ 95%

---

## 9. Phần Ký Duyệt

### 9.1. Test Execution Completed By

**Tên:** ______________________________
**Ngày:** ______________________________
**Chữ Ký:** ______________________________

### 9.2. Test Results Reviewed By

**Tên:** ______________________________
**Chức Vụ:** QA Lead / Test Manager
**Ngày:** ______________________________
**Chữ Ký:** ______________________________
**Nhận Xét:**
```
[Nhận xét về kết quả test]
```

### 9.3. Test Results Approved By

**Tên:** ______________________________
**Chức Vụ:** Project Manager / Product Owner
**Ngày:** ______________________________
**Chữ Ký:** ______________________________
**Quyết Định:**
- [ ] Approved - Ready for Production
- [ ] Approved with Minor Issues
- [ ] Not Approved - Major Issues Found
- [ ] Need More Testing

**Ghi Chú Duyệt:**
```
[Ghi chú từ người duyệt]
```

---

## Phụ Lục

### A. Tham Khảo

1. `login-requirements-analysis.md` - Phân tích yêu cầu chi tiết
2. `login-test-scenarios.md` - Danh sách 15 test scenarios
3. `login-priority-classification.md` - Phân loại độ ưu tiên

### B. Thuật Ngữ

- **Happy Path:** Test case với input hợp lệ và flow bình thường
- **Negative Test:** Test case với input không hợp lệ
- **Boundary Test:** Test case kiểm tra giá trị ở biên (min, max)
- **JWT:** JSON Web Token - token để authenticate user
- **Validation:** Kiểm tra tính hợp lệ của input
