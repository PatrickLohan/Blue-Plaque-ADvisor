<template lang="html">
  <div id="sidebar-container">
    <div id="sidebar-components">
      <PlaqueDetails :location="location" :favourites="favourites"/>
      <PlaqueFavourites :favourites="favourites"/>
      <UserUpdatePlaque :userLocation="userLocation"/>
    </div>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'
import PlaqueFavourites from './PlaqueFavourites'
import PlaqueDetails from './PlaqueDetails'
import UserUpdatePlaque from './UserUpdatePlaque'
import {eventBus} from '@/main.js'



export default {
  name: 'sidebar-view',
  props: ['location'],
  components: {
    PlaqueDetails,
    PlaqueFavourites,
    UserUpdatePlaque
  },
  data() {
    return{
      favourites: [],
      userLocation: ""
    }
  },
  mounted(){
    eventBus.$on('plaque-favourited', (favourite) => {
      this.favourites.push(favourite);
    }),
    eventBus.$on('plaque-defavourited', (favourite) => {
      let index = this.favourites.indexOf(favourite);
      this.favourites.splice(index, 1)
    }),
    eventBus.$on('location-added', (userLocation) => {
      this.userLocation = userLocation;
    })
  }
}
</script>

<style lang="css" scoped>
#sidebar-container{
  width: 25em;
  background-color: #477CDE;
}
#sidebar-components {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

</style>
