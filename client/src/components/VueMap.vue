<template lang="html">
  <div id="glasgowMap">
    {{showLocations(this.locations)}}
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
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      myLongitude: null,
      myLatitude: null
    }
  },
  mounted() {
    this.glasgowMap = L.map('glasgowMap');

    // Listener for clicks on new location
    this.glasgowMap.addEventListener('click', (e) => {
      let coords = [e.latlng.lat, e.latlng.lng]
      this.addLocation(coords, `Lat: ${coords[0]}, Lng: ${coords[1]} `)
    });
    //end of Listener

    this.glasgowMap.setView(this.center, this.zoom);
    L.tileLayer(this.url, {attribution: this.attribution}).addTo(this.glasgowMap);
  },
  methods: {
    showLocations(){
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locations[i].latitude || this.locations[i].longitude !== null) {
          L.marker([this.locations[i].latitude, this.locations[i].longitude], {title: this.locations[i].subjects, alt: this.locations[i].title})
          .addTo(this.glasgowMap)
          .bindPopup("<div id=" + this.locations[i]._id + " @click='handleClick'><b>" + this.locations[i].title + "</b><br />"
          + this.locations[i].address + "</div>", {maxWidth: 200, minWidth: 200})
          .on("click", function(e) {
            let location = e.latlng;
            //console.log(location.lat); // just the value
            //console.log(location.lng); // just the value
            Object.values(location); // returns [55.86339, -4.25607]
            eventBus.$emit('location-selected', location)
          })


        }
      }
    },
    handleClick(e) {
      let location = e.latlng;
      console.log(location);
    },
    addLocation(coords, message) {
      L.marker(coords).addTo(this.map)
      .bindPopup(message)
      this.myLongitude = coords[0];
      this.myLatitude = coords[1];
      console.log('myLongitude:', myLongitude);
      console.log('myLatitude:', myLatitude);
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
