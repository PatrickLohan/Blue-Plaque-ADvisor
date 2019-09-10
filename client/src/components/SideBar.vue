<template lang="html">
  <div id="sidebar-container">
    <MenuBar/>
    <div id="search-container">
      <PlaqueSearch :locations="locations"/>
    </div>
    <div id="sidebar-components">
      <div id="details-container" v-if="this.show === 'details'">
        <PlaqueDetails :location="location" :favourites="favourites"/>
      </div>
      <div id="favourites-container" v-if="this.show === 'favourites'">
        <PlaqueFavourites :favourites="favourites"/>
      </div>
      <div id="home-container" v-if="this.show === 'home' || this.show === null">
        <PlaqueHome/>
      </div>
      <div id="update-container" v-if="this.show === 'update'">
        <UserUpdatePlaque :userLocation="userLocation"/>
      </div>
    </div>
    <FooterBar/>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'
import PlaqueFavourites from './PlaqueFavourites'
import PlaqueDetails from './PlaqueDetails'
import UserUpdatePlaque from './UserUpdatePlaque'
import MenuBar from './MenuBar'
import FooterBar from './FooterBar'
import PlaqueHome from './PlaqueHome'
import {eventBus} from '@/main.js'



export default {
  name: 'sidebar-view',
  props: ['locations', 'location'],
  components: {
    MenuBar,
    PlaqueHome,
    PlaqueDetails,
    PlaqueFavourites,
    PlaqueSearch,
    UserUpdatePlaque,
    FooterBar
  },
  data() {
    return{
      favourites: [],
      userLocation: "",
      show: null
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
    }),
    eventBus.$on('update-location', (userLocation) => {
      this.userLocation = userLocation;
    })
    eventBus.$on('option-selected', (value) => {
      switch (value) {
        case 'home':
          this.show = 'home';
          break;
        case 'details':
          this.show = 'details';
          break;
        case 'favourites':
          this.show = 'favourites';
          break;
        case 'update':
          this.show = 'update';
          break;


      }
    })
  }
}
</script>

<style lang="css" scoped>
#sidebar-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  width: 25vw;
  height: 100vh;
  background-color: #477CDE;
}

/* #search-container{
  margin: 5px 20px;
  width: 20vw;
} */

#sidebar-components {
  padding: 1px 5px;
  margin: 0 3vw;
  background-color: white;
  color: black;
  border-style: groove;
  border-radius: 3%;
}

#details-container,
#favourites-container,
#update-container,
#home-container {
  height: 50vh;
  padding: 10px;
  overflow: auto;
}

#update-container {
  padding: 5px;
}

#search-container{
  width: 10vw;
  align-self: center;
}

#menu-bar{
  height: 10vh;
}

FooterBar{
  height: 10vh;
}

</style>
