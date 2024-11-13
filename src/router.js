import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: () => import("./components/Root.vue") },
  {
    path: "/playground",
    name: "playground",
    component: () => import("./components/Playground.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
