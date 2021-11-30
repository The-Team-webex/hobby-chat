<template>
  <div class="SearchForm">
    <h3 class="form__title">絞り込み検索</h3>
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
    <input type="text" v-model="$store.state.keyWord" />

    <div class="search__button" @click="filterlingPosts">
      <div class="button__circle">
        <img class="button__img" src="../assets/サーチアイコン.png" alt="" />
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
  margin: 0 auto;
  width: 70%;
  height: 100px;
  background-color: #00adb5;
}

.form__title {
  color: white;
  padding: 10px;
}

.search__button {
  float: right;
  cursor: pointer;
}

.button__circle {
  position: relative;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: white;
}

.button__img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
}
</style>
