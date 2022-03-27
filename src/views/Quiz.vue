<template>
  <div class="app">
    <div v-if="screenzero">
      <div class="text-input">
        <p>チーム名を入力してください</p>
        <input type="text" v-model="input" id="input1" placeholder="name" />
        <label for="input1">name</label>
        <a href="#" class="btn-cross" v-on:click="nameButton">OK</a>
      </div>
      <!--

      チーム名とスコアをfirebaseに保存する
      確認画面、あなたは〇〇さんですか？
      -->
    </div>

    <div v-if="screenone">
      <p>参加人数を選択してください</p>

      <div class="suji">
        <a href="#" v-on:click="showQuiz(3)">3</a>
        <a href="#" v-on:click="showQuiz(4)">4</a>
        <a href="#" v-on:click="showQuiz(5)">5</a>
        <a href="#" v-on:click="showQuiz(6)">6</a>
        <a href="#" v-on:click="showQuiz(7)">7</a>
        <a href="#" v-on:click="showQuiz(8)">8</a>
        <a href="#" v-on:click="showQuiz(9)">9</a>
        <a href="#" v-on:click="showQuiz(10)">10</a>
      </div>

      <!--
      参加人数3の時、peoplenumber（変数）が
      初期値1、次へのボタンにプラス1する
      3になったらcomputedで処理終了
      v-showでfor文
      参加人数と画面遷移の数が一致したときにスコア算出
      -->
    </div>

    <div v-if="screentwo">
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

      <div id="v-model">
        <div>{{ textfield }}</div>
        <button v-on:click="feedback">OK</button>

        <div>{{ feedbacktext }}</div>

        <h1>答え{{ correctanswer }}</h1>

        <h3>スコア：{{ score }} points</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase.js"

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
      NwordQuiz: [],
      correctanswer: "",
      feedbacktext: "",
      score: 0,
      QuizUser: [],
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
      screenzero: true,
      screenone: false,
      screentwo: false,
      first: false,
    }
  },

  methods: {
    showQuiz(n) {
      for (let i = 0; i < n; i++) {
        this.ifNumber[i] = true
      }
      this.screenone = false
      this.screentwo = true

      this.NwordQuiz = this.quizzes.filter((quiz) => quiz.word === n)
      this.quiznumber = Math.floor(Math.random() * this.NwordQuiz.length)
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
      this.screenone = true
      this.screentwo = true
      this.first = false
    },

    nameButton: function () {
      // setDoc(doc(db, "QuizUser", `${this.input}`), {
      //   userName: this.input,
      //   score: this.score,
      // })
      this.screenone = true
      this.screenzero = false
    },
    // 正誤判定、スコア算出後に↓が動くようにする
    storeFirebase() {
      //firebaseにチーム名とスコアを保存する処理
      setDoc(doc(db, "QuizUser", `${this.input}`), {
        userName: this.input,
        score: this.score,
      })
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

.btn-cross {
  display: inline-block;
  position: relative;
  padding: 0.25em 1em;
  border-top: solid 2px black;
  border-bottom: solid 2px black;
  text-decoration: none;
  font-weight: bold;
  color: #03a9f4;
  margin: 20px;
}
.btn-cross:before,
.btn-cross:after {
  content: "";
  position: absolute;
  top: -7px;
  width: 2px;
  height: -webkit-calc(100% + 14px);
  height: calc(100% + 14px);
  background-color: black;
  transition: 0.3s;
}
.btn-cross:before {
  left: 7px;
}
.btn-cross:after {
  right: 7px;
}
.btn-cross:hover:before {
  top: 0px;
  left: 0;
  height: 100%;
}
.btn-cross:hover:after {
  top: 0px;
  right: 0;
  height: 100%;
}
.suji a {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  max-width: 240px;
  padding: 10px 25px;
  color: #313131;
  transition: 0.3s ease-in-out;
  font-weight: 500;
  text-decoration: none;
}

.suji a::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(107, 134, 255, 0.2);
  transition: all 0.3s;
}
.suji a:hover::before {
  opacity: 0;
  transform: scale(0.4, 0.4);
}
.suji a::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  transition: all 0.3s;
  border: 2px solid rgba(255, 196, 107, 0.4);
  transform: scale(1.2, 1.2);
}
.suji a:hover::after {
  opacity: 1;
  transform: scale(1, 1);
}

@import url(https://fonts.googleapis.com/css?family=Montserrat);

.text-input {
  position: relative;
  margin-top: 50px;
}

input[type="text"] {
  display: inline-block;
  width: 200px;
  height: 40px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 10px 10px 10px 100px;
  transition: all 0.1s ease-out;
}

input[type="text"] + label {
  position: absolute;
  top: 50%;
  left: 0;
  bottom: 0;
  height: 40px;
  line-height: 40px;
  color: white;
  border-radius: 3px 0 0 3px;
  padding: 0 20px;
  background: #e03616;
  transform: translateZ(0) translateX(0);
  transition: all 0.3s ease-in;
  transition-delay: 0.2s;
}

input[type="text"]:focus + label {
  transform: translateY(-120%) translateX(0%);
  border-radius: 3px;
  transition: all 0.1s ease-out;
}

input[type="text"]:focus {
  padding: 10px;
  transition: all 0.3s ease-out;
  transition-delay: 0.2s;
}
#v-model {
}
</style>
