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
    <button class="change__button" @click="changeProfile">変更</button>
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

.Profile {
  background-color: rgb(231, 231, 231);
  width: 60%;
  margin: 100px auto 0;
}
@media screen and (max-width: 1012px) {
  .Profile {
    width: 80%;
  }
}

.profile__img {
  margin: 100px 0;
  background-color: pink;
  display: inline-block;
  width: 10%;
  height: auto;
  border-radius: 50%;
}
@media screen and (max-width: 1440px) {
  .profile__img {
    width: 20%;
  }
}
@media screen and (max-width: 650px) {
  .profile__img {
    width: 30%;
  }
}

.text {
  font-size: 200%;
  font-weight: 800;
  margin-bottom: 40px;
}

.profile__text {
  display: block;
  margin: 0 auto;
  width: 40%;
  border-bottom: 3px solid black;
  font-size: 250%;
  margin-bottom: 30px;
}
@media screen and (max-width: 1185px) {
  .profile__text {
    width: 80%;
  }
}
@media screen and (max-width: 789px) {
  .profile__text {
    font-size: 150%;
  }
}

.edit__button {
  display: inline-block;
  border: 2px solid white;
  border-radius: 30px;
  padding: 10px 30px;
  font-size: 150%;
  background-color: white;
  margin-bottom: 50px;
  cursor: pointer;
  transition: all 0.3s;
}
.edit__button:hover {
  background-color: cadetblue;
  border: 1px solid cadetblue;
  color: white;
}

.change__button {
  width: 20%;
  background-color: white;
  border-radius: 30px;
  padding: 10px 30px;
  font-size: 150%;
  margin: 50px 0 60px;
  transition: all 0.3s;
}
.change__button:hover {
  background-color: cadetblue;
  color: white;
}
@media screen and (max-width: 738px) {
  .change__button {
    width: 40%;
  }
}
@media screen and (max-width: 351px) {
  .change__button {
    width: 60%;
  }
}
</style>
