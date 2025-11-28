package integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.FloginApplication;
import com.flogin.model.Product;
import com.flogin.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = FloginApplication.class)
@AutoConfigureMockMvc
@WithMockUser(username = "admin", roles = {"ADMIN", "USER"})
public class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    @BeforeEach
    void setUp() {
        // Clean up database before each test
        // Since H2 in-memory db is used, repositories are reset when context reloads or explicitly cleared
        // But explicit clear is safer
        // Note: Repository methods need to be available. Assuming standard JPA methods.
    }

    @Test
    @DisplayName("Test POST /api/products (Create) - Success")
    public void testCreateProductSuccess() throws Exception {
        Product product = new Product(null, "New Product", new BigDecimal("100.00"), 10, "Description", "Electronics");

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("New Product"))
                .andExpect(jsonPath("$.data.id").exists());
    }

    @Test
    @DisplayName("Test GET /api/products (Read all) - Success")
    public void testGetAllProductsSuccess() throws Exception {
        // Prepare data
        productRepository.save(new Product(null, "Product 1", new BigDecimal("10.00"), 5, "Desc 1", "Books"));
        productRepository.save(new Product(null, "Product 2", new BigDecimal("20.00"), 10, "Desc 2", "Toys"));

        mockMvc.perform(get("/api/products")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.products").isArray())
                .andExpect(jsonPath("$.data.products", hasSize(greaterThanOrEqualTo(2))));
    }

    @Test
    @DisplayName("Test GET /api/products/{id} (Read one) - Success")
    public void testGetProductSuccess() throws Exception {
        Product savedProduct = productRepository.save(new Product(null, "Product to Read", new BigDecimal("50.00"), 2, "Desc", "Food"));
        Long id = savedProduct.getId();

        mockMvc.perform(get("/api/products/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(id))
                .andExpect(jsonPath("$.data.name").value("Product to Read"));
    }

    @Test
    @DisplayName("Test PUT /api/products/{id} (Update) - Success")
    public void testUpdateProductSuccess() throws Exception {
        Product savedProduct = productRepository.save(new Product(null, "Old Name", new BigDecimal("50.00"), 2, "Desc", "Food"));
        Long id = savedProduct.getId();

        Product updateData = new Product(null, "New Name", new BigDecimal("60.00"), 5, "New Desc", "Food");

        mockMvc.perform(put("/api/products/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateData)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("New Name"))
                .andExpect(jsonPath("$.data.price").value(60.00));
    }

    @Test
    @DisplayName("Test DELETE /api/products/{id} (Delete) - Success")
    public void testDeleteProductSuccess() throws Exception {
        Product savedProduct = productRepository.save(new Product(null, "To Delete", new BigDecimal("50.00"), 2, "Desc", "Food"));
        Long id = savedProduct.getId();

        mockMvc.perform(delete("/api/products/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        // Verify deletion
        mockMvc.perform(get("/api/products/" + id))
                .andExpect(status().isNotFound());
    }
}
