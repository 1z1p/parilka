import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PoliticsView.vue')
  },
  {
    path: '/guarante',
    name: 'guarante',
    component: () => import('../views/GuaranteView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/:categories/:id',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/catalog/:categories',
    name: 'catalog',
    component: () => import('../views/CatalogView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersView.vue')
  },
  {
    path: '/search_result/:params',
    name: 'search_result',
    component: () => import('../views/ResultSearchView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
