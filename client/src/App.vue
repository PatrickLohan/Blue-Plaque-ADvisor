<template>
  <div id="app">
    <SidebarToggle/>
    <SideBar :location="selectedLocation" :locations="locations"/>
    <VueMap :locations="locations"/>
  </div>
</template>

<script>
import {eventBus} from './main.js';
import VueMap from './components/VueMap.vue'
import SideBar from '@/components/SideBar'
import PlaqueService from '@/services/PlaqueService'
import PlaqueSearch from '@/components/PlaqueSearch'
import SidebarToggle from '@/components/SidebarToggle'

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
    SideBar,
    PlaqueSearch,
    SidebarToggle
  },
  mounted(){
    this.fetchData();

    eventBus.$on('location-selected', (location) => {
      let foundLocation = this.locations.filter(plaque => location.lat === plaque.latitude && location.lng === plaque.longitude);
      this.selectedLocation = foundLocation[0];
    })
    eventBus.$on('selected-location', (location) => {
      this.selectedLocation = location
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
    align-items: flex-start;
    text-align: center;
    height: 80px;
    overflow: scroll;
    display: flex;
    border-top-right-radius: 0;
}
.leaflet-popup-tip {
 display: none;
}

#logoContainer {
    position: static;
    z-index: 100;
    top: 15px;
    left: 15px;
}
/* Plaque colours as text-shadow */
.brushed {
  text-shadow: 0 0 3px #778899;
}
.wood {
  text-shadow: 0 0 2px #DEB887;
}
.black {
  text-shadow: 0 0 3px #000000;
}
.brass {
  text-shadow: 0 0 2px #DAA520;
}
.red {
  text-shadow: 0 0 3px #DC143C;
}
.marble {
  text-shadow: 0 0 1px #F8F8FF;
}
.grey {
  text-shadow: 0 0 1px #C0C0C0;
}
.blue {
  text-shadow: 0 0 3px #0000FF;
}
.stone {
  text-shadow: 0 0 2px #FFE4B5;
}
.brown {
  text-shadow: 0 0 3px #8B4513;
}
.green {
  text-shadow: 0 0 3px #3CB371;
}
.bronze {
  text-shadow: 0 0 2px #CD853F;
}
.route-setter .leaflet-popup-content-wrapper {
  background-color: lightgrey;
  border: 1px solid grey;
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
  width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.route-setter .leaflet-popup-content-wrapper .leaflet-popup-content .routes {
  margin: 0 0 0.2em -0.2em ;
  padding: 0.2em;
  border-radius: 5px;
  border: 1px solid grey;
  width: 9em;
  font-size: 1.1em;
}

</style>
