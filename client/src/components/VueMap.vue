<template lang="html">
  <div id="glasgowMap">
      {{showLocations()}}
  </div>
</template>

<script>
import {eventBus} from '../main.js';
import PlaqueService from '@/services/PlaqueService'
import L from 'leaflet';

export default {
  name: 'glasgowMap',
  components: {
    L
  },
  props: ['locations'],
  data() {
    return {
      zoom: 12,
      center: [55.86279, -4.25424],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted() {
    this.glasgowMap = L.map('glasgowMap');
    // this.glasgowMap.addEventListener('click', (e) => {
    //   let coords = [e.latlng.lat, e.latlng.lng]
    //   this.addMarker(coords, `Lat: ${coords[0]}, Lng: ${coords[1]} `)
    // });
    this.glasgowMap.setView(this.center, this.zoom);
    this.glasgowMap.options.minZoom = 11;
    L.tileLayer(this.url, {attribution: this.attribution}).addTo(this.glasgowMap);
  },
  methods: {
    showLocations(){
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locations[i].latitude || this.locations[i].longitude !== null) {
          L.marker([this.locations[i].latitude, this.locations[i].longitude], {title: this.locations[i].subjects, alt: this.locations[i].title})
          .addTo(this.glasgowMap)
          .bindPopup("<div id=" + this.locations[i]._id + " @click='handleClick'><b>" + this.locations[i].title + "</b><br />"
          + this.locations[i].address + "</div>", {maxWidth: 200, minWidth: 200, offset: [-107, 138]})
          .on("click", function(marker) {
            let location = marker.latlng;
            eventBus.$emit('location-selected', location)
          })
        }
      }
    }



    // function showMessage(marker) {
    //
    //   let popup = this.getPopup();
    //   let content = popup.getContent();
    //
    //   if (content.includes("popupMessageHidden")) {
    //     let newContent = content.replace(/popupMessageHidden/i, "popupMessage");
    //     popup.setContent(newContent);
    //     popup.update();
    //   } else {
    //     let newContent = content.replace(/popupMessage/i, "popupMessageHidden");
    //     popup.setContent(newContent);
    //     popup.update();
    //   }

  }

}
</script>

<style lang="css" scoped>
@import "~leaflet/dist/leaflet.css";

#glasgowMap {
  width: 100vw;
  height: 100vh;
}

</style>
