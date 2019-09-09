<template lang="html">
  <div id="menu-bar">
    <img id="menu-icon" src="../assets/home.png" alt="">
    <img id="menu-icon" src="../assets/details.png" alt="">
    <img id="menu-icon" src="../assets/favourites.png" alt="">
  </div>
</template>

<script>

export default {
  name: 'menu-bar'
}
</script>

<style lang="css" scoped>
#menu-bar {
  display: flex;
  justify-content: space-around;
}
#menu-icon{
  width: 3em;
  height: 3em;
  margin: 5px 10px;
}
</style>
