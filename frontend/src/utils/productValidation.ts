/**
 * Product Validation Module
 * Implements validation rules for Product Management functionality
 *
 * Validation Rules:
 * - Product Name: 1-200 characters, required
 * - Price: Must be >= 0, required (accepts 0 for free products)
 * - Quantity: Integer >= 0, required
 * - Description: Optional, max 1000 characters
 * - Category: Required, must be from predefined list
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ProductValidationResult {
  nameResult: ValidationResult;
  priceResult: ValidationResult;
  quantityResult: ValidationResult;
  descriptionResult: ValidationResult;
  categoryResult: ValidationResult;
  isValid: boolean;
}

/**
 * Available product categories
 */
export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Food',
  'Books',
  'Toys',
  'Sports',
  'Home',
  'Beauty',
  'Other'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

/**
 * Validates product name
 * Rules:
 * - Required: must not be empty or null
 * - Length: 1-200 characters
 * - No leading/trailing whitespace only
 *
 * @param name - The product name to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateProductName(name: string | null | undefined): ValidationResult {
  // Check for null or empty
  if (name == null || name === '') {
    return {
      isValid: false,
      error: 'Tên sản phẩm là bắt buộc'
    };
  }

  // Check for whitespace only
  if (name.trim() === '') {
    return {
      isValid: false,
      error: 'Tên sản phẩm là bắt buộc'
    };
  }

  // Check minimum length (after trim)
  const trimmedName = name.trim();
  if (trimmedName.length < 1) {
    return {
      isValid: false,
      error: 'Tên sản phẩm là bắt buộc'
    };
  }

  // Check maximum length
  if (trimmedName.length > 200) {
    return {
      isValid: false,
      error: 'Tên sản phẩm không được vượt quá 200 ký tự'
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates product price
 * Rules:
 * - Required: must not be null or undefined
 * - Must be a valid number
 * - Must be >= 0 (accepts 0 for free products)
 * - Maximum: 999999999.99 (1 billion - 1 cent)
 *
 * @param price - The price to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validatePrice(price: number | null | undefined | string): ValidationResult {
  // Check for null or undefined
  if (price == null) {
    return {
      isValid: false,
      error: 'Giá sản phẩm là bắt buộc'
    };
  }

  // Convert string to number if needed
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  // Check if valid number
  if (isNaN(numPrice)) {
    return {
      isValid: false,
      error: 'Giá sản phẩm phải là số hợp lệ'
    };
  }

  // Check for negative price
  if (numPrice < 0) {
    return {
      isValid: false,
      error: 'Giá sản phẩm không được âm'
    };
  }

  // Check maximum price (1 billion - boundary test)
  if (numPrice > 999999999.99) {
    return {
      isValid: false,
      error: 'Giá sản phẩm không được vượt quá 999,999,999.99'
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates product quantity
 * Rules:
 * - Required: must not be null or undefined
 * - Must be a valid integer
 * - Must be >= 0
 * - Maximum: 999999
 *
 * @param quantity - The quantity to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateQuantity(quantity: number | null | undefined | string): ValidationResult {
  // Check for null or undefined
  if (quantity == null) {
    return {
      isValid: false,
      error: 'Số lượng là bắt buộc'
    };
  }

  // Convert string to number if needed
  const numQuantity = typeof quantity === 'string' ? parseFloat(quantity) : quantity;

  // Check if valid number
  if (isNaN(numQuantity)) {
    return {
      isValid: false,
      error: 'Số lượng phải là số hợp lệ'
    };
  }

  // Check if integer
  if (!Number.isInteger(numQuantity)) {
    return {
      isValid: false,
      error: 'Số lượng phải là số nguyên'
    };
  }

  // Check for negative quantity
  if (numQuantity < 0) {
    return {
      isValid: false,
      error: 'Số lượng không được âm'
    };
  }

  // Check maximum quantity
  if (numQuantity > 999999) {
    return {
      isValid: false,
      error: 'Số lượng không được vượt quá 999,999'
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates product description
 * Rules:
 * - Optional: can be empty or null
 * - Maximum length: 1000 characters
 *
 * @param description - The description to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateDescription(description: string | null | undefined): ValidationResult {
  // Description is optional - empty is valid
  if (description == null || description === '') {
    return {
      isValid: true
    };
  }

  // Check maximum length
  if (description.length > 1000) {
    return {
      isValid: false,
      error: 'Mô tả không được vượt quá 1000 ký tự'
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates product category
 * Rules:
 * - Required: must not be empty or null
 * - Must be one of the predefined categories
 *
 * @param category - The category to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateCategory(category: string | null | undefined): ValidationResult {
  // Check for null or empty
  if (category == null || category === '') {
    return {
      isValid: false,
      error: 'Danh mục là bắt buộc'
    };
  }

  // Check if category is in the allowed list
  if (!PRODUCT_CATEGORIES.includes(category as ProductCategory)) {
    return {
      isValid: false,
      error: 'Danh mục không hợp lệ'
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates all product fields together
 * Used for form validation before submission
 *
 * @param name - Product name
 * @param price - Product price
 * @param quantity - Product quantity
 * @param description - Product description (optional)
 * @param category - Product category
 * @returns ProductValidationResult with individual field results and overall validity
 */
export function validateProduct(
  name: string | null | undefined,
  price: number | null | undefined | string,
  quantity: number | null | undefined | string,
  description: string | null | undefined,
  category: string | null | undefined
): ProductValidationResult {
  const nameResult = validateProductName(name);
  const priceResult = validatePrice(price);
  const quantityResult = validateQuantity(quantity);
  const descriptionResult = validateDescription(description);
  const categoryResult = validateCategory(category);

  return {
    nameResult,
    priceResult,
    quantityResult,
    descriptionResult,
    categoryResult,
    isValid:
      nameResult.isValid &&
      priceResult.isValid &&
      quantityResult.isValid &&
      descriptionResult.isValid &&
      categoryResult.isValid
  };
}
