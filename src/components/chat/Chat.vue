<template>
  <div class="chat-room">
    <div>
      <div class="detail-header">
        <h3 class="header-text">投稿内容</h3>
      </div>
      <div class="detail-box">
        <div class="form__detail">
          <div class="form__profile">
            <img v-bind:src="posts.photo" alt="" class="profile__img" />
            <div class="profile__name">
              <h3 class="name-small">投稿者</h3>
              <h3>
                {{ posts.college }}大学/<span class="new-line"
                  >{{ posts.name }}<span class="name-small">さん</span></span
                >
              </h3>
            </div>
            <div class="tags">
              <ul>
                <li class="tag">#{{ posts.category }}</li>
                <li class="tag">#{{ posts.place }}</li>
                <li class="date__title">
                  <span>開催日時</span>
                  <span class="new-line">{{ posts.date }} /</span>
                  {{ posts.time }}〜
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form__texts">
          <h2 class="texts__title">{{ posts.title }}</h2>
          <h3 class="texts__text">{{ posts.text }}</h3>
        </div>
      </div>
    </div>

    <h3 class="chat-title">Chat box</h3>

    <div class="chat-box" v-for="(message, index) in messages" :key="index">
      <div class="profile">
        <img :src="message.photoURL" :alt="message.photoURL" class="photo" />
        <span class="name">{{ message.displayName }}</span>
      </div>
      <span class="content">{{ message.content }}</span>
      <span class="date"
        >{{ message.createdAt.getMonth() + 1 }}月{{
          message.createdAt.getDate()
        }}日{{ message.createdAt.getHours() }}時{{
          message.createdAt.getMinutes()
        }}分</span
      >
    </div>

    <div class="input-box">
      <textarea-autosize
        class="input"
        v-model="inputMessage"
        :min-height="30"
        :max-height="350"
        placeholder="メッセージを入力して下さい。"
      />
      <span>
        <button class="input-button" @click="sendMessage">送信</button>
      </span>
    </div>
  </div>
</template>

<style scoped>
* {
  letter-spacing: 2px;
}

.chat-box {
  margin: 50px;
  position: relative;
}

.input-box {
  margin: 30px 60px;
}

.photo {
  display: inline-block;
  width: 75px;
  border-radius: 50%;
}

.profile {
  position: relative;
  height: 30px;
}

.name {
  margin-left: 16px;
  position: absolute;
  display: inline-block;
}

.new-line {
  display: inline-block;
}

.content {
  display: inline-block;
  max-width: 400px;
  margin-left: 90px;
  font-size: 20px;
  padding: 5px 10px;
  background-color: rgb(235, 235, 235);
  border-radius: 3px;
}

.date {
  display: inline-block;
  font-size: 4px;
  margin-left: 10px;
}

.detail-header {
  width: 60%;
  max-width: 1300px;
  background-color: #00adb5;
  margin: 150px auto 0;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
}
@media screen and (max-width: 1440px) {
  .detail-header {
    width: 90%;
  }
}

.header-text {
  font-size: 200%;
  font-weight: normal;
  color: white;
}

.detail-box {
  border: 3px solid #d3d1d1;
  border-radius: 10px;
  width: 60%;
  max-width: 1300px;
  margin: 20px auto 0;
  text-align: center;
}
@media screen and (max-width: 1440px) {
  .detail-box {
    width: 90%;
  }
}

.Posted__form {
  width: 800px;
  border: solid 2px #d3d1d1;
  padding: 40px;
  border-radius: 10px;
  margin: 50px;
}

.form__detail {
  padding: 15px 0;
}

