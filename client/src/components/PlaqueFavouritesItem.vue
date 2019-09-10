<template lang="html">
  <div id="favourites-item">
    <hr>
    <li>{{favourite.title}}<br>{{favourite.address}}<hr></li>
  </div>
</template>

<script>
export default {
  name: "favourites-item",
  props: ['favourite']
}
</script>

<style lang="css" scoped>
li{
  text-decoration: none;
  list-style: none;
  text-align: left;
}
</style>
