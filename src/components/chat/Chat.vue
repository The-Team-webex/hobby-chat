<template>
  <div class="chat-room">
    <section class="chat-box">
      <div v-for="(message, index) in messages" :key="index">
        <span class="photo">
          <img :src="message.photoURL" :alt="message.photoURL"
        /></span>
        <span class="name">{{ message.displayName }}</span>
        <span class="content">{{ message.content }}</span>

        <span class="date"
          >{{ message.createdAt.getMonth() + 1 }}月{{
            message.createdAt.getDate()
          }}日{{ message.createdAt.getHours() }}時{{
            message.createdAt.getMinutes()
          }}分</span
        >
      </div>
    </section>
    <div class="input-box">
      <input
        v-model="inputMessage"
        @keyup.enter.prevent="sendMessage"
        type="text"
        placeholder="メッセージを入力して下さい。"
      />
      <button @click="sendMessage">
        <img src="send-texting.svg" alt="send" />
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      inputMessage: "",
      messages: [],
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
          return { ...data, createdAt: data.createdAt.toDate() }
        })
      })
  },
  methods: {
    sendMessage() {
      if (this.$store.state.isAuth != null) {
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
