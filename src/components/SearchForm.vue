<template>
  <div class="SearchForm">
    <h3 class="form__title">絞り込み検索</h3>
    <div class="select-part">
      <select class="Category__select" v-model="$store.state.keyCategory">
        <option value="" hidden>選択してください</option>
        <option value="スポーツ">スポーツ</option>
        <option value="ゲーム">ゲーム</option>
        <option value="その他">その他</option>
      </select>
      <select class="Place__select" v-model="$store.state.keyPlace">
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
      <!-- <input type="date" v-model="$store.state.keyDate" /> -->
      <input class="input__select" type="text" v-model="$store.state.keyWord" />
      <div class="search__button" @click="filterlingPosts">
        <div class="button__circle">
          <img class="button__img" src="../assets/サーチアイコン.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    filterlingPosts: function () {
      this.$store.commit("filteringPosts")
    },
  },
}
</script>

<style scoped>
.SearchForm {
  margin: 60px auto 0;
  padding-bottom: 50px;
  max-width: 1300px;
  width: 60%;
  height: 100px;
  background-color: #00adb5;
  position: relative;
}
@media screen and (max-width: 1440px) {
  .SearchForm {
    width: 90%;
  }
}

.form__title {
  color: white;
  padding: 20px;
  font-weight: normal;
  font-size: 160%;
  letter-spacing: 3px;
}

.select-part {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.Category__select {
  padding: 10px 5px;
  margin-left: 170px;
  font-size: 100%;
}
@media screen and (max-width: 1783px) {
  .Category__select {
    margin-left: 150px;
    margin-right: 70px;
  }
}
@media screen and (max-width: 1477px) {
  .Category__select {
    margin-left: 100px;
    margin-right: 10px;
  }
}

.Place__select {
  font-size: 100%;
  padding: 10px 5px;
}

.input__select {
  margin-right: 170px;
  padding: 10px 5px;
  font-size: 80%;
}
@media screen and (max-width: 1783px) {
  .input__select {
    margin-right: 150px;
    margin-left: 70px;
  }
}
@media screen and (max-width: 1477px) {
  .input__select {
    margin-right: 100px;
    margin-left: 10px;
  }
}

.search__button {
  position: absolute;
  right: 5%;
  bottom: 20%;
  float: right;
  cursor: pointer;
}
@media screen and (max-width: 1783px) {
  .search__button {
    right: 2%;
  }
}

.button__circle {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
}

.button__img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  transition: all 0.3s;
}
.button__img:hover {
  width: 40px;
}
</style>
