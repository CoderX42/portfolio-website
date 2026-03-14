import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authApi } from '@/utils/api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));

  async function login(email: string, password: string) {
    const { data } = await authApi.login(email, password);
    token.value = data.accessToken;
    localStorage.setItem('token', data.accessToken);
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('token');
  }

  const isAuthenticated = () => !!token.value;

  return { token, login, logout, isAuthenticated };
});
