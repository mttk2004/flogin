# Tính Năng Product Management - Phân Loại Mức Độ Ưu Tiên Test Scenarios

## Tổng Quan

Document này phân loại 22 test scenarios của Product Management theo 4 mức độ ưu tiên:
- **Critical (P0)**: Các tính năng core, ảnh hưởng trực tiếp đến business
- **High (P1)**: Các tính năng quan trọng, ảnh hưởng đến user experience
- **Medium (P2)**: Các tính năng hỗ trợ, validation rules
- **Low (P3)**: Các edge cases ít xảy ra

---

## A. Critical Priority (P0) - 5 Scenarios

### 1. TS_PRODUCT_001: Tạo Sản Phẩm Mới Thành Công
- **Category**: Happy Path - Create
- **Priority**: Critical (P0)
- **Lý do**:
  - Đây là chức năng core của Product Management
  - Không có chức năng này, hệ thống không thể hoạt động
  - Ảnh hưởng trực tiếp đến khả năng kinh doanh
  - User không thể thêm sản phẩm mới vào hệ thống
- **Impact nếu fail**: CRITICAL - Hệ thống không thể thêm sản phẩm mới
- **Business Impact**: Rất cao - Không thể bán sản phẩm mới

### 2. TS_PRODUCT_004: Cập Nhật Thông Tin Sản Phẩm Thành Công
- **Category**: Happy Path - Update
- **Priority**: Critical (P0)
- **Lý do**:
  - Cập nhật giá, số lượng là thao tác thường xuyên trong business
  - Thông tin sản phẩm luôn thay đổi (giá, stock, mô tả)
  - Không cập nhật được = thông tin sai lệch = mất khách hàng
- **Impact nếu fail**: CRITICAL - Không thể cập nhật giá/stock
- **Business Impact**: Rất cao - Thông tin sai lệch gây mất doanh thu

### 3. TS_PRODUCT_005: Xóa Sản Phẩm Thành Công
- **Category**: Happy Path - Delete
- **Priority**: Critical (P0)
- **Lý do**:
  - Cần xóa sản phẩm ngừng kinh doanh
  - Cần xóa sản phẩm nhập sai
  - Quản lý danh sách sản phẩm sạch sẽ
- **Impact nếu fail**: CRITICAL - Không thể xóa sản phẩm
- **Business Impact**: Cao - Danh sách sản phẩm lộn xộn, khó quản lý

### 4. TS_PRODUCT_006: Tạo Sản Phẩm Với Product Name Rỗng
- **Category**: Negative Test - Validation
- **Priority**: Critical (P0)
- **Lý do**:
  - Product name là trường bắt buộc, không thể thiếu
  - Nếu không validate, sẽ có sản phẩm không tên trong database
  - Ảnh hưởng đến data integrity
  - Gây lỗi khi hiển thị danh sách
- **Impact nếu fail**: CRITICAL - Data corruption, database có dữ liệu rác
- **Business Impact**: Rất cao - Mất tính toàn vẹn dữ liệu

### 5. TS_PRODUCT_007: Tạo Sản Phẩm Với Price = 0
- **Category**: Negative Test - Validation
- **Priority**: Critical (P0)
- **Lý do**:
  - Price = 0 là dữ liệu không hợp lệ trong business
  - Có thể gây lỗi trong tính toán revenue, order total
  - Ảnh hưởng đến báo cáo tài chính
  - Khách hàng có thể đặt hàng với giá 0
- **Impact nếu fail**: CRITICAL - Mất doanh thu, lỗi tính toán
- **Business Impact**: Rất cao - Có thể mất tiền

---

## B. High Priority (P1) - 9 Scenarios

### 6. TS_PRODUCT_002: Xem Danh Sách Sản Phẩm Thành Công
- **Category**: Happy Path - Read
- **Priority**: High (P1)
- **Lý do**:
  - Đây là tính năng được sử dụng thường xuyên nhất
  - User cần xem danh sách để quản lý
  - Liên quan đến UX quan trọng
