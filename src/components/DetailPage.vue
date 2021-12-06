<template>
  <div>
    <div class="detail-header">
      <h3 class="header-text">詳細情報</h3>
    </div>
    <div class="detail-box">
      <div class="form__detail">
        <div class="form__profile">
          <img v-bind:src="posts.photo" alt="" class="profile__img" />
          <div class="profile__name">
            <h4 class="name">投稿者</h4>
            <h3>
              {{ posts.college }}大学/{{ posts.name
              }}<span class="name">さん</span>
            </h3>
          </div>
        </div>
        <ul>
          <li class="tag">#{{ posts.category }}</li>
          <li class="tag">#{{ posts.place }}</li>
          <li class="date">
            <span class="date__title">開催日時</span>{{ posts.date }} /
            {{ posts.time }}〜
          </li>
        </ul>
      </div>
      <div class="form__texts">
        <h2 class="texts__title">{{ posts.title }}</h2>
        <h3 class="texts__text">{{ posts.text }}</h3>
      </div>
      <router-link :to="{ name: `Chat`, params: { id: posts.dataId } }"
        ><div class="chat__button button">気になる</div></router-link
      >
      <div class="back__button button" @click="backHome">戻る</div>
    </div>
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
    backHome() {
      return this.$router.push("/")
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
  width: 70%;
  margin: 100px auto 0;
  padding: 30px 0;
}

.Posted__form {
  width: 800px;
  border: solid 2px #d3d1d1;
  padding: 40px;
  border-radius: 10px;
  margin: 50px;
}

.form__detail ul {
  list-style-type: none;
  margin-bottom: 20px;
}

.form__detail ul li {
  display: inline-block;
  padding: 10px;
  margin: 0px 10px; /*余白も指定できる*/
  vertical-align: middle; /*縦の表示位置も指定できる*/
  border: solid 2px #00adb5;
  font-weight: bold; /*文字を太字に*/
  color: #00adb5; /*文字色を白に*/
  border-radius: 10px;
}

.form__profile {
  height: 80px;
}

.profile__img {
  width: 60px;
  margin-top: 10px;
}

.profile__name {
  display: inline-block;
}

.name {
  font-size: 15px;
}

.date__title {
  margin-right: 10px;
}

.form__texts {
  background-color: #eeeeee;
  display: inline-block;
  margin-bottom: 25px;
  width: 100%;
}

.texts__title {
  color: #00adb5;
  padding: 12px;
  border-bottom: solid 2px #b6b6b6;
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

.post__button {
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  width: 200px;
  margin: 0 auto;
  line-height: 50px;
  background: #00adb5;
  color: #fff;
  border-radius: 25px;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
.post__button:hover {
  background-color: #03d2dd;
}

.button {
  text-align: center;
  display: inline-block;
  cursor: pointer;
  background-color: #d3d1d1;
  padding: 0px 10px;
  margin-left: 10px;
}

/* .detail-text {
  padding: 20px 0 0 0;
} */
</style>
