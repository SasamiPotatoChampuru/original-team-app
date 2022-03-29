<template>
     <div id="nav">
      <span><router-link to="/">Home</router-link> |</span>
      <span><router-link to="/Quiz">Quiz</router-link> |</span>
      <span><router-link to="/Ishisotsu">Fill in blank</router-link> |</span>
      <span> <router-link to="/irasuto">Illustration</router-link> |</span>
      <span><router-link to="/ranking">Ranking</router-link> |</span>
    </div>
    <router-view />
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  position: fixed;
  z-index: 9999;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
