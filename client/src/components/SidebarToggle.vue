<template lang="html">
  <h1 v-on:click="toggleSidebar">HELLO</h1>
</template>

<script>
import {eventBus} from '../main.js'

export default {
  methods: {
    toggleSidebar: function() {
      eventBus.$emit('toggle-sidebar-on')
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  height: 2em;
  width: 3em;
  position: absolute;
  right: 400px;
  z-index: 998;
}
</style>
