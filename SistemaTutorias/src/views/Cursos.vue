<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { data } from '../data/store.js'

const query = ref('')
const courses = computed(() => data.courses.filter((course) => `${course.subject} ${course.year} ${course.teacher}`.toLocaleLowerCase().includes(query.value.toLocaleLowerCase())))
const sessionCount = (id) => data.sessions.filter((session) => session.courseId === id).length
</script>

<template>
  <section class="page">
    <div class="section-heading"><div><p class="eyebrow">ESPACIOS CURRICULARES</p><h1>Cursos</h1><p class="muted">Consultá las materias y sus horarios de tutoría.</p></div><RouterLink class="button primary" to="/cursos/nuevo">＋ Crear curso</RouterLink></div>
    <label class="search"><span>⌕</span><input v-model="query" placeholder="Buscar por materia, año o docente" /></label>
    <div v-if="courses.length" class="cards course-grid">
      <RouterLink v-for="course in courses" :key="course.id" class="panel course-card" :to="`/cursos/${course.id}`">
        <span class="tag">{{ course.year }} · División {{ course.division }}</span><h2>{{ course.subject }}</h2><p class="muted">Docente: {{ course.teacher || 'Sin asignar' }}</p><p class="availability">{{ sessionCount(course.id) }} horarios publicados <span>→</span></p>
      </RouterLink>
    </div>
    <div v-else class="panel empty">No encontramos cursos con esa búsqueda. <RouterLink to="/cursos/nuevo">Crear un curso</RouterLink></div>
  </section>
</template>
