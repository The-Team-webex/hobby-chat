<template>
  <div class="header">
    <Login-2 />
    <router-link to="/profile" v-if="$store.state.isAuth"
      >プロフィール</router-link
    >
  </div>
</template>
<script>
import Login2 from "../views/Login2.vue"
export default {
  components: {
    Login2,
  },
}
</script>
