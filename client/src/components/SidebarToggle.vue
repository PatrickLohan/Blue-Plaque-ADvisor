<template lang="html">
  <!-- <h1 v-on:click="toggleSidebar">HELLO</h1> -->
</template>

<script>
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
  position: absolute;
  right: 400px;
  z-index: 998;
}
</style>
