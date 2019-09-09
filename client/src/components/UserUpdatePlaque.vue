<template lang="html">
<div v-if="userLocation.userAdded">
  <form class="updateForm" v-on:submit.prevent="addLocation">
    <input type="text" v-model="title" placeholder="Plaque Title"required>
    <input type="text" v-model="colour_name" placeholder="Colour"required>
    <input type="text" v-model="inscription" placeholder="Inscription">
    <input type="text" v-model="address" placeholder="Address">
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
      title: '',
      colour_name: '',
      inscription: '',
      address: ''
    }
  },
  props: ['userLocation'],
  methods: {
    addLocation(location){
      this.userLocation["title"]=this.title
      this.userLocation["colour_name"]=this.colour_name
      this.userLocation["inscription"]=this.inscription
      this.userLocation["address"]=this.address
      PlaqueService.postLocations(this.userLocation)
      .then(res => eventBus.$emit('location-added', res))
      this.title = this.colour_name = this.inscription = this.address = ""
    }


    }

}
</script>

<style lang="css" scoped>


</style>
