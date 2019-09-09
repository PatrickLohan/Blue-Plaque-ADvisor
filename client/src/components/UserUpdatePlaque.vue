<template lang="html">
<div v-if="userLocation.userAdded">
  <form class="updateForm" v-on:submit.prevent="addLocation">
    <input type="text" v-model="title" required>
    <input type="text" v-model="title" required>
    <input type="submit" value="Submit">
  </form>
</div>
</template>

<script>

import { eventBus } from '../main.js';
import PlaqueService from '@/services/PlaqueService.js';

export default {
  name: 'user-update',
  data(){
    return {
      title: ''
    }
  },
  props: ['userLocation'],
  methods: {
    addLocation(location){
      this.userLocation["title"]=this.title
      PlaqueService.postLocations(this.userLocation)
      .then(res => eventBus.$emit('location-added', res))
      }

    }

}
</script>

<style lang="css" scoped>
</style>
