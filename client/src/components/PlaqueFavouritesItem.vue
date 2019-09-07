<template lang="html">
  <li>{{favourite}}</li>
</template>

<script>
export default {
  name: "favourites-item",
  props: ['favourite']
}
</script>

<style lang="css" scoped>
li{
  color: black;
}
</style>
