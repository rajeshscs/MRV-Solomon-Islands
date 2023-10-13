import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
// import { userResource } from '@/data/user'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'Landing',
    path: '/landing',
    component: () => import('@/pages/Landing.vue'),
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('@/pages/About.vue'),
  },
  {
    name: 'Project',
    path: '/project',
    component: () => import('@/pages/Projects.vue'),
  },
  {
    name: 'Reports',
    path: '/reports',
    component: () => import('@/pages/Reports.vue'),
  },
  {
    name: 'KnowledgeResource',
    path: '/knowledgeresource',
    component: () => import('@/pages/KnowledgeResource.vue'),
  },
]





let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,

  scrollBehavior(to, from, savedPosition){
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
    // return savedPosition || {top:0}
  }
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  // try {
  //   await userResource.promise
  // } catch (error) {
  //   isLoggedIn = false
  // }

  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Landing' })
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
