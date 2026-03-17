import React from 'react';
import { Card, CardContent, CardHeader } from '@/shared/ui/shadcn/ui/card';
import { Separator } from '@/shared/ui/shadcn/ui/separator';

interface ListingAttributesTableProps {
  attributes?: Record<string, unknown>;
  className?: string;
}

/**
 * Formats and displays listing attributes as a key-value table.
 * Handles various data types and formats them for display.
 */
export const ListingAttributesTable: React.FC<ListingAttributesTableProps> = ({ attributes, className = '' }) => {
  if (!attributes || Object.keys(attributes).length === 0) {
    return null;
  }

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }

    return String(value);
  };

  const formatKey = (key: string): string => {
    // Convert snake_case or camelCase to Title Case
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const entries = Object.entries(attributes);

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="font-semibold">Specifications</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map(([key, value], index) => (
            <div key={key}>
              <div className="flex items-start justify-between py-2">
                <div className="mr-4 min-w-0 flex-1 text-sm font-medium text-muted-foreground">{formatKey(key)}</div>
                <div className="min-w-0 flex-1 text-right text-sm">{formatValue(value)}</div>
              </div>
              {index < entries.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Utility function to format attributes for display
 * Can be used in tests or other components
 */
export const formatListingAttributes = (attributes: Record<string, unknown>): Array<{ key: string; value: string }> => {
  if (!attributes) return [];

  return Object.entries(attributes).map(([key, value]) => ({
    key: key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim(),
    value:
      value === null || value === undefined
        ? 'N/A'
        : typeof value === 'boolean'
          ? value
            ? 'Yes'
            : 'No'
          : Array.isArray(value)
            ? value.join(', ')
            : typeof value === 'object'
              ? JSON.stringify(value, null, 2)
              : String(value),
  }));
};
