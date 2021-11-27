<template>
  <div>
    <ChatList />
    <Message />
  </div>
</template>

<script>
import ChatList from "@/components/chat/chatList.vue"
import Message from "@/components/chat/MessageBox.vue"

import firebase from "firebase"

export default {
  components: {
    ChatList,
    Message,
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
    }
  },
}
</script>
