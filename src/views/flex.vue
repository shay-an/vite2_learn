<script setup lang="ts">
</script>

<template>
  <h3>基础布局 行</h3>
  <div class="flex1">
    <div class="flex-item"></div>
    <div class="flex-item"></div>
    <div class="flex-item"></div>
  </div>
  <h3>基础布局 列</h3>
  <div class="flex2">
    <div class="flex-item"></div>
    <div class="flex-item"></div>
    <div class="flex-item"></div>
  </div>
  <h3>阮一峰flex骰子实例</h3>
  <h4>1.上下左右居中</h4>
  <div class="first-face">
    <div class="pip"></div>
  </div>
  <h4>2</h4>
  <div class="second-face">
    <div class="pip"></div>
    <div class="pip"></div>
  </div>
  <h4>3</h4>
  <div class="third-face">
    <div class="pip"></div>
    <div class="pip"></div>
    <div class="pip"></div>
  </div>
  <h4>4</h4>
  <div class="fourth-face">
    <div class="column">
      <div class="pip"></div>
      <div class="pip"></div>
    </div>
    <div class="column">
      <div class="pip"></div>
      <div class="pip"></div>
    </div>
  </div>
  <h4>5</h4>
  <div class="fifth-face">
    <div class="column">
      <div class="pip"></div>
      <div class="pip"></div>
    </div>
    <div class="column">
      <div class="pip"></div>
    </div>
    <div class="column">
      <div class="pip"></div>
      <div class="pip"></div>
    </div>
  </div>
  <h4>6</h4>
  <div class="sexth-face">
    <div class="column">
      <div class="pip"></div>
      <div class="pip"></div>
      <div class="pip"></div>
    </div>
    <div class="column">
      <div class="pip"></div>
      <div class="pip"></div>
      <div class="pip"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.flex1 {
  display: flex;
  height: 100px;
  background-color: #ccc;
  align-items: center;
  justify-content: space-around;

  .flex-item {
    height: 60px;
    background-color: aqua;
    flex: 1;
    margin: 0 10px;
  }
}

.flex2 {
  display: flex;
  width: 100px;
  height: 400px;
  background-color: #ccc;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  .flex-item {
    width: 60px;
    background-color: aqua;
    flex: 1;
    margin: 10px 0;
  }
}
.first-face {
  display: flex;
  justify-content: center;
  align-items: center;
}

.second-face {
  display: flex;
  justify-content: space-between;

  .pip:nth-of-type(2) {
    align-self: flex-end;
  }
}

.third-face {
  display: flex;
  justify-content: space-between;

  .pip:nth-of-type(2) {
    align-self: center;
  }

  .pip:nth-of-type(3) {
    align-self: flex-end;
  }
}

.fourth-face, .sexth-face {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
}

.fifth-face {
  display: flex;
  justify-content: space-between;

  .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .column:nth-of-type(2) {
    justify-content: center;
  }
}


[class$="face"] {
  margin:16px;
  padding: 4px;
  background-color: #e7e7e7;
  width: 104px;
  height: 104px;
  object-fit: contain;
  box-shadow: 
  inset 0 5px white,
  inset 0 -5px #bbb,
  inset 5px 0 #d7d7d7,
  inset -5px 0 #d7d7d7;
  border-radius: 10%;
}
.pip {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 4px;
  background-color: #333;
  box-shadow: inset 0 3px #111,inset 0 -3px #555;
}

</style>
