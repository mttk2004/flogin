# Tính Năng Product Management - Test Cases Chi Tiết

## Tổng Quan

Document này cung cấp 5 test cases quan trọng nhất cho chức năng Product Management, được thiết kế chi tiết theo template chuẩn. Các test cases được chọn dựa trên độ ưu tiên Critical và High.

**Test Cases Selection**:
1. TC_PRODUCT_001: Tạo sản phẩm mới thành công (Create - Critical)
2. TC_PRODUCT_002: Xem danh sách sản phẩm thành công (Read - High)
3. TC_PRODUCT_003: Cập nhật thông tin sản phẩm thành công (Update - Critical)
4. TC_PRODUCT_004: Xóa sản phẩm thành công (Delete - Critical)
5. TC_PRODUCT_005: Tạo sản phẩm với dữ liệu không hợp lệ (Validation - Critical)

---

## Test Case 1: Create Product Successfully

| Thông tin | Nội dung |
|:----------|:---------|
| **Test Case ID** | TC_PRODUCT_001 |
| **Test Name** | Tạo sản phẩm mới thành công với tất cả thông tin hợp lệ |
| **Related Scenario** | TS_PRODUCT_001 |
| **Priority** | Critical (P0) |
| **Type** | Functional - Positive Test |
| **Module** | Product Management - Create |
| **Preconditions** | - User đã đăng nhập vào hệ thống<br>- User có quyền tạo sản phẩm (role: Admin hoặc Manager)<br>- Category list đã được populate trong database<br>- Database connection đang hoạt động |
| **Test Steps** | **Step 1**: Navigate đến trang Product Management<br>- Click vào menu "Products" trong sidebar<br>- Verify trang Product List được load<br><br>**Step 2**: Click button "Add New Product"<br>- Locate và click button "Add New Product" ở góc trên bên phải<br>- Verify form "Create New Product" được hiển thị<br>- Verify tất cả fields đều rỗng (empty state)<br><br>**Step 3**: Nhập Product Name<br>- Click vào field "Product Name"<br>- Nhập: "Laptop Dell Inspiron 15"<br>- Verify không có error message<br><br>**Step 4**: Nhập Price<br>- Click vào field "Price"<br>- Nhập: 15000000<br>- Verify field chấp nhận giá trị<br>- Verify format hiển thị: "15,000,000" (với comma separators)<br><br>**Step 5**: Nhập Quantity<br>- Click vào field "Quantity"<br>- Nhập: 50<br>- Verify field chấp nhận giá trị<br><br>**Step 6**: Nhập Description<br>- Click vào field "Description"<br>- Nhập: "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB, Intel Core i7"<br>- Verify character count hiển thị: "61/500"<br><br>**Step 7**: Chọn Category<br>- Click vào dropdown "Category"<br>- Select: "Electronics"<br>- Verify "Electronics" được chọn<br><br>**Step 8**: Submit form<br>- Click button "Save" hoặc "Create Product"<br>- Verify loading indicator hiển thị<br>- Wait cho response từ server<br><br>**Step 9**: Verify success response<br>- Verify success message: "Product created successfully"<br>- Verify redirect về trang Product List<br>- Verify sản phẩm mới xuất hiện trong danh sách<br><br>**Step 10**: Verify product details<br>- Locate sản phẩm "Laptop Dell Inspiron 15" trong list<br>- Verify Name: "Laptop Dell Inspiron 15"<br>- Verify Price: "15,000,000"<br>- Verify Quantity: "50"<br>- Verify Category: "Electronics" |
| **Test Data** | **Product Information:**<br>- Product Name: "Laptop Dell Inspiron 15"<br>  - Length: 24 characters (valid: 3-100)<br>  - Contains: letters, numbers, spaces<br>- Price: 15000000<br>  - Valid range: > 0 and <= 999,999,999<br>  - Decimal places: 0 (integer price)<br>- Quantity: 50<br>  - Valid range: >= 0 and <= 99,999<br>  - Type: Integer<br>- Description: "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB, Intel Core i7"<br>  - Length: 61 characters (valid: <= 500)<br>- Category: "Electronics"<br>  - Valid category from predefined list<br><br>**User Account:**<br>- Username: admin_user<br>- Role: Admin<br>- Permissions: Full CRUD on products |
| **Expected Result** | **ER1**: Form hiển thị đầy đủ các fields với labels rõ ràng<br>- Required fields có dấu * đỏ<br>- Placeholders gợi ý format<br><br>**ER2**: Tất cả dữ liệu được nhập thành công không có validation error<br>- Real-time validation không báo lỗi<br>- Character counts hiển thị đúng<br><br>**ER3**: Request POST được gửi đến endpoint /api/products/create<br>- HTTP Status: 201 Created<br>- Response time: < 1 second<br><br>**ER4**: Response trả về thành công với format:<br>```json<br>{<br>  "success": true,<br>  "message": "Product created successfully",<br>  "data": {<br>    "id": 123,<br>    "name": "Laptop Dell Inspiron 15",<br>    "price": 15000000,<br>    "quantity": 50,<br>    "description": "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB, Intel Core i7",<br>    "category": "Electronics",<br>    "createdAt": "2025-01-22T10:30:00Z",<br>    "updatedAt": "2025-01-22T10:30:00Z"<br>  }<br>}<br>```<br><br>**ER5**: Success message "Product created successfully" hiển thị trong 3 seconds<br>- Message có icon ✓ màu xanh<br>- Message position: top-right hoặc top-center<br><br>**ER6**: Redirect về Product List page<br>- URL: /products hoặc /products/list<br>- Redirect time: < 500ms<br><br>**ER7**: Sản phẩm mới xuất hiện trong danh sách<br>- Position: Đầu danh sách hoặc theo sort order<br>- Hiển thị đầy đủ: Name, Price, Quantity, Category<br>- Có buttons: Edit, Delete, View Details<br><br>**ER8**: Database record được tạo<br>- Table: products<br>- New record với ID mới<br>- Tất cả fields được lưu đúng<br>- created_at và updated_at được set<br>- Status: active (default) |
| **Actual Result** | *(Để trống - sẽ điền khi thực hiện test thực tế)* |
| **Status** | Not Run |
| **Test Environment** | - Browser: Chrome 120+, Firefox 115+<br>- OS: Windows 10/11, macOS, Linux<br>- Database: MySQL 8.0+<br>- Backend: Running on localhost:8080 or test server<br>- Frontend: Running on localhost:3000 or test server |
| **Test Execution Date** | *(Để trống - điền khi execute)* |
| **Tested By** | *(Để trống - điền tên tester)* |
| **Defect ID** | *(Để trống - điền nếu có bug)* |
| **Comments/Notes** | - Test case này cover happy path cơ bản nhất<br>- Nếu fail, đây là blocker cho release<br>- Cần test trên nhiều browsers<br>- Verify cả client-side và server-side validation<br>- Check database integrity sau khi tạo<br>- Monitor network request/response |

