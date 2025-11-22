# Tính Năng Quản Lý Sản Phẩm - Phân Loại Ưu Tiên Test Scenarios

**Ngày:** 22/11/2025
**Dự Án:** FloginFE_BE - Đăng Nhập & Quản Lý Sản Phẩm
**Tài Liệu Liên Quan:**
- [Phân Tích Yêu Cầu Sản Phẩm](../test-plan/product-requirements-analysis.md)
- [Test Scenarios Chi Tiết](product-test-scenarios.md)

---

## 1. Tổng Quan

Tài liệu này phân loại các test scenarios cho tính năng Quản Lý Sản Phẩm theo mức độ ưu tiên, giúp đội ngũ testing tối ưu hóa việc phân bổ nguồn lực và thời gian test. Việc phân loại ưu tiên dựa trên:

- **Tác động đến business**: Mức độ ảnh hưởng đến hoạt động kinh doanh nếu lỗi xảy ra
- **Tần suất sử dụng**: Tần suất người dùng thực hiện chức năng
- **Mức độ rủi ro**: Khả năng xảy ra lỗi và mức độ nghiêm trọng
- **Dependencies**: Các test case khác phụ thuộc vào test này
- **Yêu cầu bảo mật**: Mức độ quan trọng về mặt an ninh hệ thống

---

## 2. Định Nghĩa Các Mức Ưu Tiên

### 🔴 **Critical (Tối Quan Trọng)**

**Định Nghĩa:** Test cases kiểm tra các chức năng cốt lõi của hệ thống quản lý sản phẩm. Nếu các chức năng này thất bại, hệ thống không thể hoạt động hoặc có rủi ro nghiệp vụ nghiêm trọng.

**Đặc Điểm:**
- Chức năng cốt lõi không thể thiếu
- Tác động trực tiếp đến khả năng quản lý sản phẩm
- Rủi ro mất dữ liệu cao
- Blocking cho các test khác

**Tần Suất Test:** Mỗi build/deployment

**Tự Động Hóa:** Bắt buộc phải tự động hóa

**Thứ Tự Thực Thi:** Luôn thực thi đầu tiên (Smoke Testing)

---

### 🟠 **High (Cao)**

**Định Nghĩa:** Test cases kiểm tra các chức năng quan trọng, thường xuyên được sử dụng trong quản lý sản phẩm. Lỗi ở đây ảnh hưởng đáng kể đến trải nghiệm người dùng.

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

#### **TS_PRODUCT_001: Tạo sản phẩm mới thành công với dữ liệu hợp lệ**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Đây là chức năng cốt lõi của hệ thống quản lý sản phẩm
- Nếu không thể tạo sản phẩm, toàn bộ hệ thống không có giá trị
- Tần suất sử dụng cao (mỗi khi có sản phẩm mới)
- Là điều kiện tiên quyết cho các chức năng khác (Update, Delete)
- Blocking test case - các CRUD khác phụ thuộc vào khả năng tạo sản phẩm

**Rủi Ro Nếu Thất Bại:**
- Không thể thêm sản phẩm mới vào hệ thống
- Business không thể mở rộng catalog sản phẩm
- Tác động nghiêm trọng đến hoạt động kinh doanh
- Mất cơ hội bán hàng

**Dependencies:** None (test độc lập)

---

#### **TS_PRODUCT_002: Xem danh sách sản phẩm thành công**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Chức năng READ là cơ bản nhất của CRUD
- 100% user cần xem danh sách sản phẩm
- Là điểm khởi đầu cho mọi thao tác quản lý
- Nếu không thấy được sản phẩm, không thể quản lý
- Cung cấp overview toàn bộ inventory

**Rủi Ro Nếu Thất Bại:**
- User không thể xem sản phẩm nào có trong hệ thống
- Không thể quản lý hoặc kiểm soát inventory
- Tác động toàn diện đến mọi hoạt động quản lý
- Có thể dẫn đến chaos trong quản lý kho

