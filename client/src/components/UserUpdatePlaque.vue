<template lang="html">
<div>
  <form v-if="!userLocation._id" class="addForm" v-on:submit.prevent="addLocation">
    <input type="text" v-model="title" placeholder="Plaque Title" required>
    <input type="text" v-model="subjects" placeholder="Name of Subject">
    <input type="text" v-model="colour_name" placeholder="Colour"required>
    <textarea rows=10 v-model="inscription" placeholder="Inscription" required></textarea>
    <input type="text" v-model="address" placeholder="Address">
    <input type="submit" value="Submit">
  </form>
  <form v-if="userLocation._id" class="updateForm" v-on:submit.prevent="updateLocation">
    <input type="text" :value="userLocation.title" required>
    <input type="text" :value="userLocation.subjects">
    <input type="text" :value="userLocation.colour_name" required>
    <textarea rows=10 :value="userLocation.inscription" required></textarea>
    <input type="text" :value="userLocation.address">
    <input type="submit" value="Update">
  </form>
</div>
</template>

<script>

import { eventBus } from '@/main.js';
import PlaqueService from '@/services/PlaqueService.js';

export default {
  name: 'user-update',
  data(){
    return {
      title: '',
      subjects: '',
      colour_name: '',
      inscription: '',
      address: ''
    }
  },
  props: ['userLocation'],
  methods: {
    addLocation(location){
      this.userLocation["title"]=this.title
      this.userLocation["subjects"]=this.subjects
      this.userLocation["colour_name"]=this.colour_name
      this.userLocation["inscription"]=this.inscription
      this.userLocation["address"]=this.address
      PlaqueService.postLocations(this.userLocation)
      .then((res) => {
        this.title = this.subjects = this.colour_name = this.inscription = this.address = ""
        this.userLocation.userAdded = false
        eventBus.$emit('location-updated', res)
      })
      eventBus.$emit('option-selected', 'details');
    },
    updateLocation(location){
      console.log(location);
    }


    }

}
</script>

<style lang="css" scoped>


</style>
