import { createRouter, createWebHistory } from 'vue-router';
import { middlewarePipeline } from '@/middlewares/middlewarePipeline';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

middlewarePipeline(router);

export default router;
