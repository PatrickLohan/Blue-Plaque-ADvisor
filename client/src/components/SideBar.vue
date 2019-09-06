<template lang="html">
  <div id="sidebar-container">
    <div id="sidebar-components">
      <PlaqueSearch/>
    </div>
  </div>
</template>

<script>
import PlaqueSearch from './PlaqueSearch'


export default {
  name: 'sidebar-view'
}
</script>

<style lang="css" scoped>
#sidebar-components {
  display: flex;
  flex-direction: column;
}
</style>