---

## Test Case 2: View Product List Successfully

| Thông tin | Nội dung |
|:----------|:---------|
| **Test Case ID** | TC_PRODUCT_002 |
| **Test Name** | Xem danh sách sản phẩm với pagination, search và filter |
| **Related Scenario** | TS_PRODUCT_002, TS_PRODUCT_003 |
| **Priority** | High (P1) |
| **Type** | Functional - Positive Test |
| **Module** | Product Management - Read |
| **Preconditions** | - User đã đăng nhập vào hệ thống<br>- Database có ít nhất 15 sản phẩm (để test pagination)<br>- Có sản phẩm thuộc nhiều categories khác nhau<br>- Có sản phẩm với tên chứa keyword "Laptop" |
| **Test Steps** | **Step 1**: Navigate đến Product List page<br>- Click vào menu "Products"<br>- Verify URL: /products hoặc /products/list<br>- Wait cho page load hoàn tất<br><br>**Step 2**: Verify danh sách hiển thị<br>- Count số sản phẩm hiển thị trên page đầu tiên<br>- Verify hiển thị tối đa 10 sản phẩm (default page size)<br>- Verify mỗi sản phẩm hiển thị: Name, Price, Quantity, Category<br><br>**Step 3**: Verify pagination controls<br>- Verify có pagination controls ở dưới danh sách<br>- Verify hiển thị: Previous, 1, 2, Next<br>- Verify page 1 được highlight (active)<br>- Verify Previous button bị disabled<br><br>**Step 4**: Test pagination - Go to page 2<br>- Click vào page number "2" hoặc "Next" button<br>- Verify page 2 được load<br>- Verify URL update: /products?page=2<br>- Verify 5 sản phẩm tiếp theo hiển thị (tổng 15, page 1: 10, page 2: 5)<br>- Verify page 2 được highlight<br>- Verify Previous button enabled<br>- Verify Next button disabled (đã hết sản phẩm)<br><br>**Step 5**: Test search functionality<br>- Go back to page 1<br>- Locate search box (thường ở trên cùng)<br>- Enter search keyword: "Laptop"<br>- Press Enter hoặc click Search button<br>- Verify danh sách được filter<br>- Verify chỉ hiển thị sản phẩm có tên chứa "Laptop"<br>- Verify search keyword được highlight trong results<br><br>**Step 6**: Test category filter<br>- Clear search box<br>- Locate category filter dropdown<br>- Select category: "Electronics"<br>- Verify danh sách được filter theo category<br>- Verify chỉ hiển thị sản phẩm thuộc "Electronics"<br>- Verify category badge hiển thị trên mỗi product<br><br>**Step 7**: Test sort functionality<br>- Click vào column header "Price"<br>- Verify danh sách được sort theo price ascending<br>- Verify sản phẩm có giá thấp nhất lên đầu<br>- Click lại vào "Price"<br>- Verify sort order đổi thành descending<br>- Verify sản phẩm có giá cao nhất lên đầu<br><br>**Step 8**: View product details<br>- Click vào một sản phẩm trong danh sách<br>- Verify navigate đến product details page<br>- Verify URL: /products/{id}<br>- Verify hiển thị đầy đủ thông tin: Name, Price, Quantity, Description, Category<br>- Verify hiển thị Created Date và Last Modified Date<br>- Verify có buttons: Edit, Delete, Back to List<br><br>**Step 9**: Test performance<br>- Clear cache và reload page<br>- Measure page load time<br>- Verify load time < 2 seconds<br><br>**Step 10**: Verify responsive design<br>- Resize browser window<br>- Test trên mobile viewport (375px)<br>- Verify layout adapts cho mobile<br>- Verify tất cả functions vẫn hoạt động |
| **Test Data** | **Sample Products in Database:**<br>Product 1:<br>- Name: "Laptop HP Pavilion"<br>- Price: 18000000<br>- Quantity: 25<br>- Category: "Electronics"<br><br>Product 2:<br>- Name: "Laptop Dell XPS 13"<br>- Price: 25000000<br>- Quantity: 15<br>- Category: "Electronics"<br><br>Product 3:<br>- Name: "iPhone 14 Pro Max"<br>- Price: 29990000<br>- Quantity: 30<br>- Category: "Electronics"<br><br>Product 4:<br>- Name: "Samsung Galaxy S23"<br>- Price: 22000000<br>- Quantity: 40<br>- Category: "Electronics"<br><br>Product 5-15: Mixed products từ categories khác<br><br>**Search Keyword**: "Laptop"<br>**Filter Category**: "Electronics"<br>**Sort Field**: "Price" |
| **Expected Result** | **ER1**: Product List page load thành công<br>- HTTP Status: 200 OK<br>- Page load time: < 2 seconds<br>- No JavaScript errors in console<br><br>**ER2**: Danh sách hiển thị đúng format<br>- Table hoặc card layout rõ ràng<br>- Columns: Product Name, Price, Quantity, Category, Actions<br>- Price format: "15,000,000" (with comma separators)<br>- Quantity format: integer number<br>- Category: badge hoặc label với màu sắc phù hợp<br><br>**ER3**: Pagination hoạt động đúng<br>- Default page size: 10 items<br>- Pagination controls visible<br>- Page numbers clickable<br>- Next/Previous buttons hoạt động đúng<br>- Current page highlighted<br>- URL updates khi change page: ?page=2<br><br>**ER4**: Search functionality hoạt động<br>- Search là case-insensitive: "laptop" matches "Laptop"<br>- Partial match: "Lap" matches "Laptop"<br>- Kết quả hiển thị real-time hoặc sau khi Enter<br>- Keyword được highlight trong results<br>- Show message nếu không tìm thấy: "No products found"<br><br>**ER5**: Filter functionality hoạt động<br>- Dropdown hiển thị tất cả categories<br>- Filter apply ngay khi select<br>- Chỉ hiển thị sản phẩm thuộc category được chọn<br>- Có option "All Categories" để clear filter<br><br>**ER6**: Sort functionality hoạt động<br>- Click column header để sort<br>- Toggle between ascending/descending<br>- Sort icon hiển thị (▲ ▼)<br>- Sort order được maintain khi paginate<br><br>**ER7**: Product details page<br>- Click vào product name hoặc View button<br>- Navigate đến /products/{id}<br>- Hiển thị full information<br>- Breadcrumb: Products > Product Details<br>- Back button hoạt động<br><br>**ER8**: Responsive design<br>- Desktop (>1200px): Table layout<br>- Tablet (768-1199px): Table hoặc card layout<br>- Mobile (<768px): Card layout, stacked columns<br>- Touch-friendly buttons<br><br>**ER9**: API request/response đúng<br>GET /api/products?page=1&limit=10<br>Response:<br>```json<br>{<br>  "success": true,<br>  "data": {<br>    "products": [...],<br>    "pagination": {<br>      "currentPage": 1,<br>      "totalPages": 2,<br>      "totalItems": 15,<br>      "itemsPerPage": 10<br>    }<br>  }<br>}<br>```<br><br>**ER10**: Empty state handling<br>- Nếu không có sản phẩm: hiển thị message "No products available"<br>- Hiển thị icon và "Add Product" button |
| **Actual Result** | *(Để trống)* |
| **Status** | Not Run |
| **Test Environment** | Same as TC_PRODUCT_001 |
| **Test Execution Date** | *(Để trống)* |
| **Tested By** | *(Để trống)* |
| **Defect ID** | *(Để trống)* |
| **Comments/Notes** | - Test case này cover các tính năng Read quan trọng<br>- Performance rất quan trọng cho UX<br>- Test với large dataset (>1000 products) để verify performance<br>- Test concurrent access (multiple users viewing)<br>- Verify caching strategy<br>- Check SQL query performance |

