# Tính Năng Product Management - Các Test Scenario

## Tổng Quan

Document này liệt kê các test scenarios cho chức năng Product Management (CRUD operations). Các scenarios được phân loại theo:
- **Happy Path**: Các kịch bản thành công
- **Negative Tests**: Kiểm thử với dữ liệu không hợp lệ
- **Boundary Tests**: Kiểm thử với giá trị biên
- **Edge Cases**: Các trường hợp đặc biệt

**Tổng số Test Scenarios**: 19

---

## A. Happy Path Scenarios

### Scenario 1: Tạo Sản Phẩm Mới Thành Công
- **ID**: TS_PRODUCT_001
- **Category**: Happy Path - Create
- **Description**: User tạo sản phẩm mới với tất cả thông tin hợp lệ
- **Preconditions**:
  - User đã đăng nhập
  - User có quyền tạo sản phẩm
- **Test Steps**:
  1. Navigate đến trang Product Management
  2. Click button "Add New Product"
  3. Nhập Product Name: "Laptop Dell Inspiron 15" (20 ký tự)
  4. Nhập Price: 15000000
  5. Nhập Quantity: 50
  6. Nhập Description: "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB" (50 ký tự)
  7. Chọn Category: "Electronics"
  8. Click button "Save"
- **Expected Result**:
  - Sản phẩm được tạo thành công
  - Hiển thị message: "Product created successfully"
  - Redirect về product list
  - Sản phẩm mới xuất hiện trong danh sách

### Scenario 2: Xem Danh Sách Sản Phẩm Thành Công
- **ID**: TS_PRODUCT_002
- **Category**: Happy Path - Read
- **Description**: User xem danh sách tất cả sản phẩm
- **Preconditions**:
  - User đã đăng nhập
  - Hệ thống có ít nhất 5 sản phẩm
- **Test Steps**:
  1. Navigate đến trang Product List
  2. Kiểm tra danh sách hiển thị
- **Expected Result**:
  - Danh sách sản phẩm hiển thị đầy đủ
  - Mỗi sản phẩm hiển thị: Name, Price, Quantity, Category
  - Hỗ trợ pagination
  - Loading time < 2 seconds

### Scenario 3: Xem Chi Tiết Một Sản Phẩm Thành Công
- **ID**: TS_PRODUCT_003
- **Category**: Happy Path - Read
- **Description**: User xem chi tiết thông tin của một sản phẩm
- **Preconditions**:
  - User đã đăng nhập
  - Sản phẩm tồn tại trong hệ thống
- **Test Steps**:
  1. Navigate đến trang Product List
  2. Click vào một sản phẩm để xem chi tiết
- **Expected Result**:
  - Hiển thị đầy đủ thông tin: Name, Price, Quantity, Description, Category
  - Hiển thị Created Date và Last Modified Date
  - Có button Edit và Delete

### Scenario 4: Cập Nhật Thông Tin Sản Phẩm Thành Công
- **ID**: TS_PRODUCT_004
- **Category**: Happy Path - Update
- **Description**: User cập nhật thông tin sản phẩm với dữ liệu hợp lệ
- **Preconditions**:
  - User đã đăng nhập
  - User có quyền update sản phẩm
  - Sản phẩm tồn tại
- **Test Steps**:
  1. Navigate đến Product List
  2. Click "Edit" trên một sản phẩm
  3. Thay đổi Price từ 15000000 thành 14500000
  4. Thay đổi Quantity từ 50 thành 45
  5. Click "Update"
- **Expected Result**:
  - Sản phẩm được cập nhật thành công
  - Hiển thị message: "Product updated successfully"
  - Last Modified Date được cập nhật
  - Thông tin mới hiển thị đúng

### Scenario 5: Xóa Sản Phẩm Thành Công
- **ID**: TS_PRODUCT_005
- **Category**: Happy Path - Delete
- **Description**: User xóa một sản phẩm khỏi hệ thống
- **Preconditions**:
  - User đã đăng nhập
  - User có quyền delete sản phẩm
  - Sản phẩm tồn tại và không đang được sử dụng
- **Test Steps**:
  1. Navigate đến Product List
  2. Click "Delete" trên một sản phẩm
  3. Confirm deletion trong dialog
- **Expected Result**:
  - Hiển thị confirmation dialog
  - Sản phẩm được xóa thành công
  - Hiển thị message: "Product deleted successfully"
  - Sản phẩm biến mất khỏi danh sách

---

## B. Negative Test Scenarios

