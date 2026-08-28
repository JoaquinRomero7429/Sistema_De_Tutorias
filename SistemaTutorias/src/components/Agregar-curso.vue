<template>
  <div class="app">

    <!-- BARRA LATERAL -->
    <aside class="sidebar">

      <div class="sidebar-title">
        <span class="sidebar-icon">📚</span>
        <span>Cursos</span>
      </div>

      <button
        class="course-item"
        @click="seleccionarCurso('5to año')"
      >
        <span class="number">5</span>
        5to año
      </button>

      <button
        class="course-item"
        @click="seleccionarCurso('3er año')"
      >
        <span class="number">3</span>
        3er año
      </button>

      <div class="sidebar-bottom">
        <button @click="cerrarSesion">
          ◉ Cerrar sesión
        </button>
      </div>

    </aside>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="main">

      <!-- HEADER -->
      <header class="header">

        <div class="header-title">
          <h1>Sistema de Tutorías</h1>

          <div class="breadcrumb">
            Cursos
            <span>›</span>
            Espacio Curricular
            <span>›</span>
            <strong>Agregar curso</strong>
          </div>
        </div>

        <div class="user-info">
          <div>
            <span>Nombre de usuario</span>
            <strong>Rol</strong>
          </div>

          <button class="user-button" title="Perfil">
            👤
          </button>

          <button class="notification-button" title="Notificaciones">
            🔔
          </button>
        </div>

      </header>

      <!-- CONTENIDO -->
      <section class="content">

        <div class="page-heading">
          <div>
            <h2>Agregar curso</h2>
            <p>
              Completá los datos para agregar un nuevo curso al sistema.
            </p>
          </div>

          <button
            class="back-button"
            type="button"
            @click="volver"
          >
            ← Volver
          </button>
        </div>

        <!-- FORMULARIO -->
        <form
          class="course-form"
          @submit.prevent="agregarCurso"
        >

          <div class="form-grid">

            <!-- NOMBRE DEL CURSO -->
            <div class="form-group">
              <label for="nombre">
                Nombre del curso
              </label>

              <input
                id="nombre"
                v-model.trim="form.nombre"
                type="text"
                placeholder="Ej. Matemática"
                required
              />
            </div>

            <!-- AÑO -->
            <div class="form-group">
              <label for="anio">
                Año
              </label>

              <select
                id="anio"
                v-model="form.anio"
                required
              >
                <option value="" disabled>
                  Seleccionar año
                </option>

                <option value="1er año">
                  1er año
                </option>

                <option value="2do año">
                  2do año
                </option>

                <option value="3er año">
                  3er año
                </option>

                <option value="4to año">
                  4to año
                </option>

                <option value="5to año">
                  5to año
                </option>

                <option value="6to año">
                  6to año
                </option>
              </select>
            </div>

            <!-- CURSO / DIVISIÓN -->
            <div class="form-group">
              <label for="division">
                Curso / División
              </label>

              <input
                id="division"
                v-model.trim="form.division"
                type="text"
                placeholder="Ej. 5to A"
                required
              />
            </div>

            <!-- MATERIA -->
            <div class="form-group">
              <label for="materia">
                Materia
              </label>

              <input
                id="materia"
                v-model.trim="form.materia"
                type="text"
                placeholder="Ej. Matemática"
                required
              />
            </div>

            <!-- DOCENTE -->
            <div class="form-group">
              <label for="docente">
                Docente
              </label>

              <input
                id="docente"
                v-model.trim="form.docente"
                type="text"
                placeholder="Nombre del docente"
                required
              />
            </div>

            <!-- ESTADO -->
            <div class="form-group">
              <label for="estado">
                Estado
              </label>

              <select
                id="estado"
                v-model="form.estado"
                required
              >
                <option value="Activo">
                  Activo
                </option>

                <option value="Inactivo">
                  Inactivo
                </option>
              </select>
            </div>

          </div>

          <!-- DESCRIPCIÓN -->
          <div class="form-group full">
            <label for="descripcion">
              Descripción
            </label>

            <textarea
              id="descripcion"
              v-model.trim="form.descripcion"
              rows="5"
              placeholder="Ingresá una descripción del curso..."
            ></textarea>
          </div>

          <!-- BOTONES -->
          <div class="form-actions">

            <button
              type="button"
              class="cancel-button"
              @click="volver"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="save-button"
              :disabled="guardando"
            >
              {{ guardando ? 'Guardando...' : 'Agregar curso' }}
            </button>

          </div>

        </form>

        <!-- MENSAJE -->
        <div
          v-if="mensaje"
          class="success-message"
        >
          ✓ {{ mensaje }}
        </div>

      </section>

    </main>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const guardando = ref(false)
const mensaje = ref('')

const form = reactive({
  nombre: '',
  anio: '',
  division: '',
  materia: '',
  docente: '',
  estado: 'Activo',
  descripcion: ''
})

