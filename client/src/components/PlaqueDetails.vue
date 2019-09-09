<template lang="html">
  <div id="plaque-details" v-if="location.title">
    <p>{{location.title}}</p>
    <p>{{location.inscription}}</p>
    <p>{{location.erected_at}}</p>
    <div id="favourites button">
      <h3 v-on:click="addFavourite" v-if="!this.favourites.includes(location)">Add to Favourites</h3>
      <h3 v-on:click="removeFavourite" v-if="this.favourites.includes(location)">Remove Favourite</h3>
      <h3 v-on:click="goToLocation">Get Me Here</h3>
    </div>
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
    }
  }
}
</script>

<style lang="css" scoped>
  #plaque-details {
    display: flex;
    flex-direction: column;
    color: white;
  }

  h3:hover {
    color: lightgrey;
  }
</style>
