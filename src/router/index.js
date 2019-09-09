import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'
import blankLayout from '@/layout/blankLayout'
import returnLayout from '@/layout/returnLayout'
// import Login from '@/menu/login'

Vue.use(Router)

const my = () => import('@/my/index')
const feedback = () => import('@/my/feedback')
const usemanual = () => import('@/my/usemanual')
const addMenu = () => import('@/addMenu/index')
const addFood = () => import('@/addFood/index')
const register = () => import('@/register/index')
const selRegType = () => import('@/register/selType')
const userInfo = () => import('@/my/userInfo')
const menu = () => import('@/menu/index')
const big = () => import('@/menu/big')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/menu'
    },
    // {
    //   path: '/login',
    //   component: Login
    // },
    {
      path: '/big',
      component: Layout,
      name: 'big0',
      meta: { tab: 'big', title: 'big' },
      children: [
        {path: '/big', name: 'big', component: big, meta: { title: 'big' }}
      ]
    },
    {
      path: '/menu',
      component: Layout,
      name: 'menu0',
      meta: { tab: 'menu', title: 'menu' },
      children: [
        {path: '/menu', name: 'menu', component: menu, meta: { title: 'menu' }}
      ]
    },
    {
      path: '/my',
      component: returnLayout,
      name: 'my0',
      meta: { tab: 'my', title: 'my' },
      children: [
        {path: '/my', name: 'my', component: my, meta: { title: 'my' }},
        {path: '/my/feedback', name: 'feedback', component: feedback, meta: { title: 'feedback' }},
        {path: '/my/usemanual', name: 'usemanual', component: usemanual, meta: { title: 'usemanual' }}
      ]
    },
    // {
    //   path: '/feedback',
    //   component: returnLayout,
    //   name: 'feedback0',
    //   meta: { tab: 'feedback', title: 'feedback' },
    //   children: [
    //     {path: '/feedback', name: 'feedback', component: feedback, meta: { title: 'feedback' }}
    //   ]
    // },
    {
      path: '/addFood',
      component: returnLayout,
      name: 'addFood0',
      meta: { tab: 'addFood', title: 'addFood' },
      children: [
        {path: '/addFood', name: 'addFood', component: addFood, meta: { title: 'addFood' }},
        {path: '/editFood/:id', name: 'editFood', component: addFood, meta: { title: 'editFood' }}
      ]
    },
    {
      path: '/addMenu',
      component: returnLayout,
      name: 'addMenu0',
      meta: { tab: 'addMenu', title: 'addMenu' },
      children: [
        {path: '/addMenu', name: 'addMenu', component: addMenu, meta: { title: 'addMenu' }}
      ]
    },
    {
      path: '/register',
      component: blankLayout,
      name: 'register0',
      meta: { tab: 'register', title: 'register' },
      children: [
        {path: '/register', name: 'register', component: register, meta: { title: 'register' }},
        // {path: '/selRegType', name: 'selRegType', component: selRegType, meta: { title: 'selRegType' }},
        {path: '/userInfo', name: 'userInfo', component: userInfo, meta: { title: 'userInfo' }}
      ]
    },
    {
      path: '/selRegType',
      component: blankLayout,
      name: 'selRegType0',
      meta: { tab: 'selRegType', title: 'selRegType' },
      children: [
        {path: '/selRegType', name: 'selRegType', component: selRegType, meta: { title: 'selRegType' }}
      ]
    }
  ]
})
