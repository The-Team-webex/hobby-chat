import Vue from "vue"
import VueRouter from "vue-router"
import MainBoard from "../components/MainBoard.vue"
import PostForm from "../components/PostForm.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "MainBoard",
    component: MainBoard,
  },
  {
    path: "/post-form",
    name: "PostForm",
    component: PostForm,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
