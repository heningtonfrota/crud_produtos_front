import routes from './routers.map';
import { NAME_TOKEN } from "@/utils/constants";
import { RouteLocationNormalized, createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to: RouteLocationNormalized, _: RouteLocationNormalized) => {  
  const routeName = to.name;
  
  if (isToken() && routeName === 'auth') return { name: 'admin.home' }
  else if (!isToken() && routeName !== 'auth') return { name: 'auth' };
});

function isToken(): boolean {
  const token = localStorage.getItem(NAME_TOKEN);  
  const validated = typeof token === 'string';
  return validated;  
}

export default router;