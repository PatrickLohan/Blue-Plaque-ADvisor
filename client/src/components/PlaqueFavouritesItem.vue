<template lang="html">
  <li>{{favourite.title}}</li>
</template>

<script>
export default {
  name: "favourites-item",
  props: ['favourite']
}
</script>

<style lang="css" scoped>
li{
  color: white;
  text-decoration: none;
  list-style: none;
  text-align: left;
}
</style>
