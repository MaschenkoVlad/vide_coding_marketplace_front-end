export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  attributesSchema: CategoryAttributeSchema[]
  isActive: boolean
  sortOrder: number
}

export interface CategoryAttributeSchema {
  key: string
  type: 'string' | 'number' | 'boolean' | 'select'
  label: string
  required: boolean
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}
