<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <!-- Mobile Header -->
    <header
      class="bg-white/90 backdrop-blur-sm shadow-lg border-b border-amber-200 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span class="text-white text-xl font-bold">☕</span>
              </div>
              <div class="hidden min-[810px]:block">
                <h1 class="text-xl font-bold text-amber-900">Mocaccino CRM/ERM</h1>
                <p class="text-xs text-amber-600 -mt-1">Customer & Employee Management</p>
              </div>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-1">
            <router-link
              to="/"
              class="px-4 py-2 rounded-full text-amber-700 hover:bg-amber-100 transition-all duration-200 font-medium"
              :class="{ 'bg-amber-100 text-amber-900': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link
              to="/dashboard"
              class="px-4 py-2 rounded-full text-amber-700 hover:bg-amber-100 transition-all duration-200 font-medium"
              :class="{ 'bg-amber-100 text-amber-900': $route.path === '/dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link
              to="/customers"
              class="px-4 py-2 rounded-full text-amber-700 hover:bg-amber-100 transition-all duration-200 font-medium"
              :class="{ 'bg-amber-100 text-amber-900': $route.path === '/customers' }"
            >
              Customers
            </router-link>
            <router-link
              to="/employees"
              class="px-4 py-2 rounded-full text-amber-700 hover:bg-amber-100 transition-all duration-200 font-medium"
              :class="{ 'bg-amber-100 text-amber-900': $route.path === '/employees' }"
            >
              Employees
            </router-link>
          </nav>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              class="p-2 rounded-full text-amber-700 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
              :class="{ 'bg-amber-100': isMobileMenuOpen }"
            >
              <svg
                class="w-6 h-6 transition-transform duration-200"
                :class="{ 'rotate-90': isMobileMenuOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="!isMobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Desktop User Menu -->
          <div class="hidden md:flex items-center space-x-4">
            <div class="flex items-center space-x-2 px-3 py-2 bg-amber-100 rounded-full">
              <div
                class="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <span class="text-white text-sm font-bold">U</span>
              </div>
              <span class="text-amber-900 font-medium text-sm">User</span>
            </div>
            <button class="p-2 text-amber-700 hover:bg-amber-100 rounded-full transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden">
          <div
            class="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-amber-200 shadow-lg"
          >
            <!-- Mobile Navigation Links -->
            <router-link
              to="/"
              @click="closeMobileMenu"
              class="block px-4 py-3 rounded-lg text-amber-700 hover:bg-amber-100 transition-all duration-200 font-medium"
              :class="{ 'bg-amber-100 text-amber-900': $route.path === '/' }"
            >
              <div class="flex items-center space-x-3">
                <span class="text-xl">🏠</span>
                <span>Home</span>
              </div>
            </router-link>

            <router-link
              to="/dashboard"
              @click="closeMobileMenu"
              class="block px-4 py-3 rounded-lg text-amber-700 hover:bg-amber-100 transition-all duration-200 font-medium"
              :class="{ 'bg-amber-100 text-amber-900': $route.path === '/dashboard' }"
            >
              <div class="flex items-center space-x-3">
                <span class="text-xl">📊</span>
                <span>Dashboard</span>
              </div>
            </router-link>

            <router-link
              to="/customers"
              @click="closeMobileMenu"
              class="block px-4 py-3 rounded-lg text-amber-700 hover:bg-amber-100 transition-all duration-200 font-medium"
              :class="{ 'bg-amber-100 text-amber-900': $route.path === '/customers' }"
            >
              <div class="flex items-center space-x-3">
                <span class="text-xl">👥</span>
                <span>Customers</span>
              </div>
            </router-link>

            <router-link
              to="/employees"
              @click="closeMobileMenu"
              class="block px-4 py-3 rounded-lg text-amber-700 hover:bg-amber-100 transition-all duration-200 font-medium"
              :class="{ 'bg-amber-100 text-amber-900': $route.path === '/employees' }"
            >
              <div class="flex items-center space-x-3">
                <span class="text-xl">👤</span>
                <span>Employees</span>
              </div>
            </router-link>

            <!-- Mobile User Section -->
            <div class="pt-4 mt-4 border-t border-amber-200">
              <div class="flex items-center px-4 py-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-3"
                >
                  <span class="text-white font-bold">U</span>
                </div>
                <div>
                  <p class="text-amber-900 font-medium">User Account</p>
                  <p class="text-amber-600 text-sm">user@mocaccino.com</p>
                </div>
              </div>

              <div class="px-4 py-2 space-y-2">
                <button
                  class="w-full text-left px-4 py-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Settings</span>
                </button>

                <button
                  class="w-full text-left px-4 py-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </header>

    <!-- Router View -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

#app {
  font-family: 'Quicksand', sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #d2b48c;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8b4513;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Performance optimizations */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Hover effects */
button:hover {
  transform: translateY(-1px);
}

.shadow-lg:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Router link active styles */
.router-link-active {
  font-weight: 600;
}
</style>
