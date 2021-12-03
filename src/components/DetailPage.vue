<template>
  <div>
    <h1>{{ this.$route.params.id }}</h1>
    <div class="detail-text">
      <h1>{{ this.posts.title }}</h1>
    </div>
    <div class="chat__button" @click="showChat">チャット入場</div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      posts: "",
    }
  },
  created() {
    firebase
      .firestore()
      .collection("posts")
      .doc(this.$route.params.id)
      .get()
      .then((snapshot) => {
        this.posts = snapshot.data()
      })
  },
  methods: {
    showChat() {
      return this.$router.push("/chat/id")
    },
  },
}
</script>
