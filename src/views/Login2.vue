<template>
  <div class="container">
    <button @click="logout" v-if="$store.state.isAuth">ログアウト</button>
    <button @click="login" v-else>ログイン</button>
  </div>
</template>
<script>
import firebase from "firebase"
export default {
  data() {
    return {}
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    logout() {
      firebase.auth().signOut()
    },
  },
  created: function () {
    this.$store.getters.setName, this.$store.getters.getData

    firebase.auth().onAuthStateChanged((user) => {
      // if (user && this.$store.state.userData.id === "") {
      if (user) {
        this.$store.state.isAuth = true
        console.log("ログインしています")
      } else {
        this.$store.state.isAuth = false
        console.log("ログインしていません")
      }
    })
  },
}
</script>
