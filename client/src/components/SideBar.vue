<template lang="html">
  <div id="sidebar-container">
    <MenuBar/>
    <div id="sidebar-components">
      <PlaqueSearch :locations="locations"/>
      <div id="details-container">
        <PlaqueDetails :location="location" :favourites="favourites"/>
      </div>
      <div id="favourites-container">
        <PlaqueFavourites :favourites="favourites"/>
      </div>
      <div id="update-container" v-if="userLocation.userAdded">
        <UserUpdatePlaque :userLocation="userLocation"/>
      </div>

    </div>
    <!-- <a href="javascript:void(0)" id="sidebar-toggle" v-on:click="closeNav">&times;</a> -->
  </div>
</template>

<script>

import SidebarToggle from './SidebarToggle'
import PlaqueSearch from './PlaqueSearch'
import PlaqueFavourites from './PlaqueFavourites'
import PlaqueDetails from './PlaqueDetails'
import UserUpdatePlaque from './UserUpdatePlaque'
import MenuBar from './MenuBar'
import {eventBus} from '@/main.js'



export default {
  name: 'sidebar-view',
  props: ['locations', 'location'],
  components: {
    MenuBar,
    PlaqueDetails,
    PlaqueFavourites,
    PlaqueSearch,
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
    }),
    eventBus.$on('toggle-sidebar-on', () => {
      document.getElementById("sidebar-container", "sidebar-components").style.width = "4em";
    })
  },
  methods: {
    openNav() {
      document.getElementById("sidebar-container").style.width = "20em";
    },
    closeNav() {
      document.getElementById("sidebar-container").style.width = "5em";
    }
  }

}
</script>

<style lang="css" scoped>

#sidebar-toggle {
  /* position: absolute;
  right: 400px; */
}

#sidebar-container{
  /* z-index: 999; */
  width: 25em;
  background-color: #477CDE;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
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
#favourites-container,
#update-container {
  border-style: groove;
  border-radius: 3%;
}

#update-container {
  padding: 5px;
}

.closebtn {

}


</style>
