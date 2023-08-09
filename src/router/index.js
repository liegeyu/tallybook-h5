import Index from '@/container/Index'
import About from '@/container/About'
import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'
import Login from '@/container/Login'
import Detail from '@/container/Detail'

const routes = [
    {
        path: '/index',
        component: Index
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/',
        component: Home
    },
    {
        path: '/data',
        component: Data
    },
    {
        path: '/user',
        component: User
    },
    {
        path: '/detail',
        component: Detail
    },
]

export default routes;