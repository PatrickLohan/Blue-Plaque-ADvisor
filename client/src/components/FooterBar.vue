<template lang="html">
  <div id="footer-bar">
    <p v-if="conditionShow">footer dummy text</p>
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

#footer-bar{
  background-color: #FF903F;
  padding: 10px;
  text-align: center;
}
</style>
