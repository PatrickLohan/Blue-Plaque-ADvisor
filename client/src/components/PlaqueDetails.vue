<template lang="html">
  <div id="plaque-details" v-if="location.title">
    <div id="mini-buttons">
      <img v-on:click="addFavourite" v-if="!this.favourites.includes(location)" src="../assets/favourites.png">
      <img v-on:click="removeFavourite" v-if="this.favourites.includes(location)" src="../assets/dislike.png">
      <!-- //Can we just open new tab with uri/url within the 'html' element or do we need a function? -->
      <img v-on:click="updateLocation" src="../assets/update.png">
      <!-- <h3 v-on:click="goWiki">More Info!</h3> -->
      <img v-on:click="goToLocation" v-if="location.latitude || location.longitude" src="../assets/directions.png">
      <img v-on:click="arrivedAtLocation" v-if="location.latitude || location.longitude" src="../assets/flag.png">
      <h4 v-if="!location.latitude || !location.longitude">Oh no! Please add coordinates</h4>
    </div>
    <p>{{location.title}}</p>
    <p>{{location.inscription}}</p>
    <p>{{location.erected_at}}</p>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'
import PlaqueService from '@/services/PlaqueService.js'
import VueMap from '@/components/VueMap.vue'
import {eventBus} from '../main.js'

export default {
  props: ['location', 'favourites'],
  components: {
  },
  methods: {
    addFavourite: function(location) {
      eventBus.$emit('plaque-favourited', this.location)
    },
    removeFavourite: function(location) {
      eventBus.$emit('plaque-defavourited', this.location)
    },
    goToLocation: function(location) {
      let endLocation = [this.location.latitude, this.location.longitude];
      eventBus.$emit('route-end', endLocation);
    },
    updateLocation: function(location){
      eventBus.$emit('update-location', this.location);
      eventBus.$emit('option-selected', 'update');
    },
    arrivedAtLocation: function(){
      eventBus.$emit('tour-deleted');
    }
  }
}
</script>

<style lang="css" scoped>
  #plaque-details {
    display: flex;
    flex-direction: column;
    max-height: inherit;
  }

  h3:hover {
    color: lightgrey;
  }

  #mini-buttons{
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  img{
    width: 2em;
    height: 2em;
  }
</style>