**Dependencies:** TS_PRODUCT_001 (cần có sản phẩm để xem)

---

#### **TS_PRODUCT_003: Cập nhật sản phẩm thành công**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Cập nhật thông tin sản phẩm là nghiệp vụ quan trọng và thường xuyên
- Giá, số lượng thay đổi liên tục theo thị trường và inventory
- Nếu không update được, dữ liệu sẽ lỗi thời và gây nhầm lẫn
- Tác động trực tiếp đến độ chính xác của thông tin business
- Tần suất sử dụng rất cao (hàng ngày)

**Rủi Ro Nếu Thất Bại:**
- Thông tin sản phẩm không chính xác (giá sai, số lượng sai)
- Có thể bán sản phẩm hết hàng hoặc giá sai
- Gây thiệt hại tài chính và uy tín
- Mất khả năng điều chỉnh thông tin theo thời gian thực

**Dependencies:** TS_PRODUCT_001, TS_PRODUCT_002

---

#### **TS_PRODUCT_004: Xóa sản phẩm thành công**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Xóa sản phẩm là quyền cơ bản trong quản lý
- Cần thiết để dọn dẹp sản phẩm ngừng kinh doanh
- Có rủi ro mất dữ liệu cao nếu không cẩn thận
- Cần có confirm để tránh xóa nhầm
- Validation đúng để bảo vệ dữ liệu quan trọng

**Rủi Ro Nếu Thất Bại:**
- Không thể dọn dẹp sản phẩm cũ/không còn bán
- Database bị bloat với dữ liệu không cần thiết
- Có thể xóa nhầm nếu confirm không hoạt động
- Mất dữ liệu quan trọng nếu xóa sai

**Dependencies:** TS_PRODUCT_001, TS_PRODUCT_002

---

#### **TS_PRODUCT_006: Tạo sản phẩm với tên trống**

**Ưu Tiên:** 🔴 Critical

**Lý Do (Justification):**
- Validation cơ bản nhất của hệ thống
- Tên sản phẩm là trường bắt buộc và quan trọng nhất
- Ngăn chặn dữ liệu rác vào database
- Đảm bảo data integrity
- Rủi ro cao nếu cho phép tạo sản phẩm không có tên

**Rủi Ro Nếu Thất Bại:**
- Sản phẩm không có tên được tạo trong database
- Không thể phân biệt hoặc quản lý sản phẩm đó
- Database integrity bị vi phạm
- Gây confusion và lỗi trong các chức năng khác

**Dependencies:** None

---

### 3.2 🟠 **High Priority (10 scenarios)**

#### **TS_PRODUCT_005: Xem chi tiết sản phẩm thành công**
**Lý Do:** Xem chi tiết là chức năng quan trọng để kiểm tra thông tin đầy đủ, tần suất cao, cần thiết trước khi sửa/xóa.

#### **TS_PRODUCT_007: Tạo sản phẩm với giá không hợp lệ**
**Lý Do:** Giá là trường quan trọng nhất về mặt business, validation sai có thể dẫn đến thiệt hại tài chính nghiêm trọng.

#### **TS_PRODUCT_008: Tạo sản phẩm với số lượng không hợp lệ**
**Lý Do:** Số lượng sai ảnh hưởng inventory management, có thể bán hàng không có hoặc từ chối order sai.

#### **TS_PRODUCT_009: Tạo sản phẩm với tên trùng lặp**
**Lý Do:** Tên duy nhất là business rule quan trọng, trùng tên gây confusion và lỗi trong quản lý.

#### **TS_PRODUCT_010: Cập nhật sản phẩm không tồn tại**
**Lý Do:** Error handling quan trọng, tránh lỗi hệ thống khi sản phẩm đã bị xóa nhưng user vẫn cố update.

