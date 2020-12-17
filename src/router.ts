import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import auth from './auth';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Employees from './components/Employees.vue';
import Schedules from './components/Schedules.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter(to, from, next) {
            if (auth.loggedIn()) {
                next();
            } else {
                next('/login');
            }
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/employees',
        name: 'Employees',
        component: Employees,
        beforeEnter(to, from, next) {
            if (auth.loggedIn()) {
                next();
            } else {
                next('/login');
            }
        },
    },
    {
        path: '/schedules',
        name: 'Schedules',
        component: Schedules,
        beforeEnter(to, from, next) {
            if (auth.loggedIn()) {
                next();
            } else {
                next('/login');
            }
        },
    },
    {
        path: '*',
        redirect: '/',
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
