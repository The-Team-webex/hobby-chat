<template>
  <div class="MainBoard">
    <Header />
    <SearchForm />
    <router-link to="/post-form"><PostButton /></router-link>
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

  created() {
    this.$store.commit("created")
    this.posts = this.$store.state.posts
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
}

.Posted__form {
  width: 50%;
  border: solid 2px #d3d1d1;
  padding: 40px;
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
</style>
