import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Tarefas',
        component: () => import('../views/Tasks/TasksView')
    },
    {
        path: '/sobre',
        name: 'Sobre',
        component: () => import('../views/About/AboutView')
    },
    {
        path: '/tags',
        name: 'Tags',
        component: () => import('../views/Tags/TagsView')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
