<script setup lang="ts">
const localePath = useLocalePath();

interface FooterIcon {
  name: string;
  href: string;
  label: string;
}

const socialIcons: FooterIcon[] = [
  { name: 'mdi:instagram', href: '#', label: 'Instagram' },
  { name: 'mdi:youtube', href: '#', label: 'YouTube' },
  { name: 'mdi:whatsapp', href: '#', label: 'WhatsApp' },
  { name: 'mdi:phone', href: 'tel:+34000000000', label: 'Llamar' }
];

const navColumns = [
  {
    title: 'ACADEMIA',
    links: [
      { label: 'INSTALACIONES', to: '/evento' },
      { label: 'EQUIPO SANTANA', to: '/academia' },
      { label: 'HORARIOS Y PRECIOS', to: '/culture' }
    ]
  },
  {
    title: 'TORNEO BJJ',
    links: [
      { label: 'EVENTO', to: '/' },
      { label: 'COMPRA TU ENTRADA', to: '/' }
    ]
  },
  {
    title: 'CULTURE',
    links: [
      { label: 'QUIENES SOMOS', to: '/' },
      { label: 'ENCUÉNTRANOS', to: '/' }
    ]
  }
];
</script>

<template>
  <footer class="footer">
    <div
      class="footer__gradient"
      aria-hidden="true"
    />
    <div class="footer__box">
      <Container>
        <div class="footer__top">
          <NuxtLink :to="localePath('/')">
            <div class="footer__logo">
              <img
                src="/images/Exclude.png"
                alt="Presa logo"
                loading="lazy"
              />
            </div>
          </NuxtLink>

          <nav class="footer__wrapper">
            <div class="footer_contact-data">
              <p>
                Cam. la Piterita, 107, Nave 5,<br />38329 La Laguna,<br />Santa
                Cruz de Tenerife
              </p>
              <p>(+34) 000 00 00 00</p>
            </div>
            <div class="footer__nav">
              <div
                v-for="col in navColumns"
                :key="col.title"
                class="footer__col"
              >
                <p class="footer__col-title">
                  {{ col.title }}
                </p>
                <ul class="footer__col-list">
                  <li
                    v-for="link in col.links"
                    :key="link.label"
                  >
                    <NuxtLink
                      :to="localePath(link.to)"
                      class="footer__col-link"
                    >
                      {{ link.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div class="footer__bottom">
          <a
            v-for="icon in socialIcons"
            :key="icon.name"
            :href="icon.href"
            :aria-label="icon.label"
            class="footer__social-link"
          >
            <Icon
              :name="icon.name"
              class="footer__social-icon"
            />
          </a>
        </div>
      </Container>
    </div>
  </footer>
</template>
