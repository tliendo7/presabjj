<script setup lang="ts">
usePageSeo('academia');

// TODO:
//       x - Disciplinas
//       x - Metodología // Qué es // Valores
//       x - Horario
//       x - FAQ
//       x - Link para la app
//       x - Equipo Santana + Profe + Team Ganbaru + INSTALACIONES
//       x - 💘 Ponerlo bonito 💘
//       x - Form de contacto
//       x - Redes
//       x - Copys
//       x - Subhero en DESKTOP
//       x - Animación seccion Vídeo
//    - Hero
//    - Terminar de cuadrar imágenes, data (tlf, etc.), FAQs, márgenes
// - Horarios
// - Añadir CTAs!!!

// -----------------------------------------------
//       x - Limpiar código. Errores, accesibilidad.
//       x - Navbar
// ⭐️ - Transiciones entre páginas. (Maat app)
// ⭐️ - Traducciones
// - Errores + ready para deploy
// - Despliegue REAL
// - SEO y metadata y buen puntuaje (accesibilidad, performance, intervalos abiertos)
// - Ajustar enlaces, y ubicaciones, tlfs, etc.
// - Hosting de las imagenes/vídeos
// - Form. Thank you. Config Sheet. Probarlo.

// Todos empiezan algun día desde cero. Clases abiertas a todo el mundo
</script>

<template>
  <div class="academia-page">
    <AcademyHero />

    <AcademyJoin />

    <AcademyHighlights />

    <AcademyVideo />

    <AcademyCategories />

    <AcademySchedule />

    <AcademyApp />

    <AcademyUs />

    <AcademyGallery />

    <AcademyFAQ />

    <!-- Banner con formulario oculto de forma temporal: el cliente todavía
         no ha pasado la hoja de Google Sheets a la que debe enviar los
         datos. No borrar -reactivar en cuanto esté lista la integración. -->
    <!-- <AcademiaForm /> -->
    <Socials />
  </div>
</template>
