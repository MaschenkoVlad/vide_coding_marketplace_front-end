import { describe, it, expect } from 'vitest';
import { formatListingAttributes } from '@/entities/listing/components/ListingAttributesTable';

describe('formatListingAttributes', () => {
  it('should handle empty attributes', () => {
    const result = formatListingAttributes({});
    expect(result).toEqual([]);
  });

  it('should handle null/undefined attributes', () => {
    const result = formatListingAttributes(null as any);
    expect(result).toEqual([]);
  });

  it('should format basic key-value pairs', () => {
    const attributes = {
      brand: 'NVIDIA',
      model: 'RTX 4090',
      memory: '24GB',
    };

    const result = formatListingAttributes(attributes);

    expect(result).toEqual([
      { key: 'Brand', value: 'NVIDIA' },
      { key: 'Model', value: 'RTX 4090' },
      { key: 'Memory', value: '24GB' },
    ]);
  });

  it('should convert snake_case to Title Case', () => {
    const attributes = {
      memory_type: 'GDDR6X',
      core_clock: '2520 MHz',
      boost_clock: '2520 MHz',
    };

    const result = formatListingAttributes(attributes);

    expect(result).toEqual([
      { key: 'Memory type', value: 'GDDR6X' },
      { key: 'Core clock', value: '2520 MHz' },
      { key: 'Boost clock', value: '2520 MHz' },
    ]);
  });

  it('should convert camelCase to Title Case', () => {
    const attributes = {
      memoryType: 'GDDR6X',
      coreClock: '2520 MHz',
      powerConsumption: '450W',
    };

    const result = formatListingAttributes(attributes);

    expect(result).toEqual([
      { key: 'Memory Type', value: 'GDDR6X' },
      { key: 'Core Clock', value: '2520 MHz' },
      { key: 'Power Consumption', value: '450W' },
    ]);
  });

  it('should handle boolean values', () => {
    const attributes = {
      has_rgb: true,
      is_overclocked: false,
      backlit: true,
    };

    const result = formatListingAttributes(attributes);

    expect(result).toEqual([
      { key: 'Has Rgb', value: 'Yes' },
      { key: 'Is Overclocked', value: 'No' },
      { key: 'Backlit', value: 'Yes' },
    ]);
  });

  it('should handle array values', () => {
    const attributes = {
      interfaces: ['PCIe 4.0', 'HDMI 2.1', 'DisplayPort 1.4'],
      supported_resolutions: ['4K', '8K'],
    };

    const result = formatListingAttributes(attributes);

    expect(result).toEqual([
      { key: 'Interfaces', value: 'PCIe 4.0, HDMI 2.1, DisplayPort 1.4' },
      { key: 'Supported Resolutions', value: '4K, 8K' },
    ]);
  });

  it('should handle null and undefined values', () => {
    const attributes = {
      brand: 'NVIDIA',
      model: null,
      price: undefined,
      condition: 'new',
    };

    const result = formatListingAttributes(attributes);

    expect(result).toEqual([
      { key: 'Brand', value: 'NVIDIA' },
      { key: 'Model', value: 'N/A' },
      { key: 'Price', value: 'N/A' },
      { key: 'Condition', value: 'new' },
    ]);
  });

  it('should handle nested objects', () => {
    const attributes = {
      dimensions: { length: 304, width: 137, height: 61 },
      weight: 2.2,
      brand: 'NVIDIA',
    };

    const result = formatListingAttributes(attributes);

    expect(result).toEqual([
      { key: 'Dimensions', value: '{\n  "length": 304,\n  "width": 137,\n  "height": 61\n}' },
      { key: 'Weight', value: '2.2' },
      { key: 'Brand', value: 'NVIDIA' },
    ]);
  });

  it('should handle numeric values', () => {
    const attributes = {
      price: 1299,
      memory_gb: 24,
      tdp: 450,
    };

    const result = formatListingAttributes(attributes);

    expect(result).toEqual([
      { key: 'Price', value: '1299' },
      { key: 'Memory Gb', value: '24' },
      { key: 'Tdp', value: '450' },
    ]);
  });
});
