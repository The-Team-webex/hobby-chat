import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
import firebase from "firebase"
export default new Vuex.Store({
  state: {
    keyCategory: "",
    keyPlace: "",
    keyDate: "",
    keyWord: "",
    posts: [],
  },
  mutations: {
    created: function (state) {
      firebase
        .firestore()
        .collection("posts")
        .get()
        .then((snapshot) => {
          for (let i = 0; i < snapshot.docs.length; i++) {
            state.posts.push(snapshot.docs[i].data())
          }
        })
    },

    filteredPosts: function (state) {
      const posts = []
      for (let i = 0; i < state.posts.length; i++) {
        const post = state.posts[i]
        if (
          post.category.indexOf(state.keyCategory) !== -1 ||
          post.place.indexOf(state.keyPlace) !== -1 ||
          post.date.indexOf(state.keyDate) !== -1
        ) {
          posts.push(post)
        }
      }
      return posts
    },
  },
  actions: {},
  modules: {},
})
