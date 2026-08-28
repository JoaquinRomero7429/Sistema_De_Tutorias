<template>
  <div class="app-shell">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">ST</span>
        <div class="brand-text">
          <p class="brand-title">Sistema de</p>
          <p class="brand-title brand-title--accent">Tutorías</p>
        </div>
      </div>

      <p class="sidebar-label">Cursos</p>
      <nav class="course-list">
        <button
          v-for="curso in cursos"
          :key="curso.id"
          class="course-item"
          :class="{ active: curso.id === cursoActivo }"
          @click="seleccionarCurso(curso.id)"
        >
          <span class="course-year">{{ curso.id }}º</span>
          <span class="course-name">{{ curso.nombre }}</span>
          <span class="course-count" v-if="materiasPorCurso[curso.id]?.length">
            {{ materiasPorCurso[curso.id].length }}
          </span>
        </button>
      </nav>

      <button class="logout-btn" @click="cerrarSesion">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Cerrar sesión
      </button>
    </aside>

    <!-- Main -->
    <div class="main">
      <header class="topbar">
        <div class="breadcrumb">
          <span class="breadcrumb-eyebrow">Espacio curricular</span>
          <h1 class="breadcrumb-title">
            {{ cursoSeleccionadoNombre || 'Seleccioná un curso' }}
          </h1>
        </div>

        <div class="user-box">
          <button class="icon-btn" title="Notificaciones">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2a6 6 0 0 0-6 6v3.6L4 15v1h16v-1l-2-3.4V8a6 6 0 0 0-6-6Zm0 20a2.4 2.4 0 0 0 2.4-2.4h-4.8A2.4 2.4 0 0 0 12 22Z"/>
            </svg>
            <span v-if="notificaciones > 0" class="badge">{{ notificaciones }}</span>
          </button>
          <div class="avatar">{{ iniciales }}</div>
          <div class="user-info">
            <span class="user-name">{{ usuario.nombre }}</span>
            <span class="user-role">{{ usuario.rol }}</span>
          </div>
        </div>
      </header>

      <main class="content">
        <div v-if="materiasDelCurso.length" class="materias-grid">
          <button
            v-for="materia in materiasDelCurso"
            :key="materia.id"
            class="materia-card"
            @click="irAMateria(materia)"
          >
            <span class="materia-tag">{{ materia.citaciones ?? 0 }} citaciones activas</span>
            <span class="materia-name">{{ materia.nombre }}</span>
            <span class="materia-cta">
              Ver espacio
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </div>

        <div v-else-if="cursoActivo" class="empty-state">
          <svg class="empty-illustration" viewBox="0 0 120 100" fill="none">
            <rect x="20" y="18" width="80" height="64" rx="6" stroke="#C7CCE4" stroke-width="2.5"/>
            <line x1="34" y1="36" x2="86" y2="36" stroke="#C7CCE4" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="34" y1="48" x2="72" y2="48" stroke="#C7CCE4" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="34" y1="60" x2="78" y2="60" stroke="#C7CCE4" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="88" cy="70" r="16" fill="#7B2D8E"/>
            <line x1="88" y1="63" x2="88" y2="77" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="81" y1="70" x2="95" y2="70" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <p class="empty-title">Todavía no hay espacios curriculares</p>
          <p class="empty-subtitle">Agregá una materia para {{ cursoSeleccionadoNombre }} y empezá a registrar tutorías.</p>
        </div>

        <div v-else class="empty-state">
          <p class="empty-title">Elegí un curso en el panel izquierdo</p>
          <p class="empty-subtitle">Vas a ver ahí sus materias y las tutorías registradas.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const usuario = ref({
  nombre: 'Profe Nacho',
  rol: 'Profesor'
})

const iniciales = computed(() =>
  usuario.value.nombre
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)

const notificaciones = ref(2)

const cursos = ref([
  { id: 1, nombre: '1er año' },
  { id: 2, nombre: '2do año' },
  { id: 3, nombre: '3er año' },
  { id: 4, nombre: '4to año' },
  { id: 5, nombre: '5to año' }
])

// mock — reemplazar por datos reales del backend
const materiasPorCurso = ref({
  1: [],
  2: [],
  3: [],
  4: [],
  5: [{ id: 1, nombre: 'Matemática', citaciones: 3 }]
})

const cursoActivo = ref(null)

