<template>
  <div class="Profile">
    <img
      v-bind:src="$store.state.userData.photo"
      alt="読み込み中.."
      class="profile__img"
    />
    <h3 class="text">名前</h3>
    <div class="edit-flex" v-if="canEditName">
      <input
        class="edit-text"
        type="text"
        placeholder="名前を変更"
        v-model="userName"
      />
      <div class="edit__button2" v-on:click="cancelName">キャンセル</div>
    </div>
    <div v-else>
      <h1 class="profile__text">{{ $store.state.userData.name }}</h1>
      <div class="edit__button" v-on:click="editName">編集</div>
    </div>

    <h3 class="text">大学</h3>
    <div class="edit-flex" v-if="canEditCollege">
      <div class="input-edit">
        <input
          class="edit-text2"
          type="text"
          placeholder="名前を変更"
          v-model="userCollege"
        />
        <div class="text__1">大学</div>
      </div>
      <div class="edit__button2" v-on:click="cancelCollege">キャンセル</div>
    </div>
    <div v-else>
      <h1 class="profile__text">{{ $store.state.userData.college }}大学</h1>
      <div class="edit__button" v-on:click="editCollege">編集</div>
    </div>
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
    })
  },
  computed: {
    getAuth: function () {
      return this.$store.state.isAuth
    },
  },

  watch: {
    getAuth: function () {
      if (this.$store.state.isAuth === false) {
        alert("ログアウトしたのでホームに戻ります")
        return this.$router.push("/")
      }
    },
  },
}
</script>

<style scoped>
.text__1 {
  display: inline-block;
  font-size: 150%;
  margin-right: 30px;
}
@media screen and (max-width: 739px) {
  .text__1 {
    font-size: 110%;
  }
}
@media screen and (max-width: 465px) {
  .text__1 {
    display: block;
    margin: 10px auto 0;
  }
}

.Profile {
  background-color: rgb(231, 231, 231);
  width: 60%;
  margin: 100px auto;
  padding: 50px 0;
  text-align: center;
}
@media screen and (max-width: 1012px) {
  .Profile {
    width: 80%;
  }
}

.profile__img {
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
@media screen and (max-width: 1056px) {
  .text {
    font-size: 150%;
  }
}

.edit-flex {
  display: flex;
  flex-direction: column;
}

.edit-text {
  width: 60%;
  height: 50px;
  font-size: 150%;
  margin: 0 auto;
}
@media screen and (max-width: 739px) {
  .edit-text {
    font-size: 110%;
  }
}
@media screen and (max-width: 465px) {
  .edit-text {
    width: 90%;
  }
}
.edit-text2 {
  width: 60%;
  height: 50px;
  font-size: 150%;
  margin-left: 70px;
}
@media screen and (max-width: 739px) {
  .edit-text2 {
    font-size: 110%;
  }
}
@media screen and (max-width: 465px) {
  .edit-text2 {
    margin-left: 0;
    width: 90%;
  }
}

.profile__text {
  display: block;
  margin: 0 auto;
  width: 60%;
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
    font-size: 200%;
  }
}
@media screen and (max-width: 550px) {
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
  background-color: rgb(76, 190, 196);
  border: 1px solid rgb(76, 190, 196);
  color: white;
}
.edit__button2 {
  display: inline-block;
  width: 150px;
  border: 2px solid white;
  border-radius: 30px;
  padding: 10px 30px;
  font-size: 150%;
  background-color: white;
  margin: 50px auto;
  cursor: pointer;
  transition: all 0.3s;
}
.edit__button2:hover {
  background-color: rgb(76, 190, 196);
  border: 1px solid rgb(76, 190, 196);
  color: white;
}

.change__button {
  width: 20%;
  background-color: white;
  border-radius: 30px;
  padding: 10px 30px;
  font-size: 150%;
  margin: 50px 0 0;
  transition: all 0.3s;
}
.change__button:hover {
  background-color: rgb(76, 190, 196);
  color: white;
}
@media screen and (max-width: 738px) {
  .change__button {
    width: 40%;
  }
}
@media screen and (max-width: 366px) {
  .change__button {
    width: 60%;
  }
}
</style>
