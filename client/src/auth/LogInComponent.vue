<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin">

    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input v-model="myForm.email" ref="emailInputRef" type="text" id="email" name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input v-model="myForm.password" ref="passwordInputRef" type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <div class="mb-4 flex items-center">
      <input v-model="myForm.rememberMe" type="checkbox" id="remember" name="remember" class="text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Recordar usuario</label>
    </div>

    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">¿Olvidaste la contraseña?</a>
    </div>

    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Ingresar
    </button>
  </form>

  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Crear cuenta aquí</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from './stores/auth.store';
import router from '@/router';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const toast = useToast();

const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const myForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const onLogin = async () => {
  if (myForm.email === '') {
    toast.error('El correo es requerido');
    return emailInputRef.value?.focus();
  }

  if (myForm.password.length < 6) {
    toast.error('La contraseña debe tener al menos 6 caracteres');
    return passwordInputRef.value?.focus();
  }

  if (myForm.rememberMe) {
    localStorage.setItem('email', myForm.email);
  } else {
    localStorage.removeItem('email');
  }

  const ok = await authStore.login(myForm.email, myForm.password);

  if (ok) {
    toast.success('Sesión iniciada correctamente');
    router.push({ name: 'profile' });
    return;
  }

  toast.error('Credenciales incorrectas');
};

watchEffect(() => {
  const email = localStorage.getItem('email');
  if (email) {
    myForm.email = email;
    myForm.rememberMe = true;
  }
});
</script>
