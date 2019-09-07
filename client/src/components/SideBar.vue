<template lang="html">
  <div id="sidebar-container">
    <div id="sidebar-components">
      <PlaqueFavourites v-if="favourites.length != 0" :favourites="favourites"/>
      <PlaqueDetails :location="location"/>
    </div>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'
import PlaqueFavourites from './PlaqueFavourites'
import PlaqueDetails from './PlaqueDetails'
import {eventBus} from '../main.js'



export default {
  name: 'sidebar-view',
  props: ['location'],
  components: {
    PlaqueFavourites,
    PlaqueDetails
  },
  data() {
    return{
      favourites: ["Yoinks", "Malarkey"]
    }
  },
}
</script>

<style lang="css" scoped>
#sidebar-container{
  width: 20vw;
  background-color: #424242;
  color: white;
}
#sidebar-components {
  display: flex;
  flex-direction: column;
}

</style>
