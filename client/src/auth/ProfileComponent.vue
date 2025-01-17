<template>
  <main class="container mx-auto mt-4 p-4 bg-white rounded shadow-md">
    <div v-if="isAuthenticated" class="space-y-4">
      <div>
        <label class="block text-gray-700">Nombre:</label>
        <p class="text-gray-900">{{ user?.first_name }}</p>
      </div>
      <div>
        <label class="block text-gray-700">Apellido:</label>
        <p class="text-gray-900">{{ user?.last_name }}</p>
      </div>
      <div>
        <label class="block text-gray-700">Teléfono:</label>
        <p class="text-gray-900">{{ user?.phone_number }}</p>
      </div>
      <div>
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
