<template>
    <div class="app">
<div v-if="screenzero">
      <p>チーム名を入力してください</p>
      <input type="text" v-model="input">
      <button v-on:click="nameButton">OK</button>

      <!--
      チーム名とスコアをfirebaseに保存する
      確認画面、あなたは〇〇さんですか？
      -->

</div>

<div v-if="screenone">
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

      
      <!--
      参加人数3の時、peoplenumber（変数）が
      初期値1、次へのボタンにプラス1する
      3になったらcomputedで処理終了
      v-showでfor文
      参加人数と画面遷移の数が一致したときにスコア算出
      -->

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

    </div>

    <div v-if="first">
        <h2>Q. {{ NwordQuiz[quiznumber].text }}</h2>
        <p>残り時間 : {{ count }}</p>

        <div id="v-model">
          <div>{{ textfield }}</div>
          <button v-on:click="Next">次へ</button>
          <button v-on:click="okButton">OK</button>
        </div>
    </div>

    <div v-if="screentwo">
      <div>{{ textfield }}</div>
    </div>

    <div v-if="screenthree">
      <div>{{ feedbacktext }}</div>
    </div>

      <h3>スコア：{{ score }} points </h3>
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
      screenzero: true,
      screenone: false,
      screentwo: false,
      screenthree: false,
      NwordQuiz: [],
      feedbacktext: "",
      score: 0,
      count: 60,
      quizzes: [
        {
          text: "ハマると辞められない3文字といえば？",
          answer: "",
          word: 3,
        },
        {
          text: "「ま」から始まる3文字の身体の一部といえば？",
          answer: "",
          word: 3,
        },
        {
          text: "「イ」から始まる3文字の国といえば？",
          answer: "",
          word: 4,
        },
        {
          text: "4文字の緑の野菜と言えば？",
          answer: "",
          word: 4,
        },
        {
          text: "5文字の高いものと言えば？",
          answer: "",
          word: 5,
        },
        {
          text: "子供の頃の夢を6文字でいうと？",
          answer: "",
          word: 6,
        },
      ],
    }
  },

   created: function() {
      setInterval(() => { this.count-- }, 1000)
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
        this.feedbacktext = ""
        this.score += 100
      } else {
        this.feedbacktext = ""
        this.score -= 50
      }
        this.screenone = true;
        this.screentwo = true;
        this.first = false;
    },
    nameButton: function(){
        this.screenzero = true;
        this.screenone = true;
        this.screentwo = false;
        this.first = false;
        this.screenthree = false;
    },

    okButton: function(){
        this.screenone = false;
        this.screentwo = false;
        this.first = false;
        this.screenthree = true;
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

.suji {
  display: flex;
}

#v-model {
}
</style>