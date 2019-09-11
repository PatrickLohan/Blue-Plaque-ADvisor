<template lang="html">
  <div id="plaque-details" v-if="location.title">
    <div id="mini-buttons">
      <img v-on:click="addFavourite" v-if="!this.favourites.includes(location)" src="../assets/favourites.png">
      <img v-on:click="removeFavourite" v-if="this.favourites.includes(location)" src="../assets/dislike.png">
      <img v-on:click="updateLocation" src="../assets/update.png">
      <img v-on:click="goToLocation" v-if="location.latitude || location.longitude" src="../assets/directions.png">
      <img v-on:click="arrivedAtLocation" v-if="location.latitude || location.longitude" src="../assets/flag.png">
      <h4 v-if="!location.latitude || !location.longitude">Oh no! Please add coordinates</h4>
      <h3 v-on:click="moreInfo" v-if="location.people.length">More Info!</h3>
      <h3 v-on:click="deleteLocation(location._id)">Delete</h3>
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
  data() {
    return {
      "furtherInfo": {}
    }
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
    moreInfo: function(){
      // get uri from database for requested plaque
      let moreInfoUrl = this.location.people[0].uri;
      // make it a variable
      let payload = {uri: moreInfoUrl}
      // pass it to our server to get api data back to avoid CORS issue
      fetch('http://localhost:3000/api/plaques/plaque-data', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(data => {
        this.furtherInfo = data
        window.open(this.furtherInfo.wikipedia_url, '_blank')
      })
      // see also PlaqueService.js and create_router.js
    },
    deleteLocation: function(id){
      PlaqueService.deleteLocations(id)
      .then(response =>
      eventBus.$emit('location-deleted', id));
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

#mini-buttons{
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

img{
  width: 1.5em;
  height: 1.5em;
  padding: 1px;
  margin-bottom: 3px;
}

img:hover {
  border-bottom: 3px solid #477CDE;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  margin-bottom: 0px;
}
</style>
