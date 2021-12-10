<template>
  <div id="app">
    <div class="header" id="nav">
      <div class="header-left">
        <router-link to="/">
          <img src="./assets/ロゴ (0-00-00-00).png" alt="logo" class="logo" />
        </router-link>
      </div>
      <div class="header-right">
        <router-link
          to="/profile"
          v-if="$store.state.isAuth"
          class="header-list"
          >Profile</router-link
        >
        <router-link class="header-list" to="/">Home</router-link>
        <span class="header-list bd-right"><Login2 /></span>
      </div>

      <!-- ハンバーガーメニュー -->
      <div class="header-logo-menu">
        <div id="nav-drawer">
          <input id="nav-input" type="checkbox" class="nav-unshown" />
          <label id="nav-open" for="nav-input"><span></span></label>
          <label class="nav-unshown" id="nav-close" for="nav-input"></label>
          <div id="nav-content">
            <router-link
              to="/profile"
              v-if="$store.state.isAuth"
              class="menu-list"
              >Profile</router-link
            >
            <router-link class="menu-list" to="/">Home</router-link>
            <span class="menu-list"><Login2 /></span>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Login2 from "./views/Login2.vue"
export default {
  components: {
    Login2,
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.header {
  width: 100%;
  display: flex;
  justify-content: right;
  height: 80px;
  border-bottom: 2px solid black;
  display: fixed;
  top: 0;
  z-index: 10;
}

.header-left {
  width: 50%;
  padding-left: 100px;
}
@media screen and (max-width: 1056px) {
  .header-left {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    padding-left: 0;
  }
}
@media screen and (max-width: 600px) {
  .header-left {
    width: 90%;
    text-align: left;
  }
}

.header-left img {
  padding-top: 8px;
  width: 250px;
  max-width: 250px;
}
@media screen and (max-width: 500px) {
  .header-left img {
    width: 200px;
    padding-top: 15px;
  }
}

.header-right {
  width: 50%;
  margin: 0 auto;
  text-align: right;
}
@media screen and (max-width: 1056px) {
  .header-right {
    display: none;
  }
}

.header-list {
  color: black;
  text-decoration: none;
  display: inline-block;
  border-left: 2px solid black;
  width: 20%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 150%;
  transition: all 0.2s;
  cursor: pointer;
}
@media screen and (max-width: 1571px) {
  .header-list {
    width: 30%;
  }
}
.header-list:hover {
  background-color: rgb(231, 231, 231);
}

.bd-right {
  border-right: 2px solid black;
}

.logo {
  width: 20%;
}

/* ハンバーガーメニュー */
#nav-drawer {
  display: none;
}
@media screen and (max-width: 1056px) {
  #nav-drawer {
    display: block;
    position: fixed;
    right: 10px;
    top: 20px;
    margin: auto 0;
  }
}
@media screen and (max-width: 600px) {
  #nav-drawer {
    right: 5px;
  }
}

/*チェックボックス等は非表示に*/
.nav-unshown {
  display: none;
}

/*アイコンのスペース*/
#nav-open {
  display: inline-block;
  width: 80px;
  height: 60px;
  vertical-align: middle;
}

/*ハンバーガーの形をCSSで表現*/
#nav-open span,
#nav-open span:before,
#nav-open span:after {
  position: absolute;
  height: 10px; /*線の太さ*/
  width: 100%; /*長さ*/
  border-radius: 3px;
  background: #555;
  display: block;
  content: "";
  cursor: pointer;
}
@media screen and (max-width: 600px) {
  #nav-open span,
  #nav-open span:before,
  #nav-open span:after {
    width: 60px;
    height: 8px;
  }
}
@media screen and (max-width: 600px) {
  #nav-open span {
    margin-top: 4px;
  }
}

#nav-open span,
#nav-open span:before,
#nav-open span:after:hover {
  background-color: rgb(214, 214, 214);
}

#nav-open span:before {
  bottom: -22px;
}
#nav-open span:after {
  bottom: -45px;
}

/*閉じる用の薄黒箇所*/
#nav-close {
  display: none;
  position: fixed;
  z-index: 1000 !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  transition: 0.3s ease-in-out;
}

/*メニューの中身*/
#nav-content {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999 !important;
  width: 90%;
  max-width: 330px; /*最大幅（お好みで調整を）*/
  height: auto;
  background: #fff;
  transition: 0.3s ease-in-out;
  -webkit-transform: translateX(-105%);
  transform: translateX(-105%);
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 415px) {
  #nav-content {
    width: 50%;
  }
}
.menu-list {
  text-decoration: none;
  color: black;
  width: 100%;
  text-align: center;
  padding: 30px 0;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 150%;
}
@media screen and (max-width: 415px) {
  .menu-list {
    font-size: 110%;
  }
}
.menu-list:hover {
  background-color: rgb(221, 221, 221);
}

/*チェックがついたら表示させる*/
#nav-input:checked ~ #nav-close {
  display: block;
  opacity: 0.5;
}

#nav-input:checked ~ #nav-content {
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
  box-shadow: 6px 0 25px rgba(0, 0, 0, 0.15);
}

.header-logo-menu {
  display: flex;
  display: -moz-flex;
  display: -o-flex;
  display: -webkit-flex;
  display: -ms-flex;
  flex-direction: row;
  -moz-flex-direction: row;
  -o-flex-direction: row;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
}

/*ロゴやサイトタイトルをセンタリング*/
.logo-area {
  text-align: center;
  margin: auto;
}
</style>

<script>
import Login2 from "@/views/Login2.vue"
export default {
  components: {
    Login2,
  },
  // methods: {
  //   post: function () {
  //     setTimeout(() => {
  //       window.location.href = "/post-form"
  //     }, 5000)
  //   },
  // },
}
</script>
