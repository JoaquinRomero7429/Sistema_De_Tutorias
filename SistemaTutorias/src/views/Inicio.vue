<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { data } from '../data/store.js'

const upcoming = computed(() => [...data.sessions]
  .filter((session) => session.date >= new Date().toISOString().slice(0, 10))
  .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
  .slice(0, 3))
const courseName = (id) => data.courses.find((course) => course.id === id)?.subject ?? 'Materia'
</script>

<template>
  <section class="page">
    <div class="welcome panel">
      <div><p class="eyebrow">ESPACIO DE ACOMPAÑAMIENTO</p><h1>Aprender en equipo</h1><p class="muted">Organizá cursos y encontrá un horario para cada consulta.</p></div>
      <RouterLink class="button primary" to="/cursos/nuevo">＋ Crear curso</RouterLink>
    </div>
    <div class="stats">
      <article class="panel stat"><span class="stat-icon">▤</span><div><strong>{{ data.courses.length }}</strong><span>Cursos</span></div></article>
      <article class="panel stat"><span class="stat-icon">◷</span><div><strong>{{ data.sessions.length }}</strong><span>Tutorías publicadas</span></div></article>
      <article class="panel stat"><span class="stat-icon">✓</span><div><strong>{{ data.sessions.reduce((total, session) => total + session.attendees.length, 0) }}</strong><span>Reservas realizadas</span></div></article>
    </div>
    <div class="section-heading"><div><p class="eyebrow">PRÓXIMOS ENCUENTROS</p><h2>Horarios disponibles</h2></div><RouterLink class="text-link" to="/cursos">Ver todos los cursos →</RouterLink></div>
    <div v-if="upcoming.length" class="cards">
      <RouterLink v-for="session in upcoming" :key="session.id" class="panel session-card" :to="`/cursos/${session.courseId}`">
        <span class="tag">{{ courseName(session.courseId) }}</span><h3>{{ session.tutor }}</h3>
        <p class="muted">{{ session.date }} · {{ session.time }}</p>
        <p class="availability">{{ Math.max(0, session.capacity - session.attendees.length) }} lugares disponibles</p>
      </RouterLink>
    </div>
    <div v-else class="panel empty">Todavía no hay tutorías próximas. Podés crear un curso y publicar un horario.</div>
    <p class="local-note">Modo local: los cambios se guardan en este navegador y dispositivo.</p>
  </section>
</template>
