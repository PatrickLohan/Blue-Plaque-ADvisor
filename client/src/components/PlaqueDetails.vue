<template lang="html">
  <div id="plaque-details">

    <p>{{location.title}}</p>
    <p>{{location.inscription}}</p>
    <p>{{location.erected_at}}</p>
    <div id="favourites button">
      <h3 v-if:="selectedFav != 0" v-on:click="addFavourite">Add to Favourites</h3>
      <h3 v-on:click="removeFavourite">Remove Favourite</h3>
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
      selectedLocation: null,
      selectedFav: []
    }
  },
  mounted(){

    eventBus.$on('location-selected', (location) => {
      let foundLocation = this.locations.filter(plaque => location.lat === plaque.latitude &&
        location.lng === plaque.longitude);
      this.selectedLocation = foundLocation[0];
    })

},
methods: {
  // fetchData(){
  //   PlaqueService.getLocations()
  //   .then(locations => this.locations = locations);
  // },
  addFavourite: function(location) {
      this.selectedFav.push(location)
      eventBus.$emit('plaque-favourited', this.location.title)
    },
  removeFavourite: function(location) {
    eventBus.$emit('plaque-defavourited', this.location)
  }
}
}
</script>

<style lang="css" scoped>
  #plaque-details {
    display: flex;
    flex-direction: column;
    width: 14em;
    color: white;
  }
</style>
