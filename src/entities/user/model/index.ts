export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: 'buyer' | 'seller' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  phone?: string
  location?: string
  bio?: string
  avatar?: string
}
