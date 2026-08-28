<template>
  <div class="tutorias-shell">
    <!-- ============== BARRA SUPERIOR ============== -->
    <header class="topbar">
      <h1 class="app-title">Sistema de Tutorías</h1>
      <div class="user-block">
        <div class="user-text">
          <span class="user-name">{{ usuario.nombre }}</span>
          <span class="user-role">{{ usuario.rol }}</span>
        </div>
        <button class="icon-btn" type="button" aria-label="Perfil">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" fill="none" stroke="currentColor" stroke-width="1.6" />
          </svg>
        </button>
        <button class="icon-btn icon-btn--accent" type="button" aria-label="Notificaciones">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M12 3c-3 0-5 2.2-5 5.4v3.3c0 .9-.4 1.8-1 2.4l-1 1.1c-.4.4-.1 1.1.5 1.1h13c.6 0 .9-.7.5-1.1l-1-1.1c-.6-.6-1-1.5-1-2.4V8.4C17 5.2 15 3 12 3Z"
              fill="currentColor"
            />
            <path d="M9.5 19a2.5 2.5 0 0 0 5 0" fill="none" stroke="currentColor" stroke-width="1.4" />
          </svg>
        </button>
      </div>
    </header>

    <div class="layout">
      <!-- ============== BARRA LATERAL ============== -->
      <aside class="sidebar">
        <p class="sidebar-label">Cursos</p>
        <nav class="course-nav">
          <button
            v-for="anio in aniosDisponibles"
            :key="anio.id"
            type="button"
            class="course-nav__item"
            :class="{ 'course-nav__item--active': anio.id === anioSeleccionado }"
            @click="seleccionarAnio(anio.id)"
          >
            <span class="course-nav__badge">{{ anio.numero }}</span>
            {{ anio.etiqueta }}
          </button>
        </nav>

        <button class="logout-btn" type="button" @click="cerrarSesion">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5" />
            <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" stroke-width="1.5" />
          </svg>
          Cerrar Sesión
        </button>
      </aside>

      <!-- ============== CONTENIDO: DETALLE DE CURSO ============== -->
      <main class="content">
        <p class="breadcrumb">
          Espacio Curricular <span class="breadcrumb__sep">&gt;</span>
          {{ curso.anio }} <span class="breadcrumb__sep">&gt;</span>
          <strong>{{ curso.materia }}</strong>
        </p>

        <div class="content-header">
          <h2 class="course-title">{{ curso.materia }}</h2>
          <button class="add-tutoria-btn" type="button" @click="agregarTutoria">
            <span class="add-tutoria-btn__icon">+</span> Agregar Tutoría
          </button>
        </div>

        <!-- Estado vacío: todavía no se creó ninguna tutoría para este curso -->
        <div v-if="tutorias.length === 0" class="empty-state">
          <svg viewBox="0 0 120 120" width="96" height="96" class="empty-state__icon">
            <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" stroke-width="1.5" />
            <line x1="60" y1="30" x2="60" y2="90" stroke="currentColor" stroke-width="1.5" />
            <line x1="30" y1="60" x2="90" y2="60" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <p>Todavía no hay tutorías cargadas para {{ curso.materia }}.</p>
        </div>

        <!-- Tarjetas: una por tutoría + tarjeta de borradores -->
        <section v-else class="cards-grid">
          <article v-for="tutoria in tutorias" :key="tutoria.id" class="tutoria-card">
            <header class="tutoria-card__header">Tutoría {{ tutoria.codigo }}</header>
            <div class="tutoria-card__body">
              <p><span class="field-label">Nombre:</span> {{ tutoria.estudiante }}</p>
              <p><span class="field-label">Día y horario:</span> {{ tutoria.diaYHorario }}</p>
            </div>
            <div class="tutoria-card__actions">
              <button class="pill pill--ver" type="button" @click="verTutoria(tutoria)">Ver</button>
              <button class="pill pill--enviar" type="button" @click="enviarTutoria(tutoria)">Enviar</button>
              <button class="pill pill--borrar" type="button" @click="borrarTutoria(tutoria)">Borrar</button>
            </div>
          </article>

          <!-- Tarjeta de borradores del curso -->
          <article class="tutoria-card tutoria-card--borradores">
            <header class="tutoria-card__header tutoria-card__header--rojo">Borradores</header>
            <div class="tutoria-card__body tutoria-card__body--center">
              <template v-if="borradores.length > 0">
                <p v-for="borrador in borradores" :key="borrador.id">
                  {{ borrador.estudiante }} · {{ borrador.diaYHorario }}
                </p>
              </template>
              <template v-else>
                <svg viewBox="0 0 64 64" width="48" height="48" class="tutoria-card__trash">
                  <path
                    d="M18 22h28l-2.4 30.4a4 4 0 0 1-4 3.6H24.4a4 4 0 0 1-4-3.6L18 22Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line x1="14" y1="22" x2="50" y2="22" stroke="currentColor" stroke-width="2" />
                  <path d="M24 22v-4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4" fill="none" stroke="currentColor" stroke-width="2" />
                </svg>
                <p>Aún no hay borradores</p>
              </template>
            </div>
            <div class="tutoria-card__actions tutoria-card__actions--single">
              <button class="pill pill--ver" type="button" @click="verBorradores">Ver</button>
            </div>
          </article>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/*
 * DetalleCurso.vue
 * Pantalla "Detalle de curso" del Sistema de Tutorías.
 * Componente autocontenido: no depende de stores, rutas ni componentes externos.
 * Los datos son de ejemplo y están separados de la plantilla para poder
 * reemplazarlos por datos reales (API) más adelante.
 */

