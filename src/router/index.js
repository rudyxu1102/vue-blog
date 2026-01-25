import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { left: 0, top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/components/front/index.vue'),
      children: [
        { path: '/home', name: 'home', component: () => import('@/components/front/Home.vue'), meta: { title: '博客首页' } },
        { path: '/about', name: 'about', component: () => import('@/components/front/AboutMe.vue'), meta: { title: '关于我' } },
        { path: '/articles', name: 'articles', component: () => import('@/components/front/Articles.vue'), meta: { title: '学习笔记分享' } },
        { path: '/articles/:id', name: 'article', component: () => import('@/components/front/article.vue') },
        { path: '/contact', name: 'contact', component: () => import('@/components/front/contact.vue'), meta: { title: '联系站长' } },
        { path: '/search/:text', name: 'SearchResult', component: () => import('@/components/front/SearchResult.vue'), meta: { title: '搜索结果' } }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/back/login.vue'),
      meta: { title: '登录页面' }
    },
    {
      path: '/admin',
      redirect: '/admin/posts',
      component: () => import('@/components/back/admin.vue'),
      children: [
        { path: 'posts', name: 'posts', component: () => import('@/components/back/posts.vue'), meta: { requireAuth: true, title: '博客文章' } },
        { path: 'editor', name: 'editor', component: () => import('@/components/back/editor.vue'), meta: { requireAuth: true, title: '编辑文章' } },
        { path: 'drafts', name: 'drafts', component: () => import('@/components/back/drafts.vue'), meta: { requireAuth: true, title: '博客草稿' } },
        { path: 'search', name: 'search', component: () => import('@/components/back/search.vue'), meta: { requireAuth: true, title: '搜索结果' } },
        { path: 'account', name: 'account', component: () => import('@/components/back/account.vue'), meta: { requireAuth: true, title: '修改账户' } }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'vue-blog'

  // 获取 token (后续会改用 Pinia store)
  const token = window.localStorage.getItem('token')

  if (token && to.name === 'login') {
    next({ name: 'posts' })
  } else if (!token && to.meta.requireAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
