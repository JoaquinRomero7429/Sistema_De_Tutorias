<template>
  <div class="cursos-page">

    <!-- Barra superior -->
    <header class="header">
      <div class="logo">
        <span class="logo-icon">ST</span>
        <h1>Sistema de Tutorías</h1>
      </div>

      <div class="header-right">
        <span class="usuario">{{ nombreUsuario }}</span>

        <!-- Campana -->
        <button class="icon-button" title="Notificaciones">
          <svg viewBox="0 0 24 24">
            <path
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"
            />
          </svg>
        </button>

        <!-- Usuario -->
        <button class="icon-button" title="Perfil">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>
    </header>

    <div class="contenido">

      <!-- Menú lateral -->
      <aside class="sidebar">
        <div class="sidebar-title">
          <span>📚</span>
          <span>Cursos</span>
        </div>

        <button
          v-for="curso in años"
          :key="curso.id"
          class="year-button"
          :class="{ activo: añoSeleccionado === curso.id }"
          @click="seleccionarAño(curso.id)"
        >
          {{ curso.nombre }}
        </button>

        <div class="sidebar-bottom">
          <button class="logout-button" @click="cerrarSesion">
            Cerrar sesión
          </button>
        </div>
      </aside>

      <!-- Contenido principal -->
      <main class="main">

        <div class="main-header">
          <div>
            <h2>Cursos</h2>
            <p>
              Seleccioná una materia para consultar las tutorías disponibles.
            </p>
          </div>

          <button class="volver-button" @click="volver">
            Volver
          </button>
        </div>

        <!-- Buscador -->
        <div class="buscador">
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar materia..."
          />
        </div>

        <!-- Lista de materias -->
        <section class="cursos-lista">

          <article
            v-for="materia in materiasFiltradas"
            :key="materia.id"
            class="curso-card"
            @click="seleccionarMateria(materia)"
          >
            <div class="curso-icon">
              {{ materia.icono }}
            </div>

            <div class="curso-info">
              <h3>{{ materia.nombre }}</h3>
              <p>{{ materia.descripcion }}</p>
            </div>

            <div class="curso-arrow">
              →
            </div>
          </article>

          <div
            v-if="materiasFiltradas.length === 0"
            class="sin-resultados"
          >
            No se encontraron materias.
          </div>

        </section>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Usuario que aparece arriba a la derecha
const nombreUsuario = ref('Emilia')

// Año seleccionado
const añoSeleccionado = ref(3)

// Buscador
const busqueda = ref('')

// Años disponibles
const años = [
  {
    id: 3,
    nombre: '3er año'
  },
  {
    id: 5,
    nombre: '5to año'
  }
]

// Materias
const materias = ref([
  {
    id: 1,
    año: 3,
    nombre: 'Matemática',
    descripcion: 'Tutorías y consultas de matemática',
    icono: 'M'
  },
  {
    id: 2,
    año: 3,
    nombre: 'Lengua y Literatura',
    descripcion: 'Tutorías de lengua y literatura',
    icono: 'L'
  },
  {
    id: 3,
    año: 3,
    nombre: 'Historia',
    descripcion: 'Tutorías y consultas de historia',
    icono: 'H'
  },
  {
    id: 4,
    año: 3,
    nombre: 'Geografía',
    descripcion: 'Tutorías y consultas de geografía',
    icono: 'G'
  },
  {
    id: 5,
    año: 3,
    nombre: 'Inglés',
    descripcion: 'Tutorías y consultas de inglés',
    icono: 'I'
  },
  {
    id: 6,
    año: 5,
    nombre: 'Matemática',
    descripcion: 'Tutorías y consultas de matemática',
    icono: 'M'
  },
  {
    id: 7,
    año: 5,
    nombre: 'Lengua y Literatura',
    descripcion: 'Tutorías de lengua y literatura',
    icono: 'L'
  },
  {
    id: 8,
    año: 5,
    nombre: 'Historia',
    descripcion: 'Tutorías y consultas de historia',
    icono: 'H'
  },
  {
    id: 9,
    año: 5,
    nombre: 'Inglés',
    descripcion: 'Tutorías y consultas de inglés',
    icono: 'I'
  }
])

// Filtrar materias por año + búsqueda
const materiasFiltradas = computed(() => {
  return materias.value.filter((materia) => {
    const coincideAño = materia.año === añoSeleccionado.value

    const coincideBusqueda = materia.nombre
      .toLowerCase()
      .includes(busqueda.value.toLowerCase())

    return coincideAño && coincideBusqueda
  })
})

// Cambiar de año
function seleccionarAño(año) {
  añoSeleccionado.value = año
  busqueda.value = ''
}