.form__detail ul {
  list-style-type: none;
  margin-left: 0;
  padding: 0;
}
@media screen and (max-width: 1440px) {
  .form__detail ul {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    text-align: center;
  }
}
@media screen and (max-width: 1091px) {
  .form__detail ul {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
}

.form__detail ul li {
  display: inline-block;
  padding: 10px;
  margin: 0 10px 0; /*余白も指定できる*/
  border: solid 2px #00adb5;
  font-weight: bold; /*文字を太字に*/
  font-size: 130%;
  color: #00adb5; /*文字色を白に*/
  border-radius: 10px;
}
@media screen and (max-width: 1990px) {
  .form__detail ul li {
    font-size: 110%;
  }
}
@media screen and (max-width: 1855px) {
  .form__detail ul li {
    margin-top: 0;
  }
}
@media screen and (max-width: 1091px) {
  .form__detail ul li {
    margin-bottom: 10px;
  }
}

.form__profile {
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.profile__img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin: 0 auto;
}

.profile__name {
  display: inline-block;
  font-size: 150%;
}

.name-small {
  font-size: 80%;
}

.date__title {
  margin-right: 10px;
}

.form__texts {
  background-color: #eeeeee;
  display: inline-block;
  margin-bottom: 25px;
  width: 100%;
}

.texts__title {
  color: #00adb5;
  padding: 12px;
  border-bottom: solid 2px #b6b6b6;
}

.texts__text {
  color: #393e46;
  padding: 20px 50px;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.input-box {
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 2000px;
  margin: 120px auto 0;
}
/* @media screen and (max-width: 970px) {
  .input-box {
    justify-content: space-between;
  }
} */
@media screen and (max-width: 1440px) {
  .input-box {
    width: 95%;
  }
}

.input {
  width: 56%;
  margin-right: 10px;
  padding: 2px;
  font-size: 200%;
  background-color: #eeeeee;
}
@media screen and (max-width: 1440px) {
  .input {
    width: 80%;
  }
}
@media screen and (max-width: 970px) {
  .input {
    margin-right: 1px;
    font-size: 140%;
  }
}
@media screen and (max-width: 500px) {
  .input {
    width: 75%;
  }
}

.input-button {
  margin-left: 10px;
  width: 100%;
  background-color: white;
  border-radius: 50px;
  font-size: 180%;
  padding: 15px 40px;
  transition: all 0.3s;
}
@media screen and (max-width: 970px) {
  .input-button {
    font-size: 150%;
    padding: 10px 20px;
  }
}
@media screen and (max-width: 500px) {
  .input-button {
    font-size: 100%;
    padding: 10px 20px;
  }
}
.input-button:hover {
  background-color: #00adb5;
  border: none;
  color: white;
}

.chat-title {
  margin: 70px auto;
  text-align: center;
  font-size: 150%;
  color: white;
  background-color: #00adb5;
  width: 60%;
  max-width: 1300px;
  border-radius: 10px;
  padding: 20px 0;
}
@media screen and (max-width: 1440px) {
  .chat-title {
    width: 90%;
  }
}

.chat-box {
  margin: 0 auto 40px;
  width: 60%;
  max-width: 1300px;
}
@media screen and (max-width: 1440px) {
  .chat-box {
    width: 90%;
  }
}
</style>

<script>
import firebase from "firebase"
// import SendIcon from "./SendIcon.vue"

export default {
  components: {
    // SendIcon,
  },
  data() {
    return {
      inputMessage: "",
      messages: [],
      posts: [],
    }
  },
  mounted() {
    firebase
      .firestore()
      .collection("chatrooms")
      .doc(this.$route.params.id)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((querySnap) => {
        this.messages = querySnap.docs.map((doc) => {
          const data = doc.data()
          console.log(data)
          return { ...data, createdAt: data.createdAt.toDate() }
        })
      })
  },
  methods: {
    sendMessage() {
      if (this.$store.state.isAuth != null && this.inputMessage !== "") {
        // let updateUserInfo = firebase.auth().currentUser
        const messageInfo = {
          userUid: this.$store.state.userData.id,
          displayName: this.$store.state.userData.name,
          photoURL: this.$store.state.userData.photo,
          content: this.inputMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }
        firebase
          .firestore()
          .collection("chatrooms")
          .doc(this.$route.params.id)
          .collection("messages")
          .add(messageInfo)
          .then(() => {
            console.log("save at console.log")
          })
        this.inputMessage = ""
      }
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
      firebase
        .firestore()
        .collection("posts")
        .doc(this.$route.params.id)
        .get()
        .then((snapshot) => {
          this.posts = snapshot.data()
        })

      // })
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