### Scenario 6: Tạo Sản Phẩm Với Product Name Rỗng
- **ID**: TS_PRODUCT_006
- **Category**: Negative Test - Create
- **Description**: User cố tạo sản phẩm với tên rỗng
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Để trống Product Name
  3. Nhập Price: 100000
  4. Nhập Quantity: 10
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm không được tạo
  - Hiển thị error: "Product name is required"
  - Focus vào Product Name field
  - Dữ liệu khác được giữ lại

### Scenario 7: Tạo Sản Phẩm Với Price = 0
- **ID**: TS_PRODUCT_007
- **Category**: Negative Test - Create
- **Description**: User cố tạo sản phẩm với giá bằng 0
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "Test Product"
  3. Nhập Price: 0
  4. Nhập Quantity: 10
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm không được tạo
  - Hiển thị error: "Price must be greater than 0"
  - Focus vào Price field

### Scenario 8: Tạo Sản Phẩm Với Price Âm
- **ID**: TS_PRODUCT_008
- **Category**: Negative Test - Create
- **Description**: User cố tạo sản phẩm với giá âm
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "Test Product"
  3. Nhập Price: -5000
  4. Nhập Quantity: 10
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm không được tạo
  - Hiển thị error: "Price must be greater than 0"
  - Focus vào Price field

### Scenario 9: Tạo Sản Phẩm Với Quantity Âm
- **ID**: TS_PRODUCT_009
- **Category**: Negative Test - Create
- **Description**: User cố tạo sản phẩm với số lượng âm
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "Test Product"
  3. Nhập Price: 100000
  4. Nhập Quantity: -10
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm không được tạo
  - Hiển thị error: "Quantity cannot be negative"
  - Focus vào Quantity field

### Scenario 10: Cập Nhật Sản Phẩm Với Description Quá Dài
- **ID**: TS_PRODUCT_010
- **Category**: Negative Test - Update
- **Description**: User cố cập nhật sản phẩm với description vượt quá 500 ký tự
- **Preconditions**:
  - User đã đăng nhập
  - Sản phẩm tồn tại
- **Test Steps**:
  1. Navigate đến Edit Product page
  2. Nhập Description: [một đoạn text 501 ký tự]
  3. Click "Update"
- **Expected Result**:
  - Sản phẩm không được cập nhật
  - Hiển thị error: "Description must not exceed 500 characters"
  - Hiển thị character count: "501/500"

### Scenario 11: Tạo Sản Phẩm Không Chọn Category
- **ID**: TS_PRODUCT_011
- **Category**: Negative Test - Create
- **Description**: User cố tạo sản phẩm mà không chọn category
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "Test Product"
  3. Nhập Price: 100000
  4. Nhập Quantity: 10
  5. Không chọn Category (để mặc định/rỗng)
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm không được tạo
  - Hiển thị error: "Category is required"
  - Focus vào Category dropdown

---

## C. Boundary Test Scenarios

### Scenario 12: Tạo Sản Phẩm Với Product Name Có Độ Dài Tối Thiểu (3 ký tự)
- **ID**: TS_PRODUCT_012
- **Category**: Boundary Test - Create
- **Description**: Kiểm tra giới hạn tối thiểu của product name
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "ABC" (đúng 3 ký tự)
  3. Nhập Price: 100000
  4. Nhập Quantity: 10
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm được tạo thành công
  - Hiển thị message: "Product created successfully"

### Scenario 13: Tạo Sản Phẩm Với Product Name Có Độ Dài Tối Đa (100 ký tự)
- **ID**: TS_PRODUCT_013
- **Category**: Boundary Test - Create
- **Description**: Kiểm tra giới hạn tối đa của product name
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: [string có đúng 100 ký tự]
  3. Nhập Price: 100000
  4. Nhập Quantity: 10
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm được tạo thành công
  - Hiển thị message: "Product created successfully"

### Scenario 14: Tạo Sản Phẩm Với Product Name Vượt Quá 100 Ký Tự
- **ID**: TS_PRODUCT_014
- **Category**: Boundary Test - Create
- **Description**: Kiểm tra validation khi vượt quá độ dài tối đa
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: [string có 101 ký tự]
  3. Nhập Price: 100000
  4. Nhập Quantity: 10
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm không được tạo
  - Hiển thị error: "Product name must not exceed 100 characters"

### Scenario 15: Tạo Sản Phẩm Với Price Tối Đa (999,999,999)
- **ID**: TS_PRODUCT_015
- **Category**: Boundary Test - Create
- **Description**: Kiểm tra giới hạn tối đa của price
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "Expensive Product"
  3. Nhập Price: 999999999 (giá trị tối đa)
  4. Nhập Quantity: 1
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm được tạo thành công
  - Hiển thị message: "Product created successfully"
  - Price hiển thị đúng: 999,999,999

