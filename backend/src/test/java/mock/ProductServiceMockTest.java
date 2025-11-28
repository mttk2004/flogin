package mock;

import com.flogin.model.Product;
import com.flogin.repository.ProductRepository;
import com.flogin.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Mock Tests for ProductService.
 * This test class specifically demonstrates mocking ProductRepository
 * to test the ProductService layer in isolation, fulfilling
 * the requirements of section 4.2.2 Backend Mocking.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("ProductService Mock Tests")
class ProductServiceMockTest {

    @Mock
    private ProductRepository productRepository; // This is the mock

    @InjectMocks
    private ProductService productService; // ProductService will use the mocked repository

    private Product mockProduct;

    @BeforeEach
    void setUp() {
        mockProduct = new Product();
        mockProduct.setId(1L);
        mockProduct.setName("Mocked Product");
        mockProduct.setPrice(new BigDecimal("123.45"));
        mockProduct.setQuantity(5);
        mockProduct.setCategory("Electronics");
    }

    @Test
    @DisplayName("Nên trả về sản phẩm khi tìm thấy bằng mock repository")
    void shouldReturnProductWhenFoundByMockRepository() {
        // Given: The mockProductRepository will return our mockProduct when findById is called
        when(productRepository.findById(1L)).thenReturn(Optional.of(mockProduct));

        // When: We call the service method
        Optional<Product> result = productService.getProduct(1L);

        // Then: Verify the result and mock interaction
        assertTrue(result.isPresent());
        assertEquals("Mocked Product", result.get().getName());
        verify(productRepository).findById(1L); // Verify that findById was called on the mock
    }

    @Test
    @DisplayName("Nên trả về Optional.empty khi sản phẩm không tồn tại bằng mock repository")
    void shouldReturnEmptyWhenNotFoundByMockRepository() {
        // Given: The mockProductRepository will return empty when findById is called for a non-existent ID
        when(productRepository.findById(anyLong())).thenReturn(Optional.empty());

        // When: We call the service method for a non-existent product
        Optional<Product> result = productService.getProduct(999L);

        // Then: Verify the result and mock interaction
        assertFalse(result.isPresent());
        verify(productRepository).findById(999L); // Verify that findById was called on the mock
    }
}
