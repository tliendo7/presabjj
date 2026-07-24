<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t('academia.title'),
  description: () => t('academia.subtitle')
});

// TODO:
//       x - Disciplinas
//       x - Metodología // Qué es // Valores
//       x - Horario
//       x - FAQ
//       x - Link para la app
//    - Equipo Santana + Profe + Team Gambaru + INSTALACIONES
//       - 💘 Ponerlo bonito 💘
//    - 💘 Copys 💘
//    - Tarifas

// - Form de contacto
// - Hero
// - Redes

// -----------------------------------------------
// - Limpiar código. Errores, accesibilidad.
// - Transiciones entre páginas. (Maat app)
// - Navbar
// - Errores + ready para deploy
// - SEO y metadata y buen puntuaje (accesibilidad)
// - Ajustar enlaces
// - Traducciones
// - Hosting de las imagenes/vídeos

// Todos empiezan algun día desde cero. Clases abiertas a todo el mundo
</script>

<template>
  <div class="academia-page">
    <section
      class="relative flex items-center justify-center overflow-hidden"
      style="height: 600px"
    >
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="/images/__dummy/_CIR7604.jpg"
        alt=""
      >
      <div class="absolute inset-0 bg-black/40" />
      <h1 class="relative z-10 text-4xl font-bold text-white">
        {{ t('academia.title') }}
      </h1>
    </section>

    <AcademyJoin />

    <AcademyValues />

    <section style="height: 500px; background-color: black">
      <p style="color: white">
        Clases abiertas a todo el mundo. Todos los niveles.
      </p>
    </section>

    <AcademyCategories />

    <AcademySchedule />

    <AcademyApp />

    <AcademyUs />

    <AcademyFAQ />
  </div>
</template>
