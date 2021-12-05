<template>
  <div id="app">
    <div class="header" id="nav">
      <router-link class="header-list" to="/">Home</router-link>
      <Login2 class="header-list" />
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

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

* {
  margin: 0;
}

.header {
  text-align: right;
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
