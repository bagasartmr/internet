import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'create-product',
      component: () => import('../views/src/views/CreateProductView.vue'),
    },
    {
      path: '/products/:id',
      name: 'edit-product',
      component: () => import('../views/src/views/EditProductView.vue'),
    },
  ],
})

export default router

/*import { createRouter, CreateRouter, createWebHistory } from "vue-router"
import WifiList from "../views/WifiList.vue"

const routes = [
  {
    path:'', component: WifiList
  }
]
const router = createRouter({
history:createWebHistory(),
routes
})

export default router*/