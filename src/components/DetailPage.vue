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
              <span class="new-line names">{{ posts.college }}大学/</span>
              <span class="new-line"
                ><span class="names">{{ posts.name }}</span
                ><span class="name">さん</span></span
              >
            </h3>
          </div>
        </div>
        <ul class="tag-list">
          <li class="tag">#{{ posts.category }}</li>
          <li class="tag">#{{ posts.place }}</li>
          <li class="date">
            <span class="date__title">開催日時</span
            ><span class="date__num"
              >{{ posts.date }} / {{ posts.time }}〜</span
            >
          </li>
        </ul>
      </div>
      <div class="form__texts">
        <h2 class="texts__title">{{ posts.title }}</h2>
        <h3 class="texts__text">{{ posts.text }}</h3>
      </div>
      <div class="buttons">
        <router-link
          class="button chat__button"
          :to="{ name: `Chat`, params: { id: posts.dataId } }"
          ><div>気になる</div></router-link
        >
        <div class="back__button button" @click="backHome">戻る</div>
      </div>
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
  computed: {
    getAuth: function () {
      return this.$store.state.isAuth
    },
  },

  watch: {
    getAuth: function () {
      if (this.$store.state.isAuth === false) {
        alert("ログアウトしたのでホームに戻ります")
        return this.$router.push("/")
      }
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
  max-width: 1300px;
  background-color: #00adb5;
  margin: 60px auto;
  text-align: center;
  padding: 20px 0;
  border-radius: 10px;
}
@media screen and (max-width: 1700px) {
  .detail-header {
    width: 90%;
  }
}

.header-text {
  font-size: 170%;
  letter-spacing: 10px;
  font-weight: normal;
  color: white;
}

.detail-box {
  border: 3px solid #d3d1d1;
  border-top-width: 60px;
  border-radius: 10px;
  width: 50%;
  margin: 100px auto 0;
  text-align: center;
  padding: 30px 0;
}
@media screen and (max-width: 1700px) {
  .detail-box {
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  .detail-box {
    padding-bottom: 0;
  }
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
@media screen and (max-width: 739px) {
  .form__detail ul {
    display: flex;
    flex-direction: column;
    font-size: 150%;
    margin-bottom: 10px;
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

.form__profile {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 60%;
  margin: 0 auto;
}
@media screen and (max-width: 1056px) {
  .form__profile {
    width: 90%;
  }
}
@media screen and (max-width: 739px) {
  .form__profile {
    display: flex;
    flex-direction: column;
  }
}

.profile__img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-top: 25px;
}
@media screen and (max-width: 739px) {
  .profile__img {
    margin: 0 auto;
  }
}
@media screen and (max-width: 500px) {
  .profile__img {
  }
}

.profile__name {
  display: inline-block;
}

.new-line {
  display: inline-block;
}
.name {
  font-size: 150%;
}
@media screen and (max-width: 700px) {
  .name {
    font-size: 100%;
  }
}
@media screen and (max-width: 500px) {
  .name {
    font-size: 90%;
  }
}

.names {
  font-size: 200%;
}
@media screen and (max-width: 700px) {
  .names {
    font-size: 150%;
  }
}
@media screen and (max-width: 500px) {
  .names {
    font-size: 130%;
  }
}

.date__title {
  margin-right: 10px;
}

.form__texts {
  background-color: #eeeeee;
  display: inline-block;
  margin: 30px 0 50px;
  width: 100%;
}

.texts__title {
  color: #00adb5;
  padding-bottom: 20px;
  font-size: 200%;
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

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
  margin: 0 auto;
}
@media screen and (max-width: 1056px) {
  .buttons {
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  .buttons {
    flex-direction: column;
  }
}

.button {
  text-align: center;
  display: inline-block;
  cursor: pointer;
  background-color: white;
  width: 25%;
  padding: 10px 20px;
  border: 2px solid #00adb5;
  border-radius: 40px;
  text-decoration: none;
  color: black;
  font-size: 150%;
  transition: all 0.3s;
}
@media screen and (max-width: 600px) {
  .button {
    width: 70%;
    margin: 0 auto 30px;
  }
}
.button:hover {
  background-color: #00adb5;
  color: white;
}
</style>
