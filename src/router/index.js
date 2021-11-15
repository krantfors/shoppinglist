import Vue from 'vue'
import VueRouter from 'vue-router'
import Lista from '../views/Lista.vue'
import Tips from '../views/Tips.vue'
import Auth from '../components/Auth'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Lista',
    component: Lista,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tips',
    name: 'Tips',
    component: Tips,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (firebase.auth().currentUser) {
      next()
    } else {
      next({ path: '/auth' })
    }
  }
  next()
})

export default router
