import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import addpost from '@/components/AddPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/add',
      component: addpost,
      name: 'addpost'
    }
  ]
})
