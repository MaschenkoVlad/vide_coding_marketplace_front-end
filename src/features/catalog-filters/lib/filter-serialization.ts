import type { ListingFilters, PaginationParams, ListingCondition, SortOption } from '@/shared/api/types';

export interface CatalogQueryParams extends ListingFilters, PaginationParams {}

/**
 * Convert filter and pagination objects to URL query parameters
 */
export const serializeFilters = (
  filters: Partial<ListingFilters>,
  pagination: PaginationParams
): Record<string, string> => {
  const params: Record<string, string> = {};

  // Pagination
  params.page = pagination.page.toString();
  params.limit = pagination.limit.toString();

  // Filters
  if (filters.category) params.category = filters.category;
  if (filters.condition) params.condition = filters.condition;
  if (filters.minPrice !== undefined) params.minPrice = filters.minPrice.toString();
  if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice.toString();
  if (filters.city) params.city = filters.city;
  if (filters.sort) params.sort = filters.sort;

  return params;
};

/**
 * Convert URL query parameters back to filter and pagination objects
 */
export const deserializeFilters = (
  searchParams: URLSearchParams
): {
  filters: Partial<ListingFilters>;
  pagination: PaginationParams;
} => {
  const filters: Partial<ListingFilters> = {};
  const pagination: PaginationParams = {
    page: 1,
    limit: 12,
  };

  // Pagination
  const page = searchParams.get('page');
  if (page) {
    const parsedPage = parseInt(page, 10);
    pagination.page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  }

  const limit = searchParams.get('limit');
  if (limit) {
    const parsedLimit = parseInt(limit, 10);
    pagination.limit = isNaN(parsedLimit) || parsedLimit < 1 ? 12 : parsedLimit;
  }

  // Filters
  const category = searchParams.get('category');
  if (category) filters.category = category;

  const condition = searchParams.get('condition') as ListingCondition | null;
  if (condition) filters.condition = condition;

  const minPrice = searchParams.get('minPrice');
  if (minPrice) {
    const parsed = parseInt(minPrice, 10);
    if (!isNaN(parsed) && parsed >= 0) filters.minPrice = parsed;
  }

  const maxPrice = searchParams.get('maxPrice');
  if (maxPrice) {
    const parsed = parseInt(maxPrice, 10);
    if (!isNaN(parsed) && parsed >= 0) filters.maxPrice = parsed;
  }

  const city = searchParams.get('city');
  if (city) filters.city = city;

  const sort = searchParams.get('sort') as SortOption | null;
  if (sort) filters.sort = sort;

  return { filters, pagination };
};

/**
 * Create a query string from filters and pagination
 */
export const createQueryString = (filters: Partial<ListingFilters>, pagination: PaginationParams): string => {
  const params = serializeFilters(filters, pagination);
  const searchParams = new URLSearchParams(params);
  return searchParams.toString();
};

/**
 * Get the current filters and pagination from URL
 */
export const getFiltersFromURL = (
  searchParams: URLSearchParams
): {
  filters: Partial<ListingFilters>;
  pagination: PaginationParams;
} => {
  return deserializeFilters(searchParams);
};

/**
 * Check if any filters are active (excluding pagination)
 */
export const hasActiveFilters = (filters: Partial<ListingFilters>): boolean => {
  return Object.values(filters).some((value) => value !== undefined && value !== '' && value !== null);
};

/**
 * Get a human-readable summary of active filters
 */
export const getFilterSummary = (filters: Partial<ListingFilters>): string[] => {
  const summary: string[] = [];

  if (filters.category) {
    summary.push(`Category: ${filters.category.replace('-', ' ')}`);
  }

  if (filters.condition) {
    summary.push(`Condition: ${filters.condition.replace('_', ' ')}`);
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice !== undefined ? `$${filters.minPrice}` : 'Any';
    const max = filters.maxPrice !== undefined ? `$${filters.maxPrice}` : 'Any';
    summary.push(`Price: ${min} - ${max}`);
  }

  if (filters.city) {
    summary.push(`City: ${filters.city}`);
  }

  if (filters.sort) {
    const sortLabels = {
      newest: 'Newest First',
      price_asc: 'Price: Low to High',
      price_desc: 'Price: High to Low',
    };
    summary.push(`Sort: ${sortLabels[filters.sort] || filters.sort}`);
  }

  return summary;
};
