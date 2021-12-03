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
    firebase.auth().onAuthStateChanged((user) => {
      // if (user && this.$store.state.userData.id === "") {
      if (user) {
        const newDoc = firebase.firestore().collection("userData").doc().id
        const userData = {
          dataId: newDoc,
          userId: user.uid,
        }
        firebase.firestore().collection("user").doc(newDoc).set(userData)
        this.$store.state.userData.id = user.uid

        this.$store.state.isAuth = true
        console.log("ログインしています")
        // } else if (user && this.$store.state.userData.id !== "") {
      } else {
        this.$store.state.isAuth = false
        console.log("ログインしていません")
      }
    })
  },
}
</script>
