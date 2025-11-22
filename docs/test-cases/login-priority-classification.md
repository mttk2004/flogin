# Tính Năng Login - Phân Loại Ưu Tiên Test Scenarios

**Ngày:** 22/11/2025
**Dự Án:** Flogin - Login Management System
**Tài Liệu Liên Quan:**
- [Phân Tích Yêu Cầu Login](../test-plan/login-requirements-analysis.md)
- [Test Scenarios Chi Tiết](login-test-scenarios.md)

---

## 1. Tổng Quan

Tài liệu này phân loại các test scenarios cho tính năng đăng nhập theo mức độ ưu tiên, giúp đội ngũ testing tối ưu hóa việc phân bổ nguồn lực và thời gian test. Việc phân loại ưu tiên dựa trên:

- **Tác động đến business**: Mức độ ảnh hưởng đến hoạt động kinh doanh nếu lỗi xảy ra
- **Tần suất sử dụng**: Tần suất người dùng thực hiện chức năng
- **Mức độ rủi ro**: Khả năng xảy ra lỗi và mức độ nghiêm trọng
- **Dependencies**: Các test case khác phụ thuộc vào test này
- **Yêu cầu bảo mật**: Mức độ quan trọng về mặt an ninh hệ thống

---

## 2. Định Nghĩa Các Mức Ưu Tiên

### 🔴 **Critical (Tối Quan Trọng)**

**Định Nghĩa:** Test cases kiểm tra các chức năng cốt lõi của hệ thống. Nếu các chức năng này thất bại, hệ thống không thể hoạt động hoặc có rủi ro bảo mật nghiêm trọng.

**Đặc Điểm:**
- Chức năng cốt lõi không thể thiếu
- Tác động trực tiếp đến khả năng sử dụng hệ thống
- Rủi ro bảo mật cao
- Blocking cho các test khác

**Tần Suất Test:** Mỗi build/deployment

**Tự Động Hóa:** Bắt buộc phải tự động hóa

**Thứ Tự Thực Thi:** Luôn thực thi đầu tiên (Smoke Testing)

---

### 🟠 **High (Cao)**

**Định Nghĩa:** Test cases kiểm tra các chức năng quan trọng, thường xuyên được sử dụng. Lỗi ở đây ảnh hưởng đáng kể đến trải nghiệm người dùng.

**Đặc Điểm:**
- Chức năng quan trọng nhưng hệ thống vẫn có thể hoạt động nếu thất bại
- Tác động cao đến trải nghiệm người dùng
- Tần suất sử dụng cao
- Có thể có workaround

**Tần Suất Test:** Mỗi sprint/major update

**Tự Động Hóa:** Nên tự động hóa

**Thứ Tự Thực Thi:** Sau Critical tests (Sanity Testing)

---

### 🟡 **Medium (Trung Bình)**

**Định Nghĩa:** Test cases kiểm tra các chức năng bổ sung, nâng cao trải nghiệm người dùng nhưng không quan trọng bằng High priority.

**Đặc Điểm:**
- Chức năng hỗ trợ, nâng cao UX
- Tác động vừa phải đến người dùng
- Tần suất sử dụng trung bình
- Thường có workaround

**Tần Suất Test:** Regression testing định kỳ

**Tự Động Hóa:** Có thể tự động hóa

**Thứ Tự Thực Thi:** Sau High priority tests

---

### 🟢 **Low (Thấp)**

**Định Nghĩa:** Test cases kiểm tra các tính năng bổ sung, ít được sử dụng hoặc các edge cases hiếm khi xảy ra.

**Đặc Điểm:**
- Chức năng bổ sung, ít quan trọng
- Tác động thấp đến người dùng
- Tần suất sử dụng thấp
- Edge cases, corner cases

**Tần Suất Test:** Full regression testing

**Tự Động Hóa:** Tùy chọn

**Thứ Tự Thực Thi:** Cuối cùng hoặc khi có thời gian

---

## 3. Test Scenarios Theo Ưu Tiên

### 3.1 🔴 **Critical Priority (5 scenarios)**

#### **TS_LOGIN_001: Đăng nhập thành công với credentials hợp lệ**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Đây là chức năng cốt lõi nhất của hệ thống login
- Nếu chức năng này thất bại, toàn bộ hệ thống không thể sử dụng
- Tần suất sử dụng cực cao (100% người dùng)
- Là điều kiện tiên quyết (prerequisite) cho tất cả các chức năng khác
- Blocking test case - các test khác phụ thuộc vào kết quả này