- **Impact nếu fail**: HIGH - User không thể xem sản phẩm
- **Business Impact**: Cao - Không quản lý được sản phẩm

### 7. TS_PRODUCT_003: Xem Chi Tiết Một Sản Phẩm Thành Công
- **Category**: Happy Path - Read
- **Priority**: High (P1)
- **Lý do**:
  - User cần xem chi tiết để kiểm tra thông tin đầy đủ
  - Cần thiết trước khi update hoặc delete
  - Ảnh hưởng đến workflow quản lý sản phẩm
- **Impact nếu fail**: HIGH - Không xem được thông tin chi tiết
- **Business Impact**: Cao - Khó quản lý và kiểm tra sản phẩm

### 8. TS_PRODUCT_008: Tạo Sản Phẩm Với Price Âm
- **Category**: Negative Test - Validation
- **Priority**: High (P1)
- **Lý do**:
  - Price âm là dữ liệu không hợp lệ
  - Tương tự như price = 0, ảnh hưởng tài chính
  - Có thể bị exploit bởi user có ý đồ xấu
- **Impact nếu fail**: HIGH - Lỗi tính toán, có thể bị hack
- **Business Impact**: Cao - Rủi ro mất tiền

### 9. TS_PRODUCT_009: Tạo Sản Phẩm Với Quantity Âm
- **Category**: Negative Test - Validation
- **Priority**: High (P1)
- **Lý do**:
  - Quantity âm không có ý nghĩa trong business logic
  - Có thể gây lỗi trong inventory management
  - Ảnh hưởng đến order processing
- **Impact nếu fail**: HIGH - Lỗi quản lý kho, lỗi đặt hàng
- **Business Impact**: Cao - Inventory không chính xác

### 10. TS_PRODUCT_011: Tạo Sản Phẩm Không Chọn Category
- **Category**: Negative Test - Validation
- **Priority**: High (P1)
- **Lý do**:
  - Category là trường bắt buộc để phân loại sản phẩm
  - Không có category, không thể filter/search hiệu quả
  - Ảnh hưởng đến UX và product organization
- **Impact nếu fail**: HIGH - Sản phẩm không phân loại được
- **Business Impact**: Cao - Khó tìm kiếm, quản lý sản phẩm

### 11. TS_PRODUCT_018: Tạo Sản Phẩm Với Tên Trùng
- **Category**: Edge Case - Business Logic
- **Priority**: High (P1)
- **Lý do**:
  - Duplicate product name gây nhầm lẫn
  - Ảnh hưởng đến data uniqueness
  - User khó phân biệt sản phẩm
  - Có thể gây lỗi trong search/filter
- **Impact nếu fail**: HIGH - Data inconsistency, confusion
- **Business Impact**: Cao - Nhầm lẫn trong quản lý và bán hàng

### 12. TS_PRODUCT_021: Cập Nhật Sản Phẩm Sang Tên Trùng
- **Category**: Edge Case - Business Logic
- **Priority**: High (P1)
- **Lý do**:
  - Tương tự TS_PRODUCT_018
  - Cần validate khi update, không chỉ khi create
  - Bảo vệ tính duy nhất của product name
- **Impact nếu fail**: HIGH - Duplicate names trong database
- **Business Impact**: Cao - Nhầm lẫn khi cập nhật

### 13. TS_PRODUCT_022: Xóa Sản Phẩm Đang Được Sử Dụng
- **Category**: Edge Case - Business Logic
- **Priority**: High (P1)
- **Lý do**:
  - Xóa sản phẩm đang trong order sẽ gây lỗi hệ thống
  - Ảnh hưởng đến order processing
  - Có thể làm mất thông tin đơn hàng
  - Data integrity issue nghiêm trọng
- **Impact nếu fail**: HIGH - Lỗi order processing, data loss
- **Business Impact**: Rất cao - Đơn hàng bị lỗi, khách hàng phàn nàn

