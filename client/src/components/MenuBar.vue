<template lang="html">
  <div id="menu-bar">
    <img v-on:click="show('home')" id="menu-icon" src="../assets/home.png" alt="Homepage" title="Homepage">
    <img v-on:click="show('details')" id="menu-icon" src="../assets/details.png" alt="Details" title="Details">
    <img v-on:click="show('favourites')" id="menu-icon" src="../assets/favourites.png" alt="Favourites" title="Favourites">
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
  }
}
</script>

<style lang="css" scoped>
#menu-bar {
  display: flex;
  justify-content: space-around;
  background-color: #FF903F;
  align-items: center;
}
#menu-icon{
  width: 3em;
  height: 3em;
  margin: 5px 10px;
  cursor: pointer;
}
</style>
