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
    }
  },
  methods: {
    sendMessage() {
      const createMessage = {
        username: this.username,
        message: this.inputMessage,
      }
      firebase.firestore().collection("messages").doc().add(createMessage)
    },
  },
}
// created() {
//   firebase
//     .firestore()
//     .collection("messages")
//     .get()
//     .then((snapshot) => {
//       for (let i = 0; i < snapshot.docs.length; i++) {
//         this.messages.push(snapshot.docs[i].data())
//       }
//     })
// },
</script>
