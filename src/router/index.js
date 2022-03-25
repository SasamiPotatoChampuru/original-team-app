import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Quiz from "../views/Quiz.vue"
import Ishisotsu from "../views/Ishisotsu.vue"
import Irasuto from "../views/Irasuto.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Quiz",
    name: "Quiz",
    component: Quiz,
  },
  {
    path: "/Ishisotsu",
    name: "Ishisotsu",
    component: Ishisotsu,
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
