<template>
  <div class="PostForm">
    <h1 class="PostForm__title">投稿フォーム</h1>
    <div class="Form__detail">
      <div class="category__parts">
        <div class="Form__category form-size">
          <h3 class="Category__title title">カテゴリー</h3>
          <select class="Category__select select-size" v-model="inputCategory">
            <option value="" hidden>選択してください</option>

            <option value="スポーツ">スポーツ</option>
            <option value="ゲーム">ゲーム</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div class="Form__place form-size">
          <h3 class="Place__title title">開催場所</h3>
          <select class="Place__select select-size" v-model="inputPlace">
            <option value="" hidden>選択してください</option>
            <optgroup label="関東">
              <option value="東京都">東京都</option>
              <option value="神奈川県">神奈川県</option>
              <option value="千葉県">千葉県</option>
              <option value="埼玉県">埼玉県</option>
              <option value="茨城県">茨城県</option>
              <option value="栃木県">栃木県</option>
              <option value="群馬県">群馬県</option>
            </optgroup>
            <optgroup label="関西">
              <option value="大阪府">大阪府</option>
              <option value="京都府">京都府</option>
              <option value="兵庫県">兵庫県</option>
              <option value="滋賀県">滋賀県</option>
              <option value="奈良県">奈良県</option>
              <option value="和歌山県">和歌山県</option>
            </optgroup>
            <optgroup label="東海">
              <option value="愛知県">愛知県</option>
              <option value="岐阜県">岐阜県</option>
              <option value="三重県">三重県</option>
              <option value="静岡県">静岡県</option>
            </optgroup>
            <optgroup label="北海道・東北">
              <option value="北海道">北海道</option>
              <option value="青森県">青森県</option>
              <option value="岩手県">岩手県</option>
              <option value="秋田県">秋田県</option>
              <option value="宮城県">宮城県</option>
              <option value="山形県">山形県</option>
              <option value="福島県">福島県</option>
            </optgroup>
            <optgroup label="甲信越・北陸">
              <option value="長野県">長野県</option>
              <option value="新潟県">新潟県</option>
              <option value="山梨県">山梨県</option>
              <option value="石川県">石川県</option>
              <option value="富山県">富山県</option>
              <option value="福井県">福井県</option>
            </optgroup>
            <optgroup label="中国・四国">
              <option value="広島県">広島県</option>
              <option value="岡山県">岡山県</option>
              <option value="山口県">山口県</option>
              <option value="鳥取県">鳥取県</option>
              <option value="島根県">島根県</option>
              <option value="愛媛県">愛媛県</option>
              <option value="香川県">香川県</option>
              <option value="徳島県">徳島県</option>
              <option value="高知県">高知県</option>
            </optgroup>
            <optgroup label="九州・沖縄">
              <option value="福岡県">福岡県</option>
              <option value="長崎県">長崎県</option>
              <option value="熊本県">熊本県</option>
              <option value="佐賀県">佐賀県</option>
              <option value="大分県">大分県</option>
              <option value="宮崎県">宮崎県</option>
              <option value="鹿児島県">鹿児島県</option>
              <option value="沖縄県">沖縄県</option>
            </optgroup>
            <optgroup label="その他">
              <option>オンライン</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div class="Form__date">
        <h3 class="Date__title title">開催日時</h3>
        <div class="date-flex">
          <input class="input-size left-date" type="date" v-model="inputDate" />
          <input
            class="input-size right-time"
            type="time"
            v-model="inputTime"
          />
        </div>
      </div>
      <div class="Form__menber"></div>
    </div>
    <div class="Form__title">
      <h3 class="Title__title title">見出し</h3>
      <input class="block__title" type="text" v-model="inputTitle" />
    </div>
    <div class="Form__text">
      <h3 class="Text__title title">説明欄</h3>
      <textarea class="block__title" type="text" v-model="inputText" />
    </div>
    <div class="Form__button" @click="PostForm">投稿する</div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      inputCategory: "",
      inputPlace: "",
      inputTitle: "",
      inputText: "",
      inputDate: "",
      inputTime: "",
      posts: [],
    }
  },
  methods: {
    PostForm: function () {
      firebase.auth().onAuthStateChanged((user) => {
        const newDoc = firebase.firestore().collection("posts").doc().id
        const post = {
          name: this.$store.state.userData.name,
          photo: user.photoURL,
          college: this.$store.state.userData.college,
          category: this.inputCategory,
          place: this.inputPlace,
          title: this.inputTitle,
          text: this.inputText,
          date: this.inputDate,
          time: this.inputTime,
          dataId: newDoc,
          userId: user.uid,
        }
        if (
          this.inputCategory !== "" &&
          this.inputPlace !== "" &&
          this.inputTitle !== "" &&
          this.inputText !== "" &&
          this.inputDate !== "" &&
          this.inputTime !== ""
        ) {
          this.posts.push(post)
          firebase.firestore().collection("posts").doc(newDoc).set(post)
          alert("投稿が完了しました！")
          this.$router.push("/")
        }
      })
    },
  },
  computed: {
    isAuth: function () {
      return this.$store.getters.getAuth
    },
  },
  // watch:{
  //   isAuth:(true,false){
  //      return this.$router.push("/")
  //   }
  // }
}
</script>

<style scoped>
* {
  letter-spacing: 2px;
}

.PostForm {
  background-color: #eeeeee;
  width: 60%;
  margin: 100px auto 70px;
  padding: 50px 0;
}
.PostForm__title {
  text-align: center;
}

.title {
  padding: 30px 0 10px;
  font-size: 150%;
}
.block__title {
  width: 50%;
  padding: 5px;
  height: 30px;
  font-size: 120%;
}

.Form__button {
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
  transition: all 0.3s;
}
.Form__button:hover {
  background-color: #03d2dd;
}

.category__parts {
  display: flex;
  width: 51%;
  margin: 10px auto 40px;
  flex-direction: row;
  justify-content: space-between;
}

.Category__select {
  font-size: 110%;
}
.Place__select {
  font-size: 110%;
}

.select-size {
  height: 45%;
  padding: 0 10px;
}

.date-flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: pink;
}

.left-date {
  width: 70%;
}
.right-time {
  width: 30%;
}

.input-size {
  height: 44px;
  font-size: 150%;
}

.Form__date {
  margin: 0 auto 40px;
  width: 50%;
  padding: 5px;
}

.Form__text {
  margin: 40px auto 50px;
}
</style>
