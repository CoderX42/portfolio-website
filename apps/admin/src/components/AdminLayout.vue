<template>
  <el-container class="min-h-screen">
    <el-aside width="200px" class="bg-gray-800">
      <div class="p-4 text-white font-bold">后台管理</div>
      <el-menu
        background-color="#1f2937"
        text-color="#e5e7eb"
        active-text-color="#3b82f6"
        router
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/projects">
          <el-icon><Document /></el-icon>
          <span>作品管理</span>
        </el-menu-item>
        <el-menu-item index="/categories">
          <el-icon><Folder /></el-icon>
          <span>分类管理</span>
        </el-menu-item>
        <el-menu-item index="/pages">
          <el-icon><Grid /></el-icon>
          <span>页面管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="flex items-center justify-end border-b">
        <el-button type="danger" text @click="logout">退出</el-button>
      </el-header>
      <el-main class="bg-gray-50 p-6">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { HomeFilled, Document, Folder, Grid } from '@element-plus/icons-vue';

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.logout();
  router.push('/login');
}
</script>
