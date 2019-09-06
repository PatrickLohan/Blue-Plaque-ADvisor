<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <VueMap />
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
}

.leaflet-popup-content-wrapper {
  color: #fff;
  background-color: #477CDE;
  border: 1px solid white;
  text-align: center;
}

.leaflet-popup-tip {
 display: none;
}

.leaflet-popup {
  position: relative;
  top: 30px;
  margin-left: -120px;
}

.popupMessage:hover {
  color: lightgrey;
  text-shadow: 0 0 5px white;
}

.popupMessageHidden {
  display: none;
}

</style>
