<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-sm font-bold">☕</span>
            </div>
            <router-link
              to="/"
              class="text-xl font-bold text-amber-900 hover:text-amber-700 transition-colors"
            >
              Mocaccino CRM/ERM
            </router-link>
          </div>
          <div class="flex space-x-6">
            <router-link
              to="/"
              class="px-4 py-2 rounded-full transition-all duration-200"
              :class="
                $route.name === 'Home'
                  ? 'bg-amber-200 text-amber-900'
                  : 'text-amber-700 hover:bg-amber-100'
              "
            >
              Home
            </router-link>
            <router-link
              to="/dashboard"
              class="px-4 py-2 rounded-full transition-all duration-200"
              :class="
                $route.name === 'Dashboard'
                  ? 'bg-amber-200 text-amber-900'
                  : 'text-amber-700 hover:bg-amber-100'
              "
            >
              Dashboard
            </router-link>
            <router-link
              to="/customers"
              class="px-4 py-2 rounded-full transition-all duration-200"
              :class="
                $route.name === 'Customers'
                  ? 'bg-amber-200 text-amber-900'
                  : 'text-amber-700 hover:bg-amber-100'
              "
            >
              Customers
            </router-link>
            <router-link
              to="/employees"
              class="px-4 py-2 rounded-full transition-all duration-200"
              :class="
                $route.name === 'Employees'
                  ? 'bg-amber-200 text-amber-900'
                  : 'text-amber-700 hover:bg-amber-100'
              "
            >
              Employees
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Router View -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const $route = useRoute()
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
