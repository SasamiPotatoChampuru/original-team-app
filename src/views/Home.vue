<template>
  <div class="design">
    <button @click="ranking" class="rank">👑ランキング</button>
    <h1>みんひま</h1>
    <div class="flex_design">
      <div class="design_irasuto">
        <h1>イラスト</h1>
        <h1 class="font_2">✍</h1>
        <p></p>
        <button @click="irasuto" class="button">スタート！</button>
      </div>
      <div class="design_quiz">
        <h1>クイズ</h1>
       <h1 class="font">❔</h1>
        <p></p>
        <button @click="quiz" class="button">スタート！</button>
      </div>
      <div class="design_rensou">
        <h1>連想</h1>
         <h1 class="font_2">💭</h1>
        <p></p>
          <button @click="rensou" class="button">スタート！</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  methods: {
    irasuto: function () {
      this.$router.push("Irasuto")
    },
    quiz: function () {
      this.$router.push("Quiz")
    },
    rensou: function () {
      this.$router.push("")
    },
    ranking: function() {
      this.$router.push("ranking")
    }
  },
}
</script>

<style scoped>
.flex_design {
  display: flex;
  justify-content: space-around;
}

.design_irasuto {
  height: 350px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  border-radius: 50px;
}
.design_quiz {
  height: 350px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  border-radius: 50px;
}
.design_rensou {
  height: 350px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  border-radius: 50px;
}
.design {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    100deg,
    #3ae4de 30%,
    #99e6db 30% 60%,
    #f8ecd9 60% 70%,
    rgb(245, 162, 162) 70% 30%
  );
  padding: 30px 10px;
  text-align: center;
}

.button{
  margin-top: 30px;
  margin-left: -40px;
  padding: 5px;
  background:rgb(250, 246, 20);
  border-radius: 50px;
  position: absolute;
  top: 380px;
}

h1 {
  padding-top: 10px;
}

.font {
  font-size: 50px;
}

.font_2 {
  font-size: 100px;
  position: relative;
  top: -70px;
}

.rank {
  position: absolute;
  top: 50px;
  left: 1020px;
  padding: 10px;
  background: rgb(190, 188, 188);
}







</style>
