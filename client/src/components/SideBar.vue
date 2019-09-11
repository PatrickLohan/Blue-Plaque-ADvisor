<template lang="html">
  <!-- toggle sidebar menu -->
  <div id="sidebar-container" :class="toggled ? 'hide' : 'show'" v-on:click="toggleMenu">
    <div id="top-bar">
    <MenuBar />
    </div>

    <div id="search-container" v-if="conditionShow">
      <PlaqueSearch :locations="locations" />
    </div>

    <div id="sidebar-components" v-if="conditionShow">
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
        <UserUpdatePlaque v-if="userLocation._id" :userLocation="userLocation"/>
        <UserAddPlaque v-if="!userLocation._id" :userLocation="userLocation"/>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>

import PlaqueSearch from '@/components/PlaqueSearch'
import PlaqueFavourites from '@/components/PlaqueFavourites'
import PlaqueDetails from '@/components/PlaqueDetails'
import UserUpdatePlaque from '@/components/UserUpdatePlaque'
import UserAddPlaque from '@/components/UserAddPlaque'
import MenuBar from '@/components/MenuBar'
import FooterBar from '@/components/FooterBar'
import PlaqueHome from '@/components/PlaqueHome'
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
    UserAddPlaque,
    FooterBar
  },
  data() {
    return{
      favourites: [],
      userLocation: "",
      show: null,
      toggled: false
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
    eventBus.$on('toggle-sidebar-on', (toggle) => {
      this.toggled = !this.toggled;
    }),
    eventBus.$on('show-toggle', (value) => {
      this.toggled = value;
    }),
    eventBus.$on('update-location', (userLocation) => {
      this.userLocation = userLocation;
    }),
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
        case 'none':
          this.show = 'none';
          break;
      }
    })
  },
  methods: {
    toggleMenu: function() {
      eventBus.$emit('move-toggle-button')
    }
  },
  computed: {
    conditionShow(){
      this.show;
      return this.show === 'details' || this.show === 'home' || this.show === 'favourites' || this.show === 'update' || this.show === null;
    }
  }

}
</script>

<style lang="css" scoped>

#sidebar-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25em;
  height: 100vh;
  background-color: #477CDE;
  display: flex;
  flex-direction: column;
}

#sidebar-components {
  padding: 1px 5px;
  margin: 0 2vw;
  background-color: #E5EDFB;
  color: black;
  border-radius: 3%;
  display: flex;
  justify-content: space-between;
}

#details-container,
#favourites-container,
#update-container,
#home-container {
  height: 60vh;
  padding: 5px;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: flex-start;
}

#search-container{
  align-self: center;
}

MenuBar{
  height: 10vh;
}

FooterBar{
  height: 10vh;
}

#sidebar-container.show {
  width: 25vw;
  transition: 0.3s;
}

#sidebar-container.hide {
  width: 5vw;
  transition: 0.3s;
}

#empty-container {
  display: none;
  z-index: 999;
}

</style>