### 14. TS_PRODUCT_010: Cập Nhật Sản Phẩm Với Description Quá Dài
- **Category**: Negative Test - Validation
- **Priority**: High (P1)
- **Lý do**:
  - Description quá dài ảnh hưởng đến UI/UX
  - Có thể gây lỗi database nếu không có limit
  - Ảnh hưởng đến performance khi load
- **Impact nếu fail**: HIGH - UI broken, performance issue
- **Business Impact**: Trung bình - Trải nghiệm người dùng kém

---

## C. Medium Priority (P2) - 6 Scenarios

### 15. TS_PRODUCT_012: Product Name Độ Dài Tối Thiểu (3 ký tự)
- **Category**: Boundary Test
- **Priority**: Medium (P2)
- **Lý do**:
  - Test boundary condition của validation rule
  - Đảm bảo validation hoạt động chính xác
  - Ít xảy ra trong thực tế (hầu hết tên sản phẩm > 3 ký tự)
- **Impact nếu fail**: MEDIUM - Có thể reject valid input
- **Business Impact**: Trung bình - Ảnh hưởng đến UX trong edge case

### 16. TS_PRODUCT_013: Product Name Độ Dài Tối Đa (100 ký tự)
- **Category**: Boundary Test
- **Priority**: Medium (P2)
- **Lý do**:
  - Test boundary condition phía trên
  - Ít xảy ra (tên sản phẩm thường ngắn hơn 100 ký tự)
  - Đảm bảo system accept valid long names
- **Impact nếu fail**: MEDIUM - Reject valid long names
- **Business Impact**: Thấp - Edge case hiếm

### 17. TS_PRODUCT_014: Product Name Vượt Quá 100 Ký Tự
- **Category**: Boundary Test
- **Priority**: Medium (P2)
- **Lý do**:
  - Validate max length rule
  - Bảo vệ database schema
  - Ảnh hưởng đến UI layout
- **Impact nếu fail**: MEDIUM - Database error, UI broken
- **Business Impact**: Trung bình - Có thể gây lỗi hệ thống

### 18. TS_PRODUCT_015: Price Tối Đa (999,999,999)
- **Category**: Boundary Test
- **Priority**: Medium (P2)
- **Lý do**:
  - Test boundary của price field
  - Ít xảy ra (hầu hết sản phẩm có giá thấp hơn nhiều)
  - Đảm bảo system handle large numbers correctly
- **Impact nếu fail**: MEDIUM - Cannot sell expensive products
- **Business Impact**: Thấp - Rất ít sản phẩm giá cao như vậy

### 19. TS_PRODUCT_016: Price Vượt Quá Giới Hạn
- **Category**: Boundary Test
- **Priority**: Medium (P2)
- **Lý do**:
  - Validate max price constraint
  - Bảo vệ database và business logic
  - Ngăn chặn price manipulation
- **Impact nếu fail**: MEDIUM - Database error, calculation error
- **Business Impact**: Trung bình - Có thể gây lỗi tính toán

### 20. TS_PRODUCT_017: Quantity Tối Đa (99,999)
- **Category**: Boundary Test
- **Priority**: Medium (P2)
- **Lý do**:
  - Test boundary của quantity field
  - Ít xảy ra trong thực tế
  - Đảm bảo system handle large stock correctly
- **Impact nếu fail**: MEDIUM - Cannot add high stock
- **Business Impact**: Thấp - Ít khi có stock lớn như vậy

---

## D. Low Priority (P3) - 2 Scenarios

### 21. TS_PRODUCT_019: Xóa Sản Phẩm Không Tồn Tại
- **Category**: Edge Case
- **Priority**: Low (P3)
- **Lý do**:
  - Tình huống rất hiếm (race condition)
  - System thường prevent việc này qua UI
  - Chỉ xảy ra khi concurrent access hoặc manual API call
  - Có error handling mặc định từ database
- **Impact nếu fail**: LOW - Show generic error thay vì specific message
- **Business Impact**: Rất thấp - Gần như không xảy ra

