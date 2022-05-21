import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/rights",
        name: "rights",
        component: () => import("../views/rights"),
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import("../views/rights/roles"),
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("../views/goods"),
      },
      {
        path: "/params",
        name: "params",
        component: () => import("../views/goods/params"),
      },
      {
        path: "/categories",
        name: "categories",
        component: () => import("../views/goods/categories"),
      },
      {
        path: "/add",
        name: "add",
        component: () => import("../views/goods/add"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
