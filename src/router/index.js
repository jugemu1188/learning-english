import Vue from 'vue'
import Router from 'vue-router'
import Adjective from '@/components/Adjective'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Adjective',
      component: Adjective
    }
  ]
})
