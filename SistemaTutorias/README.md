# Sistema de Tutorías

Aplicación web para organizar cursos, publicar horarios de tutoría y registrar reservas.

## Ejecutar

Desde esta carpeta:

```sh
npm ci
npm run dev
```

Para compilar y revisar la versión de producción:

```sh
npm run build
npm run preview
```

## Funciones

- Panel con cursos y próximos horarios.
- Búsqueda y detalle de cursos.
- Alta de cursos y publicación de tutorías.
- Reserva de lugares, agenda de reservas y cancelación.
- Persistencia local en el navegador.

La aplicación funciona en modo local: los datos se guardan en el navegador y dispositivo donde se usa. Este repositorio no contiene backend ni autenticación conectados, por lo que los datos no se comparten entre dispositivos y no debe usarse como sistema de acceso seguro en producción.

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
