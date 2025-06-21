<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h2 class="text-3xl font-bold text-amber-900 mb-2">Employee Management 💼</h2>
        <p class="text-amber-700">Nurture your team with care and warmth</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
      >
        Add Employee +
      </button>
    </div>

    <!-- Department Filter -->
    <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-amber-200">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search employees..."
            class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
          />
        </div>
        <select
          v-model="departmentFilter"
          class="px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
        >
          <option value="">All Departments</option>
          <option value="Sales">Sales</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>
        <select
          v-model="statusFilter"
          class="px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    <!-- Employees Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="employee in filteredEmployees"
        :key="employee.id"
        class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center space-x-4 mb-4">
          <div
            class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white font-bold text-lg">{{ employee.name.charAt(0) }}</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-amber-900">{{ employee.name }}</h3>
            <p class="text-sm text-amber-600">{{ employee.role }}</p>
          </div>
          <div class="flex items-center">
            <div
              :class="[
                'w-3 h-3 rounded-full',
                employee.status === 'active' ? 'bg-green-400' : 'bg-gray-400',
              ]"
            ></div>
          </div>
        </div>

        <div class="space-y-2 mb-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-amber-600">Department</span>
            <span class="font-medium text-amber-900">{{ employee.department }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-amber-600">Start Date</span>
            <span class="text-sm text-amber-700">{{ formatDate(employee.startDate) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-amber-600">Status</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium capitalize',
                employee.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ employee.status }}
            </span>
          </div>
        </div>

        <div class="pt-4 border-t border-amber-200 flex space-x-2">
          <button
            @click="editEmployee(employee)"
            class="flex-1 bg-amber-100 text-amber-800 py-2 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
          >
            Edit
          </button>
          <button
            @click="deleteEmployee(employee.id)"
            class="flex-1 bg-red-100 text-red-800 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Employee Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">
          {{ showEditModal ? 'Edit Employee' : 'Add New Employee' }}
        </h3>
        <form @submit.prevent="showEditModal ? updateEmployee() : addEmployee()">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Name</label>
              <input
                v-model="employeeForm.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="Employee name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Role</label>
              <input
                v-model="employeeForm.role"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="Job title"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Department</label>
              <select
                v-model="employeeForm.department"
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="Sales">Sales</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Status</label>
              <select
                v-model="employeeForm.status"
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div class="flex space-x-4 mt-8">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
            >
              {{ showEditModal ? 'Update' : 'Add' }} Employee
            </button>
            <button
              type="button"
              @click="closeModal"
              class="flex-1 border-2 border-amber-300 text-amber-700 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useStore } from '../composables/useStore'
import type { Employee, EmployeeForm } from '../types'

const {
  employees,
  addEmployee: addEmployeeToStore,
  updateEmployee: updateEmployeeInStore,
  deleteEmployee: deleteEmployeeFromStore,
} = useStore()

// Reactive state
const searchQuery = ref<string>('')
const departmentFilter = ref<string>('')
const statusFilter = ref<string>('')
const showAddModal = ref<boolean>(false)
const showEditModal = ref<boolean>(false)
const editingEmployeeId = ref<number | null>(null)

// Form data
const employeeForm = reactive<EmployeeForm>({
  name: '',
  role: '',
  department: 'Sales',
  status: 'active',
})

// Computed properties
const filteredEmployees = computed<Employee[]>(() => {
  let filtered = employees.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) || employee.role.toLowerCase().includes(query),
    )
  }

  if (departmentFilter.value) {
    filtered = filtered.filter((employee) => employee.department === departmentFilter.value)
  }

  if (statusFilter.value) {
    filtered = filtered.filter((employee) => employee.status === statusFilter.value)
  }

  return filtered
})

// Methods
const editEmployee = (employee: Employee): void => {
  editingEmployeeId.value = employee.id
  employeeForm.name = employee.name
  employeeForm.role = employee.role
  employeeForm.department = employee.department
  employeeForm.status = employee.status
  showEditModal.value = true
}

const addEmployee = (): void => {
  addEmployeeToStore({
    name: employeeForm.name,
    role: employeeForm.role,
    department: employeeForm.department,
    status: employeeForm.status,
  })
  closeModal()
}

const updateEmployee = (): void => {
  if (editingEmployeeId.value) {
    updateEmployeeInStore(editingEmployeeId.value, {
      name: employeeForm.name,
      role: employeeForm.role,
      department: employeeForm.department,
      status: employeeForm.status,
    })
    closeModal()
  }
}

const deleteEmployee = (id: number): void => {
  if (confirm('Are you sure you want to delete this employee?')) {
    deleteEmployeeFromStore(id)
  }
}

const closeModal = (): void => {
  showAddModal.value = false
  showEditModal.value = false
  editingEmployeeId.value = null
  employeeForm.name = ''
  employeeForm.role = ''
  employeeForm.department = 'Sales'
  employeeForm.status = 'active'
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
</script>
