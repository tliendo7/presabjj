// Real page navigations here are effectively instant (routes are
// prefetched, no async data fetching), so NuxtLoadingIndicator never gets
// a chance to render before the navigation already finished. Adding a
// small artificial delay on real page changes (client-side only) gives it
// enough time to show up consistently.
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;

  // Skip hash-only navigation (e.g. footer anchor links) so the smooth
  // scroll to a section isn't held up by this.
  if (to.path === from.path) return;

  await new Promise(resolve => setTimeout(resolve, 300));
});
