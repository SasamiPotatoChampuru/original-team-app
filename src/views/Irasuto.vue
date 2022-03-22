<template>
  
  <div class="irasuto" v-show="zero">
    <h1>イラストレーター</h1>
    <p>絵を書いて絵を当てるゲーム</p>
    <p class="yohaku">GO↓</p>
    <button @click="startButton">スタート！</button>
  </div>
  <!--描画画面-->
  <div v-show="first" class="black" v-bind:key="page">
    <h1 v-show="count > 0">お題→{{ words[number] }}</h1>
    <p v-if="count > 0"><span class="name" v-if="page == 1 || page == 3">Aさん</span>
     <span class="name" v-else>Bさん</span>
    残り時間 : {{ count }}</p>

    <h1 v-show="count <= 0">終了~!!</h1>
    <button v-show="count <= 0" class="lan" @click="finishButton">終了</button>
    <!--キャンバス表示-->
    <canvas
      style="border: 4mm ridge gray"
      id="canvas"
      @mousemove="write"
      @mousedown="dragStart"
      @mouseup="dragEnd"
      @mouseout="dragEnd"
      v-show="count > 0"
    >
    </canvas>

    <!--オプション-->
    <div v-if="count >= 0.5" class="flex">
      <p>{{ text }}</p>
      <img
        v-show="change_1"
        class="eraser_logo"
        src="../assets/image/images.png"
      />
      <img v-show="change_2" class="pen_logo" src="../assets/image/pen.png" />
      <div class="main">
        <div>
          <button class="red_button" @click="pen_red">赤</button>
          <button class="blue_button" @click="pen_blue">青</button>
          <button class="black_button" @click="pen">黒</button>
          太さ:<button @click="penLineDown">-</button>
          {{ pen_line_width }}
          <button @click="penLineUp">+</button>
        </div>

        <div>
          <button class="eraser" @click="eraser">消しゴム</button>
          太さ:<button @click="eraserLineDown">-</button>
          {{ eraser_line_width }}
          <button @click="eraserLineUp">+</button>
        </div>
        <button class="clear" @click="clear">クリア</button>
      </div>
      <button class="lan" @click="finishButton">終了</button>
    </div>
  </div>

  <!--解答画面-->
  <div v-if="second">
    <h1 v-if="page == 1 || page == 3">あなたは解答者(Bさん)ですか？</h1>
    <h1 v-else>あなたは解答者(Aさん)ですか？</h1>
    <button @click="nextButton" id="list1">はい</button>
    <div id="img-box"><img id="newImg" /></div>
    <div v-show="maru">
      <p>答えを<span>カタカナ</span>で入力してください</p>
      <input type="text" v-model="input" />
      <button @click="decideButton">決定</button>
    </div>
  </div>

  <!--結果画面-->
  <div v-if="third">
    <div class="result">
      <p class="kasen">{{ tarn }}問目</p>
      <h1 class="yes">大正解！</h1>
      <h2>SCORE:{{ score }}</h2>
      <button class="next" @click="next_2Button">次へ</button>
    </div>
  </div>
  <div v-if="third_2">
    <div class="result">
      <p>{{ tarn }}問目</p>
      <h1 class="no">不正解！</h1>
      <button class="next" @click="next_2Button">次へ</button>
    </div>
  </div>

  <!--結果表示画面-->
  <div v-if="fourth" class="result_2">
    <u><h1>現在結果</h1></u>
    <p>Aさん→SCORE：{{ total_1 }}</p>
    <p>Bさん→SCORE：{{ total_2 }}</p>
    <button @click="resetButton">次へ</button>
  </div>
</template>

<script>

