<template>
  <div class="design">
  <h1>みんひま</h1>
  <div class="flex_design">
      <div class="design_irasuto">イラストあてゲーム
        <button @click="irasuto">スタート！</button>
      </div>
      <div class="design_quiz">クイズゲーム</div>
      <div class="design_rensou">連想ゲーム</div>
 </div>
 </div>
</template>

<script>
  export default {
    data() {
    },
    methods: {
      irasuto: function() {
      this.$router.push("Irasuto")
      }
    },
  }
</script>

<style>

  .flex_design {
    display: flex;
    justify-content: space-around;
  }

  .design_irasuto{
    height: 350px;
    width: 250px;
    background-color: white;
    margin-top: 30px;
  }
  .design_quiz{
    height: 350px;
    width: 250px;
    background-color: white;
    margin-top: 30px;
  }
  .design_rensou{
    height: 350px;
    width: 250px;
    background-color: white;
    margin-top: 30px;
  }
  .design {
   width: 100vw;
   height: 100vh;
   background:linear-gradient(100deg, #3ae4de 30% , #99e6db 30% 60%, #f8ecd9 60% 70%, rgb(245, 162, 162) 70% 30%);
   padding: 10px 10px;
}




</style>



