<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-white text-xl font-semibold">Bienvenid@ a tu perfil</h1>
      <button v-if="isAuthenticated" @click="logout"
        class="ml-auto flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 6h-6"></path>
        </svg>
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../auth/stores/auth.store';
import { useToast } from 'vue-toastification';

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const logout = () => {
  authStore.logout();
  toast.success('Sesión cerrada');
  router.push({ name: 'login' });
};
</script>
