import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/home.vue'
import InicioSesion from './components/InicioSesion.vue'
import Cursos from './components/Cursos.vue'
import AgregarCurso from './components/Agregar-curso.vue'
import DetalleCurso from './components/detalle-curso.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/inicio-sesion',
    name: 'inicio-sesion',
    component: InicioSesion
  },

  {
    path: '/cursos',
    name: 'cursos',
    component: Cursos
  },

  {
    path: '/agregar-curso',
    name: 'agregar-curso',
    component: AgregarCurso
  },

  {
    path: '/detalle-curso',
    name: 'detalle-curso',
    component: DetalleCurso
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router