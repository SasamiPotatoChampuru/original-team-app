<template>
   <div>
    <h1>イラストレーター</h1>
    <p>準備が出来たらGO！↓</p>
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