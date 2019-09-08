<template>
  <div id="app">
    <SideBar :location="selectedLocation"/>
    <VueMap :locations="locations"/>
  </div>
</template>

<script>
import {eventBus} from './main.js';
import VueMap from './components/VueMap.vue'
import SideBar from '@/components/SideBar'
import PlaqueService from '@/services/PlaqueService'
import PlaqueSearch from '@/components/PlaqueSearch'

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
    PlaqueSearch
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
  text-align: center;
}

.leaflet-popup-tip {
 display: none;
}

<<<<<<< HEAD
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
=======
>>>>>>> develop

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

</style>
