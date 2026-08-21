<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Sistema de Tutorías</h1>

      <form class="login-form" @submit.prevent="iniciarSesion">
        <div class="field">
          <label class="field-label" for="correo">Correo Electrónico</label>
          <input
            id="correo"
            v-model="correo"
            type="email"
            class="field-input"
            placeholder="nombre@correo.com"
            required
          />
        </div>

        <div class="field">
          <label class="field-label" for="contrasena">Contraseña</label>
          <input
            id="contrasena"
            v-model="contrasena"
            type="password"
            class="field-input"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>

        <div class="divider"><span>or</span></div>

        <button type="button" class="btn btn-google" @click="continuarConGoogle">
          <svg class="google-icon" viewBox="0 0 48 48" width="18" height="18">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.6 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.5 29.6 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5 44.5 35.3 44.5 24c0-1.2-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.5 29.6 3.5 24 3.5c-7.6 0-14.1 4.3-17.7 10.6z"/>
            <path fill="#4CAF50" d="M24 44.5c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.6 26.9 36.5 24 36.5c-5.3 0-9.8-3.4-11.4-8.1l-6.7 5.2C9.7 40.1 16.3 44.5 24 44.5z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.7-3.7 5l6.6 5.4C41.5 35.6 44.5 30.3 44.5 24c0-1.2-.1-2.4-.9-3.5z"/>
          </svg>
          Continuar con Google
        </button>

        <div class="divider"><span>or</span></div>

        <p class="register-text">
          ¿No tenés cuenta?
          <router-link to="/registro" class="register-link">Regístrate</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const correo = ref('')
const contrasena = ref('')

function iniciarSesion() {
  // TODO: conectar con el servicio de autenticación
  console.log('Iniciar sesión con:', correo.value, contrasena.value)
}

function continuarConGoogle() {
  // TODO: conectar con OAuth de Google
  console.log('Continuar con Google')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(160deg, #6d28d9 0%, #9333ea 45%, #c084fc 100%);
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 20px 45px rgba(109, 40, 217, 0.25);
}

.login-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6d28d9;
  margin-bottom: 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.field {
  margin-bottom: 18px;
}

.field-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #7c3aed;
  margin-bottom: 6px;
}

.field-input {
  width: 100%;
  padding: 12px 18px;
  border: 1.5px solid #d8b4fe;
  border-radius: 999px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.field-input:focus {
  border-color: #a855f7;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
}

.btn {
  width: 100%;
  padding: 12px 18px;
  border-radius: 999px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(124, 58, 237, 0.35);
}

.btn-primary:hover {
  box-shadow: 0 10px 22px rgba(124, 58, 237, 0.45);
}

.btn-google {
  background: #ffffff;
  color: #4b5563;
  border: 1.5px solid #e5d4fb;
}

.btn-google:hover {
  background: #faf5ff;
}

.google-icon {
  flex-shrink: 0;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #b794f4;
  font-size: 0.8rem;
  margin: 18px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e9d5ff;
}

.divider span {
  padding: 0 12px;
}

.register-text {
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
  margin: 4px 0 0;
}

.register-link {
  color: #7c3aed;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>