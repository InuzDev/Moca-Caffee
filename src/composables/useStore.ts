import { ref } from 'vue'
import type { Customer, CustomerForm, Employee, EmployeeForm } from '../types'

// Global state
const customers = ref<Customer[]>([
  {
    id: 1,
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    value: 50000,
    status: 'Active',
    lastContact: new Date('2024-01-15'),
    createdAt: new Date('2023-06-15'),
  },
  {
    id: 2,
    name: 'TechStart Inc',
    email: 'hello@techstart.com',
    value: 25000,
    status: 'Pending',
    lastContact: new Date('2024-01-10'),
    createdAt: new Date('2023-08-20'),
  },
  {
    id: 3,
    name: 'Global Solutions',
    email: 'info@globalsolutions.com',
    value: 75000,
    status: 'Active',
    lastContact: new Date('2024-01-12'),
    createdAt: new Date('2023-04-10'),
  },
])

const employees = ref<Employee[]>([
  {
    id: 1,
    name: 'Sarah Connor',
    role: 'Sales Manager',
    department: 'Sales',
    status: 'active',
    startDate: new Date('2023-03-15'),
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Senior Developer',
    department: 'IT',
    status: 'active',
    startDate: new Date('2023-01-10'),
  },
  {
    id: 3,
    name: 'Jane Smith',
    role: 'HR Specialist',
    department: 'HR',
    status: 'active',
    startDate: new Date('2023-05-20'),
  },
  {
    id: 4,
    name: 'Mike Johnson',
    role: 'Marketing Lead',
    department: 'Marketing',
    status: 'active',
    startDate: new Date('2023-02-28'),
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Financial Analyst',
    department: 'Finance',
    status: 'active',
    startDate: new Date('2023-04-12'),
  },
])

// Customer methods
const addCustomer = (customerData: CustomerForm): void => {
  const newCustomer: Customer = {
    id: Math.max(...customers.value.map((c) => c.id), 0) + 1,
    name: customerData.name,
    email: customerData.email,
    value: customerData.value,
    status: customerData.status,
    lastContact: new Date(),
    createdAt: new Date(),
  }
  customers.value.push(newCustomer)
}

const updateCustomer = (id: number, customerData: CustomerForm): void => {
  const index = customers.value.findIndex((c) => c.id === id)
  if (index !== -1) {
    customers.value[index] = {
      ...customers.value[index],
      ...customerData,
    }
  }
}

const deleteCustomer = (id: number): void => {
  const index = customers.value.findIndex((c) => c.id === id)
  if (index !== -1) {
    customers.value.splice(index, 1)
  }
}

const getCustomerById = (id: number): Customer | undefined => {
  return customers.value.find((c) => c.id === id)
}

// Employee methods
const addEmployee = (employeeData: EmployeeForm): void => {
  const newEmployee: Employee = {
    id: Math.max(...employees.value.map((e) => e.id)) + 1,
    ...employeeData,
    startDate: new Date(),
  }
  employees.value.unshift(newEmployee)
}

const updateEmployee = (id: number, employeeData: EmployeeForm): void => {
  const index = employees.value.findIndex((e) => e.id === id)
  if (index !== -1) {
    employees.value[index] = {
      ...employees.value[index],
      ...employeeData,
    }
  }
}

const deleteEmployee = (id: number): void => {
  const index = employees.value.findIndex((e) => e.id === id)
  if (index !== -1) {
    employees.value.splice(index, 1)
  }
}

const getEmployeeById = (id: number): Employee | undefined => {
  return employees.value.find((e) => e.id === id)
}

export function useStore() {
  return {
    // State
    customers,
    employees,

    // Customer methods
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,

    // Employee methods
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
  }
}
