<template lang="html">
  <div id="menu-bar">
    <div id="main-menu" :class="toggled ? 'hide' : 'show'">
      <img v-on:click="show('home')" id="menu-icon" src="../assets/home.png" alt="Home" title="Home">
      <img v-on:click="show('details')" id="menu-icon" src="../assets/details.png" alt="Details" title="Details">
      <img v-on:click="show('favourites')" id="menu-icon" src="../assets/favourites.png" alt="Favourites" title="Favourites">
    </div>

    <img v-on:click="toggledMenu" :class="toggled ? 'hide' : 'show'" id="menu-toggle" src="../assets/left-arrow.png" alt="Toggle Menu" title="Toggle Menu">
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
      if (!this.toggled) {
        this.toggled = !this.toggled;
        eventBus.$emit('toggle-sidebar-on', 'toggle')
        eventBus.$emit('option-selected', 'none')
      } else if (this.toggled) {
        this.toggled = !this.toggled;
        eventBus.$emit('toggle-sidebar-on', 'toggle')
        eventBus.$emit('option-selected', 'home')
      }

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
  cursor: pointer;
}

#menu-icon:hover, #menu-toggle:hover {
  border-bottom: 3px solid #477CDE;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  margin-bottom: 0px;
  cursor: pointer;
}

#main-menu.show {
  width: 25vw;
}

#main-menu.hide {
  display: none;
}


</style>
