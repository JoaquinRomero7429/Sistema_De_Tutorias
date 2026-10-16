<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addCourse } from '../data/store.js'

const router = useRouter()
const error = ref('')
const form = reactive({ year: '', division: '', subject: '', teacher: '', description: '' })
const years = ['1er año', '2do año', '3er año', '4to año', '5to año', '6to año']

function save() {
  error.value = ''
  if (!form.year || !form.division.trim() || !form.subject.trim()) {
    error.value = 'Completá el año, la división y la materia.'
    return
  }
  const id = addCourse({ year: form.year, division: form.division.trim(), subject: form.subject.trim(), teacher: form.teacher.trim(), description: form.description.trim() })
  router.push(`/cursos/${id}`)
}
</script>

<template>
  <section class="page narrow">
    <RouterLink class="text-link back" to="/cursos">← Volver a cursos</RouterLink>
    <div class="panel form-panel"><p class="eyebrow">NUEVO ESPACIO</p><h1>Crear curso</h1><p class="muted">Agregá una materia para publicar y organizar sus tutorías.</p>
      <form class="form" @submit.prevent="save">
        <div class="form-row"><label>Año<select v-model="form.year" required><option disabled value="">Seleccionar año</option><option v-for="year in years" :key="year" :value="year">{{ year }}</option></select></label><label>División<input v-model="form.division" required maxlength="8" placeholder="A" /></label></div>
        <label>Materia<input v-model="form.subject" required maxlength="80" placeholder="Ej. Matemática" /></label>
        <label>Docente o tutor<input v-model="form.teacher" maxlength="80" placeholder="Nombre (opcional)" /></label>
        <label>Descripción<textarea v-model="form.description" rows="3" maxlength="300" placeholder="Temas y detalles para los estudiantes" /></label>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p><button class="button primary full" type="submit">Guardar curso</button>
      </form>
    </div>
  </section>
</template>
