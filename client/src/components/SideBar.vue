<template lang="html">
  <div id="sidebar-container">
    <div id="sidebar-components">
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
  components: {
    PlaqueFavourites
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
}
#sidebar-components {
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 20px;
}

</style>
