import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
import firebase from "firebase"

export default new Vuex.Store({
  state: {
    isAuth: false,
    userData: {
      id: "",
      name: "読み込み中..",
      photo: "画像",
      college: "読み込み中..",
    },
    keyCategory: "",
    keyPlace: "",
    keyDate: "",
    keyWord: "",
    posts: [],
    filteredPosts: [],
  },
  mutations: {
    created: function (state) {
      state.filteredPosts.length = 0
      state.posts.length = 0
      firebase
        .firestore()
        .collection("posts")
        .get()
        .then((snapshot) => {
          for (let i = 0; i < snapshot.docs.length; i++) {
            state.posts.push(snapshot.docs[i].data())
            state.filteredPosts.push(snapshot.docs[i].data())
          }
        })
    },
    filteringPosts: function (state) {
      state.filteredPosts.length = 0
      for (let i = 0; i < state.posts.length; i++) {
        const post = state.posts[i]
        if (
          (post.category.indexOf(state.keyCategory) !== -1 &&
            post.place.indexOf(state.keyPlace) !== -1 &&
            post.date.indexOf(state.keyDate) !== -1) ||
          post.title.indexOf(state.keyWord) !== -1 ||
          post.text.indexOf(state.keyWord) !== -1
        ) {
          state.filteredPosts.push(post)
        }
      }
    },
  },
  actions: {},
  modules: {},
  getters: {
    getAuth: function (state) {
      return state.isAuth
    },
  },
})
