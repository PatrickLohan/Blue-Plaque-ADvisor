<template lang="html">
  <div id="sidebar-container">
    <MenuBar/>
    <div id="sidebar-components">
      <div id="search-container">
        <PlaqueSearch :locations="locations"/>
      </div>
      <div id="details-container" v-if="this.show === 'details'">
        <PlaqueDetails :location="location" :favourites="favourites"/>
      </div>
      <div id="favourites-container" v-if="this.show === 'favourites'">
        <PlaqueFavourites :favourites="favourites"/>
      </div>
      <div id="home-container" v-if="this.show === 'home'">
        <PlaqueHome/>
      </div>
      <div id="update-container" v-if="this.show === 'update'">
        <UserUpdatePlaque :userLocation="userLocation"/>
      </div>
    </div>
    <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/"         title="Flaticon">www.flaticon.com</a></div>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'
import PlaqueFavourites from './PlaqueFavourites'
import PlaqueDetails from './PlaqueDetails'
import UserUpdatePlaque from './UserUpdatePlaque'
import MenuBar from './MenuBar'
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
    UserUpdatePlaque
  },
  data() {
    return{
      favourites: [],
      userLocation: "",
      show: ""
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
    // eventBus.$on('home-selected', () => {
    //   let showComponent = home
    // }),
    // eventBus.$on('details-selected', () => {
    //   let showComponent = details
    // }),
    // eventBus.$on('favourites-selected', () => {
    //   let showComponent = favourites
    // }),
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
  width: 25em;
  background-color: #477CDE;
}

#sidebar-components {
  padding: 5px;
  margin: 3em;
  color: white;
}

#details-container,
#favourites-container,
#update-container,
#home-container {
  border-style: groove;
  border-radius: 3%;
}

#update-container {
  padding: 5px;
}

#menu-bar{
  margin-top: 10px;
}

</style>
