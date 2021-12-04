<template>
  <div class="chat-room">
    <section class="chat-box">
      <div v-for="(message, index) in messages" :key="index">
        <span class="username">{{ $store.state.user.displayName }}</span>
        <span class="content">{{ message.content }}</span>
        <!-- <span class="date">{{ message.createdAt }}</span> -->
      </div>
    </section>
    <div class="input-box" @click="sendMessage">
      <input
        v-model="inputMessage"
        @keyup.enter.prevent="sendMessage"
        type="text"
        placeholder="メッセージを入力して下さい。"
      />
      <button type="submit">
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
      userInfo: null,
    }
  },
  methods: {
    sendMessage() {
      const createMessage = {
        username: this.$store.state.userData.name,
        profile: this.$store.state.userData.photo,
        message: this.inputMessage,
        createdAt: Date.now(),
      }
      firebase
        .firestore()
        .collection("messages")
        .doc(this.userInfo.uid)
        .add(createMessage)
        .then((ref) => {
          this.messages.push({
            id: ref.id,
            ...createMessage,
          })
        })
      this.inputMessage = ""
      console.log(this.user.uid)
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.userInfo = user
      console.log(user.uid)
    })
  },
  created() {
    firebase
      .firestore()
      .collection("messages")
      .doc(this.userInfo.uid)
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data())
      })
  },
}
</script>
