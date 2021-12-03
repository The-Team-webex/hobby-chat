<template>
  <div>
    <div class="detail-header">
      <h3 class="header-text">詳細情報</h3>
    </div>
    <div class="detail-box">
      <h1>{{ this.$route.params.id }}</h1>
      <div class="detail-text">
        <h1>{{ this.posts.title }}</h1>
      </div>
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

<style scoped>
* {
  letter-spacing: 2px;
}

.detail-header {
  width: 60%;
  background-color: #00adb5;
  margin: 60px auto;
  padding: 40px 0;
}

.header-text {
  font-size: 170%;
  font-weight: normal;
  color: white;
}

.detail-box {
  border: 3px solid #d3d1d1;
  border-top-width: 60px;
  /* border-radius: 10px; */
  width: 40%;
  margin: 100px auto 0;
  padding: 30px 0;
}

.detail-text {
  padding: 20px 0 0 0;
}
</style>
