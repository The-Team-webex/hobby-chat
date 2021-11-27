<template>
  <div>
    <section class="chat-list">
      <div
        v-for="(message, index) in state.messages"
        :key="index"
        :class="
          message.username == state.username
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: {
        messages: [],
      },
    }
  },
}
</script>
