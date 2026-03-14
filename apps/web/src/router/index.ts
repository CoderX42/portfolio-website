import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页' },
      },
      {
        path: 'projects',
        name: 'ProjectList',
        component: () => import('@/views/ProjectList.vue'),
        meta: { title: '作品列表' },
      },
      {
        path: 'projects/:slug',
        name: 'ProjectDetail',
        component: () => import('@/views/ProjectDetail.vue'),
        meta: { title: '作品详情' },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: { title: '关于我' },
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/Contact.vue'),
        meta: { title: '联系方式' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const title = (to.meta.title as string) || '作品集';
  document.title = `${title} - Vibe Coding`;
});

export default router;
