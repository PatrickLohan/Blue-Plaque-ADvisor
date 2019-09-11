<template lang="html">
  <div id="favourites-list">
    <h3 v-if="!this.favourites.length">No favourites just yet!</h3>
    <h3 v-if="this.favourites.length">FAVOURITES</h3>
    <div id="mini-buttons">
      <img v-on:click="planTour" v-if="this.favourites.length" src="../assets/directions.png" alt="Plan Favourite Tour" title="Plan Favourite Tour">
      <img v-on:click="clearTour" v-if="this.favourites.length" src="../assets/flag.png" alt="Arrived At Location" title="Arrived At Location">
    </div>
    <PlaqueFavouritesItem v-for="(favourite, index) in this.favourites" :favourite="favourite" :key="index" />

  </div>
</template>

<script>
import {eventBus} from '@/main.js';
import PlaqueFavouritesItem from '@/components/PlaqueFavouritesItem';

export default {
  name: 'favourites-view',
  props: ['favourites'],
  data() {
    return {
      favouritesTour: []
    }
  },
  components: {
    PlaqueFavouritesItem
  },
  methods: {
    planTour: function() {
      let filteredFavourites =
      this.favourites.filter(favourite => favourite.latitude && favourite.longitude !== null)

      this.favouritesTour = filteredFavourites

      let tourCoords = this.favouritesTour.map((favourite) => {
        let tourStop = {
          lat: favourite.latitude,
          lng: favourite.longitude
        };

        return tourStop
      })
      eventBus.$emit('tour-locations', tourCoords);
    },
  clearTour: function() {
    eventBus.$emit('tour-deleted');
  }
  }
}
</script>

<style lang="css" scoped>
#favourites-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h3 {
  color: #477CDE;
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
  padding: 1px;
  margin-bottom: 3px;
  cursor: pointer;
}

img:hover {
  border-bottom: 3px solid #477CDE;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  margin-bottom: 0px;
}
</style>