### Scenario 16: Tạo Sản Phẩm Với Price Vượt Quá Giới Hạn
- **ID**: TS_PRODUCT_016
- **Category**: Boundary Test - Create
- **Description**: Kiểm tra validation khi price vượt quá giới hạn
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "Too Expensive"
  3. Nhập Price: 1000000000 (1 tỷ, vượt quá 999,999,999)
  4. Nhập Quantity: 1
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm không được tạo
  - Hiển thị error: "Price must not exceed 999,999,999"

### Scenario 17: Tạo Sản Phẩm Với Quantity Tối Đa (99,999)
- **ID**: TS_PRODUCT_017
- **Category**: Boundary Test - Create
- **Description**: Kiểm tra giới hạn tối đa của quantity
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "High Stock Product"
  3. Nhập Price: 50000
  4. Nhập Quantity: 99999 (giá trị tối đa)
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm được tạo thành công
  - Hiển thị message: "Product created successfully"
  - Quantity hiển thị đúng: 99,999

---

## D. Edge Case Scenarios

### Scenario 18: Tạo Sản Phẩm Với Tên Trùng (Case Insensitive)
- **ID**: TS_PRODUCT_018
- **Category**: Edge Case - Create
- **Description**: User cố tạo sản phẩm với tên trùng với sản phẩm đã tồn tại
- **Preconditions**:
  - User đã đăng nhập
  - Đã tồn tại sản phẩm tên "Laptop Dell"
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "laptop dell" (khác case)
  3. Nhập Price: 100000
  4. Nhập Quantity: 10
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm không được tạo
  - Hiển thị error: "Product name already exists"
  - Suggest: "A product with similar name exists"

### Scenario 19: Xóa Sản Phẩm Không Tồn Tại
- **ID**: TS_PRODUCT_019
- **Category**: Edge Case - Delete
- **Description**: User cố xóa sản phẩm đã bị xóa hoặc không tồn tại
- **Preconditions**:
  - User đã đăng nhập
  - Product ID không tồn tại trong database
- **Test Steps**:
  1. Gửi DELETE request với product ID không tồn tại
  2. Hoặc: xóa sản phẩm đã được user khác xóa trước đó
- **Expected Result**:
  - Hiển thị error: "Product not found"
  - Không có thay đổi trong database
  - Redirect về product list

### Scenario 20: Tạo Sản Phẩm Với Quantity = 0
- **ID**: TS_PRODUCT_020
- **Category**: Edge Case - Create
- **Description**: Tạo sản phẩm với số lượng bằng 0 (out of stock)
- **Preconditions**: User đã đăng nhập
- **Test Steps**:
  1. Navigate đến Add Product page
  2. Nhập Product Name: "Out of Stock Product"
  3. Nhập Price: 100000
  4. Nhập Quantity: 0
  5. Chọn Category: "Electronics"
  6. Click "Save"
- **Expected Result**:
  - Sản phẩm được tạo thành công
  - Hiển thị message: "Product created successfully"
  - Sản phẩm hiển thị với label "Out of Stock"
  - Quantity = 0 là hợp lệ

### Scenario 21: Cập Nhật Sản Phẩm Sang Tên Trùng Với Sản Phẩm Khác
- **ID**: TS_PRODUCT_021
- **Category**: Edge Case - Update
- **Description**: User cố đổi tên sản phẩm thành tên đã tồn tại
- **Preconditions**:
  - User đã đăng nhập
  - Tồn tại Product A: "Laptop HP"
  - Tồn tại Product B: "Laptop Dell"
- **Test Steps**:
  1. Edit Product B
  2. Đổi tên từ "Laptop Dell" thành "Laptop HP"
  3. Click "Update"
- **Expected Result**:
  - Sản phẩm không được cập nhật
  - Hiển thị error: "Product name already exists"
  - Product B giữ nguyên tên cũ

### Scenario 22: Xóa Sản Phẩm Đang Được Sử Dụng Trong Đơn Hàng
- **ID**: TS_PRODUCT_022
- **Category**: Edge Case - Delete
- **Description**: User cố xóa sản phẩm đang có trong đơn hàng chưa hoàn thành
- **Preconditions**:
  - User đã đăng nhập
  - Sản phẩm đang có trong ít nhất 1 đơn hàng active
- **Test Steps**:
  1. Navigate đến Product List
  2. Click "Delete" trên sản phẩm đang được sử dụng
  3. Confirm deletion
