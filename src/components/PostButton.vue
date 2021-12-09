<template>
  <div class="Home__post-button">
    <div class="Button__circle">
      <img class="Button__img" src="../assets/記事アイコン1 (1).png" alt="" />
      <p class="Button__title">投稿する</p>
    </div>
  </div>
</template>

<style scoped>
.Home__post-button {
  position: fixed;
  bottom: 50px;
  right: 60px;
}
@media screen and (max-width: 1319px) {
  .Home__post-button {
    top: 200px;
  }
}

.Button__circle {
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #00adb5; /*背景色*/
  transition: all 0.3s;
}

.Button__circle:hover {
  cursor: pointer;
  background-color: #03d2dd;
}

.Button__img {
  position: absolute;
  top: 40%;
  left: 51%;
  transform: translate(-50%, -50%);
  width: 80px;
}

.Button__title {
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 20px;
  position: absolute;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
