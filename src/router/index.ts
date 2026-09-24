import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('@/views/schedule/ScheduleView.vue'),
    },
    {
      path: '/later',
      name: 'later',
      component: () => import('@/views/LaterView.vue'),
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('@/views/LinksView.vue'),
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: () => import('@/views/ImprintView.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/views/contacts/ContactsView.vue'),
      meta: {
        onlyContent: true,
      },
    },
  ],
})

export default router