---

## Test Case 3: Update Product Successfully

| Thông tin | Nội dung |
|:----------|:---------|
| **Test Case ID** | TC_PRODUCT_003 |
| **Test Name** | Cập nhật thông tin sản phẩm thành công |
| **Related Scenario** | TS_PRODUCT_004 |
| **Priority** | Critical (P0) |
| **Type** | Functional - Positive Test |
| **Module** | Product Management - Update |
| **Preconditions** | - User đã đăng nhập với quyền Update product<br>- Tồn tại sản phẩm với thông tin sau trong database:<br>  - ID: 101<br>  - Name: "Laptop Dell Inspiron 15"<br>  - Price: 15000000<br>  - Quantity: 50<br>  - Description: "Laptop Dell Inspiron 15, RAM 16GB"<br>  - Category: "Electronics"<br>  - Last Modified: "2025-01-20T10:00:00Z" |
| **Test Steps** | **Step 1**: Navigate đến Product List<br>- Go to /products<br>- Locate sản phẩm "Laptop Dell Inspiron 15"<br>- Verify product hiển thị trong danh sách<br><br>**Step 2**: Open Edit form<br>- Click button "Edit" trên product row<br>- Verify navigate đến Edit Product page<br>- Verify URL: /products/101/edit hoặc /products/edit/101<br>- Verify form được pre-filled với dữ liệu hiện tại<br><br>**Step 3**: Verify pre-filled data<br>- Verify Name field: "Laptop Dell Inspiron 15"<br>- Verify Price field: "15,000,000"<br>- Verify Quantity field: "50"<br>- Verify Description: "Laptop Dell Inspiron 15, RAM 16GB"<br>- Verify Category: "Electronics" (selected)<br><br>**Step 4**: Update Price<br>- Click vào Price field<br>- Clear current value<br>- Enter new value: 14500000<br>- Verify field accepts the value<br>- Verify format: "14,500,000"<br><br>**Step 5**: Update Quantity<br>- Click vào Quantity field<br>- Clear current value<br>- Enter new value: 45<br>- Verify field accepts the value<br><br>**Step 6**: Update Description<br>- Click vào Description field<br>- Modify text to: "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB - SALE 3%"<br>- Verify character count updates: "61/500"<br><br>**Step 7**: Keep other fields unchanged<br>- Verify Name still: "Laptop Dell Inspiron 15"<br>- Verify Category still: "Electronics"<br><br>**Step 8**: Submit update<br>- Click button "Update" hoặc "Save Changes"<br>- Verify loading indicator<br>- Wait for response<br><br>**Step 9**: Verify success response<br>- Verify success message: "Product updated successfully"<br>- Verify redirect về Product List hoặc Product Details<br><br>**Step 10**: Verify updated data<br>- Locate product "Laptop Dell Inspiron 15"<br>- Verify Price hiển thị: "14,500,000" (new value)<br>- Verify Quantity hiển thị: "45" (new value)<br>- Click View Details<br>- Verify Description: "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB - SALE 3%"<br>- Verify Last Modified Date được update (> "2025-01-20T10:00:00Z")<br>- Verify Created Date không đổi<br><br>**Step 11**: Verify database record<br>- Query database: SELECT * FROM products WHERE id = 101<br>- Verify price = 14500000<br>- Verify quantity = 45<br>- Verify description = "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB - SALE 3%"<br>- Verify updated_at timestamp mới<br>- Verify created_at timestamp không đổi |
| **Test Data** | **Original Product (ID: 101):**<br>- Name: "Laptop Dell Inspiron 15"<br>- Price: 15000000<br>- Quantity: 50<br>- Description: "Laptop Dell Inspiron 15, RAM 16GB"<br>- Category: "Electronics"<br>- Created At: "2025-01-15T09:00:00Z"<br>- Updated At: "2025-01-20T10:00:00Z"<br><br>**Updated Fields:**<br>- Price: 14500000 (giảm 500,000 - SALE 3%)<br>- Quantity: 45 (giảm 5 - đã bán)<br>- Description: "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB - SALE 3%"<br><br>**Unchanged Fields:**<br>- Name: "Laptop Dell Inspiron 15"<br>- Category: "Electronics"<br><br>**User Account:**<br>- Username: manager_user<br>- Role: Manager<br>- Permissions: Create, Read, Update (no Delete) |
| **Expected Result** | **ER1**: Edit form loads với pre-filled data<br>- Tất cả fields hiển thị giá trị hiện tại<br>- Form title: "Edit Product" hoặc "Update Product"<br>- Có button Cancel để quay lại<br><br>**ER2**: Fields có thể edit<br>- All fields enabled và editable<br>- Real-time validation hoạt động<br>- No premature error messages<br><br>**ER3**: Update request thành công<br>- PUT hoặc PATCH /api/products/101<br>- Request body:<br>```json<br>{<br>  "price": 14500000,<br>  "quantity": 45,<br>  "description": "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB - SALE 3%"<br>}<br>```<br>- HTTP Status: 200 OK<br>- Response time: < 1 second<br><br>**ER4**: Response data đúng<br>```json<br>{<br>  "success": true,<br>  "message": "Product updated successfully",<br>  "data": {<br>    "id": 101,<br>    "name": "Laptop Dell Inspiron 15",<br>    "price": 14500000,<br>    "quantity": 45,<br>    "description": "Laptop Dell Inspiron 15, RAM 16GB, SSD 512GB - SALE 3%",<br>    "category": "Electronics",<br>    "createdAt": "2025-01-15T09:00:00Z",<br>    "updatedAt": "2025-01-22T11:15:00Z"<br>  }<br>}<br>```<br><br>**ER5**: Success message hiển thị<br>- Message: "Product updated successfully"<br>- Icon: ✓ màu xanh<br>- Position: top-right<br>- Auto-dismiss sau 3 seconds<br><br>**ER6**: Navigation sau update<br>- Redirect về Product List hoặc Product Details<br>- URL update accordingly<br><br>**ER7**: Dữ liệu updated hiển thị đúng<br>- Price: 14,500,000 (comma-separated)<br>- Quantity: 45<br>- Description: full new text<br>- Last Modified Date: timestamp mới (format: "22 Jan 2025, 11:15 AM")<br><br>**ER8**: Database record updated<br>- Chỉ các fields được update mới thay đổi<br>- updated_at timestamp mới<br>- created_at không đổi<br>- Name và Category không đổi<br><br>**ER9**: Audit log (nếu có)<br>- Ghi lại: User ID, Action: UPDATE, Product ID, Old values, New values, Timestamp |
| **Actual Result** | *(Để trống)* |
| **Status** | Not Run |
| **Test Environment** | Same as TC_PRODUCT_001 |
| **Test Execution Date** | *(Để trống)* |
| **Tested By** | *(Để trống)* |
| **Defect ID** | *(Để trống)* |
| **Comments/Notes** | - Critical test case cho business operation<br>- Verify partial update (chỉ update fields thay đổi)<br>- Test với role Manager (không phải Admin)<br>- Verify created_at không bị thay đổi<br>- Check audit trail nếu có<br>- Test concurrent update (2 users cùng edit) |