// Seleccionar materia
function seleccionarMateria(materia) {
  router.push({
    name: 'detalle-curso',
    params: {
      id: materia.id
    }
  })
}

// Volver a la pantalla anterior
function volver() {
  router.back()
}

// Cerrar sesión
function cerrarSesion() {
  router.push({
    name: 'inicio-sesion'
  })
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.cursos-page {
  min-height: 100vh;
  background: #f5f6f8;
  color: #202124;
  font-family: Arial, Helvetica, sans-serif;
}

/* HEADER */

.header {
  height: 76px;
  background: white;
  border-bottom: 1px solid #dcdcdc;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.logo-icon {
  width: 42px;
  height: 42px;

  border: 2px solid #333;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 14px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.usuario {
  font-size: 15px;
  margin-right: 5px;
}

.icon-button {
  width: 38px;
  height: 38px;

  border: 1px solid #d5d5d5;
  border-radius: 50%;

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

.icon-button:hover {
  background: #f1f1f1;
}

.icon-button svg {
  width: 19px;
  height: 19px;

  fill: none;
  stroke: #333;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* CONTENIDO */

.contenido {
  display: flex;
  min-height: calc(100vh - 76px);
}

/* SIDEBAR */

.sidebar {
  width: 220px;
  background: white;
  border-right: 1px solid #dcdcdc;

  padding: 25px 18px;

  display: flex;
  flex-direction: column;
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 18px;
  font-weight: bold;

  padding: 10px 12px;
  margin-bottom: 18px;
}

.year-button {
  width: 100%;

  padding: 13px 14px;
  margin-bottom: 8px;

  background: white;
  border: 1px solid #d6d6d6;
  border-radius: 8px;

  text-align: left;
  font-size: 15px;

  cursor: pointer;

  transition: 0.2s;
}

.year-button:hover {
  background: #f4f4f4;
}

.year-button.activo {
  background: #eeeeee;
  border-color: #333;
  font-weight: bold;
}

.sidebar-bottom {
  margin-top: auto;
}

.logout-button {
  width: 100%;

  padding: 11px;

  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;

  cursor: pointer;
}

.logout-button:hover {
  background: #f2f2f2;
}

/* MAIN */

.main {
  flex: 1;
  padding: 38px 50px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 25px;
}

.main-header h2 {
  margin: 0 0 7px;

  font-size: 30px;
  font-weight: 600;
}

.main-header p {
  margin: 0;

  color: #666;
  font-size: 15px;
}

.volver-button {
  padding: 9px 18px;

  border: 1px solid #bbb;
  border-radius: 7px;

  background: white;

  cursor: pointer;
}

/* BUSCADOR */

.buscador {
  width: 100%;
  height: 46px;

  display: flex;
  align-items: center;
  gap: 10px;

  background: white;

  border: 1px solid #d5d5d5;
  border-radius: 8px;

  padding: 0 14px;

  margin-bottom: 22px;
}

.buscador svg {
  width: 19px;
  height: 19px;

  fill: none;
  stroke: #777;
  stroke-width: 2;

  stroke-linecap: round;
}

.buscador input {
  flex: 1;

  border: none;
  outline: none;

  font-size: 15px;
}

/* CURSOS */

.cursos-lista {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 15px;
}

.curso-card {
  min-height: 105px;

  background: white;

  border: 1px solid #d6d6d6;
  border-radius: 10px;

  padding: 18px;

  display: flex;
  align-items: center;
  gap: 15px;

  cursor: pointer;

  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.curso-card:hover {
  transform: translateY(-2px);

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.curso-icon {
  width: 48px;
  height: 48px;

  border: 1px solid #cfcfcf;
  border-radius: 9px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 19px;
  font-weight: bold;

  flex-shrink: 0;
}

.curso-info {
  flex: 1;
}

.curso-info h3 {
  margin: 0 0 5px;

  font-size: 17px;
  font-weight: 600;
}

.curso-info p {
  margin: 0;

  color: #777;
  font-size: 13px;
}

.curso-arrow {
  font-size: 22px;
  color: #555;
}

.sin-resultados {
  grid-column: 1 / -1;

  background: white;

  border: 1px solid #ddd;
  border-radius: 10px;

  padding: 35px;

  text-align: center;
  color: #777;
}

/* RESPONSIVE */

@media (max-width: 750px) {
  .sidebar {
    width: 170px;
  }

  .main {
    padding: 25px;
  }

  .cursos-lista {
    grid-template-columns: 1fr;
  }

  .logo h1 {
    font-size: 19px;
  }

  .usuario {
    display: none;
  }
}

@media (max-width: 550px) {
  .contenido {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  .sidebar-bottom {
    display: none;
  }

  .main {
    padding: 20px;
  }
}
</style>