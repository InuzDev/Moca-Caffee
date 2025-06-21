// Customer types
export interface Customer {
  id: number
  name: string
  email: string
  value: number
  status: 'Active' | 'Pending' | 'Inactive'
  lastContact: Date
  createdAt: Date
}

export interface CustomerForm {
  name: string
  email: string
  value: number
  status: 'Active' | 'Pending' | 'Inactive'
}

// Employee types
export interface Employee {
  id: number
  name: string
  role: string
  department: string
  status: 'active' | 'inactive'
  startDate: Date
}

export interface EmployeeForm {
  name: string
  role: string
  department: string
  status: 'active' | 'inactive'
}

// Route types
export interface RouteParams {
  id?: string
}

// Stats types
export interface Stats {
  totalCustomers: number
  activeEmployees: number
  openDeals: number
  revenue: number
}
