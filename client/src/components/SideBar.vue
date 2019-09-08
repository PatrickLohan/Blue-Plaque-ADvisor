<template lang="html">
  <div id="sidebar-container">
    <div id="sidebar-components">
      <PlaqueDetails :location="location" :favourites="favourites"/>
      <PlaqueFavourites :favourites="favourites"/>
    </div>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'
import PlaqueFavourites from './PlaqueFavourites'
import PlaqueDetails from './PlaqueDetails'
import {eventBus} from '@/main.js'



export default {
  name: 'sidebar-view',
  props: ['location'],
  components: {
    PlaqueDetails,
    PlaqueFavourites
  },
  data() {
    return{
      favourites: []
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
  width: 25em;
  background-color: #477CDE;
}
#sidebar-components {
  display: flex;
  flex-direction: column;
  margin: 2em;
}

</style>
