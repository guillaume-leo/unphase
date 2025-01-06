import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: () => import("./components/Root.vue") },
  {
    path: "/playground",
    name: "playground",
    component: () => import("./components/Playground.vue"),
  },
  {
    path: "/property",
    name: "property",
    component: () => import("./components/Property.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
