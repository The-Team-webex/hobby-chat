<template>
  <div class="container">
    <div @click="logout" v-if="$store.state.isAuth">ログアウト</div>
    <div @click="login" v-else>ログイン</div>
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
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              this.$store.state.userData.name = snapshot.data().name
              this.$store.state.userData.college = snapshot.data().college
            } else {
              const userData = {
                id: user.uid,
                name: user.displayName,
                photo: user.photoURL,
                college: "未設定",
              }
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .set(userData)
              this.$store.state.userData.name = snapshot.data().name
              this.$store.state.userData.college = snapshot.data().college
            }
          })
      }
    })

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