**Rủi Ro Nếu Thất Bại:**
- Người dùng hợp lệ không thể truy cập hệ thống
- Mất hoàn toàn khả năng phục vụ khách hàng
- Tác động nghiêm trọng đến doanh thu và uy tín
- Có thể dẫn đến mất khách hàng

**Dependencies:** None (test độc lập)

---

#### **TS_LOGIN_003: Đăng nhập với username trống**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Kiểm tra validation cơ bản nhất của input
- Ngăn chặn lỗi hệ thống do input không hợp lệ
- Bảo vệ database khỏi các query không hợp lệ
- Đảm bảo error handling cơ bản hoạt động đúng
- Rủi ro bảo mật nếu hệ thống xử lý sai

**Rủi Ro Nếu Thất Bại:**
- System crash hoặc exception không được xử lý
- Có thể dẫn đến SQL errors hoặc system errors
- Trải nghiệm người dùng kém (no feedback)
- Rủi ro bảo mật tiềm ẩn

**Dependencies:** None

---

#### **TS_LOGIN_004: Đăng nhập với password trống**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Validation quan trọng cho authentication
- Ngăn chặn các lỗi authentication logic
- Đảm bảo không cho phép truy cập trái phép
- Kiểm tra xử lý empty password trong security flow
- Rủi ro bảo mật cao nếu không validate đúng

**Rủi Ro Nếu Thất Bại:**
- Có thể cho phép login không cần password (security breach)
- System crash khi xử lý empty password
- Lỗ hổng bảo mật nghiêm trọng
- Dữ liệu người dùng có thể bị lộ

**Dependencies:** None

---

#### **TS_LOGIN_008: Đăng nhập với credentials không tồn tại trong hệ thống**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Kiểm tra logic authentication cơ bản
- Đảm bảo hệ thống từ chối đúng các truy cập không hợp lệ
- Ngăn chặn unauthorized access
- Xác minh database lookup và response handling
- Tần suất xảy ra cao (typos, wrong accounts)

**Rủi Ro Nếu Thất Bại:**
- Cho phép truy cập trái phép vào hệ thống
- Lỗ hổng bảo mật nghiêm trọng
- Vi phạm compliance và data privacy
- Hệ thống có thể bị tấn công

**Dependencies:** None

---

#### **TS_LOGIN_019: Đăng nhập với lần thử SQL injection cơ bản**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Kiểm tra bảo mật chống SQL injection
- SQL injection là một trong những lỗ hổng OWASP Top 10
- Có thể dẫn đến data breach nghiêm trọng
- Validate input sanitization và prepared statements
- Rủi ro bảo mật cực cao

**Rủi Ro Nếu Thất Bại:**
- Toàn bộ database có thể bị compromised
- Dữ liệu người dùng bị đánh cắp hoặc xóa
- Hệ thống có thể bị kiểm soát hoàn toàn
- Vi phạm nghiêm trọng compliance (GDPR, etc.)
- Thiệt hại tài chính và uy tín khổng lồ

**Dependencies:** None

---

### 3.2 🟠 **High Priority (9 scenarios)**

#### **TS_LOGIN_005: Đăng nhập với username sai**
**Lý Do:** Xác minh xử lý username không đúng, tần suất xảy ra cao (user typos), cần error message rõ ràng cho UX tốt.

#### **TS_LOGIN_006: Đăng nhập với password sai**
**Lý Do:** Kiểm tra authentication logic, tần suất cao (user forgets password), quan trọng cho security và UX.

#### **TS_LOGIN_007: Đăng nhập với cả username và password sai**
**Lý Do:** Validate error handling khi cả hai fields sai, đảm bảo message không tiết lộ thông tin (security).

#### **TS_LOGIN_009: Kiểm tra hiển thị/ẩn password**
**Lý Do:** Chức năng UX quan trọng, tần suất sử dụng cao, ảnh hưởng trực tiếp đến khả năng đăng nhập thành công.

#### **TS_LOGIN_010: Đăng nhập với username có khoảng trắng đầu/cuối**
**Lý Do:** Kiểm tra data sanitization, tránh lỗi authentication do whitespace, xảy ra thường xuyên khi copy/paste.

#### **TS_LOGIN_011: Đăng nhập với password có khoảng trắng đầu/cuối**
**Lý Do:** Passwords có thể hợp lệ với whitespace, cần xử lý chính xác để không từ chối users hợp lệ.