### 22. TS_PRODUCT_020: Tạo Sản Phẩm Với Quantity = 0
- **Category**: Edge Case
- **Priority**: Low (P3)
- **Lý do**:
  - Quantity = 0 là valid case (out of stock)
  - Không phải là lỗi
  - Nhưng cần verify system handle correctly
  - Ít quan trọng hơn các validation rule khác
- **Impact nếu fail**: LOW - Minor UX issue (không hiển thị out of stock label)
- **Business Impact**: Thấp - Vẫn hoạt động, chỉ thiếu label

---

## E. Tổng Kết Phân Loại

### Thống Kê Theo Priority

| Priority | Số Lượng | Phần Trăm |
|----------|----------|-----------|
| Critical (P0) | 5 | 22.7% |
| High (P1) | 9 | 40.9% |
| Medium (P2) | 6 | 27.3% |
| Low (P3) | 2 | 9.1% |
| **Tổng** | **22** | **100%** |

### Phân Loại Theo CRUD và Priority

| CRUD Operation | Critical | High | Medium | Low | Total |
|----------------|----------|------|--------|-----|-------|
| Create | 3 | 5 | 5 | 1 | 14 |
| Read | 0 | 2 | 0 | 0 | 2 |
| Update | 1 | 2 | 0 | 0 | 3 |
| Delete | 1 | 1 | 0 | 1 | 3 |

### Phân Loại Theo Category và Priority

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Happy Path | 3 | 2 | 0 | 0 | 5 |
| Negative Tests | 2 | 4 | 0 | 0 | 6 |
| Boundary Tests | 0 | 0 | 6 | 0 | 6 |
| Edge Cases | 0 | 3 | 0 | 2 | 5 |

---

## F. Testing Strategy Recommendations

### Phase 1: Critical Tests (Sprint 1)
**Focus**: Đảm bảo các chức năng core hoạt động
- TS_PRODUCT_001: Create product successfully
- TS_PRODUCT_004: Update product successfully
- TS_PRODUCT_005: Delete product successfully
- TS_PRODUCT_006: Validate required product name
- TS_PRODUCT_007: Validate price > 0

**Success Criteria**: 100% pass
**Timeline**: 2 ngày testing
**Blocker**: Không thể release nếu có test fail

### Phase 2: High Priority Tests (Sprint 1-2)
**Focus**: Đảm bảo UX tốt và business logic đúng
- TS_PRODUCT_002: View product list
- TS_PRODUCT_003: View product details
- TS_PRODUCT_008: Validate price not negative
- TS_PRODUCT_009: Validate quantity not negative
- TS_PRODUCT_011: Validate category required
- TS_PRODUCT_018: Prevent duplicate product name
- TS_PRODUCT_021: Prevent duplicate on update
- TS_PRODUCT_022: Prevent delete product in use
- TS_PRODUCT_010: Validate description length

**Success Criteria**: 95% pass
**Timeline**: 3 ngày testing
**Blocker**: Major issues cần fix trước release

### Phase 3: Medium Priority Tests (Sprint 2)
**Focus**: Boundary conditions và edge cases
- All boundary tests (TS_PRODUCT_012 đến TS_PRODUCT_017)

**Success Criteria**: 90% pass
**Timeline**: 2 ngày testing
**Blocker**: Minor issues, có thể defer

### Phase 4: Low Priority Tests (Sprint 2-3)
**Focus**: Rare edge cases
- TS_PRODUCT_019: Delete non-existent product
- TS_PRODUCT_020: Create with quantity = 0

**Success Criteria**: 80% pass
**Timeline**: 1 ngày testing
**Blocker**: Not blocking release

---

## G. Risk Assessment

### Critical Risks (Nếu không test P0)
1. **Data Corruption**: Sản phẩm không tên, giá = 0 trong database
2. **Revenue Loss**: Khách hàng đặt hàng với giá 0
3. **System Unusable**: Không thể thêm/sửa/xóa sản phẩm

**Impact**: CRITICAL
**Probability**: HIGH nếu không test
**Mitigation**: PHẢI test tất cả P0 scenarios

