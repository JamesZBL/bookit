import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Record from '@/components/Record'
import About from '@/components/About'
import Book from '@/components/Book'
import NewBook from '@/components/book/NewBook'
import Analyse from '@/components/Analyse'
import Category from '@/components/settings/Category'
import NewCategory from '@/components/settings/NewCategory'
import Password from '@/components/settings/Password'
import AboutApp from '@/components/about/AboutApp'
import NewRecord from '@/components/record/NewRecord'
import NewRecordSelect from '@/components/record/NewRecordSelect'
import Signin from '@/components/sign/Signin'
import Signup from '@/components/sign/Signup'
import Code from '@/components/sign/Code'
import Email from '@/components/sign/Email'
import NewPassword from '@/components/sign/Password'
import DisplaySettings from '@/components/settings/Display'
import Copyright from '@/components/about/Copyright'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    }, {
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
    }, {
      path: '/signin',
      component: Signin
    }, {
      path: '/signup',
      component: Signup
    }, {
      path: '/code',
      component: Code
    }, {
      path: '/email',
      component: Email
    }, {
      path: '/settings/category',
      component: Category
    }, {
      path: '/settings/category/new',
      component: NewCategory
    }, {
      path: '/settings/aboutapp',
      component: AboutApp
    }, {
      path: '/settings/password',
      component: Password
    }, {
      path: '/settings/display',
      component: DisplaySettings
    }, {
      path: '/settings/copyright',
      component: Copyright
    }, {
      path: '/record/new',
      component: NewRecord
    }, {
      path: '/record/new-select',
      component: NewRecordSelect
    }, {
      path: '/book/new',
      component: NewBook
    }, {
      path: '/password/new',
      component: NewPassword
    }
  ]
})
