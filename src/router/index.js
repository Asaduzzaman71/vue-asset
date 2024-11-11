import { createRouter, createWebHistory } from 'vue-router';


// Import views
import Login from '@/Pages/login.vue';
import Dashboard from '@/Pages/dashboard.vue';
import CategoryList from '@/Pages/categories/index.vue';
function isAuthenticated() {
  console.log("hlw")
  const token = localStorage.getItem('access_token');  // You can change this to localStorage or any auth mechanism you use
  return !!token; // Return true if the token exists, otherwise false
}
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/categories',
    name: 'CategoryList',
    component: CategoryList,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // If the user is not authenticated, redirect to the login page
    next({ name: 'Login' });
  } else {
    // If the user is authenticated or the route doesn't require auth, proceed as normal
    next();
  }
});
export default router;