function agregarCurso() {
  guardando.value = true
  mensaje.value = ''

  // Acá posteriormente se puede conectar con la API
  // Ejemplo:
  // await axios.post('/api/cursos', form)

  setTimeout(() => {
    console.log('Curso agregado:', { ...form })

    mensaje.value = 'El curso fue agregado correctamente.'
    guardando.value = false

    // Limpiar formulario
    form.nombre = ''
    form.anio = ''
    form.division = ''
    form.materia = ''
    form.docente = ''
    form.estado = 'Activo'
    form.descripcion = ''
  }, 800)
}

function seleccionarCurso(curso) {
  console.log('Curso seleccionado:', curso)

  // Acá posteriormente se puede utilizar:
  // router.push(`/cursos/${curso}`)
}

function volver() {
  window.history.back()
}

function cerrarSesion() {
  console.log('Cerrar sesión')

  // Acá posteriormente:
  // router.push('/inicio-sesion')
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  display: flex;
  background: #ffffff;
  color: #222222;
  font-family: Arial, Helvetica, sans-serif;
}

/* =========================
   SIDEBAR
========================= */

.sidebar {
  width: 230px;
  min-height: 100vh;
  border-right: 1px solid #cfcfcf;
  display: flex;
  flex-direction: column;
  background: #fafafa;
}

.sidebar-title {
  height: 70px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  border-bottom: 1px solid #cfcfcf;
  font-size: 22px;
  font-weight: bold;
}

.sidebar-icon {
  font-size: 20px;
}

.course-item {
  width: 100%;
  padding: 18px 20px;
  border: none;
  border-bottom: 1px solid #dddddd;
  background: white;
  text-align: left;
  font-size: 17px;
  cursor: pointer;
  transition: 0.2s;
}

.course-item:hover {
  background: #f0f0f0;
}

.number {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  margin-right: 8px;
  border: 1px solid #777;
  border-radius: 50%;
  font-size: 14px;
}

.sidebar-bottom {
  margin-top: auto;
  border-top: 1px solid #cfcfcf;
}

.sidebar-bottom button {
  width: 100%;
  padding: 17px 20px;
  border: none;
  background: white;
  text-align: left;
  font-size: 15px;
  cursor: pointer;
}

.sidebar-bottom button:hover {
  background: #eeeeee;
}

/* =========================
   MAIN
========================= */

.main {
  flex: 1;
  min-width: 0;
}

/* =========================
   HEADER
========================= */

.header {
  min-height: 110px;
  padding: 15px 30px;
  border-bottom: 1px solid #cfcfcf;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title h1 {
  margin: 0 0 12px;
  font-size: 29px;
  font-weight: 500;
}

.breadcrumb {
  font-size: 15px;
  color: #666;
}

.breadcrumb span {
  margin: 0 8px;
  color: #999;
}

.breadcrumb strong {
  color: #222;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-info > div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 13px;
}

.user-info strong {
  margin-top: 3px;
}

.user-button,
.notification-button {
  width: 40px;
  height: 40px;
  border: 1px solid #aaa;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  font-size: 18px;
}

.notification-button {
  border: none;
}

/* =========================
   CONTENT
========================= */

.content {
  padding: 35px 45px;
  max-width: 1100px;
}

.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.page-heading h2 {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 500;
}

.page-heading p {
  margin: 0;
  color: #666;
}

.back-button {
  padding: 10px 18px;
  border: 1px solid #777;
  border-radius: 7px;
  background: white;
  cursor: pointer;
  font-size: 14px;
}

.back-button:hover {
  background: #f2f2f2;
}

/* =========================
   FORM
========================= */

.course-form {
  width: 100%;
  border: 1px solid #cfcfcf;
  border-radius: 12px;
  padding: 30px;
  background: white;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.05);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full {
  margin-top: 22px;
}

.form-group label {
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #aaa;
  border-radius: 7px;
  background: white;
  font-family: inherit;
  font-size: 15px;
  outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #555;
}

.form-group textarea {
  resize: vertical;
  min-height: 110px;
}

/* =========================
   ACTIONS
========================= */

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid #dddddd;
}

.cancel-button,
.save-button {
  padding: 12px 22px;
  border-radius: 7px;
  font-size: 15px;
  cursor: pointer;
}

.cancel-button {
  border: 1px solid #999;
  background: white;
}

.cancel-button:hover {
  background: #eeeeee;
}

.save-button {
  border: 1px solid #333;
  background: #333;
  color: white;
}

.save-button:hover {
  background: #222;
}

.save-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* =========================
   MESSAGE
========================= */

.success-message {
  margin-top: 20px;
  padding: 14px 18px;
  border: 1px solid #9ab89a;
  border-radius: 7px;
  background: #eef7ee;
  color: #315d31;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 800px) {

  .sidebar {
    width: 180px;
  }

  .header {
    padding: 15px 20px;
  }

  .user-info > div {
    display: none;
  }

  .content {
    padding: 25px 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {

  .app {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;
  }

  .sidebar-bottom {
    display: none;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .user-info {
    align-self: flex-end;
  }

  .page-heading {
    flex-direction: column;
    gap: 15px;
  }

  .course-form {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-button,
  .save-button {
    width: 100%;
  }
}
</style>