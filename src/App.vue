<template>
  <div id="app">
    <HeaderView/>
    <router-view/>
    <FooterView/>
  </div>
</template>

<script>
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'


export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