// ---------- Datos del usuario logueado (ejemplo) ----------
const usuario = ref({
  nombre: 'Nombre de Usuario',
  rol: 'Rol',
})

// ---------- Cursos disponibles en la barra lateral ----------
const aniosDisponibles = ref([
  { id: 'quinto', numero: 5, etiqueta: '5to año' },
  { id: 'tercero', numero: 3, etiqueta: '3er año' },
])
const anioSeleccionado = ref('quinto')

// ---------- Curso actualmente mostrado (espacio curricular) ----------
const curso = computed(() => ({
  anio: aniosDisponibles.value.find((a) => a.id === anioSeleccionado.value)?.etiqueta ?? '',
  materia: 'Matemática',
}))

// ---------- Tutorías del curso (dato de ejemplo) ----------
const tutorias = ref([
  {
    id: 1,
    codigo: 'N/N/N',
    estudiante: 'Nombre de estudiante',
    diaYHorario: 'Miércoles 7:30 a 8:20',
  },
])

// ---------- Borradores del curso (dato de ejemplo) ----------
const borradores = ref([])

// ---------- Interacciones ----------
function seleccionarAnio(id) {
  anioSeleccionado.value = id
}

function cerrarSesion() {
  // TODO: conectar con el flujo real de autenticación (borrar sesión / token y redirigir al login).
  console.log('Cerrar sesión')
}

function agregarTutoria() {
  // TODO: navegar a la pantalla "Crear Tutoría" del mismo sistema.
  console.log('Agregar tutoría para', curso.value.materia)
}

function verTutoria(tutoria) {
  // TODO: navegar al detalle/citación de esta tutoría puntual.
  console.log('Ver tutoría', tutoria.id)
}

function enviarTutoria(tutoria) {
  // TODO: conectar con el backend que envía la notificación (correo / WhatsApp).
  console.log('Enviar tutoría', tutoria.id)
}

function borrarTutoria(tutoria) {
  tutorias.value = tutorias.value.filter((t) => t.id !== tutoria.id)
}

function verBorradores() {
  // TODO: navegar al listado de borradores del curso.
  console.log('Ver borradores de', curso.value.materia)
}
</script>

