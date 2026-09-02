```vue
<template>
  <div class="reserva-shell">

    <!-- ================= HEADER ================= -->
    <header class="topbar">
      <div class="brand">
        <div class="brand-icon">T</div>

        <div>
          <h1 class="app-title">Sistema de Tutorías</h1>
          <span class="app-subtitle">Gestión académica</span>
        </div>
      </div>

      <div class="user-block">
        <div class="user-avatar">
          {{ usuario.nombre.charAt(0) }}
        </div>

        <div class="user-text">
          <span class="user-name">{{ usuario.nombre }}</span>
          <span class="user-role">{{ usuario.rol }}</span>
        </div>

        <button class="icon-btn" type="button" aria-label="Perfil">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
          </svg>
        </button>

        <button
          class="icon-btn notification-btn"
          type="button"
          aria-label="Notificaciones"
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M12 3c-3 0-5 2.2-5 5.4v3.3c0 .9-.4 1.8-1 2.4l-1 1.1c-.4.4-.1 1.1.5 1.1h13c.6 0 .9-.7.5-1.1l-1-1.1c-.6-.6-1-1.5-1-2.4V8.4C17 5.2 15 3 12 3Z"
            />
            <path d="M9.5 19a2.5 2.5 0 0 0 5 0" />
          </svg>

          <span class="notification-dot"></span>
        </button>
      </div>
    </header>

    <!-- ================= CONTENIDO ================= -->
    <main class="content">

      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <span>Inicio</span>
        <span>›</span>
        <strong>Reservar Tutoría</strong>
      </div>

      <!-- Título -->
      <section class="page-header">
        <div>
          <span class="section-label">NUEVA RESERVA</span>

          <h2>Reservar Tutoría</h2>

          <p>
            Seleccioná un tutor, una materia, una fecha y un horario
            para reservar tu tutoría.
          </p>
        </div>
      </section>

      <!-- ================= CONTENIDO PRINCIPAL ================= -->
      <div class="reservation-layout">

        <!-- FORMULARIO -->
        <section class="form-card">

          <div class="card-heading">
            <div class="heading-icon">＋</div>

            <div>
              <h3>Datos de la tutoría</h3>
              <p>Completá los datos para realizar la reserva.</p>
            </div>
          </div>

          <!-- TUTOR -->
          <div class="form-group">
            <label for="tutor">Tutor</label>

            <div class="select-wrapper">
              <select
                id="tutor"
                v-model="reserva.tutor"
              >
                <option value="" disabled>
                  Seleccioná un tutor
                </option>

                <option
                  v-for="tutor in tutores"
                  :key="tutor.id"
                  :value="tutor.nombre"
                >
                  {{ tutor.nombre }} — {{ tutor.especialidad }}
                </option>
              </select>
            </div>
          </div>

          <!-- MATERIA -->
          <div class="form-group">
            <label for="materia">Materia</label>

            <div class="select-wrapper">
              <select
                id="materia"
                v-model="reserva.materia"
              >
                <option value="" disabled>
                  Seleccioná una materia
                </option>

                <option
                  v-for="materia in materias"
                  :key="materia"
                  :value="materia"
                >
                  {{ materia }}
                </option>
              </select>
            </div>
          </div>

          <!-- FECHA -->
          <div class="form-group">
            <label for="fecha">Fecha</label>

            <input
              id="fecha"
              v-model="reserva.fecha"
              type="date"
              :min="fechaMinima"
            />
          </div>

          <!-- HORARIO -->
          <div class="form-group">
            <label>Horario disponible</label>

            <div class="horarios-grid">

              <button
                v-for="horario in horarios"
                :key="horario"
                type="button"
                class="horario-btn"
                :class="{
                  'horario-btn--selected':
                    reserva.horario === horario
                }"
                @click="seleccionarHorario(horario)"
              >
                {{ horario }}
              </button>

            </div>
          </div>

          <!-- MENSAJE -->
          <div
            v-if="mensajeError"
            class="error-message"
          >
            {{ mensajeError }}
          </div>

          <!-- BOTONES -->
          <div class="form-actions">

            <button
              type="button"
              class="cancel-btn"
              @click="cancelar"
            >
              Cancelar
            </button>

            <button
              type="button"
              class="reserve-btn"
              :disabled="!formularioCompleto"
              @click="reservar"
            >
              <span>✓</span>
              Confirmar reserva
            </button>

          </div>

        </section>

        <!-- ================= RESUMEN ================= -->
        <aside class="summary-card">

          <div class="summary-header">
            <span class="summary-label">
              RESUMEN
            </span>

            <div class="summary-icon">
              ✓
            </div>
          </div>

          <h3>Tu reserva</h3>

          <p class="summary-description">
            Revisá los datos antes de confirmar.
          </p>

          <div class="summary-list">

            <!-- Tutor -->
            <div class="summary-item">
              <span class="summary-item-icon">
                👤
              </span>

              <div>
                <span>Tutor</span>

                <strong>
                  {{ reserva.tutor || 'Sin seleccionar' }}
                </strong>
              </div>
            </div>

            <!-- Materia -->
            <div class="summary-item">
              <span class="summary-item-icon">
                📚
              </span>

              <div>
                <span>Materia</span>

                <strong>
                  {{ reserva.materia || 'Sin seleccionar' }}
                </strong>
              </div>
            </div>

            <!-- Fecha -->
            <div class="summary-item">
              <span class="summary-item-icon">
                📅
              </span>

              <div>
                <span>Fecha</span>

                <strong>
                  {{ fechaFormateada }}
                </strong>
              </div>
            </div>

            <!-- Horario -->
            <div class="summary-item">
              <span class="summary-item-icon">
                🕐
              </span>

              <div>
                <span>Horario</span>

                <strong>
                  {{ reserva.horario || 'Sin seleccionar' }}
                </strong>
              </div>
            </div>

          </div>

          <div
            class="ready-message"
            :class="{
              'ready-message--active':
                formularioCompleto
            }"
          >
            <span>
              {{ formularioCompleto
                ? '✓ Todo listo para reservar'
                : 'Completá todos los campos'
              }}
            </span>
          </div>

        </aside>

      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ================= USUARIO =================

const usuario = ref({
  nombre: 'Nombre de Usuario',
  rol: 'Estudiante',
})

// ================= TUTORES =================

const tutores = ref([
  {
    id: 1,
    nombre: 'María González',
    especialidad: 'Matemática',
  },
  {
    id: 2,
    nombre: 'Juan Pérez',
    especialidad: 'Lengua',
  },
  {
    id: 3,
    nombre: 'Sofía Martínez',
    especialidad: 'Inglés',
  },
  {
    id: 4,
    nombre: 'Lucas Fernández',
    especialidad: 'Física',
  },
])

// ================= MATERIAS =================

const materias = ref([
  'Matemática',
  'Lengua y Literatura',
  'Inglés',
  'Física',
  'Química',
  'Programación',
])

// ================= HORARIOS =================

const horarios = ref([
  '07:30 - 08:20',
  '08:30 - 09:20',
  '09:30 - 10:20',
  '10:30 - 11:20',
  '13:30 - 14:20',
  '14:30 - 15:20',
  '15:30 - 16:20',
  '16:30 - 17:20',
])

// ================= RESERVA =================

const reserva = ref({
  tutor: '',
  materia: '',
  fecha: '',
  horario: '',
})

// ================= ERROR =================

const mensajeError = ref('')

// ================= FECHA MÍNIMA =================

const fechaMinima = computed(() => {
  const hoy = new Date()

  return hoy.toISOString().split('T')[0]
})

// ================= VALIDACIÓN =================

const formularioCompleto = computed(() => {
  return (
    reserva.value.tutor &&
    reserva.value.materia &&
    reserva.value.fecha &&
    reserva.value.horario
  )
})

// ================= FECHA FORMATEADA =================

const fechaFormateada = computed(() => {
  if (!reserva.value.fecha) {
    return 'Sin seleccionar'
  }

  const fecha = new Date(
    `${reserva.value.fecha}T00:00:00`
  )

  return fecha.toLocaleDateString(
    'es-AR',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  )
})

// ================= FUNCIONES =================

function seleccionarHorario(horario) {
  reserva.value.horario = horario
  mensajeError.value = ''
}

function reservar() {
  mensajeError.value = ''

  if (!formularioCompleto.value) {
    mensajeError.value =
      'Completá todos los campos antes de confirmar.'
    return
  }

  console.log('Reserva creada:', {
    ...reserva.value,
  })

  alert(
    `Tutoría reservada correctamente.\n\n` +
    `Tutor: ${reserva.value.tutor}\n` +
    `Materia: ${reserva.value.materia}\n` +
    `Fecha: ${fechaFormateada.value}\n` +
    `Horario: ${reserva.value.horario}`
  )
}

function cancelar() {
  reserva.value = {
    tutor: '',
    materia: '',
    fecha: '',
    horario: '',
  }

  mensajeError.value = ''
}
</script>

<style scoped>

/* ================= BASE ================= */

:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;

  font-family:
    Inter,
    'Segoe UI',
    Roboto,
    Arial,
    sans-serif;

  background: #f5f6fa;
  color: #2e2a38;
}

/* ================= SHELL ================= */

.reserva-shell {
  min-height: 100vh;
  background: #f5f6fa;
}

/* ================= HEADER ================= */

.topbar {
  height: 74px;

  padding: 0 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #ffffff;

  border-bottom: 1px solid #e7e4ee;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  background: #cabbe9;
  color: #493c65;

  font-weight: 800;
  font-size: 19px;
}

.app-title {
  margin: 0;

  font-size: 18px;
  font-weight: 700;
}

.app-subtitle {
  display: block;

  margin-top: 2px;

  color: #888395;

  font-size: 11px;
}

.user-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 37px;
  height: 37px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #e4dbf5;
  color: #594a79;

  font-weight: 700;
}

.user-text {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 13px;
  font-weight: 700;
}

.user-role {
  margin-top: 2px;

  color: #8a8694;

  font-size: 11px;
}

.icon-btn {
  position: relative;

  width: 37px;
  height: 37px;

  margin-left: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #e4e1e9;
  border-radius: 10px;

  background: white;

  cursor: pointer;

  transition: 0.2s;
}

.icon-btn:hover {
  background: #f5f2fa;
}

.icon-btn svg {
  width: 18px;
  height: 18px;

  fill: none;
  stroke: #625d6d;
  stroke-width: 1.5;
}

.notification-dot {
  position: absolute;

  top: 7px;
  right: 7px;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #6fa93f;
}

/* ================= CONTENT ================= */

.content {
  max-width: 1150px;

  margin: 0 auto;

  padding: 30px 32px;
}

/* ================= BREADCRUMB ================= */

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;

  margin-bottom: 22px;

  color: #918c99;

  font-size: 12px;
}

.breadcrumb strong {
  color: #514b5d;
}

/* ================= HEADER ================= */

.page-header {
  margin-bottom: 25px;
}

.section-label {
  color: #8d7aaa;

  font-size: 10px;
  font-weight: 800;

  letter-spacing: 1.4px;
}

.page-header h2 {
  margin: 5px 0;

  font-size: 29px;
  font-weight: 750;
}

.page-header p {
  margin: 0;

  color: #85808f;

  font-size: 13px;
}

/* ================= LAYOUT ================= */

.reservation-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1.7fr)
    minmax(280px, 0.9fr);

  gap: 20px;

  align-items: start;
}

/* ================= FORM CARD ================= */

.form-card,
.summary-card {
  background: white;

  border: 1px solid #e5e1ea;
  border-radius: 15px;

  box-shadow:
    0 4px 15px rgba(52, 42, 65, 0.045);
}

.form-card {
  padding: 25px;
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 12px;

  padding-bottom: 21px;

  margin-bottom: 22px;

  border-bottom: 1px solid #eeeaf2;
}

.heading-icon {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  background: #e4dbf5;

  color: #6c5787;

  font-size: 20px;
}

.card-heading h3 {
  margin: 0;

  font-size: 15px;
}

.card-heading p {
  margin: 3px 0 0;

  color: #928d9b;

  font-size: 11px;
}

/* ================= FORM ================= */

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;

  margin-bottom: 7px;

  color: #4c4755;

  font-size: 12px;
  font-weight: 700;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '⌄';

  position: absolute;

  top: 50%;
  right: 14px;

  transform: translateY(-50%);

  color: #77717f;

  pointer-events: none;
}

select,
input[type='date'] {
  width: 100%;

  height: 43px;

  padding: 0 13px;

  border: 1px solid #ddd8e3;
  border-radius: 9px;

  outline: none;

  background: #ffffff;

  color: #48434f;

  font-family: inherit;
  font-size: 12px;

  transition: 0.2s;
}

select {
  appearance: none;
  padding-right: 35px;
}

select:focus,
input[type='date']:focus {
  border-color: #a996c5;

  box-shadow:
    0 0 0 3px rgba(202, 187, 233, 0.25);
}

/* ================= HORARIOS ================= */

.horarios-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 8px;
}

.horario-btn {
  min-height: 42px;

  border: 1px solid #ddd8e3;
  border-radius: 8px;

  background: white;

  color: #635e6b;

  font-size: 11px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.horario-btn:hover {
  border-color: #a996c5;

  background: #f7f4fb;
}

.horario-btn--selected {
  border-color: #8d78a8;

  background: #cabbe9;

  color: #4b3b64;

  box-shadow:
    0 3px 8px rgba(116, 92, 153, 0.13);
}

/* ================= ERROR ================= */

.error-message {
  padding: 10px 12px;

  margin-bottom: 15px;

  border: 1px solid #edc5c5;
  border-radius: 8px;

  background: #fdf1f1;

  color: #a75f5f;

  font-size: 11px;
}

/* ================= ACTIONS ================= */

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 9px;

  padding-top: 18px;

  border-top: 1px solid #eeeaf2;
}

.cancel-btn,
.reserve-btn {
  padding: 10px 17px;

  border-radius: 9px;

  font-family: inherit;

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.cancel-btn {
  border: 1px solid #ddd8e3;

  background: white;

  color: #6d6774;
}

.cancel-btn:hover {
  background: #f6f4f8;
}

.reserve-btn {
  display: flex;
  align-items: center;
  gap: 7px;

  border: none;

  background: #a9cf88;

  color: white;
}

.reserve-btn:hover:not(:disabled) {
  transform: translateY(-1px);

  box-shadow:
    0 5px 12px rgba(111, 169, 63, 0.2);
}

.reserve-btn:disabled {
  opacity: 0.5;

  cursor: not-allowed;
}

/* ================= SUMMARY ================= */

.summary-card {
  padding: 22px;

  position: sticky;
  top: 20px;
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-label {
  color: #8d7aaa;

  font-size: 10px;
  font-weight: 800;

  letter-spacing: 1.4px;
}

.summary-icon {
  width: 33px;
  height: 33px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #eef5e9;

  color: #6fa93f;

  font-size: 14px;
  font-weight: 800;
}

.summary-card h3 {
  margin: 15px 0 3px;

  font-size: 18px;
}

.summary-description {
  margin: 0 0 21px;

  color: #918b98;

  font-size: 11px;
}

.summary-list {
  display: flex;
  flex-direction: column;

  gap: 14px;
}

.summary-item {
  display: flex;
  align-items: center;

  gap: 10px;
}

.summary-item-icon {
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 9px;

  background: #f5f2fa;

  font-size: 14px;
}

.summary-item span {
  display: block;

  color: #96909d;

  font-size: 10px;
}

.summary-item strong {
  display: block;

  max-width: 190px;

  margin-top: 2px;

  color: #4a4552;

  font-size: 11px;

  text-transform: capitalize;
}

.ready-message {
  margin-top: 22px;

  padding: 11px;

  border-radius: 9px;

  background: #f6f4f8;

  color: #938d99;

  text-align: center;

  font-size: 10px;
  font-weight: 600;

  transition: 0.2s;
}

.ready-message--active {
  background: #eef5e9;

  color: #65953e;
}

/* ================= RESPONSIVE ================= */

@media (max-width: 850px) {

  .reservation-layout {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
  }

  .horarios-grid {
    grid-template-columns:
      repeat(3, 1fr);
  }
}

@media (max-width: 600px) {

  .topbar {
    height: auto;

    min-height: 70px;

    padding: 12px 16px;
  }

  .user-text {
    display: none;
  }

  .content {
    padding: 22px 15px;
  }

  .page-header h2 {
    font-size: 24px;
  }

  .form-card,
  .summary-card {
    padding: 18px;
  }

  .horarios-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .cancel-btn,
  .reserve-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 380px) {

  .brand-icon {
    width: 35px;
    height: 35px;
  }

  .app-title {
    font-size: 15px;
  }

  .horarios-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```
