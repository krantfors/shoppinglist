import Vue from 'vue'
import VueRouter from 'vue-router'
import Lista from '../views/Lista.vue'
import Tips from '../views/Tips.vue'
import Signup from '../components/Signup'
import Login from '../components/Login'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Login,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/list',
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
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
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
      next({ path: '/login' })
    }
  }
  next()
})

export default router
