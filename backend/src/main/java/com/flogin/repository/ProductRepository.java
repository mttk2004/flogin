package com.flogin.repository;

import com.flogin.model.Product;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Product Repository - In-Memory Implementation
 * Provides CRUD operations for Product entities
 * Uses HashMap for simple in-memory storage
 */
public class ProductRepository {
  private final Map<Long, Product> products = new HashMap<>();
  private Long currentId = 1L;

  public Product save(Product product) {
    if (product.getId() == null) {
      product.setId(currentId++);
    }
    products.put(product.getId(), product);
    return product;
  }

  public Optional<Product> findById(Long id) {
    return Optional.ofNullable(products.get(id));
  }

  public List<Product> findAll() {
    return products.values().stream().collect(Collectors.toList());
  }

  public List<Product> findAll(int page, int size) {
    return products.values().stream()
        .skip((long) page * size)
        .limit(size)
        .collect(Collectors.toList());
  }

  public void deleteById(Long id) {
    products.remove(id);
  }

  public boolean existsById(Long id) {
    return products.containsKey(id);
  }

  public long count() {
    return products.size();
  }

  public void clear() {
    products.clear();
    currentId = 1L;
  }
}
