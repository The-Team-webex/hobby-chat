import Vue from "vue"
import VueRouter from "vue-router"
import MainBoard from "../components/MainBoard.vue"
import PostForm from "../components/PostForm.vue"
import DetailPage from "../components/DetailPage.vue"
import Chat from "../components/chat/Chat.vue"
import Login2 from "../views/Login2.vue"
import Profile from "../views/Profile.vue"
import MyPage from "../components/MyPage.vue"


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
  {
    path: "/detail-page/:id",
    name: "DetailPage",
    component: DetailPage,
  },
  {
    path: "/chat/:id",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/header",
    name: "Header",
    component: Header,
  },
  {
    path: "/login2",
    name: "Login2",
    component: Login2,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