#### **TS_PRODUCT_012: Tạo sản phẩm mà không chọn danh mục**
**Lý Do:** Danh mục là bắt buộc cho phân loại sản phẩm, không có danh mục gây khó khăn trong tìm kiếm/quản lý.

#### **TS_PRODUCT_013: Tạo sản phẩm với tên ở độ dài tối thiểu**
**Lý Do:** Boundary test quan trọng để verify logic validation, đảm bảo tên 3 ký tự được chấp nhận.

#### **TS_PRODUCT_014: Tạo sản phẩm với tên dưới độ dài tối thiểu**
**Lý Do:** Boundary test để đảm bảo validation từ chối đúng tên quá ngắn, tránh tên vô nghĩa.

#### **TS_PRODUCT_016: Tạo sản phẩm với giá ở giá trị biên**
**Lý Do:** Giá biên (1 và 999,999,999) cần verify để đảm bảo system xử lý đúng các giá trị extreme.

#### **TS_PRODUCT_021: Cập nhật sản phẩm với tên trùng sản phẩm khác**
**Lý Do:** Edge case quan trọng khi update, phải check trùng với sản phẩm khác nhưng cho phép giữ tên của chính nó.

---

### 3.3 🟡 **Medium Priority (5 scenarios)**

#### **TS_PRODUCT_011: Xóa sản phẩm không tồn tại**
**Lý Do:** Error handling tốt nhưng ít xảy ra, thường do user refresh hoặc timing issue.

#### **TS_PRODUCT_015: Tạo sản phẩm với tên ở độ dài tối đa**
**Lý Do:** Edge case testing cho tên dài, ít xảy ra trong thực tế, nhưng cần verify.

#### **TS_PRODUCT_017: Tạo sản phẩm với số lượng ở giá trị biên**
**Lý Do:** Boundary test cho số lượng, quan trọng nhưng ít gây ảnh hưởng nghiêm trọng nếu lỗi.

#### **TS_PRODUCT_018: Tạo sản phẩm với mô tả ở độ dài tối đa**
**Lý Do:** Edge case cho mô tả dài, mô tả không critical nên priority thấp hơn.

#### **TS_PRODUCT_019: Tạo sản phẩm với tên chứa khoảng trắng đầu/cuối**
**Lý Do:** Test trim functionality, tốt để có nhưng không critical, có workaround (user tự trim).

---

### 3.4 🟢 **Low Priority (2 scenarios)**

#### **TS_PRODUCT_020: Tạo sản phẩm với mô tả trống**
**Lý Do:** Test trường optional, mô tả không bắt buộc nên ít quan trọng, low risk.

#### **TS_PRODUCT_022: Xóa nhiều sản phẩm liên tiếp**
**Lý Do:** Edge case hiếm, test concurrent operations, chủ yếu để kiểm tra performance và race conditions.

---

## 4. Bảng Tổng Kết Phân Bố Ưu Tiên

| Mức Ưu Tiên | Số Lượng | Tỷ Lệ | Mô Tả |
|-------------|----------|-------|-------|
| 🔴 Critical | 5 | 22.7% | Chức năng CRUD cốt lõi + validation quan trọng nhất |
| 🟠 High | 10 | 45.5% | Validation quan trọng + boundary tests |
| 🟡 Medium | 5 | 22.7% | Edge cases, boundary tests không critical |
| 🟢 Low | 2 | 9.1% | Edge cases hiếm, optional fields |
| **Tổng** | **22** | **100%** | |

**Phân Tích:**
- **68.2%** test cases thuộc Critical và High priority → Tập trung vào các chức năng cốt lõi
- **31.8%** thuộc Medium và Low priority → Kiểm tra edge cases và tính năng bổ sung
- Phân bố hợp lý, đảm bảo coverage tốt cho các chức năng quan trọng

---

## 5. Thứ Tự Thực Thi Test Được Đề Xuất

