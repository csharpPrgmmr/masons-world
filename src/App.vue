<template>
  <div id="app">
    <TitlePage />
  </div>
</template>

<script>
import TitlePage from './components/TitlePage.vue'

export default {
  name: 'app',
  components: {
    TitlePage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
