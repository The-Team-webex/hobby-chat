<template>
  <div class="top">
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
        <div class="select-button">
          <button class="button del-button" @click="deleteButton(index)">
            削除
          </button>
          <button
            class="button again-button"
            @click="open(index)"
            v-if="post.isClosed"
          >
            もう一度募集する
          </button>
          <button class="button end-button" @click="close(index)" v-else>
            締め切る
          </button>
        </div>
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
.top {
  margin-top: 150px;
}

.Posted__forms {
  border: 2px solid #d3d1d1;
  border-radius: 10px;
  width: 50%;
  margin: 70px auto;
  text-align: center;
  border-top-width: 60px;
  padding: 30px 0;
}
@media screen and (max-width: 1632px) {
  .Posted__forms {
    width: 80%;
  }
}
@media screen and (max-width: 700px) {
  .Posted__forms {
    width: 90%;
  }
}

.Posted__form {
  display: inline-block;
  width: 100%;
}

.texts__title {
  color: #00adb5;
  padding-bottom: 20px;
  font-size: 200%;
  border-bottom: solid 2px #b6b6b6;
}
@media screen and (max-width: 900px) {
  .texts__title {
    font-size: 150%;
  }
}

.form__texts {
  background-color: #eeeeee;
  display: inline-block;
  margin: 30px 0 50px;
  width: 100%;
}

.texts__text {
  color: #393e46;
  padding: 20px 50px;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
@media screen and (max-width: 600px) {
  .texts__text {
    font-size: 90%;
  }
}

.form__detail ul li {
  display: inline-block;
  padding: 10px;
  vertical-align: middle; /*縦の表示位置も指定できる*/
  border: solid 2px #00adb5;
  font-weight: bold; /*文字を太字に*/
  color: #00adb5; /*文字色を白に*/
  border-radius: 10px;
  margin: 0 10px;
}
@media screen and (max-width: 1443px) {
  .form__detail ul li {
    font-size: 100%;
  }
}
@media screen and (max-width: 761px) {
  .form__detail ul li {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}

.date__title {
  display: inline-block;
  margin-right: 10px;
}
.date__num {
  display: inline-block;
}

.tag-list {
  padding: 0;
}

.tag {
  font-size: 130%;
}
.date {
  font-size: 130%;
}
@media screen and (max-width: 841px) {
  .tag {
    font-size: 100%;
  }
  .date {
    font-size: 100%;
  }
}
@media screen and (max-width: 718px) {
  .tag {
    font-size: 70%;
  }
  .date {
    font-size: 70%;
  }
}
@media screen and (max-width: 594px) {
  .tag {
    font-size: 50%;
  }
  .date {
    font-size: 50%;
  }
}

.select-button {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
}
@media screen and (max-width: 1000px) {
  .select-button {
    flex-direction: column;
  }
}

.button {
  text-align: center;
  display: inline-block;
  cursor: pointer;
  background-color: white;
  margin-top: 40px;
  width: 30%;
  padding: 10px 15px;
  border: 2px solid #00adb5;
  border-radius: 40px;
  text-decoration: none;
  color: black;
  font-size: 120%;
  transition: all 0.3s;
}
@media screen and (max-width: 1000px) {
  .button {
    width: 70%;
    margin: 30px auto 10px;
  }
}
@media screen and (max-width: 600px) {
  .button {
    width: 70%;
  }
}
@media screen and (max-width: 400px) {
  .button {
    font-size: 90%;
    margin: 10px auto 0;
  }
}
.button:hover {
  background-color: #00adb5;
  color: white;
}
</style>
