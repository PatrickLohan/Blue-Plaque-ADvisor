<template lang="html">
  <div id="menu-bar">
    <div id="main-menu" :class="toggled ? 'hide' : 'show'">


    <img v-on:click="show('home')" id="menu-icon" src="../assets/home.png" alt="">
    <img v-on:click="show('details')" id="menu-icon" src="../assets/details.png" alt="">
    <img v-on:click="show('favourites')" id="menu-icon" src="../assets/favourites.png" alt="">
    </div>
    <!-- <div id="menu-toggle"> -->
      <img v-on:click="toggledMenu" :class="toggled ? 'hide' : 'show'" id="menu-toggle" src="../assets/left-arrow.png" alt="">
    <!-- </div> -->
  </div>
</template>

<script>
import {eventBus} from '@/main.js'

export default {
  name: 'menu-bar',
  data() {
    return{
      toggled: false
    }
  },
  methods: {
    show: function(show){
      eventBus.$emit('option-selected', show)
    },
    toggledMenu(){
      this.toggled = !this.toggled;
      eventBus.$emit('toggle-sidebar-on', 'toggle')
      eventBus.$emit('option-selected', 'none')
    }
  }
}
</script>

<style lang="css" scoped>
#menu-bar {
  display: flex;
  justify-content: space-around;
  background-color: #FF903F;
  align-items: center;
}
#menu-icon{
  width: 3em;
  height: 3em;
  margin: 5px 10px;
}

#menu-icon:hover {
  border-bottom: 3px solid #477CDE;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  margin-bottom: 0px;
}

#main-menu.show {
  width: 25vw;
}

#main-menu.hide {
  display: none;
}


</style>
