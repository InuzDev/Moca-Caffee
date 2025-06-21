<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50"
  >
    <div class="text-center max-w-md mx-auto px-4">
      <!-- Coffee Cup Animation -->
      <div class="mb-8 relative">
        <div
          class="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full mx-auto flex items-center justify-center shadow-2xl animate-bounce"
        >
          <span class="text-white text-6xl">☕</span>
        </div>
        <!-- Steam Animation -->
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div class="flex space-x-1">
            <div class="w-1 h-8 bg-gray-300 rounded-full opacity-60 animate-pulse"></div>
            <div
              class="w-1 h-6 bg-gray-300 rounded-full opacity-40 animate-pulse"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="w-1 h-8 bg-gray-300 rounded-full opacity-60 animate-pulse"
              style="animation-delay: 0.4s"
            ></div>
          </div>
        </div>
      </div>

      <!-- Error Content -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-200">
        <h1 class="text-6xl font-bold text-amber-900 mb-4">404</h1>
        <h2 class="text-2xl font-bold text-amber-800 mb-4">Oops! Page Not Found</h2>
        <p class="text-amber-600 mb-8 leading-relaxed">
          Looks like this page got lost in the coffee shop! ☕<br />
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <!-- Action Buttons -->
        <div class="space-y-4">
          <router-link
            to="/"
            class="block w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🏠 Go Home
          </router-link>

          <div class="flex space-x-4">
            <router-link
              to="/dashboard"
              class="flex-1 border-2 border-amber-400 text-amber-700 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition-all duration-200"
            >
              📊 Dashboard
            </router-link>
            <router-link
              to="/customers"
              class="flex-1 border-2 border-amber-400 text-amber-700 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition-all duration-200"
            >
              👥 Customers
            </router-link>
          </div>
        </div>

        <!-- Helpful Links -->
        <div class="mt-8 pt-6 border-t border-amber-200">
          <p class="text-sm text-amber-600 mb-4">Maybe you were looking for:</p>
          <div class="flex flex-wrap justify-center gap-2">
            <router-link
              to="/employees"
              class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
            >
              Employees
            </router-link>
            <router-link
              to="/dashboard"
              class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
            >
              Dashboard
            </router-link>
            <button
              class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
            >
              Reports
            </button>
            <button
              class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>

        <!-- Fun Message -->
        <div class="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p class="text-amber-700 text-sm">
            <span class="font-semibold">Fun Fact:</span> While you're here, did you know that coffee
            is the world's second-most traded commodity after oil? ☕✨
          </p>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 text-amber-300 text-2xl animate-pulse opacity-50">☕</div>
      <div
        class="absolute bottom-20 right-10 text-amber-300 text-xl animate-pulse opacity-30"
        style="animation-delay: 1s"
      >
        🫖
      </div>
      <div
        class="absolute top-1/3 right-20 text-amber-300 text-lg animate-pulse opacity-40"
        style="animation-delay: 2s"
      >
        🧁
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Log 404 for analytics (in a real app)
  console.log('404 Page accessed:', window.location.pathname)
})
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
