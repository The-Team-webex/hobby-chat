<template>
  <div>
    <img v-bind:src="$store.state.userData.photo" alt="読み込み中.." />
    <h1>名前：{{ $store.state.userData.name }}</h1>
    <input
      type="text"
      placeholder="名前を変更"
      v-model="$store.state.userName"
    />
    <button @click="changeName">変更</button>
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
  methods: {
    changeName: function () {
      this.$store.commit("changeName")
    },
  },
  created: function () {
    this.$store.getters.setName, this.$store.getters.getData
  },

  //   mounted() {
  //     this.$store.commit("userData")
  //   },
}
</script>
