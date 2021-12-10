<template>
  <div class="MainBoard">
    <SearchForm />
    <router-link v-if="$store.state.isAuth" to="/post-form"
      ><PostButton
    /></router-link>

    <div v-else class="Home__post-button" @click="login">
      <div class="Button__circle">
        <img class="Button__img" src="../assets/記事アイコン1 (1).png" alt="" />
        <div class="Button__title">
          <p>ログインして<br />投稿する</p>
        </div>
      </div>
    </div>

    <div
      class="Posted__forms"
      v-for="(post, index) in this.$store.state.filteredPosts"
      v-bind:key="index"
    >
      <div class="Posted__form">
        <div class="form__detail">
          <div class="form__profile">
            <div v-if="post.isClosed">締切</div>
            <img v-bind:src="post.photo" alt="" class="profile__img" />
            <div class="profile__name">
              <h4 class="name">投稿者</h4>
              <h3>
                <span class="new-line">{{ post.college }}大学/</span>
                <span class="new-line"
                  >{{ post.name }}<span class="name">さん</span></span
                >
              </h3>
            </div>
          </div>
          <ul class="tag-list">
            <li class="tag">#{{ post.category }}</li>
            <li class="tag">#{{ post.place }}</li>
            <li class="date">
              <span class="date__title">開催日時</span
              ><span class="date__num">{{ post.date }} / {{ post.time }}</span>
            </li>
          </ul>
        </div>
        <div class="form__texts">
          <h2 class="texts__title">{{ post.title }}</h2>
          <h3 class="texts__text">{{ post.text }}</h3>
        </div>
        <div class="post__button" v-if="$store.state.isAuth && post.isClosed">
          詳細を見る
        </div>
        <router-link
          v-if="$store.state.isAuth && post.isClosed === false"
          :to="{ name: `DetailPage`, params: { id: post.dataId } }"
          ><div class="post__button">詳細を見る</div>
        </router-link>

        <div
          v-else-if="$store.state.isAuth === false"
          @click="login"
          class="post__button2"
        >
          ログインして詳細を見る
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostButton from "@/components/PostButton.vue"
import SearchForm from "@/components/SearchForm.vue"
import firebase from "firebase"
export default {
  components: {
    PostButton,
    SearchForm,
  },
  data() {
    return {
      keyCategory: "",
      keyPlace: "",
      keyDate: "",
      keyWord: "",
      posts: [],
      filteredPosts: [],
    }
  },

  methods: {
    login: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
  },

  created() {
    this.$store.commit("created")
    this.posts = this.$store.state.posts

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              this.$store.state.userData.name = snapshot.data().name
              this.$store.state.userData.college = snapshot.data().college
            } else {
              const userData = {
                id: user.uid,
                name: user.displayName,
                photo: user.photoURL,
                college: "未設定",
              }
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .set(userData)
              this.$store.state.userData.name = snapshot.data().name
              this.$store.state.userData.college = snapshot.data().college
            }
          })
      }
    })

    firebase.auth().onAuthStateChanged((user) => {
      // if (user && this.$store.state.userData.id === "") {
      if (user) {
        this.$store.state.isAuth = true
        console.log("ログインしています")
      } else {
        this.$store.state.isAuth = false
        console.log("ログインしていません")
      }
    })
  },
}
</script>

<style scoped>
* {
  letter-spacing: 2px;
  text-decoration: none;
}

.Posted__forms {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.Posted__form {
  width: 50%;
  border: solid 2px #d3d1d1;
  padding: 25px;
  border-radius: 10px;
  margin: 70px auto;
}
@media screen and (max-width: 1319px) {
  .Posted__form {
    width: 80%;
  }
}

.form__detail ul {
  list-style-type: none;
  margin-bottom: 20px;
}
@media screen and (max-width: 761px) {
  .form__detail ul {
    display: flex;
    flex-direction: column;
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
@media screen and (max-width: 761px) {
  .form__profile {
    display: flex;
    flex-direction: column;
  }
}

.profile__img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-top: 20px;
}
@media screen and (max-width: 761px) {
  .profile__img {
    margin: 0 auto;
  }
}

.profile__name {
  display: inline-block;
  font-size: 140%;
  margin-top: 10px auto 0;
  width: 80%;
  text-align: center;
}
@media screen and (max-width: 761px) {
  .profile__name {
    margin: 0 auto;
  }
}
@media screen and (max-width: 665px) {
  .profile__name {
    font-size: 90%;
  }
}

.new-line {
  display: inline-block;
}

.name {
  font-size: 80%;
}

.date__title {
  display: inline-block;
  margin-right: 10px;
}
.date__num {
  display: inline-block;
}

.form__texts {
  background-color: #eeeeee;
  display: inline-block;
  margin-bottom: 30px;
  width: 100%;
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
  font-size: 150%;
  height: 50px;
  width: 50%;
  margin: 0 auto;
  padding: 10px 0;
  line-height: 50px;
  background: #00adb5;
  color: #fff;
  border-radius: 50px;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
@media screen and (max-width: 700px) {
  .post__button {
    width: 70%;
  }
}
@media screen and (max-width: 472px) {
  .post__button {
    width: 80%;
  }
}
.post__button:hover {
  background-color: #03d2dd;
}

.post__button2 {
  font-size: 150%;
  height: 50px;
  width: 50%;
  margin: 0 auto;
  padding: 10px 0;
  line-height: 50px;
  background: #00adb5;
  color: #fff;
  border-radius: 50px;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
@media screen and (max-width: 900px) {
  .post__button2 {
    font-size: 120%;
  }
}
@media screen and (max-width: 700px) {
  .post__button2 {
    width: 70%;
  }
}
@media screen and (max-width: 472px) {
  .post__button2 {
    width: 80%;
    font-size: 80%;
  }
}
.post__button2:hover {
  background-color: #03d2dd;
}

.Home__post-button {
  position: fixed;
  bottom: 50px;
  right: 60px;
  background-color: #00adb5;
  border-radius: 50%;
  transition: all 0.3s;
}
@media screen and (max-width: 1319px) {
  .Home__post-button {
    position: static;
    display: block;
    width: 90%;
    margin: 50px auto;
    border-radius: 10px;
    background-color: #00adb5;
  }
}

.Button__circle {
  position: relative;
  bottom: 5px;
  right: 0;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  transition: all 0.3s;
}
@media screen and (max-width: 1319px) {
  .Button__circle {
    display: block;
    width: 100%;
    border-radius: 10px;
  }
}

.Button__img {
  position: absolute;
  top: 55px;
  left: 51%;
  transform: translate(-50%, -50%);
  width: 70px;
}
@media screen and (max-width: 1319px) {
  .Button__img {
    display: block;
    left: 51%;
    right: 49%;
    width: 70px;
  }
}

.Button__title {
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 18px;
  width: 200px;
  position: absolute;
  top: 130px;
  left: 90px;
  transform: translate(-50%, -50%);
  text-align: center;
}
@media screen and (max-width: 1319px) {
  .Button__title {
    display: block;
    left: 51%;
    right: 49%;
    width: 100%;
  }
}
</style>
