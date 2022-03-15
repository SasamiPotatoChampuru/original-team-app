<template>
   <div class="irasuto">
    <h1>イラストレーター</h1>
    <p>絵を書いて絵を当てるゲーム</p>
    <p class="yohaku">GO↓</p>
    <button @click="startButton">スタート！</button>
  </div>
</template>

<script>
  export default {
      methods: {
        startButton: function() {
        this.$router.push("./Irasuto")
      },
      }
     
  }
</script>

<style>
  .irasuto {
    width: 300px;
    height: 300px;
    border: 1rem solid orange;
    margin: 0 auto;
  }

  .yohaku {
    margin: 50px 0;
  }
  
</style>