#### **TS_LOGIN_012: Đăng nhập với username có ký tự đặc biệt hợp lệ**
**Lý Do:** Validate input handling cho các ký tự đặc biệt, đảm bảo không block users hợp lệ.

#### **TS_LOGIN_013: Đăng nhập với password có ký tự đặc biệt hợp lệ**
**Lý Do:** Passwords thường chứa ký tự đặc biệt (security best practice), phải xử lý đúng.

#### **TS_LOGIN_014: Kiểm tra phân biệt chữ hoa/thường trong password**
**Lý Do:** Password case-sensitivity là yêu cầu bảo mật quan trọng, tần suất lỗi cao nếu users không nhớ.

---

### 3.3 🟡 **Medium Priority (4 scenarios)**

#### **TS_LOGIN_002: Đăng nhập với tính năng "Remember Me"**
**Lý Do:** Tính năng tiện ích nâng cao UX nhưng không essential, có workaround (login lại), tần suất sử dụng trung bình.

#### **TS_LOGIN_015: Đăng nhập với username dài nhất cho phép**
**Lý Do:** Edge case testing, ít xảy ra trong thực tế, nhưng cần validate boundary conditions.

#### **TS_LOGIN_016: Đăng nhập với password dài nhất cho phép**
**Lý Do:** Edge case testing cho password length validation, quan trọng cho data integrity nhưng ít xảy ra.

#### **TS_LOGIN_017: Kiểm tra time-out session khi không có hoạt động**
**Lý Do:** Tính năng bảo mật bổ sung, ảnh hưởng UX vừa phải, có thể test trong giai đoạn regression.

---

### 3.4 🟢 **Low Priority (1 scenario)**

#### **TS_LOGIN_018: Đăng nhập đồng thời từ nhiều thiết bị/trình duyệt**
**Lý Do:** Edge case hiếm, chủ yếu để kiểm tra session management, tác động thấp, có thể test cuối cùng.

---

## 4. Bảng Tổng Kết Phân Bố Ưu Tiên

| Mức Ưu Tiên | Số Lượng | Tỷ Lệ | Mô Tả |
|-------------|----------|-------|-------|
| 🔴 Critical | 5 | 26.3% | Chức năng cốt lõi, blocking tests |
| 🟠 High | 9 | 47.4% | Chức năng quan trọng, thường dùng |
| 🟡 Medium | 4 | 21.1% | Chức năng bổ sung, edge cases |
| 🟢 Low | 1 | 5.2% | Edge cases, ít quan trọng |
| **Tổng** | **19** | **100%** | |

**Phân Tích:**
- **73.7%** test cases thuộc Critical và High priority → Tập trung vào các chức năng cốt lõi
- **26.3%** thuộc Medium và Low priority → Kiểm tra edge cases và tính năng bổ sung
- Phân bố hợp lý, đảm bảo coverage tốt cho các chức năng quan trọng

---

## 5. Thứ Tự Thực Thi Test Được Đề Xuất

### **Giai Đoạn 1: Critical Tests (Thực Thi Trước)**
**Mục Tiêu:** Smoke Testing - Đảm bảo chức năng cơ bản hoạt động

**Test Cases:**
1. TS_LOGIN_001 (Login thành công)
2. TS_LOGIN_003 (Username trống)
3. TS_LOGIN_004 (Password trống)
4. TS_LOGIN_008 (Credentials không tồn tại)
5. TS_LOGIN_019 (SQL injection)

**Thời Gian Ước Tính:** 15-20 phút
**Điều Kiện Tiếp Tục:** Tất cả Critical tests phải PASS

---

### **Giai Đoạn 2: High Priority Tests**
**Mục Tiêu:** Sanity Testing - Kiểm tra các chức năng quan trọng

**Test Cases:**
- TS_LOGIN_005 (Username sai)
- TS_LOGIN_006 (Password sai)
- TS_LOGIN_007 (Cả hai sai)
- TS_LOGIN_009 (Show/hide password)
- TS_LOGIN_010 (Username với whitespace)
- TS_LOGIN_011 (Password với whitespace)
- TS_LOGIN_012 (Username ký tự đặc biệt)
- TS_LOGIN_013 (Password ký tự đặc biệt)
- TS_LOGIN_014 (Case sensitivity)

**Thời Gian Ước Tính:** 30-40 phút
**Điều Kiện Tiếp Tục:** Tối đa 1 test failure được chấp nhận

---

### **Giai Đoạn 3: Medium Priority Tests**
**Mục Tiêu:** Extended Testing - Kiểm tra edge cases và tính năng bổ sung

