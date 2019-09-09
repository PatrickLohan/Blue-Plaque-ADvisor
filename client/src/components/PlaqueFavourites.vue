<template lang="html">
  <div id="favourites-list">
    <PlaqueFavouritesItem v-for="(favourite, index) in this.favourites" :favourite="favourite" :key="index" />
  </div>
</template>

<script>
export default {
  name: 'favourites-view',
  props: ['favourites'],
  components: {
    PlaqueFavouritesItem: () => import('./PlaqueFavouritesItem')
  },
}
</script>

<style lang="css" scoped>
</style>
