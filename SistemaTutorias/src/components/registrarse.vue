<template>
  <div class="register-page">
    <div class="register-card">
      <div class="brand">
        <div class="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7v6c0 5 3.8 8.7 9 9 5.2-.3 9-4 9-9V7l-9-5z" fill="url(#g)" />
            <path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="g" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8B5CF6"/>
                <stop offset="1" stop-color="#C4B5FD"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1>Registrarse</h1>
        <p class="subtitle">Ingresá tus datos</p>
      </div>

      <form class="register-form" @submit.prevent="handleSubmit">
        <div class="field-row">
          <label class="field">
            <span class="field-label">Nombre</span>
            <input v-model="nombre" type="text" placeholder="Juan" autocomplete="given-name" required />
          </label>
          <label class="field">
            <span class="field-label">Apellido</span>
            <input v-model="apellido" type="text" placeholder="Pérez" autocomplete="family-name" required />
          </label>
        </div>

        <label class="field">
          <span class="field-label">Correo electrónico</span>
          <input v-model="email" type="email" placeholder="nombre@correo.com" autocomplete="email" required />
        </label>

        <label class="field">
          <span class="field-label">Contraseña</span>
          <div class="password-wrap">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="new-password"
              required
            />
            <button
              type="button"
              class="toggle-visibility"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            >
              <svg v-if="!showPassword" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M3 3l18 18M10.6 10.6a3 3 0 004.24 4.24M9.9 4.24A11 11 0 0112 4c7 0 11 7 11 7a13.2 13.2 0 01-3.1 3.9M6.1 6.1A13.2 13.2 0 001 11s4 7 11 7c1.4 0 2.7-.24 3.9-.66"/>
              </svg>
            </button>
          </div>
        </label>

        <label class="field">
          <span class="field-label">Confirmar contraseña</span>
          <div class="password-wrap">
            <input
              v-model="confirmarPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="new-password"
              required
            />
            <button
              type="button"
              class="toggle-visibility"
              @click="showConfirmPassword = !showConfirmPassword"
              :aria-label="showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            >
              <svg v-if="!showConfirmPassword" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M3 3l18 18M10.6 10.6a3 3 0 004.24 4.24M9.9 4.24A11 11 0 0112 4c7 0 11 7 11 7a13.2 13.2 0 01-3.1 3.9M6.1 6.1A13.2 13.2 0 001 11s4 7 11 7c1.4 0 2.7-.24 3.9-.66"/>
              </svg>
            </button>
          </div>
          <span v-if="mostrarErrorPassword" class="field-error">Las contraseñas no coinciden</span>
        </label>

        <label class="field">
          <span class="field-label">Rol</span>
          <select v-model="rol" required>
            <option value="" disabled>Seleccioná un rol</option>
            <option value="administrador">Administrador</option>
            <option value="profesor">Profesor</option>
          </select>
        </label>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Creando cuenta…' : 'Registrarse' }}
        </button>
      </form>

      <p class="login-hint">
        ¿Ya tenés cuenta?
        <a href="#" @click.prevent="irAIniciarSesion">Iniciar sesión</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nombre = ref('')
const apellido = ref('')
const email = ref('')
const password = ref('')
const confirmarPassword = ref('')
const rol = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)

const emit = defineEmits(['submit'])

const mostrarErrorPassword = computed(() => {
  return confirmarPassword.value.length > 0 && confirmarPassword.value !== password.value
})

function handleSubmit() {
  if (password.value !== confirmarPassword.value) {
    return
  }
  loading.value = true
  emit('submit', {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    password: password.value,
    rol: rol.value
  })
  // El componente padre / lógica de auth debe controlar loading.value = false al terminar
  setTimeout(() => { loading.value = false }, 800)
}

function irAIniciarSesion() {
  router.push('/')
}
</script>

<style scoped>
:root {
  --violet-700: #6D3FC0;
  --violet-600: #7C4FD6;
  --violet-500: #8B5CF6;
  --lilac-400: #B8A4E3;
  --lilac-200: #E4D9FA;
  --lilac-100: #F3EEFC;
  --ink: #2B2140;
  --ink-soft: #6E6480;
  --error: #E0507A;
  --white: #FFFFFF;
}

.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(160deg, var(--lilac-100) 0%, #ffffff 45%, var(--lilac-200) 100%);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.register-card {
  width: 100%;
  max-width: 440px;
  background: var(--white);
  border-radius: 20px;
  padding: 40px 36px 32px;
  box-shadow: 0 20px 50px -18px rgba(109, 63, 192, 0.35), 0 2px 8px rgba(109, 63, 192, 0.06);
  border: 1px solid var(--lilac-200);
}

.brand { text-align: center; margin-bottom: 26px; }

.brand-mark {
  width: 52px;
  height: 52px;
  margin: 0 auto 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand-mark svg { width: 100%; height: 100%; }

.brand h1 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 4px;
}

.subtitle {
  color: var(--ink-soft);
  font-size: 0.9rem;
  margin: 0;
}

.register-form { display: flex; flex-direction: column; gap: 16px; }

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field { display: flex; flex-direction: column; gap: 6px; }

.field-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ink);
}

.field input,
.field select {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid var(--lilac-200);
  background: var(--lilac-100);
  font-size: 0.95rem;
  color: var(--ink);
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.field input::placeholder { color: #A99BC4; }

.field select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236E6480' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  cursor: pointer;
}

.field input:focus,
.field select:focus {
  border-color: var(--violet-500);
  background-color: var(--white);
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
}

.field-error {
  font-size: 0.78rem;
  color: var(--error);
  margin-top: 2px;
}

.password-wrap { position: relative; display: flex; align-items: center; }
.password-wrap input { flex: 1; padding-right: 42px; }

.toggle-visibility {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: var(--ink-soft);
  cursor: pointer;
  display: flex;
  padding: 4px;
  border-radius: 8px;
}
.toggle-visibility:hover { color: var(--violet-600); background: var(--lilac-100); }

.btn-primary {
  margin-top: 6px;
  padding: 13px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--violet-600), var(--violet-500));
  color: var(--white);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 20px -8px rgba(124, 79, 214, 0.6);
  transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 14px 24px -8px rgba(124, 79, 214, 0.7); }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

.login-hint {
  text-align: center;
  margin: 22px 0 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}
.login-hint a {
  color: var(--violet-600);
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}
.login-hint a:hover { text-decoration: underline; }

@media (max-width: 420px) {
  .register-card { padding: 32px 24px 26px; border-radius: 16px; }
  .field-row { grid-template-columns: 1fr; }
}
</style>