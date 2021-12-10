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
  right: 160px;
  background-color: #00adb5;
  border-radius: 50%;
  transition: all 0.3s;
}
@media screen and (max-width: 1319px) {
  .Home__post-button {
    position: static;
    display: block;
    width: 90%;
    margin: 50px auto;
    border-radius: 10px;
    background-color: #00adb5;
  }
}
.Home__post-button:hover {
  background-color: #00f2ff;
}

.Button__circle {
  position: relative;
  bottom: 5px;
  right: 0;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  transition: all 0.3s;
}
@media screen and (max-width: 1319px) {
  .Button__circle {
    display: block;
    width: 100%;
    border-radius: 10px;
  }
}

.Button__img {
  position: absolute;
  top: 65px;
  left: 90px;
  transform: translate(-50%, -50%);
  width: 70px;
}
@media screen and (max-width: 1319px) {
  .Button__img {
    display: block;
    left: 50%;
    right: 50%;
  }
}

.Button__title {
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 20px;
  position: absolute;
  top: 110px;
  left: 90px;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 1319px) {
  .Button__title {
    display: block;
    left: 50%;
    right: 50%;
    width: 100%;
    text-align: center;
  }
}
</style>
