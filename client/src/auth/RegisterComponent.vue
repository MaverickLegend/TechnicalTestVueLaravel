<template>
  <h1 class="text-2xl font-semibold mb-4">Nueva cuanta</h1>
  <form @submit.prevent="onRegister">
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input v-model="myForm.first_name" ref="firstNameInputRef" type="text" id="name" name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <div class="mb-4">
      <label for="lastName" class="block text-gray-600">Apellido</label>
      <input v-model="myForm.last_name" ref="lastNameInputRef" type="text" id="lastName" name="lastName"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <div class="mb-4">
      <label for="phoneNumber" class="block text-gray-600">Teléfono</label>
      <input v-model="myForm.phone_number" ref="phoneNumberInputRef" type="text" id="phoneNumber" name="phoneNumber"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input v-model="myForm.email" ref="emailInputRef" type="email" id="email" name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input v-model="myForm.password" ref="passwordInputRef" type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">¿Olvidó la contraseña?</a>
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Crear cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Ingresar por aquí</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from './stores/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const toast = useToast();

const firstNameInputRef = ref<HTMLInputElement | null>(null);
const lastNameInputRef = ref<HTMLInputElement | null>(null);
const phoneNumberInputRef = ref<HTMLInputElement | null>(null);
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);



const myForm = reactive({
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  password: '',
});

const onRegister = async () => {
  if (myForm.first_name.length < 2) {
    toast.error('El nombre debe tener al menos 2 caracteres');
    return firstNameInputRef.value?.focus();
  }

  if (myForm.last_name.length < 2) {
    toast.error('El apellido debe tener al menos 2 caracteres');
    return lastNameInputRef.value?.focus();
  }

  if (myForm.phone_number.length < 9) {
    toast.error('El número de teléfono debe tener al menos 9 caracteres');
    return phoneNumberInputRef.value?.focus();
  }

  if (myForm.email === '') {
    toast.error('El correo es requerido');
    return emailInputRef.value?.focus();
  }

  if (myForm.password.length < 6) {
    toast.error('La contraseña debe tener al menos 6 caracteres');
    return passwordInputRef.value?.focus();
  }

  const response = await authStore.register(myForm.first_name, myForm.last_name, myForm.phone_number, myForm.email, myForm.password);

  if (!response) {
    toast.error('Error de conexión');
    return;
  }
  const { ok, message } = response;

  if (ok) {
    console.log('Registration successful');
    toast.success(message);
    myForm.first_name = '';
    myForm.last_name = '';
    myForm.phone_number = '';
    myForm.email = '';
    myForm.password = '';
    return;
  }

  toast.error(message);
  };
</script>