### **Giai Đoạn 1: Critical Tests (Thực Thi Trước)**
**Mục Tiêu:** Smoke Testing - Đảm bảo chức năng cơ bản hoạt động

**Test Cases:**
1. TS_PRODUCT_001 (Tạo thành công)
2. TS_PRODUCT_002 (Xem danh sách)
3. TS_PRODUCT_003 (Cập nhật thành công)
4. TS_PRODUCT_004 (Xóa thành công)
5. TS_PRODUCT_006 (Tên trống - validation)

**Thời Gian Ước Tính:** 15-20 phút
**Điều Kiện Tiếp Tục:** Tất cả Critical tests phải PASS

---

### **Giai Đoạn 2: High Priority Tests**
**Mục Tiêu:** Sanity Testing - Kiểm tra các chức năng quan trọng

**Test Cases:**
- TS_PRODUCT_005 (Xem chi tiết)
- TS_PRODUCT_007 (Giá không hợp lệ)
- TS_PRODUCT_008 (Số lượng không hợp lệ)
- TS_PRODUCT_009 (Tên trùng)
- TS_PRODUCT_010 (Update không tồn tại)
- TS_PRODUCT_012 (Không chọn danh mục)
- TS_PRODUCT_013 (Tên độ dài tối thiểu)
- TS_PRODUCT_014 (Tên dưới tối thiểu)
- TS_PRODUCT_016 (Giá biên)
- TS_PRODUCT_021 (Update trùng tên)

**Thời Gian Ước Tính:** 35-45 phút
**Điều Kiện Tiếp Tục:** Tối đa 1-2 test failures được chấp nhận

---

### **Giai Đoạn 3: Medium Priority Tests**
**Mục Tiêu:** Extended Testing - Kiểm tra edge cases

**Test Cases:**
- TS_PRODUCT_011 (Xóa không tồn tại)
- TS_PRODUCT_015 (Tên độ dài tối đa)
- TS_PRODUCT_017 (Số lượng biên)
- TS_PRODUCT_018 (Mô tả tối đa)
- TS_PRODUCT_019 (Tên có khoảng trắng)

**Thời Gian Ước Tính:** 20-25 phút
**Điều Kiện Tiếp Tục:** Không bắt buộc cho release

---

### **Giai Đoạn 4: Low Priority Tests**
**Mục Tiêu:** Full Coverage - Kiểm tra tất cả scenarios

**Test Cases:**
- TS_PRODUCT_020 (Mô tả trống)
- TS_PRODUCT_022 (Xóa nhiều liên tiếp)

**Thời Gian Ước Tính:** 10-15 phút
**Điều Kiện:** Optional, khi có đủ thời gian

---

## 6. Tiêu Chí Phân Loại Ưu Tiên

Các yếu tố được xem xét khi phân loại ưu tiên test scenarios:

### **1. Tác Động Đến Business (Business Impact)**
- **Critical:** Chức năng không hoạt động → không thể quản lý sản phẩm
- **High:** Ảnh hưởng đáng kể đến quản lý và độ chính xác dữ liệu
- **Medium:** Ảnh hưởng vừa phải, có workaround
- **Low:** Ảnh hưởng nhỏ, ít user bị tác động

### **2. Tần Suất Sử Dụng (Frequency of Use)**
- **Critical:** 90-100% user sử dụng (CRUD cơ bản)
- **High:** 50-90% user sử dụng (validation thường gặp)
- **Medium:** 20-50% user sử dụng (edge cases)
- **Low:** <20% user sử dụng (hiếm xảy ra)

### **3. Mức Độ Rủi Ro (Risk Level)**
- **Critical:** Mất dữ liệu, dữ liệu sai nghiêm trọng
- **High:** Dữ liệu không chính xác, validation fail
- **Medium:** Rủi ro vừa phải, ảnh hưởng cục bộ
- **Low:** Rủi ro thấp, edge cases

