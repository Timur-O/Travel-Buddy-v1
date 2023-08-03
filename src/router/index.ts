import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: 'stats'
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
