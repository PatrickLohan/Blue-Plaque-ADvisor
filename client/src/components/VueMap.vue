<template lang="html">
  <div id="glasgowMap">
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'glasgowMap',
  components: {
    L
  },
  data() {
  return {
    zoom: 12,
    center: [55.86279, -4.25424],
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    geojsonFeature: {
          "type": "Feature",
          "properties": {
            "name": "Coors Field",
            "amenity": "Baseball Stadium",
            "popupContent": "This is where the Rockies play!"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [55.86047760236636, -4.248962402343751]
          }
      }

    }
  },
  mounted() {
    this.glasgowMap = L.map('glasgowMap');
    this.glasgowMap.addEventListener('click', (e) => {
      let coords = [e.latlng.lat, e.latlng.lng]
      this.addMarker(coords, `Lat: ${coords[0]}, Lng: ${coords[1]} `)
    });
    this.glasgowMap.setView(this.center, this.zoom);
    L.tileLayer(this.url, {attribution: this.attribution}).addTo(this.glasgowMap);
    this.addMarker([55.865332,-4.258086], "Codeclan Glasgow");
    this.addMarker([55.946910,-3.202068], "Codeclan Edinburgh");
    this.addMarker(this.geojsonFeature.geometry.coordinates, this.geojsonFeature.properties.name);
  },
  methods: {
    addMarker(coords, message){
      L.marker(coords).addTo(this.glasgowMap)
      .bindPopup("<b>" + message + "</b>" + "<br/><button type='button' @click='showMessage()'>Show More</button><div class='popupMessageHidden'>I am a popup.</div>", {maxWidth: 200, minWidth: 200})

      function showMessage(marker) {

        let popup = this.getPopup();
        let content = popup.getContent();

        if (content.includes("popupMessageHidden")) {
          let newContent = content.replace(/popupMessageHidden/i, "popupMessage");
          popup.setContent(newContent);
          popup.update();
        } else {
          let newContent = content.replace(/popupMessage/i, "popupMessageHidden");
          popup.setContent(newContent);
          popup.update();
        }
      }
    }
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