**Test Cases:**
- TS_LOGIN_002 (Remember Me)
- TS_LOGIN_015 (Username tối đa)
- TS_LOGIN_016 (Password tối đa)
- TS_LOGIN_017 (Session timeout)

**Thời Gian Ước Tính:** 20-25 phút
**Điều Kiện Tiếp Tục:** Không bắt buộc cho release

---

### **Giai Đoạn 4: Low Priority Tests**
**Mục Tiêu:** Full Coverage - Kiểm tra tất cả các scenarios

**Test Cases:**
- TS_LOGIN_018 (Multi-device login)

**Thời Gian Ước Tính:** 10-15 phút
**Điều Kiện:** Optional, khi có đủ thời gian

---

## 6. Tiêu Chí Phân Loại Ưu Tiên

Các yếu tố được xem xét khi phân loại ưu tiên test scenarios:

### **1. Tác Động Đến Business (Business Impact)**
- **Critical:** Chức năng không hoạt động → toàn bộ hệ thống không sử dụng được
- **High:** Ảnh hưởng đáng kể đến trải nghiệm người dùng
- **Medium:** Ảnh hưởng vừa phải, có workaround
- **Low:** Ảnh hưởng nhỏ, ít người dùng bị tác động

### **2. Tần Suất Sử Dụng (Frequency of Use)**
- **Critical:** 90-100% người dùng sử dụng
- **High:** 50-90% người dùng sử dụng
- **Medium:** 20-50% người dùng sử dụng
- **Low:** <20% người dùng sử dụng

### **3. Mức Độ Rủi Ro (Risk Level)**
- **Critical:** Rủi ro bảo mật nghiêm trọng, data breach
- **High:** Rủi ro cao về security hoặc data loss
- **Medium:** Rủi ro vừa phải, ảnh hưởng cục bộ
- **Low:** Rủi ro thấp, edge cases

### **4. Dependencies**
- **Critical:** Blocking test - các test khác phụ thuộc
- **High:** Nhiều test khác liên quan
- **Medium:** Ít dependencies
- **Low:** Không có dependencies

### **5. Yêu Cầu Bảo Mật (Security Requirements)**
- **Critical:** OWASP Top 10, authentication core
- **High:** Security-related nhưng không critical
- **Medium:** Security considerations nhỏ
- **Low:** Không liên quan đến security

---

## 7. Ưu Tiên Tự Động Hóa Test

### **Giai Đoạn 1: Tự Động Hóa Bắt Buộc**
**Test Cases:** Tất cả Critical priority tests (5 tests)
- TS_LOGIN_001, 003, 004, 008, 019
- **Lý Do:** Chạy trong mọi build, CI/CD pipeline
- **Timeline:** Sprint 1

### **Giai Đoạn 2: Tự Động Hóa Nên Có**
**Test Cases:** Tất cả High priority tests (9 tests)
- TS_LOGIN_005, 006, 007, 009, 010, 011, 012, 013, 014
- **Lý Do:** Regression testing, chạy mỗi sprint
- **Timeline:** Sprint 2

### **Giai Đoạn 3: Tự Động Hóa Tùy Chọn**
**Test Cases:** Medium priority tests (4 tests)
- TS_LOGIN_002, 015, 016, 017
- **Lý Do:** Full regression, tối ưu hóa coverage
- **Timeline:** Sprint 3+

### **Giai Đoạn 4: Manual Testing**
**Test Cases:** Low priority tests (1 test)
- TS_LOGIN_018
- **Lý Do:** Edge case phức tạp, ít xảy ra
- **Timeline:** Manual testing cycles

---

## 8. Chiến Lược Test Dựa Trên Rủi Ro (Risk-Based Testing Strategy)

### **Scenario 1: Thiếu Thời Gian (Quick Smoke Test)**
**Thời Gian:** 15-20 phút
**Test Cases:** Chỉ Critical priority (5 tests)
**Coverage:** 26.3% scenarios, nhưng cover 80% business risk
**Khi Nào:** Hot fix, urgent deployment

### **Scenario 2: Thời Gian Vừa Phải (Sanity Test)**
**Thời Gian:** 45-60 phút
**Test Cases:** Critical + High priority (14 tests)
**Coverage:** 73.7% scenarios, cover 95% business risk
**Khi Nào:** Regular deployment, sprint release

### **Scenario 3: Đủ Thời Gian (Extended Regression)**
**Thời Gian:** 1.5-2 giờ
**Test Cases:** Critical + High + Medium (18 tests)
**Coverage:** 94.8% scenarios, cover 98% business risk
**Khi Nào:** Major release, after significant changes

