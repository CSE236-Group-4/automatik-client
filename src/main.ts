import Vue from 'vue';
import App from './App.vue';
import VCalendar from 'v-calendar';
import router from './router';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.config.productionTip = false;

firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
});

export const db = firebase.firestore();

Vue.use(firestorePlugin);
Vue.use(BootstrapVue);
Vue.use(VCalendar);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
