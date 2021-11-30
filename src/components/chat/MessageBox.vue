<template>
  <div class="chat-room">
    <section class="chat-box">
      <div
        v-for="(message, index) in messages"
        :key="index"
        v-chat-scroll="{ always: false, smooth: true }"
      >
        <span class="username">{{ message.username }}</span>
        <!-- <span class="date">{{ message.createdAt }}</span> -->
        <span class="content">{{ message.message }}</span>
      </div>
    </section>
    <div class="input-box">
      <input
        v-model="inputMessage"
        @keyup.enter.prevent="sendMessage"
        type="text"
        placeholder="メッセージを入力して下さい。"
      />
      <button type="submit" @click="sendMessage" :disabled="text == ''">
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
      unsubscribe: null,
      username: "jaehee",
    }
  },
  methods: {
    sendMessage() {
      const createMessage = {
        username: this.username,
        message: this.inputMessage,
      }
      firebase
        .firestore()
        .collection("messages")
        .add(createMessage)
        .then((ref) => {
          this.messages.push({
            id: ref.id,
            ...createMessage,
          })
        })
    },
  },
  created() {
    firebase
      .firestore()
      .collection("messages")
      .get()
      .then((snapshot) => {
        for (let i = 0; i < snapshot.docs.length; i++) {
          this.messages.push(snapshot.docs[i].data())
        }
      })
  },
}
</script>