<style scoped>
:root {
  --lila: #cabbe9;
  --lila-suave: #e4dbf5;
  --azul: #86b8dd;
  --azul-suave: #cfe4f4;
  --rojo: #e8a3a3;
  --rojo-suave: #f6d9d9;
  --verde: #a9cf88;
  --tinta: #2c2c2c;
  --borde: #3a3a3a;
}

.tutorias-shell {
  font-family: 'Segoe UI', Roboto, Arial, sans-serif;
  color: var(--tinta);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--borde);
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

/* ---------------- Barra superior ---------------- */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 2px solid var(--borde);
  gap: 12px;
  flex-wrap: wrap;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.user-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.2;
  font-size: 0.85rem;
}

.user-name {
  font-weight: 600;
}

.user-role {
  color: #555;
}

.icon-btn {
  border: 1px solid var(--borde);
  background: #fff;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--tinta);
}

.icon-btn--accent {
  color: #6fa93f;
  border-color: #6fa93f;
}

/* ---------------- Layout general ---------------- */
.layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

/* ---------------- Barra lateral ---------------- */
.sidebar {
  width: 190px;
  flex-shrink: 0;
  border-right: 2px solid var(--borde);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-label {
  margin: 0;
  padding: 10px 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--borde);
}

.course-nav {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.course-nav__item {
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  text-align: left;
  padding: 12px 16px;
  font-size: 0.95rem;
  cursor: pointer;
  color: var(--tinta);
}

.course-nav__item--active {
  background: var(--lila);
}

.course-nav__badge {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid var(--tinta);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-top: 1px solid var(--borde);
  background: var(--lila);
  padding: 12px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  color: var(--tinta);
}

/* ---------------- Contenido principal ---------------- */
.content {
  flex: 1;
  padding: 20px 24px;
  min-width: 0;
  overflow-y: auto;
}

.breadcrumb {
  margin: 0 0 16px;
  font-size: 0.9rem;
  color: #444;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.breadcrumb__sep {
  margin: 0 4px;
  color: #999;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.course-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.add-tutoria-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1.5px solid var(--borde);
  background: var(--lila-suave);
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--tinta);
}

.add-tutoria-btn__icon {
  font-size: 1rem;
}

/* ---------------- Estado vacío ---------------- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #777;
  padding: 60px 20px;
  border: 1.5px dashed #ccc;
  border-radius: 10px;
}

.empty-state__icon {
  color: #bbb;
}

/* ---------------- Tarjetas de tutoría ---------------- */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 18px;
}

.tutoria-card {
  border: 1.5px solid var(--borde);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.tutoria-card__header {
  background: var(--azul);
  color: #fff;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 0.95rem;
}

.tutoria-card__header--rojo {
  background: var(--rojo);
}

.tutoria-card__body {
  padding: 12px 14px;
  flex: 1;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tutoria-card__body--center {
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #777;
  gap: 8px;
}

.field-label {
  font-weight: 600;
}

.tutoria-card__trash {
  color: #bbb;
}

.tutoria-card__actions {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  border-top: 1px solid #e2e2e2;
  flex-wrap: wrap;
}

.tutoria-card__actions--single {
  justify-content: center;
}

.pill {
  border: 1.5px solid var(--borde);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--tinta);
}

.pill--ver {
  background: var(--azul-suave);
}

.pill--enviar {
  background: var(--verde);
  color: #fff;
  border-color: #6fa93f;
}

.pill--borrar {
  background: var(--rojo-suave);
}

/* ---------------- Responsive ---------------- */
@media (max-width: 720px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    border-right: none;
    border-bottom: 2px solid var(--borde);
    align-items: center;
  }

  .sidebar-label {
    display: none;
  }

  .course-nav {
    flex-direction: row;
    flex: 1;
    overflow-x: auto;
  }

  .logout-btn {
    border-top: none;
    border-left: 1px solid var(--borde);
    white-space: nowrap;
  }

  .content-header {
    align-items: flex-start;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .topbar {
    padding: 12px;
  }

  .app-title {
    font-size: 1.15rem;
  }

  .content {
    padding: 16px;
  }
}
</style>