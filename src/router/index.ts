// import { createRouter, createWebHistory } from 'vue-router'
// import DashboardView from '../views/DashboardView.vue'
// import HomeView from '../views/HomeView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView,
//   },
//   {
//     path: '/dashboard',
//     name: 'Dashboard',
//     component: DashboardView,
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (About.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import('../views/AboutView.vue'),
//   },
// ]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes, // short for `routes: routes`
// })

// export default router

import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// Lazy load components for better performance
const Home = () => import('../views/HomeView.vue')
const Dashboard = () => import('../views/DashboardView.vue')
const Customers = () => import('../views/CustomersView.vue')
const Employees = () => import('../views/EmployeesView.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Mocaccino CRM',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard - Mocaccino CRM',
    },
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers,
    meta: {
      title: 'Customers - Mocaccino CRM',
    },
  },
  {
    path: '/customers/:id',
    name: 'CustomerDetail',
    component: () => import('../views/customerDetail.vue'),
    props: true,
    meta: {
      title: 'Customer Details - Mocaccino CRM',
    },
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees,
    meta: {
      title: 'Employees - Mocaccino CRM',
    },
  },
  {
    path: '/employees/:id',
    name: 'EmployeeDetail',
    component: () => import('../views/employeeDetail.vue'),
    props: true,
    meta: {
      title: 'Employee Details - Mocaccino CRM',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/notFound.vue'),
    meta: {
      title: '404 - Page Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Global navigation guard for page titles
router.beforeEach((to, from, next) => {
  document.title = (to.meta?.title as string) || 'Mocaccino CRM'
  next()
})

export default router
