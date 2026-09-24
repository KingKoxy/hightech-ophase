import { createRouter, createWebHistory } from 'vue-router'

// Matches the .fade transition's duration (main.css) so the scroll jump
// happens once the outgoing page has finished fading out, not before.
const TRANSITION_DURATION_MS = 200

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(savedPosition ?? { top: 0 }), TRANSITION_DURATION_MS)
    })
  },
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
