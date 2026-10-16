<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addSession, data, findCourse, reserveSession } from '../data/store.js'

const props = defineProps({ id: { type: String, required: true } })
const router = useRouter()
const course = computed(() => findCourse(props.id))
const sessions = computed(() => data.sessions.filter((session) => session.courseId === props.id).sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)))
const showForm = ref(false)
const message = ref('')
const error = ref('')
const reservationNames = reactive({})
const newSession = reactive({ tutor: '', date: '', time: '', capacity: 4 })
const minDate = new Date().toISOString().slice(0, 10)

function publishSession() {
  error.value = ''
  if (!newSession.tutor.trim() || !newSession.date || !newSession.time || Number(newSession.capacity) < 1) {
    error.value = 'Completá el nombre, la fecha, el horario y la cantidad de lugares.'
    return
  }
  if (newSession.date < minDate) {
    error.value = 'Elegí una fecha de hoy en adelante.'
    return
  }
  addSession({ courseId: props.id, tutor: newSession.tutor.trim(), date: newSession.date, time: newSession.time, capacity: Number(newSession.capacity) })
  Object.assign(newSession, { tutor: '', date: '', time: '', capacity: 4 })
  showForm.value = false
  message.value = 'El horario quedó publicado.'
}

function book(session) {
  message.value = ''
  error.value = ''
  const name = (reservationNames[session.id] ?? '').trim()
  if (!name) { error.value = 'Escribí tu nombre para reservar.'; return }
  const result = reserveSession(session, name)
  if (result === 'full') { error.value = 'Este horario ya no tiene lugares.'; return }
  if (result === 'duplicate') { error.value = 'Ese nombre ya tiene una reserva en este horario.'; return }
  reservationNames[session.id] = ''
  message.value = `Reserva confirmada para ${name}.`
}

if (!course.value) router.replace('/cursos')
</script>

<template>
  <section v-if="course" class="page">
    <RouterLink class="text-link back" to="/cursos">← Volver a cursos</RouterLink>
    <div class="section-heading"><div><p class="eyebrow">{{ course.year }} · DIVISIÓN {{ course.division }}</p><h1>{{ course.subject }}</h1><p class="muted">Docente: {{ course.teacher || 'Sin asignar' }}</p><p v-if="course.description" class="course-description">{{ course.description }}</p></div><button class="button primary" @click="showForm = !showForm">＋ Publicar horario</button></div>
    <p v-if="message" class="notice" role="status">{{ message }}</p>
    <div v-if="showForm" class="panel inline-form"><h2>Nuevo horario</h2><form class="form" @submit.prevent="publishSession"><div class="form-row"><label>Tutor/a<input v-model="newSession.tutor" required maxlength="80" /></label><label>Fecha<input v-model="newSession.date" type="date" :min="minDate" required /></label></div><div class="form-row"><label>Hora<input v-model="newSession.time" type="time" required /></label><label>Lugares<input v-model.number="newSession.capacity" type="number" min="1" max="30" required /></label></div><p v-if="error" class="form-error" role="alert">{{ error }}</p><button class="button primary" type="submit">Publicar</button></form></div>
    <div v-if="sessions.length" class="session-list"><article v-for="session in sessions" :key="session.id" class="panel session-row"><div class="session-info"><span class="tag">{{ session.date }} · {{ session.time }}</span><h2>{{ session.tutor }}</h2><p class="muted">{{ session.attendees.length }} de {{ session.capacity }} lugares reservados</p></div><div v-if="session.attendees.length < session.capacity" class="reserve-box"><input v-model="reservationNames[session.id]" aria-label="Nombre para reservar" placeholder="Tu nombre" maxlength="80" @keyup.enter="book(session)" /><button class="button primary" @click="book(session)">Reservar</button></div><span v-else class="tag full-tag">Completo</span></article></div>
    <div v-else class="panel empty">No hay horarios publicados todavía. Publicá el primero para que puedan reservar.</div>
    <p v-if="error && !showForm" class="form-error" role="alert">{{ error }}</p>
  </section>
</template>
