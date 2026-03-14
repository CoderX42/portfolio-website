import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AdminLayout from '@/components/AdminLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'), meta: { title: '仪表盘' } },
      { path: 'projects', name: 'ProjectList', component: () => import('@/views/ProjectList.vue'), meta: { title: '作品管理' } },
      { path: 'projects/edit/:id?', name: 'ProjectEdit', component: () => import('@/views/ProjectEdit.vue'), meta: { title: '编辑作品' } },
      { path: 'categories', name: 'CategoryList', component: () => import('@/views/CategoryList.vue'), meta: { title: '分类管理' } },
      { path: 'pages', name: 'PageList', component: () => import('@/views/PageList.vue'), meta: { title: '页面管理' } },
      { path: 'pages/edit/:slug', name: 'PageEdit', component: () => import('@/views/PageEdit.vue'), meta: { title: '编辑页面' } },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if (to.path === '/login' && auth.isAuthenticated()) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
