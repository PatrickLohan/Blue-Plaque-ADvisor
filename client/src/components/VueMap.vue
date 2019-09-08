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
      center: [55.860497, -4.257916],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      longitude: "",
      latitude: "",
      userAdded: null
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
    this.glasgowMap.options.minZoom = 11;
    L.tileLayer(this.url, {attribution: this.attribution}).addTo(this.glasgowMap);
  },
  methods: {
    showLocations(){
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locations[i].latitude || this.locations[i].longitude !== null) {
          L.marker([this.locations[i].latitude, this.locations[i].longitude], {title: this.locations[i].title, alt: this.locations[i].title, riseOnHover: true})
          .addTo(this.glasgowMap)
          .bindPopup("<div id=" + this.locations[i]._id + " class=" + this.locations[i].colour_name + "><b>" + this.locations[i].title + "</b><br />"
          + this.locations[i].address + "</div>", {maxWidth: 200, minWidth: 200, offset: [-107, 138]})
          .on("click", function(marker) {
            let location = marker.latlng;
            eventBus.$emit('location-selected', location)
          });
        }
      }
    },
    handleClick(e) {
      let location = e.latlng;
      console.log(location);
    },
    addLocation(coords, message) {
      L.marker(coords).addTo(this.glasgowMap)
      .bindPopup(message)

      const payload = {
        latitude: coords[0],
        longitude: coords[1],
        userAdded: true
      };
      PlaqueService.postLocations(payload)
      .then(location => {
        eventBus.$emit('location-added', location);
      });
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
