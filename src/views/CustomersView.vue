<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h2 class="text-3xl font-bold text-amber-900 mb-2">Customer Management 👥</h2>
        <p class="text-amber-700">Manage your valued customers with care</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
      >
        Add Customer +
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-amber-200">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search customers..."
            class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
          />
        </div>
        <select
          v-model="statusFilter"
          class="px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>

    <!-- Customers Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="customer in filteredCustomers"
        :key="customer.id"
        class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
        @click="viewCustomer(customer.id)"
      >
        <div class="flex items-center space-x-4 mb-4">
          <div
            class="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white font-bold text-lg">{{ customer.name.charAt(0) }}</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-amber-900">{{ customer.name }}</h3>
            <p class="text-sm text-amber-600">{{ customer.email }}</p>
          </div>
          <div class="text-right">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                customer.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : customer.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ customer.status }}
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm text-amber-600">Customer Value</span>
            <span class="font-semibold text-amber-900">${{ customer.value.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-amber-600">Last Contact</span>
            <span class="text-sm text-amber-700">{{ formatDate(customer.lastContact) }}</span>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-amber-200 flex space-x-2">
          <button
            @click.stop="editCustomer(customer)"
            class="flex-1 bg-amber-100 text-amber-800 py-2 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
          >
            Edit
          </button>
          <button
            @click.stop="deleteCustomer(customer.id)"
            class="flex-1 bg-red-100 text-red-800 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Customer Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">
          {{ showEditModal ? 'Edit Customer' : 'Add New Customer' }}
        </h3>
        <form @submit.prevent="showEditModal ? updateCustomer() : addCustomer()">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Name</label>
              <input
                v-model="customerForm.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="Customer name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Email</label>
              <input
                v-model="customerForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Value</label>
              <input
                v-model.number="customerForm.value"
                type="number"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Status</label>
              <select
                v-model="customerForm.status"
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div class="flex space-x-4 mt-8">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
            >
              {{ showEditModal ? 'Update' : 'Add' }} Customer
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
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'
import type { Customer, CustomerForm } from '../types'

const router = useRouter()
const {
  customers,
  addCustomer: addCustomerToStore,
  updateCustomer: updateCustomerInStore,
  deleteCustomer: deleteCustomerFromStore,
} = useStore()

// Reactive state
const searchQuery = ref<string>('')
const statusFilter = ref<string>('')
const showAddModal = ref<boolean>(false)
const showEditModal = ref<boolean>(false)
const editingCustomerId = ref<number | null>(null)

// Form data
const customerForm = reactive<CustomerForm>({
  name: '',
  email: '',
  value: 0,
  status: 'Active',
})

// Computed properties
const filteredCustomers = computed<Customer[]>(() => {
  let filtered = customers.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) || customer.email.toLowerCase().includes(query),
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter((customer) => customer.status === statusFilter.value)
  }

  return filtered
})

// Methods
const viewCustomer = (id: number): void => {
  router.push(`/customers/${id}`)
}

const editCustomer = (customer: Customer): void => {
  editingCustomerId.value = customer.id
  customerForm.name = customer.name
  customerForm.email = customer.email
  customerForm.value = customer.value
  customerForm.status = customer.status
  showEditModal.value = true
}

const addCustomer = (): void => {
  addCustomerToStore({
    name: customerForm.name,
    email: customerForm.email,
    value: customerForm.value,
    status: customerForm.status,
  })
  closeModal()
}

const updateCustomer = (): void => {
  if (editingCustomerId.value) {
    updateCustomerInStore(editingCustomerId.value, {
      name: customerForm.name,
      email: customerForm.email,
      value: customerForm.value,
      status: customerForm.status,
    })
    closeModal()
  }
}

const deleteCustomer = (id: number): void => {
  if (confirm('Are you sure you want to delete this customer?')) {
    deleteCustomerFromStore(id)
  }
}

const closeModal = (): void => {
  showAddModal.value = false
  showEditModal.value = false
  editingCustomerId.value = null
  customerForm.name = ''
  customerForm.email = ''
  customerForm.value = 0
  customerForm.status = 'Active'
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
</script>
