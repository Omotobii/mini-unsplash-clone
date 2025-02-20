import { createRouter, createWebHistory } from "vue-router";
import ImageGrid from "../views/ImageGrid.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: ImageGrid,
    },
  ],
});

export default router;
