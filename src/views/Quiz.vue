<template>
  <div class="app">
    <p>参加人数を選択してください</p>

    <div class="suji">
      <button v-on:click="showQuiz(3)">3</button>
      <button v-on:click="showQuiz(4)">4</button>
      <button v-on:click="showQuiz(5)">5</button>
      <button v-on:click="showQuiz(6)">6</button>
      <button v-on:click="showQuiz(7)">7</button>
      <button v-on:click="showQuiz(8)">8</button>
      <button v-on:click="showQuiz(9)">9</button>
      <button v-on:click="showQuiz(10)">10</button>
    </div>
    <input
      type="text"
      v-if="ifNumber[0]"
      v-model="inputAnswer0"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[1]"
      v-model="inputAnswer1"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[2]"
      v-model="inputAnswer2"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[3]"
      v-model="inputAnswer3"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[4]"
      v-model="inputAnswer4"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[5]"
      v-model="inputAnswer5"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[6]"
      v-model="inputAnswer6"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[7]"
      v-model="inputAnswer7"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[8]"
      v-model="inputAnswer8"
      maxlength="1"
    />
    <input
      type="text"
      v-if="ifNumber[9]"
      v-model="inputAnswer9"
      maxlength="1"
    />

    <div v-if="first">
      <h2>Q. {{ NwordQuiz[quiznumber].text }}</h2>

      <div id="v-model">
        <div>{{ textfield }}</div>
        <button v-on:click="feedback">OK</button>

        <div>{{ feedbacktext }}</div>

        <h1>答え{{ correctanswer }}</h1>

        <h3>スコア{{ quizzes.score }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifNumber: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      inputAnswer0: "",
      inputAnswer1: "",
      inputAnswer2: "",
      inputAnswer3: "",
      inputAnswer4: "",
      inputAnswer5: "",
      inputAnswer6: "",
      inputAnswer7: "",
      inputAnswer8: "",
      inputAnswer9: "",
      userAnswer: "",
      n: 0,
      quiznumber: 0,
      first: false,
      NwordQuiz: [],
      correctanswer: "",
      feedbacktext: "",
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
    }
  },

  methods: {
    showQuiz(n) {
      for (let i = 0; i < n; i++) {
        this.ifNumber[i] = true
      }
      this.NwordQuiz = this.quizzes.filter((quiz) => quiz.word === n)
      this.quiznumber = Math.floor(Math.random() * this.NwordQuiz.length)
      this.first = true
    },
    feedback() {
      this.userAnswer =
        this.inputAnswer0 +
        this.inputAnswer1 +
        this.inputAnswer2 +
        this.inputAnswer3 +
        this.inputAnswer4 +
        this.inputAnswer5 +
        this.inputAnswer6 +
        this.inputAnswer7 +
        this.inputAnswer8 +
        this.inputAnswer9
      this.textfield = this.userAnswer
      this.correctanswer = this.NwordQuiz[this.quiznumber].answer
      if (this.textfield === this.NwordQuiz[this.quiznumber].answer) {
        this.feedbacktext = "正解です！"
      } else {
        this.feedbacktext = "不正解です！"
      }
    },
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

.suji {
  display: flex;
}

#v-model {
}
</style>
