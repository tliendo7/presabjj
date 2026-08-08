import type { RouterConfig } from '@nuxt/schema';

// Nuxt's default scroll behaviour jumps straight to a hash target with no
// animation. This makes hash links (e.g. footer nav -> #horarios) animate
// with a smooth scroll instead, both on same-page clicks and after
// navigating from another route.
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;

    if (to.hash) {
      return new Promise(resolve => {
        // Wait a tick so the target page has rendered before we try to
        // scroll to its hash — otherwise the element may not exist yet
        // right after a route change.
        setTimeout(() => {
          resolve({
            el: to.hash,
            top: 24,
            behavior: 'smooth'
          });
        }, 300);
      });
    }

    return { top: 0 };
  }
};