export default {
  components: {},

  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      words: [
        "イヌ",
        "ネコ",
        "トラ",
        "キツネ",
        "オオカミ",
        "ネズミ",
        "パンダ",
        "ゾウ",
      ],
      number: null,
      input: "",
      maru: false,
      zero: true,
      first: false,
      second: false,
      third: false,
      third_2: false,
      fourth: false,
      fifth: false,
      png: null,
      count: 60,
      score: 250,
      total_score: 0,
      element: "",
      color: "black",
      color_2: "white",
      pen_line_width: 5,
      eraser_line_width: 5,
      change_1: false,
      change_2: true,
      text: "黒",
      tarn: 1,
      sub_count: 0,
      page: 1,
      total_1: 0,
      total_2: 0,
      db: null,
    }
  },

  created(){
 
  },

  mounted() {
    //キャンバスの作成及び設定
  },

  watch: {
    // 文字の太さwatch
    pen_line_width(val) {
      this.context.lineWidth = val
    },

    eraser_line_width(val) {
      this.context.lineWidth = val
    },

    color(val) {
      this.context.strokeStyle = val
    },
    isDrawingMode(val) {
      this.canvas.isDrawingMode = val
    },
  },

  methods: {
    startButton() {
      this.zero = false
      this.first = true
      this.reMount()
    },
    reMount: function () {
      this.canvas = document.querySelector("#canvas")
      this.context = this.canvas.getContext("2d")
      this.context.lineCap = "round"
      this.canvas.width = 500
      this.canvas.height = 280
      this.number = Math.floor(0 + Math.random() * this.words.length)
      this.timer_count = setInterval(() => {
      this.count--
      }, 1000)

      
    },
    write: function (e) {
      let x = e.layerX
      let y = e.layerY
      if (!this.isDrag) return
      this.context.lineTo(x, y)
      this.context.stroke()
    },

    finishButton: function () {
      this.second = true
      this.first = false
      this.sub_count = this.count;
      clearInterval(this.timer_count)
      this.count = 60
    },

    score_calc: function() {
      if(this.sub_count >= 51) {
        this.score -= (60 - this.sub_count) * 3
      }else if(this.sub_count >= 41 && this.sub_count <= 50){
        this.score -= (50 - this.sub_count) * 2.25
      }else if(this.sub_count >= 21 && this.sub_count <= 40){
        this.score -= (40 - this.sub_count) * 0.75
      }else if(this.sub_count >= 0 && this.sub_count <= 20){
         this.score -= (20 - this.sub_count) * 0.375
      }
    },

    nextButton: function () {
      this.maru = true
      this.first = false
      this.png = this.canvas.toDataURL()
      document.getElementById("newImg").src = this.png
      this.list_element = document.getElementById("list1")
      this.list_element.remove()
    },

    decideButton: function () {
      if (this.input == this.words[this.number]) {
        this.first = false
        this.second = false
        this.third = true
      } else {
        this.first = false
        this.second = false
        this.third = false
        this.third_2 = true
        this.score -= 100
      }
      this.score_calc()
      if(this.page == 1 || this.page == 3){
        this.total_1 += this.score
      }else{
        this.total_2 += this.score
      }
    },

    //リセットボタン
    resetButton: function () {
      this.first = true
      this.second = false
      this.third = false
      this.third_2 = false
      this.maru = false
      this.tarn += 1
      this.fourth = false
      this.score = 250
      this.reMount()
    },

    //描画処理
    dragStart: function (e) {
      let x = e.layerX
      let y = e.layerY
      this.context.beginPath()
      this.context.lineTo(x, y)
      this.context.stroke()
      this.isDrag = true
      this.context.lineWidth = this.pen_line_width
    },
    dragEnd: function () {
      this.context.closePath()
      this.isDrag = false
    },
    //黒ペン
    pen: function () {
      this.context.strokeStyle = this.color
      this.context.lineWidth = this.pen_line_width
      this.change_1 = false
      this.change_2 = true
      this.text = "黒"
    },

    //赤ペン
    pen_red: function () {
      this.context.strokeStyle = "red"
      this.context.lineWidth = this.pen_line_width
      this.change_1 = false
      this.change_2 = true
      this.text = "赤"
    },

    //青ペン
    pen_blue: function () {
      this.context.strokeStyle = "blue"
      this.context.lineWidth = this.pen_line_width
      this.change_1 = false
      this.change_2 = true
      this.text = "青"
    },

    //消しゴム
    eraser: function () {
      this.context.lineWidth = this.eraser_line_width
      this.context.strokeStyle = "white"
      this.change_1 = true
      this.change_2 = false
      this.text = ""
    },

    //クリア
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    //太さ設定
    penLineUp: function () {
      if (this.pen_line_width < 10) {
        this.pen_line_width += 1
      }
    },
    penLineDown: function () {
      if (this.pen_line_width > 0) {
        this.pen_line_width -= 1
      }
    },
    eraserLineUp: function () {
      if (this.eraser_line_width < 10) {
        this.eraser_line_width += 1
      }
    },
    eraserLineDown: function () {
      if (this.eraser_line_width > 0) {
        this.eraser_line_width -= 1
      }
    },
    next_2Button: function () {
       this.page++
      if(this.page != 5){
        this.first = false
        this.second = false
        this.third = false
        this.third_2 = false
        this.maru = false
        this.fourth = true
        console.log(this.page)
      }else{
        this.first = false
        this.second = false
        this.third = false
        this.third_2 = false
        this.maru = false
        this.fifth = true

      }
    },
}
}
</script>

<style>
canvas {
  position: relative;
  border: 3px solid #000;
}

.main-container {
  background-color: rgb(130, 199, 204);
}

.imgImg {
  border: 5px solid orange;
}

span {
  color: red;
}

.main {
  align-items: center;
  background-color: gray;
  width: 200px;
  padding: 20px;
  height: 70px;
  border: 3px solid black;
  color: white;
  border-radius: 30px;
}

.flex {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.lan {
  height: 50px;
  padding: 10px;
  margin-top: 40px;
  margin-left: 20px;
}

.black h1 {
  margin-top: 0px;
}

.black_button {
  background-color: gray;
}
.red_button {
  background-color: rgb(241, 117, 117);
}
.blue_button {
  background-color: rgb(147, 147, 241);
}

.eraser {
  background-color: white;
}

.clear {
  background-color: rgb(161, 231, 243);
  margin-top: 5px;
}

.pen_logo {
  width: 70px;
  height: 70px;
  margin-top: 20px;
}

.eraser_logo {
  width: 75px;
  height: 75px;
  margin-top: 20px;
  margin-left: 11px;
}

.result {
  width: 300px;
  height: 300px;
  border: thick double #32a1ce;
  margin: 0 auto;
}

.yes {
  color: red;
}

.no {
  color: blue;
}

.next {
  margin-top: 10px;
}

.result_2 {
  width: 300px;
  height: 300px;
  border: thick double #32a1ce;
  margin: 0 auto;
}

.name {
  color: black;
  background-color: orange
}
</style>
