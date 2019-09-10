<template lang="html">
  <div id="favourites-list">
    <h2>FAVOURITES</h2><hr>
    <PlaqueFavouritesItem v-for="(favourite, index) in this.favourites" :favourite="favourite" :key="index" />
    <h3 v-if="!favourites">Nothing here yet!</h3>
    <h3 v-on:click="planTour">Plan Tour</h3>
    <h3 v-on:click="clearTour">Yay, I'm here</h3>
  </div>
</template>

<script>
import {eventBus} from '@/main.js';

export default {
  name: 'favourites-view',
  props: ['favourites'],
  data() {
    return {
      favouritesTour: []
    }
  },
  components: {
    PlaqueFavouritesItem: () => import('./PlaqueFavouritesItem')
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
    eventBus.$emit('clear-tour');
  }
  }
}
</script>

<style lang="css" scoped>
h2{
  line-height: 12px;
}
</style>
