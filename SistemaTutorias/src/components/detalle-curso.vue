```vue
<template>
  <div class="tutorias-shell">

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

    <div class="layout">

      <!-- ================= SIDEBAR ================= -->
      <aside class="sidebar">

        <div>
          <div class="sidebar-heading">
            <span class="sidebar-icon">▦</span>
            <span>Cursos</span>
          </div>

          <nav class="course-nav">
            <button
              v-for="anio in aniosDisponibles"
              :key="anio.id"
              type="button"
              class="course-nav__item"
              :class="{
                'course-nav__item--active':
                  anio.id === anioSeleccionado
              }"
              @click="seleccionarAnio(anio.id)"
            >
              <span class="course-nav__badge">
                {{ anio.numero }}
              </span>

              <span>{{ anio.etiqueta }}</span>

              <span
                v-if="anio.id === anioSeleccionado"
                class="active-arrow"
              >
                ›
              </span>
            </button>
          </nav>
        </div>

        <button
          class="logout-btn"
          type="button"
          @click="cerrarSesion"
        >
          <svg viewBox="0 0 24 24">
            <path d="M10 5H5v14h5" />
            <path d="M14 8l4 4-4 4" />
            <path d="M18 12H9" />
          </svg>

          <span>Cerrar sesión</span>
        </button>
      </aside>

      <!-- ================= CONTENIDO ================= -->
      <main class="content">

        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <span>Espacio Curricular</span>
          <span class="breadcrumb-arrow">›</span>
          <span>{{ curso.anio }}</span>
          <span class="breadcrumb-arrow">›</span>
          <strong>{{ curso.materia }}</strong>
        </div>

        <!-- Encabezado -->
        <section class="page-header">

          <div>
            <span class="section-label">CURSO</span>

            <h2 class="course-title">
              {{ curso.materia }}
            </h2>

            <p class="course-description">
              Gestioná y consultá las tutorías correspondientes a este
              espacio curricular.
            </p>
          </div>

          <button
            class="add-tutoria-btn"
            type="button"
            @click="agregarTutoria"
          >
            <span class="plus-icon">+</span>
            <span>Agregar Tutoría</span>
          </button>

        </section>

        <!-- Estadísticas -->
        <section class="stats">

          <div class="stat-card">
            <div class="stat-icon stat-icon--blue">
              ✓
            </div>

            <div>
              <span class="stat-label">Tutorías activas</span>
              <strong class="stat-number">
                {{ tutorias.length }}
              </strong>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon stat-icon--red">
              ◷
            </div>

            <div>
              <span class="stat-label">Borradores</span>
              <strong class="stat-number">
                {{ borradores.length }}
              </strong>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon stat-icon--purple">
              {{ curso.anio.charAt(0) }}
            </div>

            <div>
              <span class="stat-label">Año</span>
              <strong class="stat-number stat-year">
                {{ curso.anio }}
              </strong>
            </div>
          </div>

        </section>

        <!-- ================= TUTORÍAS ================= -->

        <div class="section-title-row">
          <div>
            <h3>Tutorías</h3>
            <p>Listado de tutorías de {{ curso.materia }}</p>
          </div>
        </div>

        <!-- Estado vacío -->
        <div
          v-if="tutorias.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">
            +
          </div>

          <h3>No hay tutorías todavía</h3>

          <p>
            Todavía no hay tutorías cargadas para
            {{ curso.materia }}.
          </p>

          <button
            class="empty-button"
            @click="agregarTutoria"
          >
            Crear primera tutoría
          </button>
        </div>

        <!-- Tarjetas -->
        <section
          v-else
          class="cards-grid"
        >

          <!-- Tutoría -->
          <article
            v-for="tutoria in tutorias"
            :key="tutoria.id"
            class="tutoria-card"
          >

            <div class="card-top">
              <div class="card-code">
                <span class="code-dot"></span>
                Tutoría {{ tutoria.codigo }}
              </div>

              <span class="status">
                Activa
              </span>
            </div>

            <div class="tutoria-card__body">

              <div class="student">
                <div class="student-avatar">
                  {{ tutoria.estudiante.charAt(0) }}
                </div>

                <div>
                  <span class="field-label">
                    Estudiante
                  </span>

                  <strong>
                    {{ tutoria.estudiante }}
                  </strong>
                </div>
              </div>

              <div class="schedule">
                <span class="schedule-icon">◷</span>

                <div>
                  <span class="field-label">
                    Día y horario
                  </span>

                  <strong>
                    {{ tutoria.diaYHorario }}
                  </strong>
                </div>
              </div>

            </div>

            <div class="tutoria-card__actions">

              <button
                class="pill pill--ver"
                type="button"
                @click="verTutoria(tutoria)"
              >
                Ver
              </button>

              <button
                class="pill pill--enviar"
                type="button"
                @click="enviarTutoria(tutoria)"
              >
                Enviar
              </button>

              <button
                class="pill pill--borrar"
                type="button"
                @click="borrarTutoria(tutoria)"
              >
                Borrar
              </button>

            </div>
          </article>

          <!-- ================= BORRADORES ================= -->

          <article class="tutoria-card draft-card">

            <div class="card-top draft-top">
              <div class="card-code">
                <span class="code-dot"></span>
                Borradores
              </div>

              <span class="draft-badge">
                {{ borradores.length }}
              </span>
            </div>

            <div class="draft-body">

              <template v-if="borradores.length > 0">

                <p
                  v-for="borrador in borradores"
                  :key="borrador.id"
                >
                  {{ borrador.estudiante }}
                  ·
                  {{ borrador.diaYHorario }}
                </p>

              </template>

              <template v-else>

                <div class="draft-icon">
                  ◫
                </div>

                <strong>Aún no hay borradores</strong>

                <span>
                  Los borradores aparecerán aquí.
                </span>

              </template>

            </div>

            <div class="draft-action">
              <button
                class="pill pill--draft"
                type="button"
                @click="verBorradores"
              >
                Ver borradores
              </button>
            </div>

          </article>

        </section>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ================= USUARIO =================

const usuario = ref({
  nombre: 'Nombre de Usuario',
  rol: 'Rol',
})

// ================= CURSOS =================

const aniosDisponibles = ref([
  {
    id: 'quinto',
    numero: 5,
    etiqueta: '5to año',
  },
  {
    id: 'tercero',
    numero: 3,
    etiqueta: '3er año',
  },
])

const anioSeleccionado = ref('quinto')

// ================= CURSO ACTUAL =================

const curso = computed(() => ({
  anio:
    aniosDisponibles.value.find(
      (a) => a.id === anioSeleccionado.value
    )?.etiqueta ?? '',

  materia: 'Matemática',
}))

// ================= TUTORÍAS =================

const tutorias = ref([
  {
    id: 1,
    codigo: 'N/N/N',
    estudiante: 'Nombre de estudiante',
    diaYHorario: 'Miércoles 7:30 a 8:20',
  },
])

// ================= BORRADORES =================

const borradores = ref([])

// ================= FUNCIONES =================

function seleccionarAnio(id) {
  anioSeleccionado.value = id
}

function cerrarSesion() {
  console.log('Cerrar sesión')
}

function agregarTutoria() {
  console.log(
    'Agregar tutoría para',
    curso.value.materia
  )
}

function verTutoria(tutoria) {
  console.log(
    'Ver tutoría',
    tutoria.id
  )
}

function enviarTutoria(tutoria) {
  console.log(
    'Enviar tutoría',
    tutoria.id
  )
}

function borrarTutoria(tutoria) {
  tutorias.value =
    tutorias.value.filter(
      (t) => t.id !== tutoria.id
    )
}

function verBorradores() {
  console.log(
    'Ver borradores de',
    curso.value.materia
  )
}
</script>

<style scoped>

/* ================= VARIABLES ================= */

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
  color: #292638;
}

/* ================= CONTENEDOR ================= */

.tutorias-shell {
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

  font-size: 19px;
  font-weight: 800;
}

.app-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.app-subtitle {
  display: block;
  margin-top: 2px;

  font-size: 11px;
  color: #888395;
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

  font-size: 11px;
  color: #8a8694;
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
  transform: translateY(-1px);
}

.icon-btn svg {
  width: 18px;
  height: 18px;

  fill: none;
  stroke: #625d6d;
  stroke-width: 1.5;
}

.notification-btn {
  color: #6fa93f;
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

/* ================= LAYOUT ================= */

.layout {
  display: flex;
  min-height: calc(100vh - 74px);
}

/* ================= SIDEBAR ================= */

.sidebar {
  width: 220px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #ffffff;
  border-right: 1px solid #e7e4ee;
}

.sidebar-heading {
  height: 58px;
  padding: 0 22px;

  display: flex;
  align-items: center;
  gap: 9px;

  border-bottom: 1px solid #eeeaf2;

  color: #55505f;

  font-size: 13px;
  font-weight: 700;
}

.sidebar-icon {
  font-size: 18px;
}

.course-nav {
  padding: 12px;
}

.course-nav__item {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 11px;

  margin-bottom: 5px;
  padding: 11px 12px;

  border: none;
  border-radius: 9px;

  background: transparent;

  color: #55515f;

  text-align: left;
  font-size: 13px;

  cursor: pointer;

  transition: 0.2s;
}

.course-nav__item:hover {
  background: #f5f2fa;
}

.course-nav__item--active {
  background: #e4dbf5;
  color: #493b65;
  font-weight: 700;
}

.course-nav__badge {
  width: 27px;
  height: 27px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  border: 1px solid #a99abf;

  font-size: 11px;
  font-weight: 700;
}

.course-nav__item--active .course-nav__badge {
  background: #cabbe9;
  border-color: #8d7aaa;
}

.active-arrow {
  margin-left: auto;
  font-size: 20px;
}

.logout-btn {
  width: 100%;

  padding: 15px 20px;

  display: flex;
  align-items: center;
  gap: 9px;

  border: none;
  border-top: 1px solid #eeeaf2;

  background: #faf8fd;

  color: #665e70;

  font-size: 13px;

  cursor: pointer;

  transition: 0.2s;
}

.logout-btn:hover {
  background: #f1ebf8;
}

.logout-btn svg {
  width: 18px;
  height: 18px;

  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

/* ================= CONTENT ================= */

.content {
  flex: 1;

  max-width: 1400px;

  padding: 28px 34px;

  overflow-y: auto;
}

/* ================= BREADCRUMB ================= */

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 22px;

  font-size: 12px;
  color: #8a8593;
}

.breadcrumb strong {
  color: #514b5d;
}

.breadcrumb-arrow {
  color: #b2adba;
  font-size: 17px;
}

/* ================= PAGE HEADER ================= */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 25px;
}

.section-label {
  color: #8d7aaa;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.3px;
}

.course-title {
  margin: 5px 0 5px;

  font-size: 28px;
  font-weight: 750;

  color: #2e2a38;
}

.course-description {
  margin: 0;

  max-width: 600px;

  color: #85808f;

  font-size: 13px;
}

.add-tutoria-btn {
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 11px 18px;

  border: none;
  border-radius: 10px;

  background: #cabbe9;

  color: #46385e;

  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  box-shadow: 0 4px 12px rgba(116, 92, 153, 0.12);

  transition: 0.2s;
}

.add-tutoria-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 17px rgba(116, 92, 153, 0.18);
}

.plus-icon {
  font-size: 19px;
  line-height: 1;
}

/* ================= STATS ================= */

.stats {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(160px, 1fr));

  gap: 15px;

  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 13px;

  padding: 15px 17px;

  background: white;

  border: 1px solid #e8e5ed;
  border-radius: 12px;

  box-shadow: 0 2px 8px rgba(60, 48, 76, 0.035);
}

.stat-icon {
  width: 39px;
  height: 39px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  font-size: 16px;
  font-weight: 800;
}

.stat-icon--blue {
  background: #dcecf8;
  color: #5188ad;
}

.stat-icon--red {
  background: #f8dddd;
  color: #b96b6b;
}

.stat-icon--purple {
  background: #e9e1f7;
  color: #8066a4;
}

.stat-label {
  display: block;

  margin-bottom: 2px;

  color: #8d8896;

  font-size: 11px;
}

.stat-number {
  display: block;

  font-size: 18px;
  color: #393443;
}

.stat-year {
  font-size: 14px;
}

/* ================= SECTION ================= */

.section-title-row {
  margin-bottom: 14px;
}

.section-title-row h3 {
  margin: 0;

  font-size: 17px;
  color: #37323f;
}

.section-title-row p {
  margin: 3px 0 0;

  color: #928d9b;
  font-size: 11px;
}

/* ================= GRID ================= */

.cards-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(290px, 1fr));

  gap: 17px;
}

/* ================= CARD ================= */

.tutoria-card {
  overflow: hidden;

  display: flex;
  flex-direction: column;

  min-height: 235px;

  background: white;

  border: 1px solid #e5e1ea;
  border-radius: 14px;

  box-shadow:
    0 3px 12px rgba(52, 42, 65, 0.045);

  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.tutoria-card:hover {
  transform: translateY(-3px);

  box-shadow:
    0 9px 25px rgba(52, 42, 65, 0.09);
}

.card-top {
  padding: 13px 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #cfe4f4;

  border-bottom: 1px solid #bdd8eb;
}

.card-code {
  display: flex;
  align-items: center;
  gap: 7px;

  color: #42647b;

  font-size: 12px;
  font-weight: 700;
}

.code-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #6c9fc3;
}

.status {
  padding: 4px 8px;

  border-radius: 20px;

  background: #ffffffa8;

  color: #54768e;

  font-size: 9px;
  font-weight: 700;
}

.tutoria-card__body {
  flex: 1;

  padding: 18px 16px;

  display: flex;
  flex-direction: column;
  gap: 18px;
}

.student,
.schedule {
  display: flex;
  align-items: center;
  gap: 11px;
}

.student-avatar {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: #e4dbf5;
  color: #66527f;

  font-size: 13px;
  font-weight: 800;
}

.schedule-icon {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 10px;

  background: #eef5e9;
  color: #6fa93f;

  font-size: 18px;
}

.field-label {
  display: block;

  margin-bottom: 3px;

  color: #9993a1;

  font-size: 10px;
  font-weight: 600;
}

.student strong,
.schedule strong {
  display: block;

  color: #45404e;

  font-size: 12px;
}

/* ================= ACTIONS ================= */

.tutoria-card__actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  gap: 7px;

  padding: 12px 14px;

  border-top: 1px solid #eeeaf1;
}

.pill {
  padding: 8px 5px;

  border: 1px solid transparent;
  border-radius: 8px;

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.pill:hover {
  transform: translateY(-1px);
}

.pill--ver {
  background: #dcecf8;
  border-color: #c6dfef;
  color: #4d7897;
}

.pill--enviar {
  background: #a9cf88;
  border-color: #92bb70;
  color: white;
}

.pill--borrar {
  background: #f6d9d9;
  border-color: #edc5c5;
  color: #a75f5f;
}

/* ================= DRAFT CARD ================= */

.draft-card {
  border-style: dashed;
}

.draft-top {
  background: #f6d9d9;
  border-color: #edc5c5;
}

.draft-top .card-code {
  color: #9e5e5e;
}

.draft-top .code-dot {
  background: #c87878;
}

.draft-badge {
  min-width: 23px;
  height: 23px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #ffffffb8;

  color: #a26363;

  font-size: 10px;
  font-weight: 800;
}

.draft-body {
  flex: 1;

  min-height: 135px;

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  gap: 5px;

  color: #8f8995;
}

.draft-body strong {
  color: #706a77;
  font-size: 12px;
}

.draft-body span {
  font-size: 10px;
}

.draft-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 4px;

  border-radius: 12px;

  background: #f9eeee;

  color: #c28383;

  font-size: 22px;
}

.draft-action {
  padding: 12px 14px;

  border-top: 1px solid #eeeaf1;
}

.pill--draft {
  width: 100%;

  background: #f6d9d9;
  border-color: #edc5c5;

  color: #a75f5f;
}

/* ================= EMPTY ================= */

.empty-state {
  padding: 60px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;

  border: 1px dashed #d7d2df;
  border-radius: 14px;

  text-align: center;
}

.empty-icon {
  width: 55px;
  height: 55px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 12px;

  border-radius: 50%;

  background: #e4dbf5;

  color: #776291;

  font-size: 27px;
}

.empty-state h3 {
  margin: 0 0 5px;

  font-size: 15px;
}

.empty-state p {
  margin: 0 0 16px;

  color: #918b98;

  font-size: 12px;
}

.empty-button {
  padding: 9px 15px;

  border: none;
  border-radius: 8px;

  background: #cabbe9;

  color: #4d3d69;

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}

/* ================= RESPONSIVE ================= */

@media (max-width: 850px) {

  .sidebar {
    width: 185px;
  }

  .content {
    padding: 24px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .add-tutoria-btn {
    align-self: flex-start;
  }
}

@media (max-width: 650px) {

  .topbar {
    height: auto;
    min-height: 70px;
    padding: 12px 16px;
  }

  .user-text {
    display: none;
  }

  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;

    border-right: none;
    border-bottom: 1px solid #e7e4ee;
  }

  .sidebar-heading {
    height: 45px;
  }

  .course-nav {
    display: flex;
    gap: 6px;

    overflow-x: auto;
  }

  .course-nav__item {
    min-width: 120px;
  }

  .logout-btn {
    display: none;
  }

  .content {
    padding: 20px 16px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .course-title {
    font-size: 24px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 400px) {

  .app-subtitle {
    display: none;
  }

  .brand-icon {
    width: 35px;
    height: 35px;
  }

  .app-title {
    font-size: 15px;
  }

  .content {
    padding: 18px 12px;
  }

  .breadcrumb {
    flex-wrap: wrap;
  }
}
</style>
```
