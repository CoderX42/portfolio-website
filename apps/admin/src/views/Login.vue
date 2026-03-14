<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <el-card class="w-full max-w-md">
      <template #header>
        <h2 class="text-center">后台登录</h2>
      </template>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="email" placeholder="admin@example.com" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" class="w-full">
            登录
          </el-button>
        </el-form-item>
        <el-alert v-if="error" :title="error" type="error" show-icon />
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ElMessage } from 'element-plus';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const form = reactive({ email: 'admin@example.com', password: 'admin123' });
const loading = ref(false);
const error = ref('');

async function handleLogin() {
  loading.value = true;
  error.value = '';
  try {
    await auth.login(form.email, form.password);
    ElMessage.success('登录成功');
    const redirect = (route.query.redirect as string) || '/';
    router.push(redirect);
  } catch (e: unknown) {
    error.value = (e as { response?: { data?: { message?: string } } })?.response?.data?.message || '登录失败';
  } finally {
    loading.value = false;
  }
}
</script>
