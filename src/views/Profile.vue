<template>
  <div class="Profile">
    <img
      v-bind:src="$store.state.userData.photo"
      alt="読み込み中.."
      class="profile__img"
    />
    <h3 class="text">名前</h3>
    <div v-if="canEditName">
      <input type="text" placeholder="名前を変更" v-model="userName" />
      <div class="edit__button" v-on:click="cancelName">キャンセル</div>
    </div>
    <div v-else>
      <h1 class="profile__text">{{ $store.state.userData.name }}</h1>
      <div class="edit__button" v-on:click="editName">編集</div>
    </div>

    <h3 class="text">大学</h3>
    <div v-if="canEditCollege">
      <input type="text" placeholder="名前を変更" v-model="userCollege" />
      <div class="text__1">大学</div>
      <div class="edit__button" v-on:click="cancelCollege">キャンセル</div>
    </div>
    <div v-else>
      <h1 class="profile__text">{{ $store.state.userData.college }}大学</h1>
      <div class="edit__button" v-on:click="editCollege">編集</div>
    </div>
    <button @click="changeProfile">変更</button>
  </div>
</template>
<script>
import firebase from "firebase"
export default {
  data() {
    return {
      canEditName: false,
      canEditCollege: false,
      userName: "",
      userCollege: "",
    }
  },
  methods: {
    changeProfile: function () {
      this.$store.state.userData.name = this.userName
      this.$store.state.userData.college = this.userCollege
      firebase.auth().onAuthStateChanged((user) => {
        firebase.firestore().collection("users").doc(user.uid).update({
          name: this.$store.state.userData.name,
          college: this.$store.state.userData.college,
        })
      })
      this.canEditName = false
      this.canEditCollege = false
    },

    editName: function () {
      this.canEditName = true
    },
    cancelName: function () {
      this.canEditName = false
    },
    editCollege: function () {
      this.canEditCollege = true
    },
    cancelCollege: function () {
      this.canEditCollege = false
    },
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.state.userData.id = user.uid
        this.$store.state.userData.photo = user.photoURL
        this.$store.state.isAuth = true
        console.log("ログインしています")
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.$store.state.userData.name = snapshot.data().name
            this.$store.state.userData.college = snapshot.data().college
            this.userCollege = snapshot.data().college
            this.userName = snapshot.data().name
          })
      }

      // })
    })
  },
}
</script>

<style scoped>
.text__1 {
  display: inline-block;
  margin-left: 5px;
}
</style>
