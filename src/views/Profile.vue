<template>
  <div>
    <h1>名前：{{ $store.state.userData.name }}</h1>
    <img v-bind:src="$store.state.userData.photo" alt="読み込み中.." />
  </div>
</template>
<script>
//import firebase from "firebase"
export default {
  data() {
    return {
      userData: {},
    }
  },
  created: function () {
    return this.$store.getters.getData
  },

  //   mounted() {
  //     this.$store.commit("userData")
  //   },
}
</script>
