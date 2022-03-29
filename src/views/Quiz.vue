<template>
  <div class="app">

<ul class="slide">
  <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/15E07/production/_112970698_qt.jpg">
  <img src="http://www.myscreate.com/wp-content/uploads/2018/09/slide1.jpg">
  <img src="http://www.myscreate.com/wp-content/uploads/2018/09/slide2.jpg">
  <img src="https://i0.wp.com/www.playearth10.com/wp-content/uploads/2019/06/hoian_prv.jpg?resize=1170%2C658&ssl=1">
  <img src="https://i0.wp.com/girlydrop.com/wp-content/uploads/2020/02/Whiteday2020-12.jpg">
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
    <div class="confetti">
      <div>あなたは1人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="hitorimeButton">はい</a>
      </div>
    </div>

    <div v-if="ichiban">
    <p>残り時間 : {{ count }}秒</p>
    <div>答えの1文字目を入力してください</div>
      <input type="text" id="input1" v-model="inputAnswer0" maxlength="1" />
      <a href="#" class="btn-cross" v-on:click="first">次へ</a>
    </div>

    <div v-if="hutarime">
      <div>あなた2人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="hutarimeButton">はい</a>
    </div>

    <div v-if="niban">
    <p>残り時間 : {{ count }}秒</p>
    <div>答えの2文字目を入力してください</div>
      <input
        type="text"
        id="input1"
        v-if="ifNumber[1]"
        v-model="inputAnswer1"
        maxlength="1"
      />
      <a href="#" class="btn-cross" v-on:click="second">次へ</a>
    </div>

    <div v-if="sanninme">
      <div>あなたは3人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="sanninmeButton">はい</a>
    </div>

    <div v-if="sanban">
    <p>残り時間 : {{ count }}秒</p>
    <div>答えの3文字目を入力してください</div>
      <input
        type="text"
        id="input1"
        v-if="ifNumber[2]"
        v-model="inputAnswer2"
        maxlength="1"
      />
      <a href="#" class="btn-cross" v-on:click="third">次へ</a>
    </div>

    <div v-if="yoninme">
      <div>あなたは4人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="yoninmeButton">はい</a>
    </div>

    <div v-if="yonban">
    <p>残り時間 : {{ count }}秒</p>
    <div>答えの4文字目を入力してください</div>
      <input
        type="text"
        id="input1"
        v-if="ifNumber[3]"
        v-model="inputAnswer3"
        maxlength="1"
      />
      <a href="#" class="btn-cross" v-on:click="fourth">次へ</a>
    </div>

    <div v-if="goninme">
      <div>あなたは5人目ですか？</div>
      <a href="#" class="btn-cross" v-on:click="goninmeButton">はい</a>
    </div>

    <div v-if="goban">
    <p>残り時間 : {{ count }}秒</p>
    <div>答えの5文字目を入力してください</div>
      <input
        type="text"
        id="input1"
        v-if="ifNumber[4]"
        v-model="inputAnswer4"
        maxlength="1"
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
      count: 60,
      QuizUser: [],
      quizzes: [
        {
          text: "小さい物をつまむV字形の金属製器具＝○○○○○（カタカナ）",
          answer: "ピンセット",
          word: 5,
        },
        {
          text: "妻の発言力が強く、言いなりになる夫＝○○○○○家（ひらがな）",
          answer: "きょうさい",
          word: 5,
        },
        {
          text: "食べ物を胃に運ぶ管＝○○○○○（ひらがな）",
          answer: "しょくどう",
          word: 5,
        },
        {
          text: "女性の気持ちは変わりやすいさま＝女心おんなごころと○○○○○",
          answer: "あきのそら",
          word: 5,
        },
        {
          text: "CGを使って動画を投稿する人「VTuber」＝○○○○○YouTuber（カタカナ）",
          answer: "バーチャル",
          word: 5,
        },
        {
          text: "治療方針について主治医以外にも意見を求めること＝セカンド○○○○○（カタカナ）",
          answer: "オピニオン",
          word: 5,
        },
        {
          text: "購入額の25％分を上乗せして使える＝○○○○○付き食事券（カタカナ）",
          answer: "プレミアム",
          word: 5,
        },
        {
          text: "40歳前後の人はアラフォー、50歳前後の人は○○○○○（カタカナ）",
          answer: "アラフィフ",
          word: 5,
        },
        {
          text: "CM＝コマーシャル○○○○○（カタカナ）",
          answer: "メッセージ",
          word: 5,
        },
        {
          text: "国民の祝日11月3日＝○○○○○（ひらがな）",
          answer: "ぶんかのひ",
          word: 5,
        },
        {
          text: "木の実やレーズンなどを混ぜたシリアルの一種＝○○○○○（カタカナ）",
          answer: "グラノーラ",
          word: 5,
        },
        {
          text: "米大統領夫人＝○○○○○レディ（カタカナ））",
          answer: "ファースト",
          word: 5,
        },
        {
          text: "人気音楽ユニットずっと○○○○○いいのに。（ひらがな）",
          answer: "まよなかで",
          word: 5,
        },
        {
          text: "UV（ultraviolet ray）＝○○○○○（ひらがな））",
          answer: "しがいせん",
          word: 5,
        },
        {
          text: "松尾芭蕉（まつおばしょう）の俳句○○○○○集めて早はやし最上川もがみがわ（ひらがな）",
          answer: "さみだれを",
          word: 5,
        },
        {
          text: "氷上のチェスと呼ばれる冬季オリンピック競技＝○○○○○（カタカナ）",
          answer: "カーリング",
          word: 5,
        },
        {
          text: "「キュンです」に合わせ親指と人差し指を交差させる流行ポーズ＝○○○○○",
          answer: "ゆびハート",
          word: 5,
        },
        {
          text: "端午たんごの節句の供えもの＝○○○○○（ひらがな）",
          answer: "かしわもち",
          word: 5,
        },
        {
          text: "年収200万円未満が目安とされる働く貧困層＝○○○○○プア（カタカナ）",
          answer: "ワーキング",
          word: 5,
        },
        {
          text: "英国ウィリアム王子と○○○○○妃（カタカナ）",
          answer: "キャサリン",
          word: 5,
        },
        {
          text: "カンボジアの世界遺産○○○○○ワット（カタカナ）",
          answer: "アンコール",
          word: 5,
        },
        {
          text: "今年の日付は4月4日。イエス・キリストの復活を記念する重要な祭り＝○○○○○（カタカナ）",
          answer: "イースター",
          word: 5,
        },
        {
          text: "2024年度から新千円札の顔になる細菌学者＝○○○○○（漢字）",
          answer: "北里柴三郎",
          word: 5,
        },
        {
          text: "渡月橋とげつきょうで有名な京都の人気観光地○○○○○（ひらがな）",
          answer: "あらしやま",
          word: 5,
        },
         {
          text: "「人民の人民による人民のための政治」という言葉が有名な第16代アメリカ合衆国大統領＝エイブラハム・○○○○○（カタカナ）",
          answer: "リンカーン",
          word: 5,
        },
        {
          text: "飛沫が飛びにくい素材の家庭用使い捨てマスク＝○○○○○マスク（ひらがな））",
          answer: "ふしょくふ",
          word: 5,
        },
        {
          text: "歌舞伎における女性役または その役者のこと＝○○○○○（ひらがな）",
          answer: "おんなやく",
          word: 5,
        },
        {
          text: "今年生誕100周年の漫画サザエさんの原作者＝○○○○○（漢字）",
          answer: "長谷川 町子",
          word: 5,
        },
        {
          text: "全身の総合的な精密検査を行うこと＝○○○○○（漢字・カタカナ）",
          answer: "人間ドック",
          word: 5,
        },
        {
          text: "優れたものは落ちぶれても、それなりの価値があることを表すことわざ＝○○○○○鯛たい（ひらがな）",
          answer: "くさっても",
          word: 5,
        },
        {
          text: "結成半年という史上最速で紅白歌合戦に出場決定したJ.Y.Parkプロデユースの9人組グローバルガールズグループ＝○○○○○（アルファベット）",
          answer: "NiziU",
          word: 5,
        },
        {
          text: "音源か観測者のどちらかが動いていると聞こえる音が変化すること＝○○○○○効果（カタカナ）",
          answer: "ドップラー",
          word: 5,
        },
        {
          text: "アメリカ・ニューヨーク市最大の名物公園＝○○○○○パーク（カタカナ）",
          answer: "セントラル",
          word: 5,
        },
        {
          text: "フランス生まれで何にでも変身できるキャラクター＝○○○○○（カタカナ）",
          answer: "バーバパパ",
          word: 5,
        },
        {
          text: "他人が投稿した文を引用して再投稿することを表す「RT」＝○○○○○（カタカナ）",
          answer: "リツイート",
          word: 5,
        },
        {
          text: "平安時代に書かれた平仮名日記で作者は紀貫之きのつらゆき。四国から京都に帰るまでの旅を書いた○○○○○（ひらがな）",
          answer: "とさにっき",
          word: 5,
        },
        {
          text: "円柱状の野菜を帯状に薄く切ること＝○○○○○（ひらがな）",
          answer: "かつらむき",
          word: 5,
        },
        {
          text: "悪路の走行も可能な自転車「MTB」＝○○○○○バイク（カタカナ）",
          answer: "マウンテンバイク",
          word: 5,
        },
        {
          text: "邪馬台国と女王の卑弥呼について記されている書物＝魏志○○○○○（ひらがな）",
          answer: "わしんでん",
          word: 5,
        },
        {
          text: "強い上昇気流によって急速に発達した雲。積乱雲の俗称＝○○○○○雲（ひらがな）",
          answer: "にゅうどう",
          word: 5,
        },
        {
          text: "ケーブルでつながない無線式のイヤホン＝○○○○○イヤホン（カタカナ）",
          answer: "ワイヤレス",
          word: 5,
        },
        {
          text: "日本一長い川＝○○○○○（ひらがな）",
          answer: "しなのがわ",
          word: 5,
        },
        {
          text: "死者を供養するため やぐらを囲んで踊ること＝○○○○○（ひらがな）",
          answer: "ぼんおどり",
          word: 5,
        },
        {
          text: "江戸時代 飢饉ききんに苦しむ人々を助けるために起こした反乱＝○○○○○の乱（漢字）",
          answer: "大塩平八郎",
          word: 5,
        },
        {
          text: "光合成こうごうせいに必要な三要素＝水・光・○○○○○",
          answer: "二酸化炭素",
          word: 5,
        },
        {
          text: "今年の日付は4月4日。イエス・キリストの復活を記念する重要な祭り＝○○○○○（カタカナ）",
          answer: "イースター",
          word: 5,
        },
        {
          text: "2024年度から新千円札の顔になる細菌学者＝○○○○○（漢字）",
          answer: "北里柴三郎",
          word: 5,
        },
        {
          text: "渡月橋とげつきょうで有名な京都の人気観光地○○○○○（ひらがな）",
          answer: "あらしやま",
          word: 5,
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
        this.feedbacktext = "正解です！"
        this.score+= 100
      } else {
        this.feedbacktext = "不正解です！"
        this.score-= 50
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
      console.log(this.screenzero, this.screensix)
      this.screenzero = false
      
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
  background-image: url(https://beiz.jp/images_S/pastel/pastel_00019.jpg);
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
