import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Label } from '@/shared/ui/shadcn/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/ui/select';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import type { ListingFilters, ListingCondition, SortOption } from '@/shared/api/types';

interface CatalogFiltersProps {
  filters: ListingFilters;
  onFiltersChange: (filters: ListingFilters) => void;
  className?: string;
}

const categories = [
  { value: 'graphics-cards', label: 'Graphics Cards' },
  { value: 'processors', label: 'Processors' },
  { value: 'memory', label: 'Memory' },
  { value: 'storage', label: 'Storage' },
  { value: 'motherboards', label: 'Motherboards' },
  { value: 'power-supplies', label: 'Power Supplies' },
  { value: 'cooling', label: 'Cooling' },
  { value: 'cases', label: 'Cases' },
];

const conditions: { value: ListingCondition; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'like_new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({ filters, onFiltersChange, className }) => {
  const [localFilters, setLocalFilters] = useState<ListingFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilter = (key: keyof ListingFilters, value: string | number | undefined) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const emptyFilters: ListingFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some((value) => value !== undefined && value !== '');

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Reset All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={localFilters.category || ''}
            onValueChange={(value) => updateFilter('category', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Condition Filter */}
        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Select
            value={localFilters.condition || ''}
            onValueChange={(value) => updateFilter('condition', (value as ListingCondition) || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All conditions</SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition.value} value={condition.value}>
                  {condition.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              min="0"
              value={localFilters.minPrice || ''}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : undefined;
                updateFilter('minPrice', value);
              }}
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              min="0"
              value={localFilters.maxPrice || ''}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : undefined;
                updateFilter('maxPrice', value);
              }}
            />
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            type="text"
            placeholder="Enter city name"
            value={localFilters.city || ''}
            onChange={(e) => updateFilter('city', e.target.value || undefined)}
          />
        </div>

        <Separator />

        {/* Sort */}
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select
            value={localFilters.sort || 'newest'}
            onValueChange={(value) => updateFilter('sort', value as SortOption)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
