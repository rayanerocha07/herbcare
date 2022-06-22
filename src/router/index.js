import Vue from 'vue'
import VueRouter from 'vue-router'

import { VueCookies } from '@/plugins/vuecookies'

import Login from "../views/Login"

import Index from "../views/main/Index"
import Search from "../views/main/Search"
import Category from "../views/main/Category"
import _Plant from "../views/main/_Plant"


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      beforeEnter(_to, _from, next) {
        const session = VueCookies.get("SESSION")
        if (session) {
          console.log(typeof session)
          next()
        } else {
          next({ name: "login" })
        }
      },
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          name: 'search',
          component: Search,
        },
        {
          path: 'categoria',
          name: 'category',
          component: Category,
        },
        {
          path: "planta/:id",
          name: "plant",
          component: _Plant
        }
      ]
    },
  ]
})

export default router
