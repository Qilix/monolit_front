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
    path: '/category',
    name: 'categories',
    component: () => import('@/views/Category.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/Product.vue')
  },
  {
    path: '/category/:id',
    name: 'productsincategory',
    props: true,
    component: () => import('@/views/CategoryDetail.vue')
  },
  {
    path: '/category/:id/products',
    name: 'productswithcategories',
    props: true,
    component: () => import('@/views/ProductsWithCategories.vue')
  },

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router