### High Risks (Nếu không test P1)
1. **Poor UX**: User không xem được danh sách/chi tiết
2. **Data Inconsistency**: Sản phẩm trùng tên
3. **Order Processing Error**: Xóa sản phẩm đang trong order

**Impact**: HIGH
**Probability**: MEDIUM
**Mitigation**: Nên test P1 trước khi release

### Medium Risks (Nếu không test P2)
1. **Edge Case Errors**: Lỗi với boundary values
2. **Limited Flexibility**: Không accept valid edge values

**Impact**: MEDIUM
**Probability**: LOW
**Mitigation**: Test trong regression suite

### Low Risks (Nếu không test P3)
1. **Minor UX Issues**: Thiếu label hoặc message
2. **Rare Edge Cases**: Lỗi trong tình huống hiếm

**Impact**: LOW
**Probability**: VERY LOW
**Mitigation**: Test khi có thời gian

---

## H. Regression Testing Priority

### Must Include in Regression (P0 + P1)
- Tất cả 5 Critical scenarios
- Tất cả 9 High priority scenarios
- **Total**: 14 scenarios
- **Estimated Time**: 2-3 hours

### Should Include if Time Permits (P2)
- 6 Boundary test scenarios
- **Additional Time**: 1 hour

### Optional (P3)
- 2 Low priority scenarios
- **Additional Time**: 15 minutes

---

## I. Defect Severity Mapping

### Critical Defects (P0 scenarios fail)
- **Severity**: Blocker/Critical
- **Priority**: Immediate fix
- **SLA**: Fix within 24 hours
- **Examples**:
  - Cannot create product
  - Can create product with price = 0
  - Cannot update/delete product

### High Defects (P1 scenarios fail)
- **Severity**: Major
- **Priority**: High
- **SLA**: Fix within 2-3 days
- **Examples**:
  - Cannot view product list
  - Duplicate product names accepted
  - Can delete product in active order

### Medium Defects (P2 scenarios fail)
- **Severity**: Minor
- **Priority**: Medium
- **SLA**: Fix in next sprint
- **Examples**:
  - Boundary values not handled correctly
  - Max length validation not working

### Low Defects (P3 scenarios fail)
- **Severity**: Trivial
- **Priority**: Low
- **SLA**: Fix when convenient
- **Examples**:
  - Missing "out of stock" label
  - Generic error message instead of specific

---

## J. Test Automation Priority

### Phase 1: Automate Critical (P0)
- ROI: Rất cao
- Frequency: Run mỗi commit
- Effort: 3 days
- **Scenarios**: 5 critical tests

### Phase 2: Automate High (P1)
- ROI: Cao
- Frequency: Run mỗi build
- Effort: 5 days
- **Scenarios**: 9 high priority tests

### Phase 3: Automate Medium (P2)
- ROI: Trung bình
- Frequency: Nightly regression
- Effort: 3 days
- **Scenarios**: 6 boundary tests

### Phase 4: Manual Testing (P3)
- ROI: Thấp
- Frequency: Ad-hoc
- Effort: Manual only
- **Scenarios**: 2 low priority tests

---

## K. Sign-off Criteria Per Priority

### P0 (Critical)
- **Pass Rate Required**: 100%
- **Sign-off**: QA Lead + Dev Lead
- **Cannot Release If**: Any P0 fails
- **Retest**: Immediately after fix

### P1 (High)
- **Pass Rate Required**: 95%
- **Sign-off**: QA Lead
- **Cannot Release If**: >1 P1 fails
- **Retest**: Within 2 days

### P2 (Medium)
- **Pass Rate Required**: 90%
- **Sign-off**: QA Engineer
- **Can Release With**: Known issues documented
- **Retest**: Next sprint

### P3 (Low)
- **Pass Rate Required**: 80%
- **Sign-off**: Optional
- **Can Release With**: Failures logged
- **Retest**: When convenient

---

**Document Version**: 1.0
**Last Updated**: 2025-01-22
**Total Scenarios**: 22
**Critical**: 5 | **High**: 9 | **Medium**: 6 | **Low**: 2
