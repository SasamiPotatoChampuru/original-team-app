<template>
  <div class="design_ranking">
    <div v-show="zero">
      <h1>ランキング</h1>
      <div class="ranking_flex">
        <div class="irasuto_ranking">
          <h1>イラスト</h1>
          <p>最高点</p>
          <button @click="check_irasuto" class="ranking_button">
            結果を見る！
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
          <button class="ranking_button">結果を見る！</button>
          <ul>
            <li v-for="(list, index) in userData" :key="index">
              <h2>{{ list.score }}点！</h2>
            </li>
          </ul>
        </div>
        <div class="rensou_ranking">
          <h1>連想ゲーム</h1>
          <p>最高点</p>
          <button class="ranking_button">結果を見る！</button>
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
        <h1>ランキング</h1>
        <ol class="style">
          <li v-for="(list, index) in userData" :key="index">
            {{ list.userName }}さん⇒ {{ list.score }}点！
          </li>
        </ol>

        <div class="place">
          <button @click="returnButton">←戻る</button>
          <button @click="topButton">TOPへ</button>
        </div>
      </div>
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
    getDoc_quiz: async function () {
      const q = query(
        collection(db, "QuizUser"),
        orderBy("score", "desc"),
        limit()
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
        this.userData_2.push(doc.data())
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
    check_irasuto: function () {
      this.zero = false
      this.irasuto_status = true
      this.getDoc()
    },
    check_quiz: function () {
      this.status++
      this.getDoc_quiz()
    },
    returnButton: function () {
      ;(this.zero = true), (this.irasuto_status = false)
    },
    topButton: function () {
      this.$router.push("/")
    },
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
}

.irasuto_ranking {
  height: 350px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  padding-top: 15px;
}
.quiz_ranking {
  height: 350px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  padding-top: 15px;
}
.rensou_ranking {
  height: 350px;
  width: 250px;
  background-color: white;
  margin-top: 30px;
  padding-top: 15px;
}

.ranking_flex {
  display: flex;
  justify-content: space-around;
}

.ranking_button {
  position: relative;
  top: 100px;
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

.place {
  position: relative;
  top: 300px;
}
</style>
