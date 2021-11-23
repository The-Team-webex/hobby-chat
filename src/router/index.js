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
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
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
