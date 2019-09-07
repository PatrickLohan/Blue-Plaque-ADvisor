<template lang="html">
  <div id="sidebar-container">
    <div id="sidebar-components">
      <PlaqueFavourites v-if="favourites.length != 0"
      :favourites="favourites">{{favourites}}</PlaqueFavourites>
    </div>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'
import PlaqueFavourites from './PlaqueFavourites'
import PlaqueDetails from './PlaqueDetails'



export default {
  name: 'sidebar-view',
  data(){
    return{
      favourites: ["Yoinks!", "Malarkey"]
    }
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
}
</style>
