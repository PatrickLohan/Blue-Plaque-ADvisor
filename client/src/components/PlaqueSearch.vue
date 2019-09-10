<template lang="html">
  <form v-on:submit.prevent>
    <input type="text" v-model="search" placeholder="search for Plaque..." v-on:keyup="searchForPlaque">
    <select v-on:change="handleSelect" v-model="selectedLocation">
      <option disabled value="">Select a location...</option>
      <option v-for="location in locations" :value="location">{{location.title | upperCase}}</option>
    </select>
  </form>
</template>

<script>
import {eventBus} from '@/main.js';

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
      eventBus.$emit('option-selected', 'details')
    },
    handleSelect(){
      this.search = ""
      eventBus.$emit('selected-location', this.selectedLocation)
      eventBus.$emit('option-selected', 'details')
    }
  }
}
</script>

<style lang="css" scoped>

form{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

input, select{
  width: 14vw;
  cursor: pointer;
}


</style>