---

## Test Case 4: Delete Product Successfully

| Thông tin | Nội dung |
|:----------|:---------|
| **Test Case ID** | TC_PRODUCT_004 |
| **Test Name** | Xóa sản phẩm thành công (không có trong order) |
| **Related Scenario** | TS_PRODUCT_005, TS_PRODUCT_022 |
| **Priority** | Critical (P0) |
| **Type** | Functional - Positive Test |
| **Module** | Product Management - Delete |
| **Preconditions** | - User đã đăng nhập với quyền Delete product (Admin role)<br>- Tồn tại sản phẩm:<br>  - ID: 202<br>  - Name: "Test Product To Delete"<br>  - Price: 50000<br>  - Quantity: 5<br>  - Category: "Other"<br>- Sản phẩm này KHÔNG có trong bất kỳ order nào (active hoặc completed)<br>- Database có bật soft delete hoặc hard delete (tùy implementation) |
| **Test Steps** | **Step 1**: Navigate đến Product List<br>- Go to /products<br>- Verify danh sách hiển thị<br>- Locate product "Test Product To Delete"<br><br>**Step 2**: Initiate delete action<br>- Locate button "Delete" hoặc trash icon trên product row<br>- Click vào Delete button<br>- Verify không delete ngay lập tức<br><br>**Step 3**: Verify confirmation dialog<br>- Verify confirmation dialog/modal xuất hiện<br>- Verify dialog title: "Delete Product" hoặc "Confirm Deletion"<br>- Verify message: "Are you sure you want to delete this product?"<br>- Verify hiển thị product name: "Test Product To Delete"<br>- Verify có 2 buttons: "Cancel" và "Delete" (hoặc "Confirm")<br>- Verify button "Delete" có màu đỏ (warning color)<br><br>**Step 4**: Test Cancel action<br>- Click button "Cancel"<br>- Verify dialog đóng lại<br>- Verify sản phẩm vẫn còn trong danh sách<br>- Verify không có request DELETE được gửi đi<br><br>**Step 5**: Re-open confirmation dialog<br>- Click Delete button lần nữa<br>- Verify dialog xuất hiện lại<br><br>**Step 6**: Confirm deletion<br>- Click button "Delete" hoặc "Confirm"<br>- Verify loading indicator hiển thị<br>- Wait for response<br><br>**Step 7**: Verify success response<br>- Verify success message: "Product deleted successfully"<br>- Verify dialog đóng lại<br>- Verify sản phẩm biến mất khỏi danh sách<br><br>**Step 8**: Verify product không còn trong list<br>- Scroll through danh sách<br>- Verify "Test Product To Delete" không còn<br>- Try search "Test Product To Delete"<br>- Verify kết quả: "No products found"<br><br>**Step 9**: Verify direct access<br>- Try navigate trực tiếp đến /products/202<br>- Verify response: 404 Not Found hoặc "Product not found"<br><br>**Step 10**: Verify database state<br>- Query database:<br>  - Soft delete: SELECT * FROM products WHERE id = 202<br>    - Verify record vẫn tồn tại nhưng deleted_at != NULL<br>    - Verify is_deleted = TRUE (nếu có field này)<br>  - Hard delete: SELECT * FROM products WHERE id = 202<br>    - Verify không có record (row count = 0)<br><br>**Step 11**: Verify cannot restore accidentally<br>- Nếu soft delete: Verify product không hiển thị trong normal list<br>- Admin có thể restore từ "Deleted Items" (nếu có feature này) |
| **Test Data** | **Product to Delete (ID: 202):**<br>- Name: "Test Product To Delete"<br>- Price: 50000<br>- Quantity: 5<br>- Description: "This is a test product for deletion testing"<br>- Category: "Other"<br>- Created At: "2025-01-10T08:00:00Z"<br>- Updated At: "2025-01-10T08:00:00Z"<br>- Status: Active<br>- In Orders: 0 (không có trong order nào)<br><br>**User Account:**<br>- Username: admin_user<br>- Role: Admin<br>- Permissions: Full CRUD including Delete |
| **Expected Result** | **ER1**: Delete button visible và clickable<br>- Button có icon trash/delete<br>- Hover effect rõ ràng<br>- Click không gây page reload<br><br>**ER2**: Confirmation dialog xuất hiện<br>- Modal overlay với background dim<br>- Title: "Delete Product" hoặc "Confirm Deletion"<br>- Message rõ ràng: "Are you sure you want to delete '{ProductName}'?"<br>- Warning icon (⚠) màu đỏ hoặc vàng<br>- Product name hiển thị trong message<br>- 2 buttons: Cancel (secondary style) và Delete (danger/red style)<br><br>**ER3**: Cancel hoạt động đúng<br>- Click Cancel đóng dialog<br>- Không có network request<br>- Sản phẩm không bị xóa<br>- Page state không thay đổi<br><br>**ER4**: Delete request thành công<br>- DELETE /api/products/202<br>- HTTP Status: 200 OK hoặc 204 No Content<br>- Response time: < 1 second<br>- Response body (nếu 200):<br>```json<br>{<br>  "success": true,<br>  "message": "Product deleted successfully"<br>}<br>```<br><br>**ER5**: Success message hiển thị<br>- Message: "Product deleted successfully"<br>- Icon: ✓ màu xanh<br>- Duration: 3 seconds<br>- Position: top-right<br><br>**ER6**: UI updates immediately<br>- Product row biến mất với animation (fade out)<br>- Danh sách re-index (không có gap)<br>- Pagination update nếu cần (ví dụ: page 2 -> page 1 nếu hết item)<br>- Product count update (hiển thị đúng total)<br><br>**ER7**: Database state đúng<br>**Soft Delete:**<br>- Record vẫn tồn tại trong table<br>- deleted_at = current timestamp<br>- is_deleted = TRUE (nếu có)<br>- Product không xuất hiện trong queries thường<br><br>**Hard Delete:**<br>- Record bị xóa hoàn toàn<br>- SELECT WHERE id = 202 returns 0 rows<br>- Foreign key constraints được handle (cascade delete hoặc prevent)<br><br>**ER8**: Cannot access deleted product<br>- GET /api/products/202 returns 404<br>- UI hiển thị: "Product not found" hoặc redirect về list<br><br>**ER9**: Audit log (nếu có)<br>- Ghi lại: User ID, Action: DELETE, Product ID, Product Name, Timestamp<br>- Soft delete: có thể restore sau này |
| **Actual Result** | *(Để trống)* |
| **Status** | Not Run |
| **Test Environment** | Same as TC_PRODUCT_001 |
| **Test Execution Date** | *(Để trống)* |
| **Tested By** | *(Để trống)* |
| **Defect ID** | *(Để trống)* |
| **Comments/Notes** | - CRITICAL: Phải có confirmation dialog (không delete trực tiếp)<br>- Test case này giả định product KHÔNG có trong order<br>- Xem TC_PRODUCT_005 cho case delete product đang có order<br>- Verify soft delete vs hard delete theo business requirement<br>- Test với Admin role (Manager không có quyền delete)<br>- Verify cascade delete hoặc foreign key constraints<br>- Test undo/restore nếu soft delete |

