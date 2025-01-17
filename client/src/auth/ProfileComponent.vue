<template>
  <main class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <div v-if="isAuthenticated" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:justify-between">
        <label class="block text-gray-700">Nombre:</label>
        <p class="text-gray-900">{{ user?.first_name }}</p>
      </div>
      <div class="flex flex-col sm:flex-row sm:justify-between">
        <label class="block text-gray-700">Apellido:</label>
        <p class="text-gray-900">{{ user?.last_name }}</p>
      </div>
      <div class="flex flex-col sm:flex-row sm:justify-between">
        <label class="block text-gray-700">Teléfono:</label>
        <p class="text-gray-900">{{ user?.phone_number }}</p>
      </div>
      <div class="flex flex-col sm:flex-row sm:justify-between">
        <label class="block text-gray-700">Correo Electrónico:</label>
        <p class="text-gray-900">{{ user?.email }}</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import { useAuthStore } from './stores/auth.store';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

</script>
