import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Record from '@/components/Record'
import About from '@/components/About'
import Book from '@/components/Book'
import Analyse from '@/components/Analyse'
import Category from '@/components/settings/Category'
import AboutApp from '@/components/about/AboutApp'
import NewRecord from '@/components/NewRecord'
import NewRecordSelect from '@/components/NewRecordSelect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
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
      path: '/settings/category',
      component: Category
    }, {
      path: '/settings/aboutapp',
      component: AboutApp
    }, {
      path: '/record/new/:category',
      component: NewRecord
    }, {
      path: '/record/new-select',
      component: NewRecordSelect
    }
  ]
})
