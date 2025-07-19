import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import LaterView from '../views/LaterView.vue'
import LinksView from '../views/LinksView.vue'
import ImprintView from '../views/ImprintView.vue'
import ContactsView from '@/views/ContactsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView,
    },
    {
      path: '/later',
      name: 'later',
      component: LaterView,
    },
    {
      path: '/links',
      name: 'links',
      component: LinksView,
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: ImprintView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
      meta: {
        onlyContent: true,
      },
    },
  ],
})

export default router
