<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const localePath = useLocalePath();

interface FooterIcon {
  name: string;
  href: string;
  label: string;
}

const socialIcons: FooterIcon[] = [
  {
    name: 'mdi:instagram',
    href: 'https://www.instagram.com/presabjj/',
    label: 'Instagram'
  },
  {
    name: 'mdi:youtube',
    href: 'https://www.youtube.com/@PRESABJJ',
    label: 'YouTube'
  }
];

const addressHref = 'https://maps.app.goo.gl/pKCQMHTGET9vWKMi9';

const navColumns: {
  title: string;
  to: RouteLocationRaw;
  links: { label: string; to: RouteLocationRaw }[];
}[] = [
  {
    title: 'ACADEMIA',
    to: { name: 'academia' },
    links: [
      { label: 'CONÓCENOS', to: { name: 'academia' } },
      { label: 'EQUIPO SANTANA', to: { name: 'academia', hash: '#equipo-santana' } },
      { label: 'HORARIOS Y TARIFAS', to: { name: 'academia', hash: '#horarios' } }
    ]
  },
  {
    title: 'TORNEO BJJ',
    to: { name: 'torneo' },
    links: [
      {
        label: 'INFORMACIÓN GENERAL',
        to: { name: 'torneo', hash: '#informacion-general' }
      },
      {
        label: 'COMPRA TU ENTRADA',
        to: { name: 'torneo', hash: '#comprar-entradas' }
      }
    ]
  }
];
</script>

<template>
  <footer class="footer">
    <div class="footer__box">
      <Container>
        <div class="footer__top">
          <NuxtLink :to="localePath('index')">
            <div class="footer__logo">
              <img
                src="/images/deco/presa-dark.png"
                alt="Presa logo"
                loading="lazy"
              />
            </div>
          </NuxtLink>

          <nav class="footer__wrapper">
            <div class="footer__contact-data">
              <a
                :href="addressHref"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__address-link"
              >
                Cam. la Piterita, 107, Nave 5,<br />38329 La Laguna,<br />Santa
                Cruz de Tenerife
              </a>
            </div>
            <div class="footer__nav">
              <div
                v-for="col in navColumns"
                :key="col.title"
                class="footer__col"
              >
                <NuxtLink
                  :to="localePath(col.to)"
                  class="footer__col-title"
                >
                  {{ col.title }}
                </NuxtLink>
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
            target="_blank"
            rel="noopener noreferrer"
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
