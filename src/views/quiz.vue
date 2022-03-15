<template>
<div class="app">
<p>参加人数を選択してください</p>
  <button v-on:click="showQuiz(3)">3</button>
  <button v-on:click="showQuiz(4)">4</button>
  <button v-on:click="showQuiz(5)">5</button>
  <button v-on:click="showQuiz(6)">6</button>
  <button v-on:click="showQuiz(7)">7</button>
  <button v-on:click="showQuiz(8)">8</button>
  <button v-on:click="showQuiz(9)">9</button>
  <button v-on:click="showQuiz(10)">10</button>

<div v-if = "first">
  <h2>Q. {{ NwordQuiz[quiznumber].text }}</h2> 

<div id="v-model">
  <input type="text" v-model="textfield">
  <div>{{ textfield }}</div>
 <button v-on:click="feedback">OK</button>
 
  <h1>答え{{ NwordQuiz[quiznumber].answer }}</h1>

 <h1>スコア{{ quizzes.score }}</h1>
</div>
  
  
   </div>
</div>>

    <!-- <div v-bind:alt="quiz.text"></div> -->
    

<!-- <div id="timer">
    <div class="timer">
      <div class="time">
        {{ formatTime }}
      </div>
      <button v-on:click="start" v-if="!timerOn">Start</button>
      <button v-on:click="stop" v-if="timerOn">Stop</button>
    </div>
  </div> -->

</template>

<script>
export default{

  data() {
    return {
      n: 0,
      quiznumber: 0,
      first: false,
      NwordQuiz:[],
      quizzes: [
        {
        text: "3",
        answer: "バナナ",
        word: 3,
      },
        {
        text: "33",
        answer: "バナナ",
        word: 3,
      },
        {
        text: "4",
        answer: "バナナ4",
        word: 4,
      },
        {
        text: "44",
        answer: "4バナナ",
        word: 4,
      },
        {
        text: "5",
        answer: "バナナ55",
        word: 5,
      },
        {
        text: "55",
        answer: "55バナナ",
        word: 5,
      },
      ],
      // min: 59,
      // sec: 59,
      // timerOn: false,
      // timerObj: null,
    }
  },
 
  methods: {
    showQuiz(n){
      console.log(n)
      this.NwordQuiz = this.quizzes.filter(quiz => quiz.word === n)
      console.log(this.NwordQuiz)
      this.quiznumber = Math.floor(Math.random() * this.NwordQuiz.length)
      console.log(this.quiznumber)
      this.first = true
       console.log(this.quizzes.answer)
       console.log(this.quizzes)
       console.log(this.textfield)
    },
    feedback() {
    if(this.textfield === this.NwordQuiz[this.quiznumber].answer) {
    console.log('正解です！')
    }else {
    console.log('不正解です！')
    }
  }
    },

}

</script>

<style scoped>
.app {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.container {
  display: flex;
  height: 2em;
  width: 300px;
  padding: 1em;
  justify-content: space-around;
}

#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  font-size: 100px;
}
</style>
