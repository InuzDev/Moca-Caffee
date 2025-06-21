<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header with Back Button -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-4">
        <button
          @click="$router.back()"
          class="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors"
        >
          ← Back
        </button>
        <div>
          <h2 class="text-3xl font-bold text-amber-900">Customer Details</h2>
          <p class="text-amber-700">Complete customer information and history</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <button
          @click="showEditModal = true"
          class="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
        >
          Edit Customer
        </button>
        <button
          @click="deleteCustomer"
          class="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>

    <div v-if="customer" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Customer Profile -->
      <div class="lg:col-span-1">
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 p-8">
          <div class="text-center mb-6">
            <div
              class="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-4"
            >
              <span class="text-white text-3xl font-bold">{{ customer.name.charAt(0) }}</span>
            </div>
            <h3 class="text-2xl font-bold text-amber-900">{{ customer.name }}</h3>
            <p class="text-amber-600">{{ customer.email }}</p>
            <span
              :class="[
                'inline-block px-3 py-1 rounded-full text-sm font-medium mt-2',
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

          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b border-amber-200">
              <span class="text-amber-600 font-medium">Customer Value</span>
              <span class="text-amber-900 font-bold text-lg"
                >${{ customer.value.toLocaleString() }}</span
              >
            </div>
            <div class="flex justify-between items-center py-3 border-b border-amber-200">
              <span class="text-amber-600 font-medium">Last Contact</span>
              <span class="text-amber-900">{{ formatDate(customer.lastContact) }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b border-amber-200">
              <span class="text-amber-600 font-medium">Customer Since</span>
              <span class="text-amber-900">{{ formatDate(customer.createdAt) }}</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-amber-600 font-medium">Total Deals</span>
              <span class="text-amber-900 font-bold">{{ customerDeals.length }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div
          class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 p-6 mt-6"
        >
          <h4 class="text-lg font-bold text-amber-900 mb-4">Quick Actions</h4>
          <div class="space-y-3">
            <button
              @click="showContactModal = true"
              class="w-full text-left p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">📞</span>
              <span class="text-amber-900 font-medium">Log Contact</span>
            </button>
            <button
              @click="showDealModal = true"
              class="w-full text-left p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">💰</span>
              <span class="text-amber-900 font-medium">Create Deal</span>
            </button>
            <button
              class="w-full text-left p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">📧</span>
              <span class="text-amber-900 font-medium">Send Email</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Customer Activity -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Deals Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold text-amber-900">Active Deals</h4>
              <button
                @click="showDealModal = true"
                class="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                Add Deal +
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="customerDeals.length > 0" class="space-y-4">
              <div
                v-for="deal in customerDeals"
                :key="deal.id"
                class="p-4 bg-amber-50 rounded-lg border border-amber-200"
              >
                <div class="flex justify-between items-start mb-2">
                  <h5 class="font-semibold text-amber-900">{{ deal.title }}</h5>
                  <span class="text-lg font-bold text-green-600"
                    >${{ deal.value.toLocaleString() }}</span
                  >
                </div>
                <p class="text-amber-600 text-sm mb-2">{{ deal.description }}</p>
                <div class="flex justify-between items-center">
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      deal.status === 'Won'
                        ? 'bg-green-100 text-green-800'
                        : deal.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : deal.status === 'Lost'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800',
                    ]"
                  >
                    {{ deal.status }}
                  </span>
                  <span class="text-xs text-amber-600">{{ formatDate(deal.createdAt) }}</span>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <span class="text-4xl mb-4 block">💼</span>
              <p class="text-amber-600">No deals yet. Create the first one!</p>
            </div>
          </div>
        </div>

        <!-- Contact History -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold text-amber-900">Contact History</h4>
              <button
                @click="showContactModal = true"
                class="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                Log Contact +
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="contactHistory.length > 0" class="space-y-4">
              <div
                v-for="contact in contactHistory"
                :key="contact.id"
                class="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center space-x-2">
                    <span class="text-lg">{{ getContactIcon(contact.type) }}</span>
                    <span class="font-semibold text-amber-900">{{ contact.type }}</span>
                  </div>
                  <span class="text-xs text-amber-600">{{ formatDate(contact.date) }}</span>
                </div>
                <p class="text-amber-700">{{ contact.notes }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <span class="text-4xl mb-4 block">📞</span>
              <p class="text-amber-600">No contact history yet. Log your first interaction!</p>
            </div>
          </div>
        </div>

        <!-- Notes Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <h4 class="text-xl font-bold text-amber-900">Customer Notes</h4>
          </div>
          <div class="p-6">
            <textarea
              v-model="customerNotes"
              @blur="saveNotes"
              class="w-full h-32 p-4 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
              placeholder="Add notes about this customer..."
            ></textarea>
            <p class="text-xs text-amber-600 mt-2">
              Notes are automatically saved when you click outside the text area.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Not Found -->
    <div v-else class="text-center py-20">
      <div class="text-6xl mb-4">😕</div>
      <h3 class="text-2xl font-bold text-amber-900 mb-2">Customer Not Found</h3>
      <p class="text-amber-600 mb-6">
        The customer you're looking for doesn't exist or may have been deleted.
      </p>
      <router-link
        to="/customers"
        class="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
      >
        Back to Customers
      </router-link>
    </div>

    <!-- Edit Customer Modal -->
    <div
      v-if="showEditModal && customer"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">Edit Customer</h3>
        <form @submit.prevent="updateCustomer">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Name</label>
              <input
                v-model="editForm.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Email</label>
              <input
                v-model="editForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Value</label>
              <input
                v-model.number="editForm.value"
                type="number"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Status</label>
              <select
                v-model="editForm.status"
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
              Update Customer
            </button>
            <button
              type="button"
              @click="showEditModal = false"
              class="flex-1 border-2 border-amber-300 text-amber-700 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Contact Modal -->
    <div
      v-if="showContactModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">Log Contact</h3>
        <form @submit.prevent="addContact">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Contact Type</label>
              <select
                v-model="contactForm.type"
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="Phone Call">Phone Call</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Notes</label>
              <textarea
                v-model="contactForm.notes"
                required
                class="w-full h-24 px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                placeholder="What was discussed?"
              ></textarea>
            </div>
          </div>
          <div class="flex space-x-4 mt-8">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
            >
              Log Contact
            </button>
            <button
              type="button"
              @click="showContactModal = false"
              class="flex-1 border-2 border-amber-300 text-amber-700 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Deal Modal -->
    <div
      v-if="showDealModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">Create Deal</h3>
        <form @submit.prevent="addDeal">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Deal Title</label>
              <input
                v-model="dealForm.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="Deal name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Value</label>
              <input
                v-model.number="dealForm.value"
                type="number"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Description</label>
              <textarea
                v-model="dealForm.description"
                class="w-full h-24 px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                placeholder="Deal description"
              ></textarea>
            </div>
          </div>
          <div class="flex space-x-4 mt-8">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              Create Deal
            </button>
            <button
              type="button"
              @click="showDealModal = false"
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
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'
import type { Customer, CustomerForm } from '../types'

interface Deal {
  id: number
  customerId: number
  title: string
  value: number
  description: string
  status: 'In Progress' | 'Won' | 'Lost' | 'Pending'
  createdAt: Date
}

interface Contact {
  id: number
  customerId: number
  type: 'Phone Call' | 'Email' | 'Meeting' | 'Follow-up'
  notes: string
  date: Date
}

const route = useRoute()
const router = useRouter()
const {
  getCustomerById,
  updateCustomer: updateCustomerInStore,
  deleteCustomer: deleteCustomerFromStore,
} = useStore()

// Reactive state
const customer = ref<Customer | undefined>()
const showEditModal = ref<boolean>(false)
const showContactModal = ref<boolean>(false)
const showDealModal = ref<boolean>(false)
const customerNotes = ref<string>('')

// Sample data for deals and contacts
const deals = ref<Deal[]>([
  {
    id: 1,
    customerId: 1,
    title: 'Website Redesign Project',
    value: 15000,
    description: 'Complete website overhaul with modern design',
    status: 'In Progress',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 2,
    customerId: 1,
    title: 'SEO Optimization',
    value: 5000,
    description: 'Search engine optimization package',
    status: 'Won',
    createdAt: new Date('2024-01-05'),
  },
])

const contacts = ref<Contact[]>([
  {
    id: 1,
    customerId: 1,
    type: 'Phone Call',
    notes: 'Discussed project requirements and timeline. Customer is very interested.',
    date: new Date('2024-01-15'),
  },
  {
    id: 2,
    customerId: 1,
    type: 'Email',
    notes: 'Sent project proposal and pricing information.',
    date: new Date('2024-01-12'),
  },
])

// Form data
const editForm = reactive<CustomerForm>({
  name: '',
  email: '',
  value: 0,
  status: 'Active',
})

const contactForm = reactive({
  type: 'Phone Call' as Contact['type'],
  notes: '',
})

const dealForm = reactive({
  title: '',
  value: 0,
  description: '',
})

// Computed properties
const customerDeals = computed<Deal[]>(() =>
  deals.value.filter((deal) => deal.customerId === customer.value?.id),
)

const contactHistory = computed<Contact[]>(() =>
  contacts.value
    .filter((contact) => contact.customerId === customer.value?.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime()),
)

// Methods
const loadCustomer = (): void => {
  const customerId = parseInt(route.params.id as string)
  customer.value = getCustomerById(customerId)

  if (customer.value) {
    editForm.name = customer.value.name
    editForm.email = customer.value.email
    editForm.value = customer.value.value
    editForm.status = customer.value.status
    customerNotes.value = `Customer notes for ${customer.value.name}...`
  }
}

const updateCustomer = (): void => {
  if (customer.value) {
    updateCustomerInStore(customer.value.id, editForm)
    customer.value = { ...customer.value, ...editForm }
    showEditModal.value = false
  }
}

const deleteCustomer = (): void => {
  if (customer.value && confirm('Are you sure you want to delete this customer?')) {
    deleteCustomerFromStore(customer.value.id)
    router.push('/customers')
  }
}

const addContact = (): void => {
  if (customer.value) {
    const newContact: Contact = {
      id: contacts.value.length + 1,
      customerId: customer.value.id,
      type: contactForm.type,
      notes: contactForm.notes,
      date: new Date(),
    }
    contacts.value.unshift(newContact)
    contactForm.type = 'Phone Call'
    contactForm.notes = ''
    showContactModal.value = false
  }
}

const addDeal = (): void => {
  if (customer.value) {
    const newDeal: Deal = {
      id: deals.value.length + 1,
      customerId: customer.value.id,
      title: dealForm.title,
      value: dealForm.value,
      description: dealForm.description,
      status: 'In Progress',
      createdAt: new Date(),
    }
    deals.value.unshift(newDeal)
    dealForm.title = ''
    dealForm.value = 0
    dealForm.description = ''
    showDealModal.value = false
  }
}

const saveNotes = (): void => {
  // In a real app, this would save to backend
  console.log('Saving notes:', customerNotes.value)
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const getContactIcon = (type: Contact['type']): string => {
  const icons = {
    'Phone Call': '📞',
    Email: '📧',
    Meeting: '🤝',
    'Follow-up': '📋',
  }
  return icons[type]
}

onMounted(() => {
  loadCustomer()
})
</script>
