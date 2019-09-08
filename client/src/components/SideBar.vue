<template lang="html">
  <div id="sidebar-container">
    <div id="sidebar-components">
<<<<<<< HEAD
      <PlaqueFavourites v-if="favourites.length != 0" :favourites="favourites"/>
      <PlaqueDetails :location="location"/>
=======
      <PlaqueFavourites :favourites="favourites"/>
>>>>>>> develop
    </div>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'
import PlaqueFavourites from './PlaqueFavourites'
import PlaqueDetails from './PlaqueDetails'
<<<<<<< HEAD
import {eventBus} from '../main.js'
=======
import {eventBus} from '@/main.js'
>>>>>>> develop



export default {
  name: 'sidebar-view',
  props: ['location'],
  components: {
    PlaqueFavourites,
    PlaqueDetails
  },
  data() {
    return{
      favourites: ["Yoinks!", "Malarkey!"]
    }
  },
  mounted(){
    eventBus.$on('plaque-favourited', (favourite) => {
      this.favourites.push(favourite);
    }),
    eventBus.$on('plaque-defavourited', (favourite) => {
      let index = this.favourites.indexOf(favourite);
      this.favourites.splice(index, 1)
    })
  }
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
  background-color: white;
  margin: 20px;
}

</style>
