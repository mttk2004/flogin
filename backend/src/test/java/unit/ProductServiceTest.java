package unit;

import com.flogin.model.Product;
import com.flogin.repository.ProductRepository;
import com.flogin.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * Unit Tests for ProductService
 * Tests CRUD operations and pagination with Mockito
 * Target: ≥85% coverage as per câu 2.2 requirements
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("ProductService Tests")
class ProductServiceTest {

  @Mock
  private ProductRepository productRepository;

  @InjectMocks
  private ProductService productService;

  private Product validProduct;

  @BeforeEach
  void setUp() {
    validProduct = new Product();
    validProduct.setId(1L);
    validProduct.setName("Laptop Dell XPS 15");
    validProduct.setPrice(new BigDecimal("999.99"));
    validProduct.setQuantity(10);
    validProduct.setDescription("High performance laptop");
    validProduct.setCategory("Electronics");
  }

  @Nested
  @DisplayName("CreateProduct Tests")
  class CreateProductTests {

    @Test
    @DisplayName("Nên tạo sản phẩm hợp lệ thành công")
    void shouldCreateValidProduct() {
      when(productRepository.save(any(Product.class))).thenReturn(validProduct);

      Product result = productService.createProduct(validProduct);

      assertNotNull(result);
      assertEquals(validProduct.getName(), result.getName());
      assertEquals(validProduct.getPrice(), result.getPrice());
      assertEquals(validProduct.getQuantity(), result.getQuantity());
      verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Nên ném lỗi khi product null")
    void shouldThrowExceptionWhenProductIsNull() {
      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(null));
      assertEquals("Sản phẩm không được null", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi name null")
    void shouldThrowExceptionWhenNameIsNull() {
      validProduct.setName(null);

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Tên sản phẩm là bắt buộc", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi name rỗng")
    void shouldThrowExceptionWhenNameIsEmpty() {
      validProduct.setName("");

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Tên sản phẩm là bắt buộc", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi name chỉ chứa khoảng trắng")
    void shouldThrowExceptionWhenNameIsWhitespace() {
      validProduct.setName("   ");

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Tên sản phẩm là bắt buộc", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi name vượt quá 200 ký tự")
    void shouldThrowExceptionWhenNameTooLong() {
      validProduct.setName("A".repeat(201));

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Tên sản phẩm không được vượt quá 200 ký tự", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi price null")
    void shouldThrowExceptionWhenPriceIsNull() {
      validProduct.setPrice(null);

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Giá sản phẩm là bắt buộc", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi price âm")
    void shouldThrowExceptionWhenPriceIsNegative() {
      validProduct.setPrice(new BigDecimal("-10"));

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Giá sản phẩm không được âm", exception.getMessage());
    }

    @Test
    @DisplayName("Nên chấp nhận price = 0")
    void shouldAcceptPriceZero() {
      validProduct.setPrice(BigDecimal.ZERO);
      when(productRepository.save(any(Product.class))).thenReturn(validProduct);

      Product result = productService.createProduct(validProduct);

      assertNotNull(result);
      assertEquals(BigDecimal.ZERO, result.getPrice());
    }

    @Test
    @DisplayName("Nên ném lỗi khi price vượt quá maximum")
    void shouldThrowExceptionWhenPriceExceedsMax() {
      validProduct.setPrice(new BigDecimal("1000000000"));

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Giá sản phẩm không được vượt quá 999,999,999.99", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi quantity null")
    void shouldThrowExceptionWhenQuantityIsNull() {
      validProduct.setQuantity(null);

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Số lượng là bắt buộc", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi quantity âm")
    void shouldThrowExceptionWhenQuantityIsNegative() {
      validProduct.setQuantity(-5);

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Số lượng không được âm", exception.getMessage());
    }

    @Test
    @DisplayName("Nên chấp nhận quantity = 0")
    void shouldAcceptQuantityZero() {
      validProduct.setQuantity(0);
      when(productRepository.save(any(Product.class))).thenReturn(validProduct);

      Product result = productService.createProduct(validProduct);

      assertNotNull(result);
      assertEquals(0, result.getQuantity());
    }

    @Test
    @DisplayName("Nên ném lỗi khi quantity vượt quá maximum")
    void shouldThrowExceptionWhenQuantityExceedsMax() {
      validProduct.setQuantity(1000000);

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Số lượng không được vượt quá 999,999", exception.getMessage());
    }

    @Test
    @DisplayName("Nên chấp nhận description null")
    void shouldAcceptDescriptionNull() {
      validProduct.setDescription(null);
      when(productRepository.save(any(Product.class))).thenReturn(validProduct);

      Product result = productService.createProduct(validProduct);

      assertNotNull(result);
      assertNull(result.getDescription());
    }

    @Test
    @DisplayName("Nên ném lỗi khi description vượt quá 1000 ký tự")
    void shouldThrowExceptionWhenDescriptionTooLong() {
      validProduct.setDescription("A".repeat(1001));

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Mô tả không được vượt quá 1000 ký tự", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi category null")
    void shouldThrowExceptionWhenCategoryIsNull() {
      validProduct.setCategory(null);

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Danh mục là bắt buộc", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi category rỗng")
    void shouldThrowExceptionWhenCategoryIsEmpty() {
      validProduct.setCategory("");

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Danh mục là bắt buộc", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi category không hợp lệ")
    void shouldThrowExceptionWhenCategoryIsInvalid() {
      validProduct.setCategory("InvalidCategory");

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.createProduct(validProduct));
      assertEquals("Danh mục không hợp lệ", exception.getMessage());
    }

    @Test
    @DisplayName("Nên chấp nhận tất cả categories hợp lệ")
    void shouldAcceptAllValidCategories() {
      String[] validCategories = { "Electronics", "Clothing", "Food", "Books", "Toys", "Sports", "Home", "Beauty",
          "Other" };

      for (String category : validCategories) {
        validProduct.setCategory(category);
        when(productRepository.save(any(Product.class))).thenReturn(validProduct);

        Product result = productService.createProduct(validProduct);

        assertNotNull(result);
        assertEquals(category, result.getCategory());
      }
    }
  }

