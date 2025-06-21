<template>
  <div class="relative">
    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <div class="mb-8">
          <div
            class="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg"
          >
            <span class="text-white text-4xl">☕</span>
          </div>
          <h1 class="text-5xl font-bold text-amber-900 mb-4">Welcome to Mocaccino CRM/ERM</h1>
          <p class="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
            A warm and delightful way to manage your customers and employees. Sweet, simple, and
            perfectly brewed for your business needs.
          </p>
        </div>

        <div class="flex justify-center space-x-4 mb-16">
          <router-link
            to="/dashboard"
            class="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started ✨
          </router-link>
          <button
            class="border-2 border-amber-400 text-amber-700 px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition-all duration-200"
          >
            Learn More
          </button>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-8 mt-20">
        <div
          class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200"
        >
          <div
            class="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <span class="text-white text-2xl">👥</span>
          </div>
          <h3 class="text-xl font-bold text-amber-900 mb-2">Customer Management</h3>
          <p class="text-amber-700 mb-4">
            Keep track of your customers with love and care, just like brewing the perfect cup.
          </p>
          <router-link
            to="/customers"
            class="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
          >
            Manage Customers →
          </router-link>
        </div>

        <div
          class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200"
        >
          <div
            class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <span class="text-white text-2xl">💼</span>
          </div>
          <h3 class="text-xl font-bold text-amber-900 mb-2">Employee Relations</h3>
          <p class="text-amber-700 mb-4">
            Nurture your team relationships with the warmth of a cozy coffee shop atmosphere.
          </p>
          <router-link
            to="/employees"
            class="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
          >
            Manage Team →
          </router-link>
        </div>

        <div
          class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200"
        >
          <div
            class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <span class="text-white text-2xl">📊</span>
          </div>
          <h3 class="text-xl font-bold text-amber-900 mb-2">Sweet Analytics</h3>
          <p class="text-amber-700 mb-4">
            Get insights as rich and satisfying as your favorite mocaccino blend.
          </p>
          <router-link
            to="/dashboard"
            class="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
          >
            View Dashboard →
          </router-link>
        </div>
      </div>

      <!-- Quick Stats Preview -->
      <div
        class="mt-20 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200"
      >
        <h3 class="text-2xl font-bold text-amber-900 mb-6 text-center">
          Your Business at a Glance
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-amber-900">{{ stats.totalCustomers }}</div>
            <div class="text-amber-600 text-sm">Happy Customers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-amber-900">{{ stats.activeEmployees }}</div>
            <div class="text-amber-600 text-sm">Team Members</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-amber-900">{{ stats.openDeals }}</div>
            <div class="text-amber-600 text-sm">Active Deals</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-amber-900">
              ${{ (stats.revenue / 1000).toFixed(0) }}K
            </div>
            <div class="text-amber-600 text-sm">Revenue</div>
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
</script>
