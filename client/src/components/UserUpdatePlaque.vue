<template lang="html">
<div id="update-form">
  <form class="updateForm" v-on:submit.prevent="updateLocation">
    <input class="form-item" type="text" v-model="title" value="title" required>
    <input type="text" v-model="subjects" value="subjects">
    <input type="text" v-model="colour_name" value="colour_name" required>
    <textarea rows=10 v-model="inscription" value="inscription" required></textarea>
    <input type="text" v-model="address" value="address">
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
      title: this.userLocation.title,
      subjects: this.userLocation.subjects,
      colour_name: this.userLocation.colour_name,
      inscription: this.userLocation.inscription,
      address: this.userLocation.address,
    }
  },
  props: ['userLocation'],
  methods: {
    updateLocation(location){
      this.userLocation["title"]=this.title
      this.userLocation["subjects"]=this.subjects
      this.userLocation["colour_name"]=this.colour_name
      this.userLocation["inscription"]=this.inscription
      this.userLocation["address"]=this.address
      // PlaqueService.postLocations(this.userLocation)
      // .then((res) => {
      //   this.title = this.subjects = this.colour_name = this.inscription = this.address = ""
      //   this.userLocation.userAdded = false
      //   eventBus.$emit('location-updated', res)
      // })
      console.log(this.userLocation)
      eventBus.$emit('option-selected', 'details');
    }
    }

}
</script>

<style lang="css" scoped>

#update-form{
  margin: auto 0;
  display: flex;
  flex-direction: column;
}

input,
textarea {
  border: 1px dotted grey;
  width: 14vw;
  margin: 5px 0;
}

input[type=submit]{
  background-color: #FFDB3F;
}

</style>
