<template>
  <div class="design_ranking">
    <div v-show="zero">
      <button @click="top" class="top">TOP</button>
      <h1>🎉ランキング🎉</h1>
      <div class="ranking_flex">
        <div class="irasuto_ranking">
          <h1>イラスト</h1>
          <p>最高点</p>
          <button @click="check_irasuto" class="ranking_button">
            結果を見る
          </button>
          <ul>
            <li v-for="(list, index) in userData" :key="index">
              <h2>{{ list.score }}点！</h2>
            </li>
          </ul>
        </div>
        <div class="quiz_ranking">
          <h1>クイズ</h1>
          <p>最高点</p>
          <button @click="check_quiz" class="ranking_button">結果を見る</button>
          <ul>
            <li v-for="(list, index) in userData_2" :key="index">
              <h2>{{ list.score }}点！</h2>
            </li>
          </ul>
        </div>
        <div class="rensou_ranking">
          <h1>連想ゲーム</h1>
          <p>最高点</p>
          <button class="ranking_button">結果を見る</button>
          <ul>
            <li v-for="(list, index) in userData" :key="index">
              <div class="container">
                <h2>{{ list.score }}点！</h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- イラストランキング詳細画面 -->
    <div v-show="irasuto_status">
      <div class="irasuto_hyouzi">
        <h1 class="style">🎉~ランキング~🎉</h1>
        <div></div>
        <ul class="style_2">
          <li v-for="(list, index) in userData" :key="index">
            <div v-if="index == 0">
                🥇1位{{ list.userName }}さん⇒ {{ list.score }}点！
            </div>
            <div v-if="index == 1">
                🥈2位{{ list.userName }}さん⇒ {{ list.score }}点！
            </div>
            <div v-if="index == 2">
                🥉3位{{ list.userName }}さん⇒ {{ list.score }}点！
            </div>
             <div v-if="index ==3">
               <p>↓</p>
            </div>
             <div v-if="index >= 4">
               {{index}}位{{ list.userName }}さん⇒ {{ list.score }}点！
            </div>
    
          </li>
        </ul>
          <button @click="topButton" class="top">TOP</button>
        </div>
      </div>
    </div>

    <div v-show="quiz_status">
      <div class="quiz_hyouzi">
        <h1>🎉~ランキング~🎉</h1>
        <div></div>
        <ul class="style">
          <li v-for="(list, index_2) in userData_2" :key="index_2">
            {{ list.userName }}さん⇒ {{ list.score }}点！
          </li>
        </ul>
          <button @click="topButton" class="top">TOP</button>
        </div>
      </div>

    
      
</template>

<script>
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "../../firebase.js"

export default {
  data() {
    return {
      userData: [],
      userData_2: [],
      irasuto_status: false,
      quiz_status: false,
      zero: true,
    }
  },
  methods: {
    getDoc: async function () {
      const q = query(
        collection(db, "IrasutoUser"),
        orderBy("score", "desc"),
        limit(100)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
        this.userData.push(doc.data())
      })
    },
    getDoc_1: async function () {
      const q = query(
        collection(db, "IrasutoUser"),
        orderBy("score", "desc"),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
        this.userData.push(doc.data())
      })
    },
    getDoc_quiz_1: async function () {
      const q = query(
        collection(db, "QuizUser"),
        orderBy("score", "desc"),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
        this.userData_2.push(doc.data())
      })
    },
    getDoc_quiz_2: async function () {
      const q = query(
        collection(db, "QuizUser"),
        orderBy("score", "desc"),
        limit(100)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
        this.userData_2.push(doc.data())
      })
    },
    check_irasuto: function () {
      this.zero = false
      this.irasuto_status = true
      this.getDoc()
    },
    check_quiz: function () {
      this.zero = false
      this.quiz_status = true
      this.getDoc_quiz_2()
    },

    topButton: function () {
      this.userData = "",
      this.userData_2 = ""
      this.$router.push("/")
    },
    top: function() {
       this.userData = "",
       this.userData_2 = ""
       this.$router.push("/")
    }
  },
  mounted() {
    this.getDoc_1()
    this.getDoc_quiz_1()
  },
}
</script>

<style scoped>
.design_ranking {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    -130deg,
    #f5e941 20%,
    #fc9540 20% 50%,
    #f17007 50% 65%,
    rgb(5, 6, 104) 65%
  );
  padding: 50px 10px 0 0;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}

.irasuto_ranking {
  height: 300px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  padding-top: 15px;
  border-radius: 50px;
}
.quiz_ranking {
  height: 300px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  padding-top: 15px;
  border-radius: 50px;
}
.rensou_ranking {
  height: 300px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  padding-top: 15px;
  border-radius: 50px;
}

.ranking_flex {
  display: flex;
  justify-content: space-around;
  border-radius: 50px;
}

.ranking_button {
  position: relative;
  top: 100px;
  background-color: yellow;
  border-radius: 50px;
}

ul {
  list-style: none;
}

ul {
  position: relative;
  top: -30px;
  left: -10px;
}

.irasuto_hyouzi {
  width: 500px;
  height: 500px;
  background: white;
  margin: 0 auto;
  padding-top: 20px;
}

.quiz_hyouzi {
  width: 500px;
  height: 500px;
  background: white;
  margin: 0 auto;
  padding-top: 20px;
}

.top {
  position: absolute;
  top: 50px;
  left: 1020px;
  padding: 10px;
  background: rgb(190, 188, 188);
}

.style {
  padding-bottom: 30px;
}





</style>
