import Vue from 'vue'
import Router from 'vue-router'
import ImageCompressor from '@/components/ImageCompressor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ImageCompressor',
      component: ImageCompressor
    }
  ]
})
