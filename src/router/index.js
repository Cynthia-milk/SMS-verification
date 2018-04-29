import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import myTest from '@/components/myTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: test
    }, {
      path: '/myTest',
      name: 'myTest',
      component: myTest
    }
  ]
})
