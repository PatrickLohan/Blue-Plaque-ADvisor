<template lang="html">
  <div id="favourites-item" v-on:click="goToDetails">
    <hr>
    <li>{{favourite.title | upperCase}}<br />{{favourite.address | capitalize}}<hr></li>
  </div>
</template>

<script>
import {eventBus} from '@/main.js';

export default {
  name: "favourites-item",
  props: ['favourite'],
  methods: {
    goToDetails: function() {
      let location = {
        lat: this.favourite.latitude,
        lng: this.favourite.longitude
      }
      eventBus.$emit('location-selected', location)
      eventBus.$emit('option-selected', 'details')
    }
  }
}
</script>

<style lang="css" scoped>
li{
  text-decoration: none;
  list-style: none;
  text-align: left;
}
</style>
