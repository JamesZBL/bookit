import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Record from '@/components/Record'
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
        }
      ]
    },
    {
      path: '/category',
      component: Category
    }
  ]
})
