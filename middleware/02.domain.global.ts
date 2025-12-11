export default defineNuxtRouteMiddleware(async (to) => {
  const url = useRequestURL();
  const publicConfig = useRuntimeConfig()?.public;
  const origin = url?.origin;
  const altDomains = publicConfig.ALT_DOMAIN.split(",").filter(Boolean);
  const mainUrl = publicConfig.MAIN_URL;

  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return;
  }

  if (altDomains.length > 0 && altDomains.some((x) => origin.includes(x))) {
    return await navigateTo(mainUrl, { external: true });
  }
});