const cursoSeleccionadoNombre = computed(
  () => cursos.value.find(c => c.id === cursoActivo.value)?.nombre ?? ''
)

const materiasDelCurso = computed(
  () => materiasPorCurso.value[cursoActivo.value] ?? []
)

function seleccionarCurso(id) {
  cursoActivo.value = id
}

function irAMateria(materia) {
  // TODO: router.push(`/curso/${cursoActivo.value}/materia/${materia.id}`)
  console.log('Ir a materia', materia)
}

function cerrarSesion() {
  // TODO: limpiar sesión y router.push('/login')
  console.log('Cerrando sesión...')
}
</script>

<style>
/* Reset global mínimo: sin scoped porque body/html están fuera del componente */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }

.app-shell {
  --ink: #5a1f68;         /* violeta oscuro, para textos y acentos fuertes */
  --ink-light: #7b2d8e;
  --indigo: #7b2d8e;      /* violeta principal (el de la muestra), botones/activos */
  --indigo-soft: #f4e9f6; /* tinte muy claro del mismo violeta, fondos suaves */
  --amber: #b25fc4;       /* variante más clara del violeta, para badges/detalles */
  --bg: #fdfbfe;          /* fondo general, blanco con tinte apenas violeta */
  --card: #ffffff;
  --border: #e9d9ec;
  --text: #3d2444;
  --text-soft: #8d7594;

  display: flex;
  height: 100vh;
  background: var(--bg);
  font-family: 'Poppins', system-ui, sans-serif;
  color: var(--text);
}

/* ---------- Sidebar ---------- */
.sidebar {
  width: 248px;
  flex-shrink: 0;
  background: var(--indigo-soft);
  border-right: 1px solid var(--border);
  color: var(--text);
  display: flex;
  flex-direction: column;
  padding: 24px 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--indigo);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.brand-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.15;
  margin: 0;
  color: var(--text-soft);
}

.brand-title--accent { color: var(--ink); font-weight: 700; }

.sidebar-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-soft);
  margin: 0 6px 12px;
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.course-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  border-left: 3px solid transparent;
}

.course-item:hover { background: rgba(168, 151, 232, 0.12); }

.course-item.active {
  background: #ffffff;
  color: var(--ink);
  border-left-color: var(--indigo);
  box-shadow: 0 2px 8px rgba(168, 151, 232, 0.25);
}

.course-year {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.75rem;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #ffffff;
  color: var(--text-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.course-item.active .course-year {
  background: var(--indigo);
  color: #fff;
}

.course-name { flex: 1; }

.course-count {
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  background: var(--indigo);
  border-radius: 999px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.logout-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #ffffff;
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.logout-btn:hover {
  border-color: var(--indigo);
  color: var(--ink);
}

/* ---------- Main ---------- */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: var(--card);
  border-bottom: 1px solid var(--border);
}

.breadcrumb-eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-soft);
}

.breadcrumb-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 2px 0 0;
  color: var(--ink);
}

.user-box {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-btn {
  position: relative;
  border: none;
  background: var(--indigo-soft);
  color: var(--indigo);
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--ink);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 999px;
  min-width: 17px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--card);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--ink);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}

.user-name { font-weight: 600; font-size: 0.88rem; }
.user-role { font-size: 0.75rem; color: var(--text-soft); }

/* ---------- Content ---------- */
.content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.materias-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}

.materia-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 22px 20px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--card);
  cursor: pointer;
  text-align: left;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.materia-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(27, 35, 64, 0.1);
  border-color: var(--indigo);
}

.materia-tag {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--indigo);
  background: var(--indigo-soft);
  padding: 3px 9px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.materia-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
}

.materia-cta {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--indigo);
}

.empty-state {
  height: 100%;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
}

.empty-illustration { margin-bottom: 8px; }

.empty-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--ink);
  margin: 0;
}

.empty-subtitle {
  font-size: 0.9rem;
  color: var(--text-soft);
  margin: 0;
  max-width: 320px;
}

/* ---------- Responsive ---------- */
@media (max-width: 720px) {
  .app-shell { flex-direction: column; height: auto; min-height: 100vh; }
  .sidebar { width: 100%; flex-direction: row; align-items: center; flex-wrap: wrap; }
  .brand { margin-bottom: 0; margin-right: auto; }
  .sidebar-label { display: none; }
  .logout-btn { margin-top: 0; margin-left: auto; }
}
</style>