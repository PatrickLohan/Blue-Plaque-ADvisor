<template lang="html">
  <div id="plaque-details">

    <p>{{this.selectedLocation.title}}</p>
    <p>{{locations[0].inscription}}</p>
    <p>{{locations[0].longitude}}</p>
    <div id="favourites button">
      <h3 v-on:click="addFavourite">Add to Favourites</h3>
    </div>
  </div>
</template>

<script>
import PlaqueService from '@/services/PlaqueService.js'
import VueMap from '@/components/VueMap.vue'
import {eventBus} from '../main.js'

export default {
  props: ['location'],
  components: {

  },
  data(){
    return {
      selectedLocation: null
    }
  },
  mounted(){

    eventBus.$on('location-selected', (location) => {
      let foundLocation = this.locations.filter(plaque => location.lat === plaque.latitude && location.lng === plaque.longitude);
      this.selectedLocation = foundLocation[0];
    })

},
methods: {
  fetchData(){
    PlaqueService.getLocations()
    .then(locations => this.locations = locations);
  },
  addFavourite: function(locations) {
      eventBus.$emit('fav-selected', this.locations)
    }
}
}
</script>

<style lang="css" scoped>
  #plaque-details {
    display: flex;
    flex-direction: column;
    width: 20em;
  }
</style>
