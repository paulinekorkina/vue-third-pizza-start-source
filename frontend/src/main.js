import { createApp } from 'vue';
import { createPinia } from 'pinia';
import jwtService from '@/services/jwt/jwt.service';
import { useAuthStore } from '@/stores';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

const token = jwtService.getToken();
if (token) {
  try {
    const authStore = useAuthStore();
    await authStore.whoAmI();
    await router.push('/');
  } catch (e) {
    jwtService.destroyToken();
    console.log(e);
  }
}
