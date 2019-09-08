<template lang="html">
  <form v-on:submit.prevent>
    <input type="text" v-model="search" placeholder="search for Plaque..." v-on:keyup="searchForPlaque">
    <select v-on:change="handleSelect" v-model="selectedLocation">
      <option disabled value="">Select a location...</option>
      <option v-for="location in locations" :value="location">{{location.title}}</option>
    </select>
  </form>
</template>

<script>
import {eventBus} from '../main.js'
import PlaqueService from '@/services/PlaqueService.js'

export default {
  props: ['locations'],
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

      eventBus.$emit('selected-location', this.selectedLocation)
    },
    handleSelect(){
      this.search = ""
      eventBus.$emit('selected-location', this.selectedLocation)
    }
  }
}
</script>

<style lang="css" scoped>

select {
  width: 20em;
}
</style>
