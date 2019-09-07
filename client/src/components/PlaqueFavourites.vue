<template lang="html">
  <div id="favourites-list">
    {{favourites}}
  </div>
</template>

<script>
export default {
  name: 'favourites-view',
  props: ['favourites']
}
</script>

<style lang="css" scoped>

</style>
