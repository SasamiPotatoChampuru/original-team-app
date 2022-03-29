<template>

  <div class="app">

<ul class="slide">
  <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/15E07/production/_112970698_qt.jpg">
  <img src="https://www-static.yakult-swallows.co.jp/hp/img/entertainment/wallpaper/w37_neon.jpg">
  <img src="https://i.pinimg.com/originals/b4/80/07/b480078fe45e70046e12d31da1b2d1d3.jpg">
  <img src="https://hep.eiz.jp/wp-content/uploads/2013/02/pc-wallpaper-07.jpg.webp">
  <img src="https://img.kb-cdn.com/imgviewer/NVpIM2ptOHhYRzVmUk5rM1NrNlFxYVV6enV4aGk2UFRJMmxPckdDUUVNYVVwUnNJME1xZzc4czh6WnhNa3Bkamg0QTBWOHVSZ1UxMktqYndKa2FyeVlOQnVTVXc2Y1ExTTk0S05oN05DNVNMUlZTZmVGN3RYTXBsSGdFWUVrclJwUm5DUzI4R0xZdzUxa1pGWnp6K2FRcVYvejlVOWkrTTdETG9JUUNxdURJeWFsSzhseVpxaVA1MU9oYmZnOThjcDB4ZWFmR3VnZVJ0eTM1K0hVRkloZ0M3WHJRc2h3enJreDBxZE13NHd6dFNaS3BvMGl6dDNsVUdOalI4WDhNRQ==?square=0">
</ul>

    <div v-if="screenzero">
      <div class="text-input">
        <p>チーム名を入力してください</p>
        <input type="text" id="input1" placeholder="name" />
        <label for="input1">name</label>
        <a href="#" class="btn-cross" v-on:click="showQuiz(5)">OK</a>
      </div>
    </div>


    <div v-if="screenone">
      <h2>Q. {{ NwordQuiz[quiznumber].text }}</h2>
        <div>{{ textfield }}</div>
        <a href="#" class="btn-cross" v-on:click="questionButton">回答開始</a>
    </div>

    <div v-if="hitorime">
      <div>あなたは1人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="hitorimeButton">はい</a>
    </div>

    <div v-if="ichiban">
    <p>残り時間 : {{ count }}</p>
    <div>入力してください</div>
      <input type="text" id="input1" v-model="inputAnswer0" />
      <a href="#" class="btn-cross" v-on:click="first">次へ</a>
    </div>

    <div v-if="hutarime">
      <div>あなた2人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="hutarimeButton">はい</a>
    </div>

    <div v-if="niban">
    <p>残り時間 : {{ count }}</p>
    <div>入力してください</div>
      <input
        type="text"
        id="input1"
        v-if="ifNumber[1]"
        v-model="inputAnswer1"
      />
      <a href="#" class="btn-cross" v-on:click="second">次へ</a>
    </div>

    <div v-if="sanninme">
      <div>あなたは3人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="sanninmeButton">はい</a>
    </div>

    <div v-if="sanban">
    <p>残り時間 : {{ count }}</p>
    <div>入力してください</div>
      <input
        type="text"
        id="input1"
        v-if="ifNumber[2]"
        v-model="inputAnswer2"
      />
      <a href="#" class="btn-cross" v-on:click="third">次へ</a>
    </div>

    <div v-if="yoninme">
      <div>あなたは4人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="yoninmeButton">はい</a>
    </div>

    <div v-if="yonban">
    <p>残り時間 : {{ count }}</p>
    <div>入力してください</div>
      <input
        type="text"
        id="input1"
        v-if="ifNumber[3]"
        v-model="inputAnswer3"
      />
      <a href="#" class="btn-cross" v-on:click="fourth">次へ</a>
    </div>

    <div v-if="goninme">
      <div>あなたは5人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="goninmeButton">はい</a>
    </div>

    <div v-if="goban">
    <p>残り時間 : {{ count }}</p>
    <div>入力してください</div>
      <input
        type="text"
        id="input1"
        v-if="ifNumber[4]"
        v-model="inputAnswer4"
      />
      <a href="#" class="btn-cross" v-on:click="feedback">OK</a>
    </div>

      <!--
      チーム名とスコアをfirebaseに保存する
      確認画面、あなたは〇〇さんですか？
      -->

<div v-if="screensix">
        <h1>{{ feedbacktext }}</h1>

        <h3>答え：{{ correctanswer }}</h3>

        <h3>スコア：{{ score }} points</h3>

        <a href="#" class="btn-cross" v-on:click="restartbutton">リトライ</a>