---

## Test Case 5: Create Product With Invalid Data

| Thông tin | Nội dung |
|:----------|:---------|
| **Test Case ID** | TC_PRODUCT_005 |
| **Test Name** | Tạo sản phẩm với nhiều validation errors (Product name rỗng, Price = 0, Quantity âm) |
| **Related Scenario** | TS_PRODUCT_006, TS_PRODUCT_007, TS_PRODUCT_009, TS_PRODUCT_011 |
| **Priority** | Critical (P0) |
| **Type** | Functional - Negative Test |
| **Module** | Product Management - Create - Validation |
| **Preconditions** | - User đã đăng nhập với quyền tạo sản phẩm<br>- Đang ở trang Create Product form<br>- Tất cả fields đang empty |
| **Test Steps** | **Step 1**: Navigate đến Add Product page<br>- Go to /products<br>- Click "Add New Product"<br>- Verify form hiển thị với empty fields<br><br>**Step 2**: Leave Product Name empty<br>- Click vào Product Name field<br>- Không nhập gì<br>- Tab hoặc click ra ngoài field<br>- Verify error message xuất hiện (client-side validation)<br><br>**Step 3**: Enter invalid Price (0)<br>- Click vào Price field<br>- Enter: 0<br>- Tab hoặc click ra ngoài<br>- Verify error message: "Price must be greater than 0"<br><br>**Step 4**: Enter invalid Quantity (negative)<br>- Click vào Quantity field<br>- Enter: -10<br>- Tab hoặc click ra ngoài<br>- Verify error message: "Quantity cannot be negative"<br><br>**Step 5**: Enter valid Description<br>- Click vào Description field<br>- Enter: "Test product with invalid data"<br>- Verify no error<br><br>**Step 6**: Leave Category unselected<br>- Do not select anything from Category dropdown<br>- Verify dropdown shows placeholder: "Select a category"<br><br>**Step 7**: Attempt to submit form<br>- Click "Save" button<br>- Verify button click được prevent (form không submit)<br>- Verify Save button có thể bị disabled nếu có errors<br><br>**Step 8**: Verify all error messages displayed<br>- Verify error dưới Product Name: "Product name is required"<br>- Verify error dưới Price: "Price must be greater than 0"<br>- Verify error dưới Quantity: "Quantity cannot be negative"<br>- Verify error dưới Category: "Category is required"<br>- Verify không có error dưới Description (valid)<br><br>**Step 9**: Verify fields highlighted<br>- Verify Product Name field có red border<br>- Verify Price field có red border<br>- Verify Quantity field có red border<br>- Verify Category dropdown có red border<br>- Verify Description không có red border<br><br>**Step 10**: Verify focus behavior<br>- Verify focus auto jump đến field đầu tiên có error (Product Name)<br>- Verify có scroll đến error nếu off-screen<br><br>**Step 11**: Attempt server submission (nếu client validation bị bypass)<br>- Sử dụng browser console hoặc Postman<br>- POST request với invalid data:<br>```json<br>{<br>  "name": "",<br>  "price": 0,<br>  "quantity": -10,<br>  "description": "Test product with invalid data",<br>  "category": ""<br>}<br>```<br>- Verify server trả về validation errors<br><br>**Step 12**: Fix errors one by one<br>- Enter Product Name: "Valid Product Name"<br>- Verify error message biến mất<br>- Verify red border biến mất<br>- Verify green checkmark xuất hiện (nếu có)<br><br>- Change Price: 100000<br>- Verify error biến mất<br><br>- Change Quantity: 10<br>- Verify error biến mất<br><br>- Select Category: "Electronics"<br>- Verify error biến mất<br><br>**Step 13**: Verify Save button enabled<br>- Verify Save button không còn disabled<br>- Verify tất cả errors đã clear<br><br>**Step 14**: Submit valid form<br>- Click Save button<br>- Verify form submit thành công<br>- Verify product được tạo<br>- Verify success message: "Product created successfully" |
| **Test Data** | **Invalid Test Data:**<br>- Product Name: "" (empty string)<br>  - Validation: Required, min 3 chars<br>  - Expected error: "Product name is required"<br><br>- Price: 0<br>  - Validation: Must be > 0<br>  - Expected error: "Price must be greater than 0"<br><br>- Quantity: -10<br>  - Validation: Must be >= 0<br>  - Expected error: "Quantity cannot be negative"<br><br>- Description: "Test product with invalid data"<br>  - Validation: Max 500 chars<br>  - This field is VALID<br><br>- Category: null/empty<br>  - Validation: Required<br>  - Expected error: "Category is required"<br><br>**Valid Test Data (for Step 12):**<br>- Product Name: "Valid Product Name"<br>- Price: 100000<br>- Quantity: 10<br>- Description: "Test product with invalid data"<br>- Category: "Electronics" |
| **Expected Result** | **ER1**: Client-side validation hoạt động<br>- Errors hiển thị real-time khi user rời khỏi field (blur event)<br>- Error messages rõ ràng, cụ thể cho từng lỗi<br>- Error messages màu đỏ, font size nhỏ hơn label<br>- Position: ngay dưới field có lỗi<br><br>**ER2**: Error messages chính xác<br>Product Name empty:<br>- "Product name is required"<br><br>Price = 0:<br>- "Price must be greater than 0"<br><br>Quantity = -10:<br>- "Quantity cannot be negative"<br><br>Category not selected:<br>- "Category is required" hoặc "Please select a category"<br><br>**ER3**: Visual feedback rõ ràng<br>- Invalid fields có red border (border-color: #dc3545 hoặc tương tự)<br>- Error icon (❌) bên cạnh field (optional)<br>- Label của invalid field có thể chuyển sang màu đỏ<br>- Valid fields (Description) giữ nguyên border bình thường<br><br>**ER4**: Form submission bị prevent<br>- Save button bị disabled khi có errors<br>- Hoặc: click Save button không submit, hiển thị errors<br>- No network request được gửi đi<br>- Console không có errors<br><br>**ER5**: Focus management<br>- Auto focus vào field đầu tiên có error<br>- Tab order hoạt động bình thường<br>- Có thể navigate giữa các fields bằng Tab<br><br>**ER6**: Server-side validation (backup)<br>Nếu bypass client validation, server trả về:<br>- HTTP Status: 400 Bad Request<br>- Response body:<br>```json<br>{<br>  "success": false,<br>  "message": "Validation failed",<br>  "errors": [<br>    {<br>      "field": "name",<br>      "message": "Product name is required"<br>    },<br>    {<br>      "field": "price",<br>      "message": "Price must be greater than 0"<br>    },<br>    {<br>      "field": "quantity",<br>      "message": "Quantity cannot be negative"<br>    },<br>    {<br>      "field": "category",<br>      "message": "Category is required"<br>    }<br>  ]<br>}<br>```<br><br>**ER7**: Error clearing behavior<br>- Khi user sửa field, error message của field đó biến mất ngay<br>- Red border chuyển về normal<br>- Green checkmark/border xuất hiện (optional positive feedback)<br>- Errors của fields khác vẫn hiển thị (không clear tất cả)<br><br>**ER8**: Save button state<br>- Disabled khi có errors: opacity 0.5, cursor not-allowed<br>- Enabled khi tất cả fields valid: opacity 1, cursor pointer<br>- Hover effect chỉ hoạt động khi enabled<br><br>**ER9**: Successful submission sau fix<br>- Khi tất cả errors được fix<br>- Click Save submit form thành công<br>- POST request với valid data<br>- Product được tạo<br>- Success message hiển thị<br><br>**ER10**: Data integrity<br>- Database không chấp nhận invalid data<br>- Database constraints (NOT NULL, CHECK constraints) hoạt động<br>- No invalid records trong database |
| **Actual Result** | *(Để trống)* |
| **Status** | Not Run |
| **Test Environment** | Same as TC_PRODUCT_001 |
| **Test Execution Date** | *(Để trống)* |
| **Tested By** | *(Để trống)* |
| **Defect ID** | *(Để trống)* |
| **Comments/Notes** | - CRITICAL test case cho data integrity<br>- Test case này combine nhiều validation errors<br>- Test cả client-side và server-side validation<br>- Verify validation không thể bypass<br>- Test error messages clarity và UX<br>- Verify form không submit khi có errors<br>- Test recovery path (fix errors và submit thành công)<br>- Validation phải prevent bad data vào database |

---

## Phụ Lục: Test Execution Guidelines

### Test Preparation
1. Setup test environment với clean database
2. Tạo test user accounts với appropriate roles
3. Prepare test data theo từng test case
4. Verify all services đang running (frontend, backend, database)

### Test Execution Order
Recommended order:
1. TC_PRODUCT_005 (Validation) - Đảm bảo validation hoạt động
2. TC_PRODUCT_001 (Create) - Test happy path create
3. TC_PRODUCT_002 (Read) - Verify có thể xem sản phẩm vừa tạo
4. TC_PRODUCT_003 (Update) - Update sản phẩm vừa tạo
5. TC_PRODUCT_004 (Delete) - Xóa test products

### Test Data Cleanup
Sau mỗi test case:
- Delete test products đã tạo (nếu cần)
- Reset database về initial state
- Clear browser cache/cookies nếu cần

### Defect Reporting
Nếu phát hiện bug:
1. Take screenshot của error
2. Copy error messages
3. Note test data đã sử dụng
4. Ghi lại steps to reproduce
5. Check browser console logs
6. Check network tab (request/response)
7. Create defect ticket với severity đúng

### Pass/Fail Criteria
- **Pass**: Tất cả Expected Results đều match với Actual Results
- **Fail**: Bất kỳ Expected Result nào không match
- **Blocked**: Không thể test do preconditions không đáp ứng

---

**Document Version**: 1.0
**Last Updated**: 2025-01-22
**Total Test Cases**: 5
**Critical Test Cases**: 4 (TC_001, TC_003, TC_004, TC_005)
**High Priority Test Cases**: 1 (TC_002)
