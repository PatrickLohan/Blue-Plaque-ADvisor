<template>
  <div id="app">
    <SideBar/>
    <VueMap :locations="locations"/>
  </div>
</template>

<script>
import {eventBus} from './main.js';
import VueMap from './components/VueMap.vue'
import SideBar from '@/components/SideBar'
import PlaqueService from '@/services/PlaqueService'

export default {
  name: 'app',
  data(){
    return {
      locations: [],
      selectedLocation: {}
    }
  },
  components: {
    VueMap,
    SideBar
  },
  mounted(){
    this.fetchData();

    eventBus.$on('location-selected', (location) => {
      let foundLocation = this.locations.filter(plaque => location.lat === plaque.latitude && location.lng === plaque.longitude);
      this.selectedLocation = foundLocation[0];
    })
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
  box-shadow: inset 0 0 3px white;
  text-align: center;
  height: 80px;
  overflow: scroll;
  display: flex;
  align-items: center;
  border-top-right-radius: 0;
}

.leaflet-popup-content {
  margin: 5px;
}

.leaflet-popup-tip {
 display: none;
}

/* .leaflet-popup {
  position: relative;
  top: 30px;
  margin-left: -120px;
}  */

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
