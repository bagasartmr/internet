import { createRouter, createWebHistory } from 'vue-router'
import WifiForm from '../views/WifiForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
  path: '/create',
  name: 'wifi-create',
  component: WifiForm
}
  ],
})

export default router