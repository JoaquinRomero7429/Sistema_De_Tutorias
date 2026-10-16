<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { cancelReservation, data } from '../data/store.js'

const notice = ref('')
const reservations = computed(() => data.sessions.flatMap((session) => session.attendees.map((attendee) => ({ session, attendee, course: data.courses.find((course) => course.id === session.courseId) }))))
function cancel(session, attendee) { cancelReservation(session, attendee); notice.value = `Se canceló la reserva de ${attendee}.` }
</script>

<template>
  <section class="page"><div class="section-heading"><div><p class="eyebrow">AGENDA LOCAL</p><h1>Reservas</h1><p class="muted">Revisá las reservas registradas en este navegador.</p></div></div><p v-if="notice" class="notice" role="status">{{ notice }}</p>
    <div v-if="reservations.length" class="session-list"><article v-for="item in reservations" :key="`${item.session.id}-${item.attendee}`" class="panel session-row"><div class="session-info"><span class="tag">{{ item.course?.subject ?? 'Curso' }}</span><h2>{{ item.attendee }}</h2><p class="muted">{{ item.session.date }} · {{ item.session.time }} · Tutor/a: {{ item.session.tutor }}</p></div><button class="button secondary" @click="cancel(item.session, item.attendee)">Cancelar reserva</button></article></div>
    <div v-else class="panel empty">Todavía no hay reservas. <RouterLink to="/cursos">Buscá un horario disponible →</RouterLink></div>
  </section>
</template>
