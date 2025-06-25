import { createRouter, createWebHistory } from 'vue-router'
import WifiForm from '../views/WifiForm.vue'
import WifiList from '../views/WifiList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
      path: '/',
      name: 'home',
      component: WifiForm,
    },
    {
      path: '/',
      name: 'wifi-list',
      component: WifiList
    }
    ]
})

export default router