<template>
  <div>
    <div
      class="Posted__forms"
      v-for="(post, index) in this.posts"
      v-bind:key="index"
    >
      <div class="Posted__form">
        <div class="form__texts">
          <h2 class="texts__title">{{ post.title }}</h2>
          <h3 class="texts__text">{{ post.text }}</h3>
        </div>
        <div class="Posted__form">
          <div class="form__detail">
            <div class="form__profile"></div>
            <ul class="tag-list">
              <li class="tag">#{{ post.category }}</li>
              <li class="tag">#{{ post.place }}</li>
              <li class="date">
                <span class="date__title">開催日時</span>{{ post.date }} /
                {{ post.time }}
              </li>
            </ul>
          </div>
        </div>
        <button @click="deleteButton(index)">削除</button>
        <button @click="open(index)" v-if="post.isClosed">
          もう一度募集する
        </button>
        <button @click="close(index)" v-else>締め切る</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    deleteButton: function (index) {
      const check = window.confirm("本当にこの投稿を削除しますか？")
      if (check) {
        firebase
          .firestore()
          .collection("posts")
          .doc(this.posts[index].dataId)
          .delete()
      }
    },
    close: function (index) {
      const check = window.confirm("この投稿の募集を締め切りますか？")
      if (check) {
        this.posts[index].isClosed = true
        firebase
          .firestore()
          .collection("posts")
          .doc(this.posts[index].dataId)
          .update({
            isClosed: true,
          })
      }
    },
    open: function (index) {
      const check = window.confirm("もう一度募集しますか")
      if (check) {
        this.posts[index].isClosed = false
        firebase
          .firestore()
          .collection("posts")
          .doc(this.posts[index].dataId)
          .update({
            isClosed: false,
          })
      }
    },
  },
  created() {
    this.posts.length = 0
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user.uid)
      firebase
        .firestore()
        .collection("posts")
        .where("userId", "==", user.uid)
        .get()
        .then((snapshot) => {
          for (let i = 0; i < snapshot.docs.length; i++) {
            this.posts.push(snapshot.docs[i].data())
          }
        })
    })
  },
}
</script>

<style scoped>
.Posted__form {
  display: inline-block;
}
</style>
