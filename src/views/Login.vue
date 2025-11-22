<template>
  <div class="login">
    <div class="card">
      <h2>{{ isRegister ? 'Регистарция' : 'Вход' }}</h2>
      
      <form @submit.prevent="submit">
        <input v-model="email" type="email" placeholder="Введите почту" required>
        <input v-model="password" type="password" placeholder="Введите пароль" required>
        
        <input v-if="isRegister" v-model="confirmPassword" type="password" placeholder="Повторите пароль" required>
        
        <p v-if="error" class="error">{{ error }}</p>
        
        <button type="submit">{{ isRegister ? 'Зарегистрироваться' : 'Войти' }}</button>
      </form>
      
      <p>
        <a href="#" @click="isRegister = !isRegister">
          {{ isRegister ? 'Вход' : 'Регистарция' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isRegister = ref(false)
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  try {
    error.value = ''
    
    if (isRegister.value) {
      if (password.value !== confirmPassword.value) {
        throw new Error('Passwords dont match')
      }
      auth.register(email.value, password.value)
      isRegister.value = false
    } else {
      auth.login(email.value, password.value)
      router.push('/todo')
    }
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #6C63FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem 0;
}

.error {
  color: red;
  margin: 10px 0;
}
</style>