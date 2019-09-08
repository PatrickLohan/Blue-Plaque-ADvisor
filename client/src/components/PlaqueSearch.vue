<template lang="html">
  <div class="">
    <input type="text" v-model="search" placeholder="search for Plaque..." v-on:keyup="searchForPlaque">
  </div>
</template>

<script>
import {eventBus} from '../main.js'
import PlaqueService from '@/services/PlaqueService.js'

export default {
  // props: ['locations'],
  data() {
    return {
      "search": "",
      "selectedLocation": null
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      PlaqueService.getLocations()
      .then(locations => this.locations = locations);
    },
    searchForPlaque(){
      let foundPlaque = this.locations.find((location) => {
        return location.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
      this.selectedLocation = foundPlaque

      eventBus.$emit('selected-location', this.selectedCountry)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
