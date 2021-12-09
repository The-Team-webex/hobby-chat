<template>
  <div class="header">
    <!-- <Login2 /> -->
    <router-link to="/profile" v-if="$store.state.isAuth">Profile</router-link>
  </div>
</template>
<script>
//import Login2 from "../views/Login2.vue"
export default {
  components: {
    //Login2,
  },
}
</script>

<style scoped>
.header {
  display: inline-block;
}
</style>