### **4. Dependencies**
- **Critical:** Blocking test - các test khác phụ thuộc (Create)
- **High:** Nhiều test khác liên quan (Read, Update, Delete)
- **Medium:** Ít dependencies
- **Low:** Không có dependencies

### **5. Độ Quan Trọng Của Trường (Field Importance)**
- **Critical:** Tên sản phẩm (identity)
- **High:** Giá, Số lượng, Danh mục (business critical)
- **Medium:** Mô tả (nice to have)
- **Low:** Các trường optional khác

---

## 7. Ưu Tiên Tự Động Hóa Test

### **Giai Đoạn 1: Tự Động Hóa Bắt Buộc**
**Test Cases:** Tất cả Critical priority tests (5 tests)
- TS_PRODUCT_001, 002, 003, 004, 006
- **Lý Do:** Chạy trong mọi build, CI/CD pipeline
- **Timeline:** Sprint 1

### **Giai Đoạn 2: Tự Động Hóa Nên Có**
**Test Cases:** Tất cả High priority tests (10 tests)
- TS_PRODUCT_005, 007, 008, 009, 010, 012, 013, 014, 016, 021
- **Lý Do:** Regression testing, chạy mỗi sprint
- **Timeline:** Sprint 2

### **Giai Đoạn 3: Tự Động Hóa Tùy Chọn**
**Test Cases:** Medium priority tests (5 tests)
- TS_PRODUCT_011, 015, 017, 018, 019
- **Lý Do:** Full regression, tối ưu hóa coverage
- **Timeline:** Sprint 3+

### **Giai Đoạn 4: Manual Testing**
**Test Cases:** Low priority tests (2 tests)
- TS_PRODUCT_020, 022
- **Lý Do:** Edge case, ít quan trọng
- **Timeline:** Manual testing cycles

---

## 8. Chiến Lược Test Dựa Trên Rủi Ro (Risk-Based Testing Strategy)

### **Scenario 1: Thiếu Thời Gian (Quick Smoke Test)**
**Thời Gian:** 15-20 phút
**Test Cases:** Chỉ Critical priority (5 tests)
**Coverage:** 22.7% scenarios, nhưng cover 70% business risk
**Khi Nào:** Hot fix, urgent deployment

### **Scenario 2: Thời Gian Vừa Phải (Sanity Test)**
**Thời Gian:** 50-65 phút
**Test Cases:** Critical + High priority (15 tests)
**Coverage:** 68.2% scenarios, cover 90% business risk
**Khi Nào:** Regular deployment, sprint release

### **Scenario 3: Đủ Thời Gian (Extended Regression)**
**Thời Gian:** 1.5-2 giờ
**Test Cases:** Critical + High + Medium (20 tests)
**Coverage:** 90.9% scenarios, cover 98% business risk
**Khi Nào:** Major release, after significant changes

### **Scenario 4: Full Testing Cycle**
**Thời Gian:** 2-2.5 giờ
**Test Cases:** Tất cả 22 tests
**Coverage:** 100% scenarios
**Khi Nào:** Release candidate, pre-production validation

---

## 9. Các Trigger Đánh Giá Lại Ưu Tiên

Cần review và cập nhật phân loại ưu tiên khi:

### **Trigger 1: Thay Đổi Yêu Cầu Business**
- Yêu cầu validation thay đổi
- Thêm/bớt trường bắt buộc
- Thay đổi quy tắc nghiệp vụ

### **Trigger 2: Phát Hiện Lỗi Trong Production**
- Lỗi nghiêm trọng xảy ra
- Test case bỏ sót
- Cần thêm test coverage

### **Trigger 3: Feedback Từ Users**
- User complaints về validation
- Feature usage data thay đổi
- UX issues phát hiện

### **Trigger 4: Thay Đổi Kiến Trúc/Technology**
- Refactoring CRUD logic
- Migration sang database mới
- API changes

### **Trigger 5: Định Kỳ (Quarterly Review)**
- Review tất cả test priorities
- Cập nhật dựa trên metrics
- Tối ưu hóa test suite

