export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  
  if (!auth.token && to.path !== "/") {
    return navigateTo("/");
  }
});
