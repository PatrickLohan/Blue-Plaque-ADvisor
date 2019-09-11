<template lang="html">
  <div v-if="conditionShow" id="footer-bar">
    <img href="https://github.com/bmac110" src="../assets/github.png" class="github-icon" alt="Billy's github" title="Billy's github">
    <img href="https://github.com/PadraigLeoghain" src="../assets/github.png" class="github-icon" alt="Patrick's github" title="Patrick's github">
    <img href="https://github.com/allan8362" src="../assets/github.png" class="github-icon" alt="Allan's github" title="Allan's github">
    <img href="https://github.com/DianeEugenie" src="../assets/github.png" class="github-icon" alt="Diane's github" title="Diane's github">
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

.github-icon{
  width: 1.5em;
  height: 1.5em;
}

#footer-bar{
  background-color: #FF903F;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
