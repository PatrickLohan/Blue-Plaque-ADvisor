<template lang="html">
<div v-if="userLocation.userAdded">
  <p>User Update loading....</p>
</div>
</template>

<script>

import { eventBus } from '../main.js';

export default {
  name: 'user-update',
  props: ['userLocation']
}
</script>

<style lang="css" scoped>
</style>
