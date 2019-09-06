<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <VueMap msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import VueMap from './components/VueMap.vue'
import SideBar from '@/components/SideBar'

export default {
  name: 'app',
  components: {
    VueMap,
    SideBar
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
  margin-top: 60px;
}
</style>
