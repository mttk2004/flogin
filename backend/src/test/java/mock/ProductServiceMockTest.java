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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceMockTest {

    // 2.a) Mock ProductRepository
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product validProduct;

    @BeforeEach
    void setUp() {
        validProduct = new Product(1L, "Test Product", new BigDecimal("100.00"), 10, "Description", "Electronics");
    }

    // 2.b) Test service layer với mocked repository
    @Test
    @DisplayName("Test createProduct with mock")
    void testCreateProduct() {
        when(productRepository.save(any(Product.class))).thenReturn(validProduct);

        Product created = productService.createProduct(validProduct);

        assertNotNull(created);
        assertEquals("Test Product", created.getName());
        
        // 2.c) Verify repository interactions
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Test getProduct with mock (Found)")
    void testGetProductFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(validProduct));

        Optional<Product> found = productService.getProduct(1L);

        assertTrue(found.isPresent());
        assertEquals(1L, found.get().getId());
        
        // 2.c) Verify repository interactions
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Test getProduct with mock (Not Found)")
    void testGetProductNotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Product> found = productService.getProduct(99L);

        assertFalse(found.isPresent());
        
        // 2.c) Verify repository interactions
        verify(productRepository, times(1)).findById(99L);
    }

    @Test
    @DisplayName("Test updateProduct with mock")
    void testUpdateProduct() {
        Product updateData = new Product(1L, "Updated Name", new BigDecimal("150.00"), 20, "New Desc", "Electronics");
        
        when(productRepository.findById(1L)).thenReturn(Optional.of(validProduct));
        when(productRepository.save(any(Product.class))).thenReturn(updateData);

        Product updated = productService.updateProduct(1L, updateData);

        assertEquals("Updated Name", updated.getName());
        assertEquals(new BigDecimal("150.00"), updated.getPrice());
        
        // 2.c) Verify repository interactions
        verify(productRepository).findById(1L);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    @DisplayName("Test deleteProduct with mock")
    void testDeleteProduct() {
        when(productRepository.existsById(1L)).thenReturn(true);
        doNothing().when(productRepository).deleteById(1L);

        productService.deleteProduct(1L);

        // 2.c) Verify repository interactions
        verify(productRepository).existsById(1L);
        verify(productRepository).deleteById(1L);
    }
    
    @Test
    @DisplayName("Test getAllProducts with mock")
    void testGetAllProducts() {
        List<Product> mockList = Arrays.asList(validProduct, new Product(2L, "P2", BigDecimal.TEN, 1, "D", "Books"));
        when(productRepository.findAll(0, 10)).thenReturn(mockList);

        List<Product> result = productService.getAllProducts(0, 10);

        assertEquals(2, result.size());
        
        // 2.c) Verify repository interactions
        verify(productRepository).findAll(0, 10);
    }
}
