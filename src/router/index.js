import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('@/views/PageNotFound.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Quote.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router