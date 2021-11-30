<template>
  <div class="MainBoard">
    <!-- <h1>{{ $store.state.posts }}あ{{ $store.state.keyCategory }}</h1> -->
    <SearchForm />
    <router-link to="/post-form"><PostButton /></router-link>
    <div
      class="Posted__forms"
      v-for="(post, index) in $store.state.posts"
      v-bind:key="index"
    >
      <div class="Posted__form">
        <div class="form__detail">
          <ul>
            <li class="tag">#{{ post.category }}</li>
            <li class="tag">#{{ post.place }}</li>
            <li class="date">
              <span class="date__title">開催日時</span>{{ post.date }} /
              {{ post.time }}〜
            </li>
          </ul>
        </div>
        <div class="form__texts">
          <h2 class="texts__title">{{ post.title }}</h2>
          <h3 class="texts__text">{{ post.text }}</h3>
        </div>
        <div class="post__button" @click="showChat">チャットに入る</div>
      </div>
    </div>
  </div>
</template>

<script>
import PostButton from "@/components/PostButton.vue"
import SearchForm from "@/components/SearchForm.vue"

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
    }
  },
  created() {
    this.$store.commit("created")
  },
  methods: {
    showChat() {
      return this.$router.push("/chat/id")
    },
  },
}

// computed: {
//   filteredPosts: function () {
//     const filteredPosts = this.$store.commit("filteredPosts")
//     return filteredPosts
//   },
// },
</script>

<style scoped>
.Posted__forms {
  width: 1000px;
  margin: 0 auto;
}

.Posted__form {
  width: 800px;
  border: solid 2px #eeeeee;
  padding: 30px;
  border-radius: 10px;
  margin: 50px;
}

.form__detail ul {
  list-style-type: none;
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
  padding-bottom: 12px;
  border-bottom: solid 2px #b6b6b6;
}

.texts__text {
  color: #393e46;
  padding: 0px 50px;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.post__button {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  height: 50px;
  width: 200px;
  margin: 0 auto;
  line-height: 50px;
  background: #00adb5;
  color: #fff;
  border-radius: 25px;
  text-align: center;
  cursor: pointer;
}
</style>
