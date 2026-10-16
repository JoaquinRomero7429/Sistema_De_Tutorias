import { reactive, watch } from 'vue'

const storageKey = 'sistema-tutorias-local-v1'

const dateAfter = (days) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

const initialData = {
  courses: [
    { id: 'mat-3', year: '3er año', division: 'A', subject: 'Matemática', teacher: 'María González', description: 'Acompañamiento y consultas de matemática.' },
    { id: 'len-3', year: '3er año', division: 'A', subject: 'Lengua y Literatura', teacher: 'Juan Pérez', description: 'Lectura, escritura y consultas de lengua.' },
    { id: 'ing-5', year: '5to año', division: 'A', subject: 'Inglés', teacher: 'Sofía Martínez', description: 'Práctica y apoyo de inglés.' },
  ],
  sessions: [
    { id: 'ses-mat-1', courseId: 'mat-3', tutor: 'María González', date: dateAfter(2), time: '09:30', capacity: 4, attendees: [] },
    { id: 'ses-len-1', courseId: 'len-3', tutor: 'Juan Pérez', date: dateAfter(3), time: '10:30', capacity: 3, attendees: [] },
    { id: 'ses-ing-1', courseId: 'ing-5', tutor: 'Sofía Martínez', date: dateAfter(4), time: '14:30', capacity: 4, attendees: [] },
  ],
}

function loadData() {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return structuredClone(initialData)
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed.courses) || !Array.isArray(parsed.sessions)) return structuredClone(initialData)
    return parsed
  } catch {
    return structuredClone(initialData)
  }
}

export const data = reactive(loadData())

watch(data, (value) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value))
  } catch {
    // The UI remains usable for the current session if browser storage is unavailable.
  }
}, { deep: true })

export function findCourse(id) {
  return data.courses.find((course) => course.id === id)
}

export function addCourse(course) {
  const id = crypto.randomUUID()
  data.courses.push({ ...course, id })
  return id
}

export function addSession(session) {
  const id = crypto.randomUUID()
  data.sessions.push({ ...session, id, attendees: [] })
  return id
}

export function reserveSession(session, attendee) {
  if (session.attendees.length >= Number(session.capacity)) return 'full'
  if (session.attendees.some((name) => name.toLocaleLowerCase() === attendee.toLocaleLowerCase())) return 'duplicate'
  session.attendees.push(attendee)
  return 'reserved'
}

export function cancelReservation(session, attendee) {
  session.attendees = session.attendees.filter((name) => name !== attendee)
}
