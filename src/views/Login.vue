<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="border-bottom">ログイン画面</h2>
        <div class="mt-2">
          <b-form-input
            v-model="email"
            type="text"
            placeholder="メールアドレス"
          />
        </div>
        <div class="mt-2">
          <b-form-input
            v-model="password"
            type="text"
            placeholder="パスワード"
          />
        </div>
        <div class="mt-2">
          <button class="button" block variant="primary" @click="googleLogin">
            Google ログイン
          </button>
        </div>
        <div class="mt-2">
          <alert v-model="showError" dismissible variant="danger">{{
            errorMessage
          }}</alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import router from "../router"

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      showError: false,
    }
  },
  methods: {
    emailLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log(result)
          router.push("/success")
        })
        .catch((error) => {
          console.log(error)
          this.errorMessage = error.message
          this.showError = true
        })
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result.user)
          router.push("/success")
        })
        .catch((error) => {
          console.log(error)
          this.errorMessage = error.message
          this.showError = true
        })
    },
  },
}
</script>

<style>
.row {
  width: 40%;
  margin: 0 auto;
  text-align: center;
  border: 1px solid black;
  border-radius: 15px;
  padding: 40px 0 60px;
}
.border-bottom {
  border-bottom: 4px solid black;
  margin-top: 10px;
  display: inline-block;
}
.mt-2 {
  margin-top: 2px;
}
.button {
  margin-top: 50px;
  padding: 10px 15px;
  font-size: 1.2rem;
  color: white;
  background-color: rgb(0, 255, 242);
  border: none;
  border-radius: 20px;
  transition: all 0.5s;
  cursor: pointer;
}
.button:hover {
  background-color: rgb(167, 255, 85);
  color: gray;
}
.button:active {
  background-color: black;
  color: white;
}
</style>
