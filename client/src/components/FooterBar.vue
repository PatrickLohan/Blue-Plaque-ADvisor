<template lang="html">
  <div v-if="conditionShow" id="footer-bar">
    <p>Github links: </p>
    <a href="https://github.com/bmac110">Billy</a>
    <a href="https://github.com/PadraigLeoghain">Patrick</a>
    <a href="https://github.com/allan8362">Allan</a>
    <a href="https://github.com/DianeEugenie">Diane</a>
  </div>
</template>

<script>
import {eventBus} from "@/main.js";

export default {
  data(){
    return {
      show: null
    }
  },
  mounted(){
    eventBus.$on('option-selected', (value) => {
      this.show = value
    })
  },
  computed: {
    conditionShow(){
      this.show;
      return this.show === 'details' || this.show === 'home' || this.show === 'favourites' || this.show === 'update' || this.show === null;
    }
  }
}
</script>

<style lang="css" scoped>
*{
  font-size: 10px;
}
#footer-bar{
  background-color: #FF903F;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
