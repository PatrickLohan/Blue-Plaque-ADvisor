<template lang="html">
  <div id="menu-bar">
    <img v-on:click="show('home')" id="menu-icon" src="../assets/home.png" alt="">
    <img v-on:click="show('details')" id="menu-icon" src="../assets/details.png" alt="">
    <img v-on:click="show('favourites')" id="menu-icon" src="../assets/favourites.png" alt="">
  </div>
</template>

<script>
import {eventBus} from '@/main.js'

export default {
  name: 'menu-bar',
  methods: {
    show: function(show){
      eventBus.$emit('option-selected', show)
    },
    // showHome: function(icon){
    //   eventBus.$emit('home-selected', this.menu-icon)
    // },
    // showDetails: function(icon){
    //   eventBus.$emit('details-selected', this.menu-icon)
    // },
    // showFavourites: function(icon){
    //   eventBus.$emit('favourites-selected', this.menu-icon)
    // }
  }
}
</script>

<style lang="css" scoped>
#menu-bar {
  display: flex;
  justify-content: space-around;
}
#menu-icon{
  width: 3em;
  height: 3em;
  margin: 5px 10px;
}
</style>
