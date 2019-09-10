<!-- <template lang="html">
  <h1 v-on:click="toggleSidebar">HELLO</h1>
</template>

<script>
import {eventBus} from '../main.js'

export default {
  mounted(){
    eventBus.$on('move-toggle-button', () => {
      document.getElementById("h1").style.width = "50em";
    })
  },
  methods: {
    toggleSidebar: function() {
      eventBus.$emit('toggle-sidebar-on', 'toggle')
    }
  }
} -->
</script>

<style lang="css" scoped>
h1 {
  display: flex;
  position: absolute;
  right: 740px;
  bottom: 600px;
  z-index: 998;
}
</style>
