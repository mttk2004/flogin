package com.flogin.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Product Entity
 * Represents a product in the system with validation rules from câu 2.2:
 * - name: 1-200 characters, required
 * - price: ≥0, max 999,999,999.99, required
 * - quantity: integer ≥0, max 999,999, required
 * - description: optional, max 1000 characters
 * - category: required, must be from valid list
 */
public class Product {
  private Long id;
  private String name;
  private BigDecimal price;
  private Integer quantity;
  private String description;
  private String category;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  // Constructors
  public Product() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  public Product(Long id, String name, BigDecimal price, Integer quantity, String description, String category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.category = category;
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  @Override
  public String toString() {
    return "Product{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", price=" + price +
        ", quantity=" + quantity +
        ", description='" + description + '\'' +
        ", category='" + category + '\'' +
        ", createdAt=" + createdAt +
        ", updatedAt=" + updatedAt +
        '}';
  }
}
