import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Record from '@/components/Record'
import About from '@/components/About'
import Book from '@/components/Book'
import Analyse from '@/components/Analyse'
import Category from '@/components/settings/Category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Main,
      children: [
        {
          path: '/record',
          component: Record,
        }, {
          path: '/about',
          component: About
        }, {
          path: '/book',
          component: Book
        }, {
          path: '/analyse',
          component: Analyse
        }
      ]
    },
    {
      path: '/category',
      component: Category
    }
  ]
})
