<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const { t } = useI18n();
const localePath = useLocalePath();

interface FooterIcon {
  name: string;
  href: string;
  label: string;
}

interface FooterInstagramAccount {
  handle: string;
  href: string;
}

const instagramAccounts: FooterInstagramAccount[] = [
  { handle: '@presabjj', href: 'https://www.instagram.com/presabjj/' },
  {
    handle: '@presaacademybjj',
    href: 'https://www.instagram.com/presaacademybjj'
  },
  {
    handle: '@santanajiujitsu',
    href: 'https://www.instagram.com/santanajiujitsu'
  }
];

const youtubeIcon: FooterIcon = {
  name: 'mdi:youtube',
  href: 'https://www.youtube.com/@PRESABJJ',
  label: 'YouTube'
};

const isInstagramOpen = ref(false);

// Duración y distancia del crecimiento del contenedor de Instagram
// en mobile (ver .footer__ig-group / .footer__ig-wrap en footer.css:
// max-height pasa a 6.5rem en 0.5s). El scroll de la página se anima
// a mano, frame a frame, con estos mismos valores para que avance EN
// PARALELO con el crecimiento en vez de disparar un scrollBy suelto
// al final (lo cual se sentía como dos movimientos separados).
const IG_REVEAL_DURATION_MS = 500;
const IG_REVEAL_SCROLL_PX = 150;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function animateScrollBy(distance: number, durationMs: number): void {
  const startY = window.scrollY;
  const startTime = performance.now();

  function step(now: number): void {
    const progress = Math.min((now - startTime) / durationMs, 1);
    window.scrollTo({
      top: startY + distance * easeOutCubic(progress),
      behavior: 'auto'
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function toggleInstagram(): void {
  isInstagramOpen.value = !isInstagramOpen.value;

  if (
    !isInstagramOpen.value
    || !window.matchMedia('(max-width: 767px)').matches
  ) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Sin transición: el alto final ya está aplicado de inmediato,
    // así que el scroll también puede ser instantáneo.
    nextTick(() => {
      window.scrollBy({ top: IG_REVEAL_SCROLL_PX, behavior: 'auto' });
    });
    return;
  }

  animateScrollBy(IG_REVEAL_SCROLL_PX, IG_REVEAL_DURATION_MS);
}

const phoneHref = 'tel:+34673645324';
const phoneLabel = '673 64 53 24';

const emailHref = 'mailto:presaacademybjj@gmail.com';
const emailLabel = 'presaacademybjj@gmail.com';

const addressHref = 'https://maps.app.goo.gl/b4uMq4AGw1sukgba6';

interface FooterNavColumn {
  title: string;
  to: RouteLocationRaw;
  links: { label: string; to: RouteLocationRaw }[];
}

const navColumns = computed<FooterNavColumn[]>(() => [
  {
    title: t('footer.nav.academia.title'),
    to: { name: 'academia' },
    links: [
      {
        label: t('footer.nav.academia.links.aboutUs'),
        to: { name: 'academia' }
      },
      {
        label: t('footer.nav.academia.links.team'),
        to: { name: 'academia', hash: '#equipo-santana' }
      },
      {
        label: t('footer.nav.academia.links.schedule'),
        to: { name: 'academia', hash: '#horarios' }
      },
      {
        label: t('footer.nav.academia.links.contact'),
        to: { name: 'contacto' }
      }
    ]
  },
  {
    title: t('footer.nav.torneo.title'),
    to: { name: 'torneo' },
    links: [
      {
        label: t('footer.nav.torneo.links.info'),
        to: { name: 'torneo', hash: '#informacion-general' }
      },
      {
        label: t('footer.nav.torneo.links.tickets'),
        to: { name: 'torneo', hash: '#comprar-entradas' }
      }
    ]
  }
]);
</script>

<template>
  <footer class="footer">
    <div class="footer__box">
      <Container>
        <div class="footer__top">
          <NuxtLink :to="localePath('index')">
            <div class="footer__logo">
              <NuxtImg
                src="/images/deco/presa-dark.png"
                alt="Presa logo"
                width="400"
                height="109"
                format="webp"
                loading="lazy"
              />
            </div>
          </NuxtLink>

          <div class="footer__wrapper">
            <div class="footer__contact-data">
              <a
                :href="phoneHref"
                class="footer__contact-link"
              >
                <Icon
                  name="mdi:phone"
                  class="footer__contact-icon"
                />
                <span>{{ phoneLabel }}</span>
              </a>

              <a
                :href="emailHref"
                class="footer__contact-link"
              >
                <Icon
                  name="mdi:email-outline"
                  class="footer__contact-icon"
                />
                <span>{{ emailLabel }}</span>
              </a>

              <a
                :href="addressHref"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__contact-link"
              >
                <Icon
                  name="mdi:map-marker"
                  class="footer__contact-icon"
                />
                <span>
                  Cam. la Piterita, 107, Nave 5,<br>38329 La Laguna, Santa
                  Cruz de Tenerife
                </span>
              </a>
            </div>

            <nav class="footer__nav">
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
            </nav>
          </div>
        </div>

        <div class="footer__bottom">
          <div
            class="footer__ig-wrap"
            :class="{ 'is-open': isInstagramOpen }"
          >
            <button
              type="button"
              class="footer__social-link"
              :aria-label="
                isInstagramOpen
                  ? 'Ocultar las cuentas de Instagram'
                  : 'Ver las cuentas de Instagram'
              "
              :aria-expanded="isInstagramOpen"
              @click="toggleInstagram"
            >
              <Icon
                name="mdi:instagram"
                class="footer__social-icon"
              />
            </button>

            <div class="footer__ig-group">
              <a
                v-for="account in instagramAccounts"
                :key="account.handle"
                :href="account.href"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__ig-link"
              >
                {{ account.handle }}
              </a>
            </div>
          </div>

          <a
            :href="youtubeIcon.href"
            :aria-label="youtubeIcon.label"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
          >
            <Icon
              :name="youtubeIcon.name"
              class="footer__social-icon"
            />
          </a>

          <div
            class="footer__legal"
            :class="{ 'is-hidden': isInstagramOpen }"
          >
            <NuxtLink :to="localePath('aviso-legal')">
              {{ t('footer.legal.avisoLegal') }}
            </NuxtLink>
            <span aria-hidden="true">·</span>
            <NuxtLink :to="localePath('privacidad')">
              {{ t('footer.legal.privacidad') }}
            </NuxtLink>
          </div>
        </div>
      </Container>
    </div>
  </footer>
</template>
