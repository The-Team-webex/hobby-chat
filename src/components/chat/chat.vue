<template>
  <div>
    <ChatList />
    <Message />
  </div>
</template>

<script>
import ChatList from "./ChatList.vue"
import Message from "./MessageBox.vue"
// import firebase from "firebase"

export default {
  components: {
    ChatList,
    Message,
  },
  data() {
    return {}
  },
}
</script>
