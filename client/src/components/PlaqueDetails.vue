<template lang="html">
  <div id="plaque-details" v-if="location.title">
    <div id="mini-buttons">
      <img v-on:click="addFavourite" v-if="!this.favourites.includes(location)" src="../assets/favourites.png" alt="Add To Favourites" title="Add To Favourites">
      <img v-on:click="removeFavourite" v-if="this.favourites.includes(location)" src="../assets/dislike.png" alt="Remove From Favourites" title="Remove From Favourites">
      <img v-on:click="updateLocation" src="../assets/update.png" alt="Update Location" title="Update Location">
      <img v-on:click="goToLocation" v-if="location.latitude || location.longitude" src="../assets/directions.png" alt="Create Route To Plaque" title="Create Route To Plaque">
      <img v-on:click="arrivedAtLocation" v-if="location.latitude || location.longitude" src="../assets/flag.png" alt="Arrived At Location" title="Arrived At Location">
    </div>
    <p v-if="location.title">{{location.title | upperCase}}</p>
    <p v-if="location.inscription">{{location.inscription | capitalize}}</p>
    <p v-if="location.erected_at">{{location.erected_at}}</p>
    <p v-if="!location.latitude || !location.longitude">No Coordinates For This Plaque</p>
  </div>
</template>

<script>
import PlaqueSearch from '@/components/PlaqueSearch'
import PlaqueService from '@/services/PlaqueService.js'
import VueMap from '@/components/VueMap.vue'
import {eventBus} from '@/main.js'

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

#mini-buttons{
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  cursor: pointer;
}

img{
  width: 2em;
  height: 2em;
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
