<template>
  <div class="chat-room">
    <section class="chat-box">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="
          message.username == username ? 'message current-user' : 'message'
        "
      >
        <span class="username">{{ message.username }}</span>
        <p class="content">{{ message.content }}</p>
      </div>
    </section>
    <div class="input-box">
      <input
        v-model="inputMessage"
        @keyup.enter.prevent="sendMessage"
        type="text"
        placeholder="メッセージを入力して下さい。"
      />
      <button type="submit" @click="sendMessage">
        <img src="src/components/chat/icons/send-empty.svg" alt="send" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputMessage: "",
      messages: [{ username: "", content: "" }],
      username: "",
    }
  },
  methods: {
    sendMessage() {
      //
    },
  },
}
</script>
