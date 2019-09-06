<template lang="html">
  <div id="glasgowMap">
  </div>
</template>

<script>
import L from 'leafet';

export default {
  name: 'glasgowMap',
  components: {
    L
  }
}
</script>

<style lang="css" scoped>
@import "~leaflet/dist/leaflet.css";

#glasgowMap {
  width: 100vw;
  height: 100vh;

}
</style>
