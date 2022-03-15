import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import quiz from "../views/quiz.vue"
import Irasuto from "../views/Irasuto.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/quiz",
    name: "quiz",
    component: quiz,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/Irasuto",
    name: "Irasuto",
    component: Irasuto,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
