<template>
  <div id="app">
    <div class="header" id="nav">
      <div class="header-right">
        <router-link class="header-list" to="/">Home</router-link>
        <router-link class="header-list" v-if="$store.state.isAuth" to="/header"
          >Profile</router-link
        >
        <span class="header-list"><Login2 /></span>
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
}

.header {
  display: flex;
  justify-content: right;
  text-align: center;
  height: 80px;
  border-bottom: 2px solid black;
  display: fixed;
  top: 0;
  z-index: 10;
}
.header-list {
  color: black;
  text-decoration: none;
  display: inline-block;
  width: 20%;
  line-height: 80px;
  font-size: 170%;
  border-left: 2px solid black;
  padding: 0 40px;
  transition: all 0.2s;
  cursor: pointer;
}
.header-list:hover {
  background-color: rgb(231, 231, 231);
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