</div>

</div>

</template>


<script>
//import { doc, setDoc } from "firebase/firestore"
//import { db } from "../../firebase.js"

export default {
  data() {
    return {
    
      ifNumber: [
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
      userAnswer: "",
      n: 0,
      quiznumber: 0,
      NwordQuiz: [],
      correctanswer: "",
      feedbacktext: "",
      textfield: "",
      score: 0,
      QuizUser: [],
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

      screenzero: true,
      screenone: false,
      ichiban: false,
      niban: false,
      sanban: false,
      yonban: false,
      goban: false,
      hitorime: false,
      hutarime: false,
      sanninme: false,
      yoninme: false,
      goninme: false,
      screensix: false,
    }
  },

  methods: {
  
    showQuiz(n) {
      for (let i = 0; i < n; i++) {
        this.ifNumber[i] = true
      }
      this.screenone = true
      this.NwordQuiz = this.quizzes.filter((quiz) => quiz.word === n)
      this.quiznumber = Math.floor(Math.random() * this.NwordQuiz.length)
    },

    feedback() {
      //setDoc(doc(db, "QuizUser", `${this.input}`), {
      //userName: this.input,
      //score: this.score,
      //})
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
        this.feedbacktext = "終了！"
      } else {
        this.feedbacktext = "終了！"
      }
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = true
    },

      questionButton: function () {
      //setDoc(doc(db, "QuizUser", `${this.input}`), {
      //userName: this.input,
      //score: this.score,
      //})
      this.screenzero = false
      this.screenone = true
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = true
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

     hitorimeButton: function () {
      this.screenzero = false
      this.screenone = false
      this.ichiban = true
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

    first: function () {
      //setDoc(doc(db, "QuizUser", `${this.input}`), {
      //userName: this.input,
      //score: this.score,
      //})
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = true
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

    hutarimeButton: function () {
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = true
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

     second: function () {
      //setDoc(doc(db, "QuizUser", `${this.input}`), {
      //userName: this.input,
      //score: this.score,
      //})
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = true
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },


    sanninmeButton: function () {
      
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = false
      this.sanban = true
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

     third: function () {
     //setDoc(doc(db, "QuizUser", `${this.input}`), {
      //userName: this.input,
      //score: this.score,
      //})
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = true
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },


    yoninmeButton: function () {
     
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = true
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

     fourth: function () {
     //setDoc(doc(db, "QuizUser", `${this.input}`), {
      //userName: this.input,
      //score: this.score,
      //})
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = true
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

     goninmeButton: function () {
  
      this.screenzero = false
      this.screenone = false
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = true
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

    restartButton: function () {
      this.screenzero = true
      this.screenone = true
      this.ichiban = false
      this.niban = false
      this.sanban = false
      this.yonban = false
      this.goban = false
      this.hitorime = false
      this.hutarime = false
      this.sanninme = false
      this.yoninme = false
      this.goninme = false
      this.screenone = false
      this.screentwo = false
      this.screensix = false
    },

    // 正誤判定、スコア算出後に↓が動くようにする
    
    //storeFirebase() {
      //firebaseにチーム名とスコアを保存する処理
     //setDoc(doc(db, "QuizUser", `${this.input}`), {
        //userName: this.input,
        //score: this.score,
      //})
    //},
  },
}
</script>

<style scoped>
.app {
  display: flex;
  padding-top: 100px;
  padding-bottom:100px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-image: url(https://beiz.jp/images_P/pastel/pastel_00016.jpg);
  background-size: contain;
  height: 800px;
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
  height: 45px;
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

#apps {
  display: flex;
  margin-top: 10vw;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.slide {
  position: relative;
  overflow: hidden;
  width: 600px;
  height: 300px;
  margin: auto;
  background: #fff;
}
.slide img {
  display: block;
  position: absolute;
  width: inherit;
  height: inherit;
  left: 100%;
  animation: slide-anime 15s ease infinite;
}
.slide img:nth-of-type(1) {animation-delay: 0s;}
.slide img:nth-of-type(2) {animation-delay: 3s;}
.slide img:nth-of-type(3) {animation-delay: 6s;}
.slide img:nth-of-type(4) {animation-delay: 9s;}
.slide img:nth-of-type(5) {animation-delay: 12s;}
 
@keyframes slide-anime{
  0% {left: 100%;}
  2% {left: 0;}
  18% {left: 0;}
  20% {left: -100%;}
  100% {left: -100%;}
}

</style>
