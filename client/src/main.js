import Vue from 'vue';
import App from './App.vue';
import moment from 'moment';

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;

Icon.Default.imagePath = '.';
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


Vue.config.productionTip = false

export const eventBus = new Vue();

Vue.filter(
  'upperCase', function (value){
      if (value) {
        return value.toUpperCase();
      }
})
Vue.filter(
  'capitalize', function (value){
      if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
})
Vue.filter(
  'formatDate', function(value){
  if (value) {
    return moment(String(value)).format('dddd, MMMM Do YYYY')
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
