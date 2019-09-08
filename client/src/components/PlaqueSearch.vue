<template lang="html">
  <div class="">
    <input type="text" v-model="search" placeholder="search for Plaque..." v-on:keyup="searchForPlaque">
  </div>
</template>

<script>
import {eventBus} from '../main.js'
import PlaqueService from '@/components/PlaqueSearch'

export default {
  props: ['locations'],
  data() {
    return {
      "search": "",
      "selectedLocation": null
    }
  },
  methods: {
    searchForPlaque(){
      let foundPlaque = this.locations.find((location) => {
        return location.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
      this.selectedLocation = foundPlaque

      eventBus.$emit('selected-location', this.selectedLocation)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