### **Scenario 4: Full Testing Cycle**
**Thời Gian:** 2-2.5 giờ
**Test Cases:** Tất cả 19 tests
**Coverage:** 100% scenarios
**Khi Nào:** Release candidate, pre-production validation

---

## 9. Các Trigger Đánh Giá Lại Ưu Tiên

Cần review và cập nhật phân loại ưu tiên khi:

### **Trigger 1: Thay Đổi Yêu Cầu Business**
- Business requirements thay đổi
- Thêm/bớt chức năng
- Thay đổi user flow

### **Trigger 2: Phát Hiện Lỗi Trong Production**
- Lỗi nghiêm trọng xảy ra
- Test case bỏ sót
- Cần thêm test coverage

### **Trigger 3: Feedback Từ Users**
- User complaints về tính năng cụ thể
- Feature usage data thay đổi
- UX issues phát hiện

### **Trigger 4: Thay Đổi Kiến Trúc/Technology**
- Refactoring code
- Migration sang technology mới
- Security updates

### **Trigger 5: Định Kỳ (Quarterly Review)**
- Review tất cả test priorities
- Cập nhật dựa trên metrics
- Tối ưu hóa test suite

---

## 10. Ma Trận Truy Xuất (Traceability Matrix)

| Test Scenario | Priority | Requirement ID | Test Type | Automation | Estimated Time |
|--------------|----------|----------------|-----------|------------|----------------|
| TS_LOGIN_001 | 🔴 Critical | FR_LOGIN_001 | Functional | Automated | 2 min |
| TS_LOGIN_002 | 🟡 Medium | FR_LOGIN_002 | Functional | Automated | 3 min |
| TS_LOGIN_003 | 🔴 Critical | NFR_VALID_001 | Validation | Automated | 2 min |
| TS_LOGIN_004 | 🔴 Critical | NFR_VALID_002 | Validation | Automated | 2 min |
| TS_LOGIN_005 | 🟠 High | FR_LOGIN_001 | Functional | Automated | 2 min |
| TS_LOGIN_006 | 🟠 High | FR_LOGIN_001 | Functional | Automated | 2 min |
| TS_LOGIN_007 | 🟠 High | FR_LOGIN_001 | Functional | Automated | 2 min |
| TS_LOGIN_008 | 🔴 Critical | FR_LOGIN_001 | Functional | Automated | 2 min |
| TS_LOGIN_009 | 🟠 High | NFR_UX_001 | UX | Automated | 3 min |
| TS_LOGIN_010 | 🟠 High | NFR_VALID_003 | Validation | Automated | 2 min |
| TS_LOGIN_011 | 🟠 High | NFR_VALID_004 | Validation | Automated | 2 min |
| TS_LOGIN_012 | 🟠 High | NFR_VALID_005 | Validation | Automated | 3 min |
| TS_LOGIN_013 | 🟠 High | NFR_VALID_006 | Validation | Automated | 3 min |
| TS_LOGIN_014 | 🟠 High | NFR_SEC_001 | Security | Automated | 2 min |
| TS_LOGIN_015 | 🟡 Medium | NFR_VALID_007 | Boundary | Automated | 3 min |
| TS_LOGIN_016 | 🟡 Medium | NFR_VALID_008 | Boundary | Automated | 3 min |
| TS_LOGIN_017 | 🟡 Medium | NFR_SEC_002 | Security | Manual | 10 min |
| TS_LOGIN_018 | 🟢 Low | NFR_PERF_001 | Performance | Manual | 10 min |
| TS_LOGIN_019 | 🔴 Critical | NFR_SEC_003 | Security | Automated | 3 min |

**Tổng Thời Gian Ước Tính:**
- **Automated Tests:** ~40 phút
- **Manual Tests:** ~20 phút
- **Tổng:** ~60 phút (full test cycle)

---

## Phụ Lục: Định Nghĩa Thuật Ngữ

- **Smoke Testing:** Test nhanh các chức năng cốt lõi để đảm bảo build ổn định
- **Sanity Testing:** Test các chức năng chính sau khi có thay đổi code
- **Regression Testing:** Test toàn bộ để đảm bảo không có lỗi mới xuất hiện
- **Blocking Test:** Test mà nếu fail thì các test khác không thể thực hiện
- **Edge Case:** Trường hợp ngoại lệ, ít xảy ra trong thực tế
- **Workaround:** Cách giải quyết tạm thời khi chức năng không hoạt động

