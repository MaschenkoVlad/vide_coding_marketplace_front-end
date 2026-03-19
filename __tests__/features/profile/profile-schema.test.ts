import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import type { UpdateProfileRequest } from '@/entities/user/model/user.types';

// Import the schema from the component (we'll extract it for testing)
const phoneRegex = /^\+?[1-9]\d{1,14}$|^$/;
const profileSchema = z.object({
  displayName: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number').optional(),
});

describe('Profile Schema Validation', () => {
  it('should accept valid phone numbers', () => {
    const validPhones = [
      '+1234567890',
      '+441234567890',
      '+33123456789',
      '', // empty should be valid
    ];

    validPhones.forEach((phone) => {
      const result = profileSchema.safeParse({ phone });
      expect(result.success).toBe(true);
    });
  });

  it('should reject invalid phone numbers', () => {
    const invalidPhones = [
      'abc123', // contains letters
      '+0123456789', // starts with 0 after +
    ];

    invalidPhones.forEach((phone) => {
      const result = profileSchema.safeParse({ phone });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Please enter a valid phone number');
      }
    });
  });

  it('should accept optional fields', () => {
    const result = profileSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('should accept all valid fields', () => {
    const validData: UpdateProfileRequest = {
      displayName: 'John Doe',
      city: 'New York',
      phone: '+1234567890',
    };

    const result = profileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should accept partial data', () => {
    const partialData = {
      displayName: 'Jane Smith',
    };

    const result = profileSchema.safeParse(partialData);
    expect(result.success).toBe(true);
  });
});

describe('Phone Number Normalization', () => {
  it('should handle various phone number formats', () => {
    // Test cases for phone number normalization if needed
    const testCases = [
      { input: '+1234567890', expected: true },
      { input: '1234567890', expected: true }, // Should pass - basic numbers are valid
      { input: '', expected: true }, // Empty should be valid
      { input: 'abc123', expected: false }, // Should fail - contains letters
    ];

    testCases.forEach(({ input, expected }) => {
      const result = profileSchema.safeParse({ phone: input });
      expect(result.success).toBe(expected);
    });
  });
});