- **Expected Result**:
  - Sản phẩm không được xóa
  - Hiển thị error: "Cannot delete product. Product is being used in active orders"
  - Sản phẩm vẫn tồn tại trong danh sách

---

## E. Tóm Tắt Scenarios

### Phân Loại Theo Category
- **Happy Path**: 5 scenarios (TS_PRODUCT_001 đến TS_PRODUCT_005)
- **Negative Tests**: 6 scenarios (TS_PRODUCT_006 đến TS_PRODUCT_011)
- **Boundary Tests**: 6 scenarios (TS_PRODUCT_012 đến TS_PRODUCT_017)
- **Edge Cases**: 5 scenarios (TS_PRODUCT_018 đến TS_PRODUCT_022)

### Phân Loại Theo CRUD Operation
- **Create**: 13 scenarios
- **Read**: 2 scenarios
- **Update**: 3 scenarios
- **Delete**: 4 scenarios

### Coverage Matrix

| Validation Rule | Test Scenarios |
|----------------|----------------|
| Product Name Required | TS_PRODUCT_006 |
| Product Name Length (3-100) | TS_PRODUCT_012, TS_PRODUCT_013, TS_PRODUCT_014 |
| Product Name Unique | TS_PRODUCT_018, TS_PRODUCT_021 |
| Price Required | Covered in all create scenarios |
| Price > 0 | TS_PRODUCT_007, TS_PRODUCT_008 |
| Price <= 999,999,999 | TS_PRODUCT_015, TS_PRODUCT_016 |
| Quantity >= 0 | TS_PRODUCT_009, TS_PRODUCT_020 |
| Quantity <= 99,999 | TS_PRODUCT_017 |
| Description <= 500 chars | TS_PRODUCT_010 |
| Category Required | TS_PRODUCT_011 |

---

## F. Test Data Summary

### Valid Test Data
```
Product 1:
- Name: "Laptop Dell Inspiron 15"
- Price: 15000000
- Quantity: 50
- Description: "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB"
- Category: "Electronics"

Product 2:
- Name: "iPhone 14 Pro Max"
- Price: 29990000
- Quantity: 30
- Description: "iPhone 14 Pro Max, 256GB, Deep Purple"
- Category: "Electronics"

Product 3:
- Name: "Samsung Smart TV 55 inch"
- Price: 12500000
- Quantity: 15
- Description: "Samsung 4K Smart TV 55 inch"
- Category: "Electronics"
```

### Invalid Test Data
```
Invalid Name:
- Empty string: ""
- Too short: "AB" (2 chars)
- Too long: [101 characters string]
- Duplicate: "laptop dell" (exists as "Laptop Dell")

Invalid Price:
- Zero: 0
- Negative: -5000
- Too large: 1000000000

Invalid Quantity:
- Negative: -10
- Too large: 100000

Invalid Description:
- Too long: [501 characters string]

Invalid Category:
- Empty/Not selected: null
```

---

## G. Notes và Recommendations

### Testing Best Practices
1. Test validation cả client-side và server-side
2. Test với nhiều browsers khác nhau
3. Test với nhiều roles khác nhau (Admin, Manager, Staff)
4. Test concurrent operations (2 users cùng edit/delete)
5. Test performance với large dataset

### Priority Recommendations
- **Critical**: TS_PRODUCT_001, TS_PRODUCT_004, TS_PRODUCT_005, TS_PRODUCT_006, TS_PRODUCT_007
- **High**: TS_PRODUCT_002, TS_PRODUCT_003, TS_PRODUCT_018, TS_PRODUCT_022
- **Medium**: Remaining boundary tests
- **Low**: Edge cases ít xảy ra

### Known Limitations
- Import/Export không được cover trong scope này
- Image upload không được test
- Product variants không có
- Bulk operations không có

---

## H. Test Environment Requirements

### Prerequisites
- Test database với sample data
- User accounts với different roles
- Category list đã được populate
- Browser: Chrome, Firefox, Safari, Edge

### Test Data Setup
```sql
-- Sample categories
INSERT INTO categories VALUES
  ('Electronics'),
  ('Clothing'),
  ('Food & Beverage'),
  ('Books');

-- Sample products
INSERT INTO products (name, price, quantity, description, category) VALUES
  ('Laptop HP', 18000000, 25, 'HP Laptop', 'Electronics'),
  ('Laptop Dell', 15000000, 30, 'Dell Laptop', 'Electronics');
```

---

**Document Version**: 1.0
**Last Updated**: 2025-01-22
**Total Scenarios**: 22
