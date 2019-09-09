<template lang="html">
  <div id="sidebar-container">
    <div id="sidebar-components">
      <PlaqueSearch :locations="locations"/>
      <div id="details-container">
        <PlaqueDetails :location="location" :favourites="favourites"/>
      </div>
      <div id="favourites-container">
        <PlaqueFavourites :favourites="favourites"/>
      </div>
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
  props: ['locations', 'location'],
  components: {
    PlaqueDetails,
    PlaqueFavourites,
    PlaqueSearch
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
  justify-content: space-between;
  padding: 5px;
  margin: 3em;
  color: white;
}

#details-container,
#favourites-container {
  border-style: groove;
  border-radius: 3%;
}

</style>
