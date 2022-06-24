import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from "@/views/Login.vue";
import Register from "@/views/Register";
import { getAuth } from "firebase/auth";
import CrudCurso from "@/views/CrudCurso";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            private: true
        }
    },
    {
        path: '/cursos',
        name: 'cursos',
        component: CrudCurso,
        meta: {
            private: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'registrar',
        component: Register
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            private: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const auth = getAuth()
    let user = auth.currentUser
    let private_rute = to.meta.private
    if (private_rute && !user) {
        next('/login')
    } else if (private_rute === undefined && user) {
        next('/')
    } else {
        next()
    }
})

export default router
