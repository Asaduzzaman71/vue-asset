import { createRouter, createWebHistory } from 'vue-router';


// Import views
import Dashboard from '@/Pages/dashboard.vue';

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;