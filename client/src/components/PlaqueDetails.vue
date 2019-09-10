<template lang="html">
  <div id="plaque-details" v-if="location.title">
    <p>{{location.title}}</p>
    <p>{{location.inscription}}</p>
    <p>{{location.erected_at}}</p>
    <div id="favourites button">
      <h3 v-on:click="addFavourite" v-if="!this.favourites.includes(location)">Add to Favourites</h3>
      <h3 v-on:click="removeFavourite" v-if="this.favourites.includes(location)">Remove Favourite</h3>
      <!-- //Can we just open new tab with uri/url within the 'html' element or do we need a function? -->
      <h3 v-on:click="updateLocation">Update Details</h3>
      <h3 v-on:click="moreInfo">More Info!</h3>
      <h3 v-on:click="goToLocation" v-if="location.latitude || location.longitude">Get Me Here</h3>
      <h4 v-if="!location.latitude || !location.longitude">Oh no! Please add coordinates</h4>
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
    },
    updateLocation: function(location){
      eventBus.$emit('update-location', this.location);
      eventBus.$emit('option-selected', 'update');
    },
    moreInfo: function(location){
    let moreInfoUrl = this.location.people[0].uri;
    let payload = {uri: moreInfoUrl}
    fetch('http://localhost:3000/api/plaques/plaque-data', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
  })
      .then(res => res.json())
      .then(data => console.log(data))

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
</style>
