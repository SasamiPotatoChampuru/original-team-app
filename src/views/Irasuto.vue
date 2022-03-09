<template>
  <div v-if="first">
    <h1 v-if="count > 0">お題→{{ words[number] }}</h1>
    <p v-if="count > 0">残り時間：{{ count }}</p>
    <h1 v-if="count <= 0">終了です</h1>
    <!--<p>X: {{ mouseX }} Y: {{ mouseY }}</p>-->
    <canvas style="border:1px solid black" 
            ref="canvas" width="500" height="300"
            @mousemove="write" v-if="count > 0">
    </canvas>
    <p></p>
    <button @click="finishButton">終了</button>
  </div>

  <div v-if="second">
    <h1>あなたは解答者ですか？</h1>
    <button @click="nextButton" id="list1">はい</button>
    <div id="img-box"><img id="newImg"></div>
    <div v-if="maru">
      <p>答えを入力してください</p>
      <input type="text" v-model="input">
      <button @click="decideButton">決定</button>
    </div>
  </div>

  <div v-if="third">
    <h1>大正解！</h1>
    <p>SCORE:{{ score }}</p>
    <button @click="resetButton">もう一度</button>
  </div>
  <div v-if="third_2">
    <h1>不正解！</h1>
    <p>SCORE:{{ score }}</p>
    <button @click="resetButton">もう一度</button>
  </div>

</template>

<script>
  export default {
     components: {
    },

    data() {
      return {
        mouseX: 0,
        mouseY: 0,
        words: ["犬","猫","トラ","狐","狼","ねずみ","パンダ","ゾウ"],
        number: null,
        input: "",
        maru: false,
        zero:true,
        first: true,
        second: false,
        third: false,
        third_2: false,
        png: null,
        count: 10,
        score: 0,
        element: ""
    }
    },
    created: function() {
      setInterval(() => { this.count-- }, 1000)
  }, 

    updated() {
      setTimeout(() => {
        this.finishButton}
        ,6000
      )
    }, 

    mounted() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext("2d")
      this.number = Math.floor(0 + Math.random() * 7)
    },
    methods:{
      write: function(e){
        this.rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - this.rect.left;
        this.mouseY = e.clientY - this.rect.top;;
        this.context.fillRect(this.mouseX, this.mouseY, 10, 10);
      }, 

      finishButton: function() {
        this.second = true
        this.first = false
      },

      nextButton: function() {
        this.maru = true
        this.first = false
        this.png = this.canvas.toDataURL();
        document.getElementById("newImg").src = this.png;
        this.list_element = document.getElementById("list1");
        this.list_element.remove();
      },

      decideButton: function() {
        if(this.input == this.words[this.number]) {
          this.first = false
          this.second = false
          this.third = true
          this.score += 100
        }else {
          this.first = false
          this.second = false
          this.third = false
          this.third_2 = true
          this.score += 0
        }   
      },

      resetButton: function() {
        this.$router.push("/")
        this.first = true
        this.second = false
        this.third = false
        this.third_2 = false
      },
          
      }
   


      
    }
</script>

<style>
  canvas {
    position: relative;
    border:3px solid #000;
}


</style>