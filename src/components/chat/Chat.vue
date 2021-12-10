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
              <h4>投稿者</h4>
              <h3>{{ posts.college }}大学/{{ posts.name }}<span>さん</span></h3>
            </div>
            <div class="tags">
              <ul>
                <li class="tag">#{{ posts.category }}</li>
                <li class="tag">#{{ posts.place }}</li>
                <li class="date__title">
                  <span>開催日時</span>{{ posts.date }} / {{ posts.time }}〜
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
  background-color: #00adb5;
  margin: 30px auto;
  text-align: center;
}

.header-text {
  font-size: 35px;
  font-weight: normal;
  color: white;
}

.detail-box {
  border: 3px solid #d3d1d1;
  /* border-radius: 10px; */
  width: 90%;
  margin: 20px auto 0;
  padding: 10px 0;
}

.Posted__form {
  width: 800px;
  border: solid 2px #d3d1d1;
  padding: 40px;
  border-radius: 10px;
  margin: 50px;
}

.form__detail ul {
  list-style-type: none;
}

.form__detail ul li {
  display: inline-block;
  padding: 10px;
  margin: 0px 10px; /*余白も指定できる*/
  border: solid 2px #00adb5;
  font-weight: bold; /*文字を太字に*/
  color: #00adb5; /*文字色を白に*/
  border-radius: 10px;
}

.form__profile {
  margin-left: 30px;
  display: inline-block;
}

.tags {
  float: right;
  padding-top: 15px;
}

.profile__img {
  width: 60px;
}

.profile__name {
  display: inline-block;
  font-size: 15px;
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
}

.input {
  width: 80%;
  margin: 0rem 1rem;
  padding: 2px;
  background-color: #eeeeee;
}

.input-button {
  font-size: large;
  padding: 10px;
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
