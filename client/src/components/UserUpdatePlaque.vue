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
      updatedLocation: {}
    }
  },
  props: ['userLocation'],
  methods: {
    updateLocation(location){
      this.updatedLocation["title"]=this.title
      this.updatedLocation["subjects"]=this.subjects
      this.updatedLocation["colour_name"]=this.colour_name
      this.updatedLocation["inscription"]=this.inscription
      this.updatedLocation["address"]=this.address
      PlaqueService.updateLocation(this.userLocation._id, this.updatedLocation)
      .then((res) => {
        this.title = this.subjects = this.colour_name = this.inscription = this.address = ""
        eventBus.$emit('location-updated', res)
      })
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
