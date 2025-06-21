<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header with Back Button -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-4">
        <button
          @click="$router.back()"
          class="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
        >
          ← Back
        </button>
        <div>
          <h2 class="text-3xl font-bold text-amber-900">Employee Profile</h2>
          <p class="text-amber-700">Complete employee information and performance</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <button
          @click="showEditModal = true"
          class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
        >
          Edit Profile
        </button>
        <button
          @click="deleteEmployee"
          class="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>

    <div v-if="employee" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Employee Profile -->
      <div class="lg:col-span-1">
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 p-8">
          <div class="text-center mb-6">
            <div
              class="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto flex items-center justify-center mb-4"
            >
              <span class="text-white text-3xl font-bold">{{ employee.name.charAt(0) }}</span>
            </div>
            <h3 class="text-2xl font-bold text-amber-900">{{ employee.name }}</h3>
            <p class="text-amber-600 font-medium">{{ employee.role }}</p>
            <p class="text-amber-500 text-sm">{{ employee.department }} Department</p>
            <div class="flex items-center justify-center mt-2">
              <div
                :class="[
                  'w-3 h-3 rounded-full mr-2',
                  employee.status === 'active' ? 'bg-green-400' : 'bg-gray-400',
                ]"
              ></div>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium capitalize',
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800',
                ]"
              >
                {{ employee.status }}
              </span>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b border-amber-200">
              <span class="text-amber-600 font-medium">Employee ID</span>
              <span class="text-amber-900 font-mono"
                >#{{ employee.id.toString().padStart(4, '0') }}</span
              >
            </div>
            <div class="flex justify-between items-center py-3 border-b border-amber-200">
              <span class="text-amber-600 font-medium">Start Date</span>
              <span class="text-amber-900">{{ formatDate(employee.startDate) }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b border-amber-200">
              <span class="text-amber-600 font-medium">Years of Service</span>
              <span class="text-amber-900 font-bold">{{ yearsOfService }} years</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-amber-600 font-medium">Performance Score</span>
              <div class="flex items-center space-x-2">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${performanceScore}%` }"
                  ></div>
                </div>
                <span class="text-amber-900 font-bold text-sm">{{ performanceScore }}%</span>
              </div>
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
              @click="showReviewModal = true"
              class="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">⭐</span>
              <span class="text-blue-900 font-medium">Add Review</span>
            </button>
            <button
              @click="showTaskModal = true"
              class="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">📋</span>
              <span class="text-blue-900 font-medium">Assign Task</span>
            </button>
            <button
              class="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">📊</span>
              <span class="text-blue-900 font-medium">View Reports</span>
            </button>
            <button
              class="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">💬</span>
              <span class="text-blue-900 font-medium">Send Message</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Employee Activity -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Performance Metrics -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <h4 class="text-xl font-bold text-amber-900">Performance Metrics</h4>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ completedTasks }}</div>
                <div class="text-amber-600 text-sm">Tasks Completed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ projectsLed }}</div>
                <div class="text-amber-600 text-sm">Projects Led</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-600">{{ teamRating }}/5</div>
                <div class="text-amber-600 text-sm">Team Rating</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-orange-600">{{ attendanceRate }}%</div>
                <div class="text-amber-600 text-sm">Attendance</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Reviews -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold text-amber-900">Performance Reviews</h4>
              <button
                @click="showReviewModal = true"
                class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                Add Review +
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="reviews.length > 0" class="space-y-4">
              <div
                v-for="review in reviews"
                :key="review.id"
                class="p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center space-x-2">
                    <div class="flex">
                      <span v-for="i in 5" :key="i" class="text-lg">
                        {{ i <= review.rating ? '⭐' : '☆' }}
                      </span>
                    </div>
                    <span class="font-semibold text-blue-900">{{ review.period }}</span>
                  </div>
                  <span class="text-xs text-blue-600">{{ formatDate(review.date) }}</span>
                </div>
                <p class="text-blue-700 text-sm mb-2">{{ review.feedback }}</p>
                <div class="text-xs text-blue-600">Reviewed by: {{ review.reviewer }}</div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <span class="text-4xl mb-4 block">⭐</span>
              <p class="text-amber-600">No reviews yet. Add the first performance review!</p>
            </div>
          </div>
        </div>

        <!-- Current Tasks -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold text-amber-900">Current Tasks</h4>
              <button
                @click="showTaskModal = true"
                class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                Assign Task +
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="tasks.length > 0" class="space-y-4">
              <div
                v-for="task in tasks"
                :key="task.id"
                class="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400"
              >
                <div class="flex justify-between items-start mb-2">
                  <h5 class="font-semibold text-amber-900">{{ task.title }}</h5>
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      task.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800',
                    ]"
                  >
                    {{ task.priority }}
                  </span>
                </div>
                <p class="text-amber-600 text-sm mb-2">{{ task.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xs text-amber-600">Due: {{ formatDate(task.dueDate) }}</span>
                  <div class="flex items-center space-x-2">
                    <div class="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full"
                        :style="{ width: `${task.progress}%` }"
                      ></div>
                    </div>
                    <span class="text-xs text-amber-700">{{ task.progress }}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <span class="text-4xl mb-4 block">📋</span>
              <p class="text-amber-600">No current tasks. Assign a new task!</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Employee Not Found -->
    <div v-else class="text-center py-20">
      <div class="text-6xl mb-4">😕</div>
      <h3 class="text-2xl font-bold text-amber-900 mb-2">Employee Not Found</h3>
      <p class="text-amber-600 mb-6">
        The employee you're looking for doesn't exist or may have been deleted.
      </p>
      <router-link
        to="/employees"
        class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
      >
        Back to Employees
      </router-link>
    </div>

    <!-- Edit Employee Modal -->
    <div
      v-if="showEditModal && employee"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">Edit Employee</h3>
        <form @submit.prevent="updateEmployee">
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
              <label class="block text-sm font-medium text-amber-700 mb-2">Role</label>
              <input
                v-model="editForm.role"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Department</label>
              <select
                v-model="editForm.department"
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
                v-model="editForm.status"
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
              Update Employee
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

    <!-- Review Modal -->
    <div
      v-if="showReviewModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">Add Performance Review</h3>
        <form @submit.prevent="addReview">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Review Period</label>
              <input
                v-model="reviewForm.period"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="Q1 2024"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Rating (1-5)</label>
              <select
                v-model.number="reviewForm.rating"
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option :value="1">1 - Needs Improvement</option>
                <option :value="2">2 - Below Average</option>
                <option :value="3">3 - Average</option>
                <option :value="4">4 - Above Average</option>
                <option :value="5">5 - Excellent</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Feedback</label>
              <textarea
                v-model="reviewForm.feedback"
                required
                class="w-full h-24 px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                placeholder="Performance feedback..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Reviewer</label>
              <input
                v-model="reviewForm.reviewer"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="Manager name"
              />
            </div>
          </div>
          <div class="flex space-x-4 mt-8">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
            >
              Add Review
            </button>
            <button
              type="button"
              @click="showReviewModal = false"
              class="flex-1 border-2 border-amber-300 text-amber-700 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Task Modal -->
    <div
      v-if="showTaskModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">Assign Task</h3>
        <form @submit.prevent="addTask">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Task Title</label>
              <input
                v-model="taskForm.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="Task name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Description</label>
              <textarea
                v-model="taskForm.description"
                class="w-full h-24 px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                placeholder="Task description"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Priority</label>
              <select
                v-model="taskForm.priority"
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-amber-700 mb-2">Due Date</label>
              <input
                v-model="taskForm.dueDate"
                type="date"
                required
                class="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div class="flex space-x-4 mt-8">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
            >
              Assign Task
            </button>
            <button
              type="button"
              @click="showTaskModal = false"
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
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'
import type { Employee, EmployeeForm } from '../types'

interface Review {
  id: number
  employeeId: number
  period: string
  rating: number
  feedback: string
  reviewer: string
  date: Date
}

interface Task {
  id: number
  employeeId: number
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  progress: number
  dueDate: Date
  createdAt: Date
}

const route = useRoute()
const router = useRouter()
const {
  getEmployeeById,
  updateEmployee: updateEmployeeInStore,
  deleteEmployee: deleteEmployeeFromStore,
} = useStore()

// Reactive state
const employee = ref<Employee | undefined>()
const showEditModal = ref<boolean>(false)
const showReviewModal = ref<boolean>(false)
const showTaskModal = ref<boolean>(false)

// Sample data
const reviews = ref<Review[]>([
  {
    id: 1,
    employeeId: 1,
    period: 'Q4 2023',
    rating: 5,
    feedback:
      'Exceptional performance this quarter. Exceeded all targets and showed great leadership.',
    reviewer: 'John Manager',
    date: new Date('2023-12-15'),
  },
  {
    id: 2,
    employeeId: 1,
    period: 'Q3 2023',
    rating: 4,
    feedback: 'Strong performance with room for improvement in time management.',
    reviewer: 'John Manager',
    date: new Date('2023-09-15'),
  },
])

const tasks = ref<Task[]>([
  {
    id: 1,
    employeeId: 1,
    title: 'Complete Q1 Sales Report',
    description: 'Prepare comprehensive sales analysis for Q1 2024',
    priority: 'High',
    progress: 75,
    dueDate: new Date('2024-02-01'),
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    employeeId: 1,
    title: 'Team Training Session',
    description: 'Conduct training session for new team members',
    priority: 'Medium',
    progress: 30,
    dueDate: new Date('2024-01-30'),
    createdAt: new Date('2024-01-10'),
  },
])

// Form data
const editForm = reactive<EmployeeForm>({
  name: '',
  role: '',
  department: 'Sales',
  status: 'active',
})

const reviewForm = reactive({
  period: '',
  rating: 5,
  feedback: '',
  reviewer: '',
})

const taskForm = reactive({
  title: '',
  description: '',
  priority: 'Medium' as Task['priority'],
  dueDate: '',
})

// Computed properties
const yearsOfService = computed<number>(() => {
  if (!employee.value) return 0
  const years =
    (new Date().getTime() - employee.value.startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  return Math.floor(years)
})

const performanceScore = computed<number>(() => {
  const employeeReviews = reviews.value.filter((r) => r.employeeId === employee.value?.id)
  if (employeeReviews.length === 0) return 85
  const avgRating = employeeReviews.reduce((sum, r) => sum + r.rating, 0) / employeeReviews.length
  return Math.round((avgRating / 5) * 100)
})

const completedTasks = computed<number>(() => 24)
const projectsLed = computed<number>(() => 8)
const teamRating = computed<number>(() => 4.8)
const attendanceRate = computed<number>(() => 96)

// Methods
const loadEmployee = (): void => {
  const employeeId = parseInt(route.params.id as string)
  employee.value = getEmployeeById(employeeId)

  if (employee.value) {
    editForm.name = employee.value.name
    editForm.role = employee.value.role
    editForm.department = employee.value.department
    editForm.status = employee.value.status
  }
}

const updateEmployee = (): void => {
  if (employee.value) {
    updateEmployeeInStore(employee.value.id, editForm)
    employee.value = { ...employee.value, ...editForm }
    showEditModal.value = false
  }
}

const deleteEmployee = (): void => {
  if (employee.value && confirm('Are you sure you want to delete this employee?')) {
    deleteEmployeeFromStore(employee.value.id)
    router.push('/employees')
  }
}

const addReview = (): void => {
  if (employee.value) {
    const newReview: Review = {
      id: reviews.value.length + 1,
      employeeId: employee.value.id,
      period: reviewForm.period,
      rating: reviewForm.rating,
      feedback: reviewForm.feedback,
      reviewer: reviewForm.reviewer,
      date: new Date(),
    }
    reviews.value.unshift(newReview)
    reviewForm.period = ''
    reviewForm.rating = 5
    reviewForm.feedback = ''
    reviewForm.reviewer = ''
    showReviewModal.value = false
  }
}

const addTask = (): void => {
  if (employee.value) {
    const newTask: Task = {
      id: tasks.value.length + 1,
      employeeId: employee.value.id,
      title: taskForm.title,
      description: taskForm.description,
      priority: taskForm.priority,
      progress: 0,
      dueDate: new Date(taskForm.dueDate),
      createdAt: new Date(),
    }
    tasks.value.unshift(newTask)
    taskForm.title = ''
    taskForm.description = ''
    taskForm.priority = 'Medium'
    taskForm.dueDate = ''
    showTaskModal.value = false
  }
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

onMounted(() => {
  loadEmployee()
})
</script>
