<template>
  <div>
    <h1>名前：{{ $store.state.userData.name }}</h1>
    <img v-bind:src="$store.state.userData.photo" alt="" />
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
}
</script>
