import { createRouter, createWebHistory } from 'vue-router'
import Inicio from './src/views/Inicio.vue'
import Cursos from './src/views/Cursos.vue'
import NuevoCurso from './src/views/NuevoCurso.vue'
import DetalleCurso from './src/views/DetalleCurso.vue'
import Reservas from './src/views/Reservas.vue'
import Perfil from './src/views/Perfil.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: Inicio },
    { path: '/cursos', name: 'cursos', component: Cursos },
    { path: '/cursos/nuevo', name: 'nuevo-curso', component: NuevoCurso },
    { path: '/cursos/:id', name: 'detalle-curso', component: DetalleCurso, props: true },
    { path: '/reservas', name: 'reservas', component: Reservas },
    { path: '/perfil', name: 'perfil', component: Perfil },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
