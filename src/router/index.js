import Vue from 'vue'
import VueRouter from 'vue-router'
import Lista from '../views/Lista.vue'
import Tips from '../views/Tips.vue'
import Signup from '../components/Signup'
import Login from '../components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Login
  },
  {
    path: '/list',
    name: 'Lista',
    component: Lista
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