---

## 10. Ma Trận Truy Xuất (Traceability Matrix)

| Test Scenario | Priority | Requirement ID | Test Type | Automation | Estimated Time |
|--------------|----------|----------------|-----------|------------|----------------|
| TS_PRODUCT_001 | 🔴 Critical | FR_PROD_CREATE | Functional | Automated | 3 min |
| TS_PRODUCT_002 | 🔴 Critical | FR_PROD_READ | Functional | Automated | 2 min |
| TS_PRODUCT_003 | 🔴 Critical | FR_PROD_UPDATE | Functional | Automated | 3 min |
| TS_PRODUCT_004 | 🔴 Critical | FR_PROD_DELETE | Functional | Automated | 2 min |
| TS_PRODUCT_005 | 🟠 High | FR_PROD_READ | Functional | Automated | 2 min |
| TS_PRODUCT_006 | 🔴 Critical | NFR_VALID_NAME | Validation | Automated | 2 min |
| TS_PRODUCT_007 | 🟠 High | NFR_VALID_PRICE | Validation | Automated | 3 min |
| TS_PRODUCT_008 | 🟠 High | NFR_VALID_QTY | Validation | Automated | 3 min |
| TS_PRODUCT_009 | 🟠 High | NFR_VALID_NAME | Validation | Automated | 3 min |
| TS_PRODUCT_010 | 🟠 High | FR_PROD_UPDATE | Error Handle | Automated | 2 min |
| TS_PRODUCT_011 | 🟡 Medium | FR_PROD_DELETE | Error Handle | Automated | 2 min |
| TS_PRODUCT_012 | 🟠 High | NFR_VALID_CAT | Validation | Automated | 2 min |
| TS_PRODUCT_013 | 🟠 High | NFR_VALID_NAME | Boundary | Automated | 2 min |
| TS_PRODUCT_014 | 🟠 High | NFR_VALID_NAME | Boundary | Automated | 2 min |
| TS_PRODUCT_015 | 🟡 Medium | NFR_VALID_NAME | Boundary | Automated | 3 min |
| TS_PRODUCT_016 | 🟠 High | NFR_VALID_PRICE | Boundary | Automated | 3 min |
| TS_PRODUCT_017 | 🟡 Medium | NFR_VALID_QTY | Boundary | Automated | 3 min |
| TS_PRODUCT_018 | 🟡 Medium | NFR_VALID_DESC | Boundary | Automated | 3 min |
| TS_PRODUCT_019 | 🟡 Medium | NFR_VALID_NAME | Edge Case | Automated | 2 min |
| TS_PRODUCT_020 | 🟢 Low | NFR_VALID_DESC | Edge Case | Manual | 2 min |
| TS_PRODUCT_021 | 🟠 High | NFR_VALID_NAME | Edge Case | Automated | 3 min |
| TS_PRODUCT_022 | 🟢 Low | NFR_PERF | Performance | Manual | 5 min |

**Tổng Thời Gian Ước Tính:**
- **Automated Tests:** ~50 phút
- **Manual Tests:** ~7 phút
- **Tổng:** ~57 phút (full test cycle)

---

## Phụ Lục: Định Nghĩa Thuật Ngữ

- **Smoke Testing:** Test nhanh các chức năng cốt lõi để đảm bảo build ổn định
- **Sanity Testing:** Test các chức năng chính sau khi có thay đổi code
- **Regression Testing:** Test toàn bộ để đảm bảo không có lỗi mới xuất hiện
- **Blocking Test:** Test mà nếu fail thì các test khác không thể thực hiện
- **Edge Case:** Trường hợp ngoại lệ, ít xảy ra trong thực tế
- **Workaround:** Cách giải quyết tạm thời khi chức năng không hoạt động
- **CRUD:** Create, Read, Update, Delete - 4 thao tác cơ bản
