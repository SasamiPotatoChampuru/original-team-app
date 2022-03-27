import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import quiz from "../views/Quiz.vue"
import Irasuto from "../views/Irasuto.vue"
import Ranking from "../views/Ranking.vue"

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
    path: "/Irasuto",
    name: "Irasuto",
    component: Irasuto,
  },
  {
    path: "/Ranking",
    name: "Ranking",
    component: Ranking,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
