import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "firebase/app"
import {firebaseConfig} from '@/firebase/firebaseConf'


initializeApp(firebaseConfig);

Vue.config.productionTip = false

const auth = getAuth();
onAuthStateChanged(auth,()=>{
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
})