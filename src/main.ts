import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import axios from 'axios';
import VCalendar from 'v-calendar';
import router from './router';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { firestorePlugin } from 'vuefire'
import 'firebase/auth';
import 'firebase/firestore';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VCalendar);
Vue.use(firestorePlugin);

const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://PROJECT_ID.firebaseio.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
  measurementId: 'G-MEASUREMENT_ID',
};

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
