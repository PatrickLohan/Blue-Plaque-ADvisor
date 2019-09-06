<template>
  <div id="app">
    <SideBar/>
    <VueMap :locations="locations"/>
  </div>
</template>

<script>
import VueMap from './components/VueMap.vue'
import SideBar from '@/components/SideBar'
import PlaqueService from '@/services/PlaqueService'

export default {
  name: 'app',
  data(){
    return {
      locations: []
    }
  },
  components: {
    VueMap,
    SideBar
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      PlaqueService.getLocations()
      .then(locations => this.locations = locations);
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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

#logoContainer {
    position: static;
    z-index: 100;
    top: 15px;
    left: 15px;
}

</style>
