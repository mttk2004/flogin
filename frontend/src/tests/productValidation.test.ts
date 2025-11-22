/**
 * Unit Tests for Product Validation Module
 * Testing product-validation.ts functions using Vitest
 *
 * Requirements from câu 2.2:
 * - Test validateProductName(): empty, length boundaries, whitespace
 * - Test validatePrice(): null, negative, zero, boundaries, valid
 * - Test validateQuantity(): null, negative, zero, non-integer, boundaries
 * - Test validateDescription(): optional, length boundary
 * - Test validateCategory(): empty, invalid, valid categories
 * - Test validateProduct(): combined validation
 * - Đạt độ bao phủ ≥ 90%
 */

import { describe, it, expect } from 'vitest';
import {
  validateProductName,
  validatePrice,
  validateQuantity,
  validateDescription,
  validateCategory,
  validateProduct,
  PRODUCT_CATEGORIES
} from '../utils/productValidation';

describe('validateProductName', () => {
  describe('trường hợp name rỗng', () => {
    it('nên trả về lỗi khi name là null', () => {
      const result = validateProductName(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Tên sản phẩm là bắt buộc');
    });

    it('nên trả về lỗi khi name là undefined', () => {
      const result = validateProductName(undefined);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Tên sản phẩm là bắt buộc');
    });

    it('nên trả về lỗi khi name là chuỗi rỗng', () => {
      const result = validateProductName('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Tên sản phẩm là bắt buộc');
    });

    it('nên trả về lỗi khi name chỉ chứa khoảng trắng', () => {
      const result = validateProductName('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Tên sản phẩm là bắt buộc');
    });
  });

  describe('kiểm tra độ dài', () => {
    it('nên chấp nhận name có 1 ký tự (minimum boundary)', () => {
      const result = validateProductName('A');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận name có 200 ký tự (maximum boundary)', () => {
      const name = 'A'.repeat(200);
      const result = validateProductName(name);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên trả về lỗi khi name có 201 ký tự (vượt maximum)', () => {
      const name = 'A'.repeat(201);
      const result = validateProductName(name);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Tên sản phẩm không được vượt quá 200 ký tự');
    });

    it('nên chấp nhận name với khoảng trắng ở đầu/cuối (được trim)', () => {
      const result = validateProductName('  Product Name  ');
      expect(result.isValid).toBe(true);
    });
  });

  describe('trường hợp hợp lệ', () => {
    it('nên chấp nhận name hợp lệ', () => {
      const result = validateProductName('Laptop Dell XPS 15');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận name có ký tự đặc biệt', () => {
      const result = validateProductName('Product #1 - Special Edition!');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận name có số', () => {
      const result = validateProductName('iPhone 15 Pro Max 256GB');
      expect(result.isValid).toBe(true);
    });
  });
});

describe('validatePrice', () => {
  describe('trường hợp giá rỗng/null', () => {
    it('nên trả về lỗi khi price là null', () => {
      const result = validatePrice(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Giá sản phẩm là bắt buộc');
    });

    it('nên trả về lỗi khi price là undefined', () => {
      const result = validatePrice(undefined);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Giá sản phẩm là bắt buộc');
    });
  });

  describe('trường hợp giá không hợp lệ', () => {
    it('nên trả về lỗi khi price là string không phải số', () => {
      const result = validatePrice('abc');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Giá sản phẩm phải là số hợp lệ');
    });

    it('nên trả về lỗi khi price là NaN', () => {
      const result = validatePrice(NaN);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Giá sản phẩm phải là số hợp lệ');
    });

    it('nên trả về lỗi khi price âm', () => {
      const result = validatePrice(-10);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Giá sản phẩm không được âm');
    });

    it('nên trả về lỗi khi price âm (-0.01)', () => {
      const result = validatePrice(-0.01);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Giá sản phẩm không được âm');
    });
  });

  describe('boundary tests cho giá', () => {
    it('nên chấp nhận price = 0 (miễn phí)', () => {
      const result = validatePrice(0);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận price = 0.01 (minimum positive)', () => {
      const result = validatePrice(0.01);
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận price = 999999999.99 (maximum boundary)', () => {
      const result = validatePrice(999999999.99);
      expect(result.isValid).toBe(true);
    });

    it('nên trả về lỗi khi price = 1000000000 (vượt maximum)', () => {
      const result = validatePrice(1000000000);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Giá sản phẩm không được vượt quá 999,999,999.99');
    });

    it('nên trả về lỗi khi price vượt quá maximum', () => {
      const result = validatePrice(9999999999);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Giá sản phẩm không được vượt quá 999,999,999.99');
    });
  });

  describe('trường hợp hợp lệ', () => {
    it('nên chấp nhận price hợp lệ (integer)', () => {
      const result = validatePrice(100);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận price hợp lệ (decimal)', () => {
      const result = validatePrice(99.99);
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận price từ string hợp lệ', () => {
      const result = validatePrice('49.99');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận price lớn', () => {
      const result = validatePrice(1234567.89);
      expect(result.isValid).toBe(true);
    });
  });
});

describe('validateQuantity', () => {
  describe('trường hợp quantity rỗng/null', () => {
    it('nên trả về lỗi khi quantity là null', () => {
      const result = validateQuantity(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Số lượng là bắt buộc');
    });

    it('nên trả về lỗi khi quantity là undefined', () => {
      const result = validateQuantity(undefined);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Số lượng là bắt buộc');
    });
  });

  describe('trường hợp quantity không hợp lệ', () => {
    it('nên trả về lỗi khi quantity là string không phải số', () => {
      const result = validateQuantity('abc');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Số lượng phải là số hợp lệ');
    });

    it('nên trả về lỗi khi quantity là NaN', () => {
      const result = validateQuantity(NaN);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Số lượng phải là số hợp lệ');
    });

    it('nên trả về lỗi khi quantity không phải số nguyên', () => {
      const result = validateQuantity(10.5);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Số lượng phải là số nguyên');
    });

    it('nên trả về lỗi khi quantity âm', () => {
      const result = validateQuantity(-5);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Số lượng không được âm');
    });
  });

  describe('boundary tests cho quantity', () => {
    it('nên chấp nhận quantity = 0', () => {
      const result = validateQuantity(0);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận quantity = 1', () => {
      const result = validateQuantity(1);
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận quantity = 999999 (maximum boundary)', () => {
      const result = validateQuantity(999999);
      expect(result.isValid).toBe(true);
    });

    it('nên trả về lỗi khi quantity = 1000000 (vượt maximum)', () => {
      const result = validateQuantity(1000000);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Số lượng không được vượt quá 999,999');
    });
  });

  describe('trường hợp hợp lệ', () => {
    it('nên chấp nhận quantity hợp lệ', () => {
      const result = validateQuantity(50);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận quantity từ string hợp lệ', () => {
      const result = validateQuantity('100');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận quantity lớn', () => {
      const result = validateQuantity(50000);
      expect(result.isValid).toBe(true);
    });
  });
});

describe('validateDescription', () => {
  describe('description là optional', () => {
    it('nên chấp nhận description null', () => {
      const result = validateDescription(null);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận description undefined', () => {
      const result = validateDescription(undefined);
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận description rỗng', () => {
      const result = validateDescription('');
      expect(result.isValid).toBe(true);
    });
  });

  describe('kiểm tra độ dài description', () => {
    it('nên chấp nhận description có 1 ký tự', () => {
      const result = validateDescription('A');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận description có 1000 ký tự (maximum boundary)', () => {
      const desc = 'A'.repeat(1000);
      const result = validateDescription(desc);
      expect(result.isValid).toBe(true);
    });

    it('nên trả về lỗi khi description có 1001 ký tự (vượt maximum)', () => {
      const desc = 'A'.repeat(1001);
      const result = validateDescription(desc);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Mô tả không được vượt quá 1000 ký tự');
    });

    it('nên trả về lỗi khi description quá dài', () => {
      const desc = 'A'.repeat(2000);
      const result = validateDescription(desc);
      expect(result.isValid).toBe(false);
    });
  });

  describe('trường hợp hợp lệ', () => {
    it('nên chấp nhận description hợp lệ', () => {
      const result = validateDescription('This is a great product with many features.');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận description có nhiều dòng', () => {
      const desc = 'Line 1\nLine 2\nLine 3';
      const result = validateDescription(desc);
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận description có ký tự đặc biệt', () => {
      const desc = 'Product with special chars: @#$%^&*()';
      const result = validateDescription(desc);
      expect(result.isValid).toBe(true);
    });
  });
});

describe('validateCategory', () => {
  describe('trường hợp category rỗng/null', () => {
    it('nên trả về lỗi khi category là null', () => {
      const result = validateCategory(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Danh mục là bắt buộc');
    });

    it('nên trả về lỗi khi category là undefined', () => {
      const result = validateCategory(undefined);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Danh mục là bắt buộc');
    });

    it('nên trả về lỗi khi category là chuỗi rỗng', () => {
      const result = validateCategory('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Danh mục là bắt buộc');
    });
  });

  describe('trường hợp category không hợp lệ', () => {
    it('nên trả về lỗi khi category không có trong danh sách', () => {
      const result = validateCategory('InvalidCategory');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Danh mục không hợp lệ');
    });

    it('nên trả về lỗi khi category có case khác', () => {
      const result = validateCategory('electronics'); // lowercase
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Danh mục không hợp lệ');
    });

    it('nên trả về lỗi khi category là số', () => {
      const result = validateCategory('123');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Danh mục không hợp lệ');
    });
  });

  describe('trường hợp category hợp lệ', () => {
    it('nên chấp nhận category Electronics', () => {
      const result = validateCategory('Electronics');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận category Clothing', () => {
      const result = validateCategory('Clothing');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận category Food', () => {
      const result = validateCategory('Food');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận category Books', () => {
      const result = validateCategory('Books');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận category Other', () => {
      const result = validateCategory('Other');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận tất cả categories hợp lệ', () => {
      PRODUCT_CATEGORIES.forEach(category => {
        const result = validateCategory(category);
        expect(result.isValid).toBe(true);
      });
    });
  });
});

describe('validateProduct', () => {
  describe('tất cả fields hợp lệ', () => {
    it('nên trả về isValid: true khi tất cả fields hợp lệ', () => {
      const result = validateProduct(
        'Laptop Dell XPS 15',
        999.99,
        10,
        'High performance laptop',
        'Electronics'
      );

      expect(result.isValid).toBe(true);
      expect(result.nameResult.isValid).toBe(true);
      expect(result.priceResult.isValid).toBe(true);
      expect(result.quantityResult.isValid).toBe(true);
      expect(result.descriptionResult.isValid).toBe(true);
      expect(result.categoryResult.isValid).toBe(true);
    });

    it('nên chấp nhận product với description null', () => {
      const result = validateProduct(
        'Product Name',
        100,
        5,
        null,
        'Books'
      );

      expect(result.isValid).toBe(true);
      expect(result.descriptionResult.isValid).toBe(true);
    });

    it('nên chấp nhận product với price = 0', () => {
      const result = validateProduct(
        'Free Product',
        0,
        100,
        'This is free',
        'Other'
      );

      expect(result.isValid).toBe(true);
    });
  });

  describe('một hoặc nhiều fields không hợp lệ', () => {
    it('nên trả về isValid: false khi name không hợp lệ', () => {
      const result = validateProduct(
        '',
        100,
        10,
        'Description',
        'Electronics'
      );

      expect(result.isValid).toBe(false);
      expect(result.nameResult.isValid).toBe(false);
      expect(result.nameResult.error).toBe('Tên sản phẩm là bắt buộc');
    });

    it('nên trả về isValid: false khi price âm', () => {
      const result = validateProduct(
        'Product',
        -10,
        5,
        'Description',
        'Food'
      );

      expect(result.isValid).toBe(false);
      expect(result.priceResult.isValid).toBe(false);
      expect(result.priceResult.error).toBe('Giá sản phẩm không được âm');
    });

    it('nên trả về isValid: false khi quantity không phải số nguyên', () => {
      const result = validateProduct(
        'Product',
        100,
        5.5,
        'Description',
        'Toys'
      );

      expect(result.isValid).toBe(false);
      expect(result.quantityResult.isValid).toBe(false);
    });

    it('nên trả về isValid: false khi category không hợp lệ', () => {
      const result = validateProduct(
        'Product',
        100,
        10,
        'Description',
        'InvalidCategory'
      );

      expect(result.isValid).toBe(false);
      expect(result.categoryResult.isValid).toBe(false);
    });

    it('nên trả về isValid: false khi description quá dài', () => {
      const longDesc = 'A'.repeat(1001);
      const result = validateProduct(
        'Product',
        100,
        10,
        longDesc,
        'Sports'
      );

      expect(result.isValid).toBe(false);
      expect(result.descriptionResult.isValid).toBe(false);
    });

    it('nên trả về isValid: false khi nhiều fields không hợp lệ', () => {
      const result = validateProduct(
        '',
        -10,
        -5,
        'A'.repeat(1001),
        'Invalid'
      );

      expect(result.isValid).toBe(false);
      expect(result.nameResult.isValid).toBe(false);
      expect(result.priceResult.isValid).toBe(false);
      expect(result.quantityResult.isValid).toBe(false);
      expect(result.descriptionResult.isValid).toBe(false);
      expect(result.categoryResult.isValid).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('nên xử lý tất cả fields null', () => {
      const result = validateProduct(null, null, null, null, null);

      expect(result.isValid).toBe(false);
      expect(result.nameResult.isValid).toBe(false);
      expect(result.priceResult.isValid).toBe(false);
      expect(result.quantityResult.isValid).toBe(false);
      expect(result.descriptionResult.isValid).toBe(true); // description is optional
      expect(result.categoryResult.isValid).toBe(false);
    });

    it('nên xử lý boundary values', () => {
      const result = validateProduct(
        'A'.repeat(200), // max name
        999999999.99,    // max price
        999999,          // max quantity
        'A'.repeat(1000), // max description
        'Electronics'
      );

      expect(result.isValid).toBe(true);
    });
  });
});

// Component test placeholder - to be implemented when Product Form component is created
// describe('Product Form Component Tests (Placeholder)', () => {
//   it.todo('should render product form with all fields');
//   it.todo('should show validation errors when submitting invalid data');
//   it.todo('should call onSubmit with valid product data');
//   it.todo('should reset form after successful submission');
//   it.todo('should populate form fields when editing existing product');
// });