  @Nested
  @DisplayName("GetProduct Tests")
  class GetProductTests {

    @Test
    @DisplayName("Nên trả về product khi tìm thấy")
    void shouldReturnProductWhenFound() {
      when(productRepository.findById(1L)).thenReturn(Optional.of(validProduct));

      Optional<Product> result = productService.getProduct(1L);

      assertTrue(result.isPresent());
      assertEquals(validProduct.getName(), result.get().getName());
      verify(productRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Nên trả về Optional.empty() khi không tìm thấy")
    void shouldReturnEmptyWhenNotFound() {
      when(productRepository.findById(999L)).thenReturn(Optional.empty());

      Optional<Product> result = productService.getProduct(999L);

      assertFalse(result.isPresent());
      verify(productRepository, times(1)).findById(999L);
    }

    @Test
    @DisplayName("Nên ném lỗi khi ID null")
    void shouldThrowExceptionWhenIdIsNull() {
      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.getProduct(null));
      assertEquals("ID không được null", exception.getMessage());
    }
  }

  @Nested
  @DisplayName("UpdateProduct Tests")
  class UpdateProductTests {

    @Test
    @DisplayName("Nên cập nhật product thành công")
    void shouldUpdateProductSuccessfully() {
      Product updatedProduct = new Product();
      updatedProduct.setName("Updated Laptop");
      updatedProduct.setPrice(new BigDecimal("1299.99"));
      updatedProduct.setQuantity(5);
      updatedProduct.setDescription("Updated description");
      updatedProduct.setCategory("Electronics");

      when(productRepository.findById(1L)).thenReturn(Optional.of(validProduct));
      when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

      Product result = productService.updateProduct(1L, updatedProduct);

      assertNotNull(result);
      assertEquals("Updated Laptop", result.getName());
      verify(productRepository, times(1)).findById(1L);
      verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Nên ném lỗi khi ID null")
    void shouldThrowExceptionWhenIdIsNull() {
      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.updateProduct(null, validProduct));
      assertEquals("ID không được null", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi product không tồn tại")
    void shouldThrowExceptionWhenProductNotFound() {
      when(productRepository.findById(999L)).thenReturn(Optional.empty());

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.updateProduct(999L, validProduct));
      assertEquals("Không tìm thấy sản phẩm với ID: 999", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi product cập nhật không hợp lệ")
    void shouldThrowExceptionWhenUpdatedProductIsInvalid() {
      validProduct.setName(null);
      when(productRepository.findById(1L)).thenReturn(Optional.of(validProduct));

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.updateProduct(1L, validProduct));
      assertEquals("Tên sản phẩm là bắt buộc", exception.getMessage());
    }

    @Test
    @DisplayName("Nên giữ nguyên createdAt khi cập nhật")
    void shouldPreserveCreatedAtWhenUpdating() {
      LocalDateTime originalCreatedAt = LocalDateTime.of(2023, 1, 1, 10, 0);
      validProduct.setCreatedAt(originalCreatedAt);

      Product updatedProduct = new Product();
      updatedProduct.setName("Updated");
      updatedProduct.setPrice(new BigDecimal("100"));
      updatedProduct.setQuantity(5);
      updatedProduct.setCategory("Electronics");

      when(productRepository.findById(1L)).thenReturn(Optional.of(validProduct));
      when(productRepository.save(any(Product.class))).thenAnswer(invocation -> {
        Product saved = invocation.getArgument(0);
        assertEquals(originalCreatedAt, saved.getCreatedAt());
        return saved;
      });

      productService.updateProduct(1L, updatedProduct);

      verify(productRepository, times(1)).save(any(Product.class));
    }
  }

  @Nested
  @DisplayName("DeleteProduct Tests")
  class DeleteProductTests {

    @Test
    @DisplayName("Nên xóa product thành công")
    void shouldDeleteProductSuccessfully() {
      when(productRepository.existsById(1L)).thenReturn(true);

      productService.deleteProduct(1L);

      verify(productRepository, times(1)).existsById(1L);
      verify(productRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Nên ném lỗi khi ID null")
    void shouldThrowExceptionWhenIdIsNull() {
      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.deleteProduct(null));
      assertEquals("ID không được null", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi product không tồn tại")
    void shouldThrowExceptionWhenProductNotFound() {
      when(productRepository.existsById(999L)).thenReturn(false);

      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.deleteProduct(999L));
      assertEquals("Không tìm thấy sản phẩm với ID: 999", exception.getMessage());
    }
  }

  @Nested
  @DisplayName("GetAllProducts Tests")
  class GetAllProductsTests {

    @Test
    @DisplayName("Nên trả về tất cả products với pagination")
    void shouldReturnAllProductsWithPagination() {
      Product product1 = new Product(1L, "Product 1", new BigDecimal("100"), 10, "Desc 1", "Electronics");
      Product product2 = new Product(2L, "Product 2", new BigDecimal("200"), 20, "Desc 2", "Books");

      when(productRepository.findAll(0, 10)).thenReturn(Arrays.asList(product1, product2));

      List<Product> result = productService.getAllProducts(0, 10);

      assertEquals(2, result.size());
      assertEquals("Product 1", result.get(0).getName());
      assertEquals("Product 2", result.get(1).getName());
      verify(productRepository, times(1)).findAll(0, 10);
    }

    @Test
    @DisplayName("Nên trả về danh sách rỗng khi không có products")
    void shouldReturnEmptyListWhenNoProducts() {
      when(productRepository.findAll(0, 10)).thenReturn(Arrays.asList());

      List<Product> result = productService.getAllProducts(0, 10);

      assertEquals(0, result.size());
    }

    @Test
    @DisplayName("Nên ném lỗi khi page âm")
    void shouldThrowExceptionWhenPageIsNegative() {
      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.getAllProducts(-1, 10));
      assertEquals("Số trang không được âm", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi size = 0")
    void shouldThrowExceptionWhenSizeIsZero() {
      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.getAllProducts(0, 0));
      assertEquals("Kích thước trang phải lớn hơn 0", exception.getMessage());
    }

    @Test
    @DisplayName("Nên ném lỗi khi size âm")
    void shouldThrowExceptionWhenSizeIsNegative() {
      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> productService.getAllProducts(0, -5));
      assertEquals("Kích thước trang phải lớn hơn 0", exception.getMessage());
    }

    @Test
    @DisplayName("Nên trả về tất cả products không phân trang")
    void shouldReturnAllProductsWithoutPagination() {
      Product product1 = new Product(1L, "Product 1", new BigDecimal("100"), 10, "Desc 1", "Electronics");
      Product product2 = new Product(2L, "Product 2", new BigDecimal("200"), 20, "Desc 2", "Books");
      Product product3 = new Product(3L, "Product 3", new BigDecimal("300"), 30, "Desc 3", "Toys");

      when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2, product3));

      List<Product> result = productService.getAllProducts();

      assertEquals(3, result.size());
      verify(productRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Nên trả về tổng số lượng products")
    void shouldReturnTotalCount() {
      when(productRepository.count()).thenReturn(100L);

      long count = productService.getTotalCount();

      assertEquals(100L, count);
      verify(productRepository, times(1)).count();
    }
  }

  @Nested
  @DisplayName("Boundary Tests")
  class BoundaryTests {

    @Test
    @DisplayName("Nên chấp nhận name có 200 ký tự (maximum)")
    void shouldAcceptNameWith200Characters() {
      validProduct.setName("A".repeat(200));
      when(productRepository.save(any(Product.class))).thenReturn(validProduct);

      Product result = productService.createProduct(validProduct);

      assertNotNull(result);
    }

    @Test
    @DisplayName("Nên chấp nhận price maximum (999,999,999.99)")
    void shouldAcceptMaximumPrice() {
      validProduct.setPrice(new BigDecimal("999999999.99"));
      when(productRepository.save(any(Product.class))).thenReturn(validProduct);

      Product result = productService.createProduct(validProduct);

      assertNotNull(result);
    }

    @Test
    @DisplayName("Nên chấp nhận quantity maximum (999,999)")
    void shouldAcceptMaximumQuantity() {
      validProduct.setQuantity(999999);
      when(productRepository.save(any(Product.class))).thenReturn(validProduct);

      Product result = productService.createProduct(validProduct);

      assertNotNull(result);
    }

    @Test
    @DisplayName("Nên chấp nhận description có 1000 ký tự (maximum)")
    void shouldAcceptDescriptionWith1000Characters() {
      validProduct.setDescription("A".repeat(1000));
      when(productRepository.save(any(Product.class))).thenReturn(validProduct);

      Product result = productService.createProduct(validProduct);

      assertNotNull(result);
    }
  }
}
