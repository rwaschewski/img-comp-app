import Vue from 'vue'
import Router from 'vue-router'
import ImageCompressor from '@/components/ImageCompressor'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import UserImages from '@/components/User/UserImages'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ImageCompressor',
      component: ImageCompressor
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/images',
      name: 'UserImages',
      component: UserImages
    }
  ]
})
