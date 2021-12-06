<template>
  <div class="MainBoard">
    <Header />
    <SearchForm />
    <router-link v-if="$store.state.isAuth" to="/post-form"
      ><PostButton
    /></router-link>

    <div v-else class="Home__post-button" @click="login">
      <div class="Button__circle">
        <img class="Button__img" src="../assets/記事アイコン1 (1).png" alt="" />
        <div class="Button__title">
          <p>ログインして</p>
          <p class="title__text">投稿する</p>
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
            <img v-bind:src="post.photo" alt="" class="profile__img" />
            <div class="profile__name">
              <h4 class="name">投稿者</h4>
              <h3>
                {{ post.college }}大学/{{ post.name
                }}<span class="name">さん</span>
              </h3>
            </div>
          </div>
          <ul>
            <li class="tag">#{{ post.category }}</li>
            <li class="tag">#{{ post.place }}</li>
            <li class="date">
              <span class="date__title">開催日時</span>{{ post.date }} /
              {{ post.time }}
            </li>
          </ul>
        </div>
        <div class="form__texts">
          <h2 class="texts__title">{{ post.title }}</h2>
          <h3 class="texts__text">{{ post.text }}</h3>
        </div>
        <router-link :to="{ name: `DetailPage`, params: { id: post.dataId } }"
          ><div class="post__button">詳細を見る</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PostButton from "@/components/PostButton.vue"
import SearchForm from "@/components/SearchForm.vue"
import Header from "@/components/Header.vue"
import firebase from "firebase"
export default {
  components: {
    PostButton,
    SearchForm,
    Header,
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
  width: 1000px;
  margin: 0 auto;
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

.college__name {
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
.Home__post-button {
  position: fixed;
  bottom: 50px;
  right: 60px;
}

.Button__circle {
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #00adb5; /*背景色*/
  transition: all 0.3s;
}

.Button__circle:hover {
  cursor: pointer;
  background-color: #03d2dd;
}

.Button__img {
  position: absolute;
  top: 30%;
  left: 51%;
  transform: translate(-50%, -50%);
  width: 60px;
}

.Button__title {
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 18px;
  width: 200px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title__text {
  font-size: 20px;
}
</style>
