import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue'
import LoginPage from '@/views/LoginPage.vue';
import {getCurrentUser} from "vuefire";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/app/stats'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/app',
    meta: { requiresAuth: true },
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/app/stats'
      },
      {
        path: 'stats',
        component: () => import('@/views/StatsPage.vue')
      },
      {
        path: 'map',
        component: () => import('@/views/MapPage.vue')
      },
      {
        path: 'list',
        component: () => import('@/views/ListPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsPage.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      }
    }
  }
});

export default router;
