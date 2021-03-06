import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false
Vue.use(firestorePlugin)

///////////// Initialize firebase ///////////////
export const db = firebase
  .initializeApp({
  apiKey: "password",
  projectId: "food-ecbab",
  databaseURL: "https://food-ecbab.firebaseio.com"
  })
  .firestore()

///////////////////////////////////////////////////

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
