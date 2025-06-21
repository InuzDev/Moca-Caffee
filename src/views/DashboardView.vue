<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Dashboard Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-amber-900 mb-2">Dashboard ☕</h2>
      <p class="text-amber-700">Your business overview, served fresh daily</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-amber-600 text-sm font-medium">Total Customers</p>
            <p class="text-2xl font-bold text-amber-900">{{ stats.totalCustomers }}</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xl">👥</span>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-amber-600 text-sm font-medium">Active Employees</p>
            <p class="text-2xl font-bold text-amber-900">{{ stats.activeEmployees }}</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xl">💼</span>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-amber-600 text-sm font-medium">Open Deals</p>
            <p class="text-2xl font-bold text-amber-900">{{ stats.openDeals }}</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xl">💰</span>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-amber-600 text-sm font-medium">Revenue</p>
            <p class="text-2xl font-bold text-amber-900">${{ stats.revenue.toLocaleString() }}</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xl">📈</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Activity -->
      <div class="lg:col-span-2">
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-amber-900">Recent Customers</h3>
              <router-link
                to="/customers"
                class="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
              >
                View All →
              </router-link>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="customer in recentCustomers"
                :key="customer.id"
                class="flex items-center justify-between p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 cursor-pointer"
                @click="$router.push(`/customers/${customer.id}`)"
              >
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white font-bold">{{ customer.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="font-semibold text-amber-900">{{ customer.name }}</p>
                    <p class="text-sm text-amber-600">{{ customer.email }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-amber-900">
                    ${{ customer.value.toLocaleString() }}
                  </p>
                  <p class="text-xs text-amber-600">{{ customer.status }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions & Team -->
      <div class="space-y-6">
        <!-- Team Members -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-amber-900">Team Members</h3>
              <router-link
                to="/employees"
                class="text-amber-600 hover:text-amber-800 text-sm font-medium"
              >
                View All →
              </router-link>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <div
                v-for="employee in employees.slice(0, 4)"
                :key="employee.id"
                class="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 cursor-pointer"
                @click="$router.push(`/employees/${employee.id}`)"
              >
                <div
                  class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-sm font-bold">{{ employee.name.charAt(0) }}</span>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-amber-900 text-sm">{{ employee.name }}</p>
                  <p class="text-xs text-amber-600">{{ employee.role }}</p>
                </div>
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
          <div class="p-6 border-b border-amber-200">
            <h3 class="text-xl font-bold text-amber-900">Quick Actions</h3>
          </div>
          <div class="p-6 space-y-3">
            <router-link
              to="/customers?action=new"
              class="w-full text-left p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">👥</span>
              <span class="text-amber-900 font-medium">Add New Customer</span>
            </router-link>
            <router-link
              to="/employees?action=new"
              class="w-full text-left p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">💼</span>
              <span class="text-amber-900 font-medium">Add New Employee</span>
            </router-link>
            <button
              class="w-full text-left p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">📊</span>
              <span class="text-amber-900 font-medium">Generate Report</span>
            </button>
            <button
              class="w-full text-left p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 flex items-center space-x-3"
            >
              <span class="text-lg">⚙️</span>
              <span class="text-amber-900 font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/composables/useStore'
import { computed } from 'vue'

const { customers, employees } = useStore()

const stats = computed(() => ({
  totalCustomers: customers.value.length,
  activeEmployees: employees.value.filter((emp) => emp.status === 'active').length,
  openDeals: customers.value.filter((customer) => customer.status === 'Pending').length,
  revenue: customers.value.reduce((total, customer) => total + customer.value, 0),
}))

const recentCustomers = computed(() => customers.value.slice(0, 5))
</script>
