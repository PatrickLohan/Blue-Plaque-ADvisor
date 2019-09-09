<template lang="html">
  <div id="glasgowMap">
      {{showLocations()}}
  </div>
</template>

<script>
import {eventBus} from '../main.js';
import PlaqueService from '@/services/PlaqueService'
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

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
      url: 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="https://www.graphhopper.com/">GraphHopper API</a>',
      longitude: "",
      latitude: "",
      userAdded: null
    }
  },
  mounted() {
    this.glasgowMap = L.map('glasgowMap');

    // Listener for clicks on new location
    this.glasgowMap.addEventListener('dblclick', (e) => {
      let coords = [e.latlng.lat, e.latlng.lng]
      this.addLocation(coords)
    });
    //end of Listener
    // Listener for user updated location coming back
    this.glasgowMap.addEventListener(
      eventBus.$on('location-updated', (userLocation) => {
        L.marker([userLocation.latitude, userLocation.longitude]).addTo(this.glasgowMap)
        .bindPopup(userLocation.title + "<br />" + userLocation.address + "</div>", {maxWidth: 200, minWidth: 200, offset: [-121, 138]})
      })
    );
    // end of listener

    this.glasgowMap.setView(this.center, this.zoom);
    this.glasgowMap.options.minZoom = 11;
    L.tileLayer(this.url, {attribution: this.attribution}).addTo(this.glasgowMap);

    // ROUTE SETTER

    let control = L.Routing.control({
      router: new L.Routing.GraphHopper('73834236-5649-4fc6-995f-0587acdd1eb9', {
        urlParameters: {
          vehicle: 'foot'
        }
      })
    }).addTo(this.glasgowMap);

    let beginLocation = {
      lat: this.center[0],
      lng: this.center[1]
    };

    control.spliceWaypoints(0, 1, beginLocation);

    eventBus.$on('route-end', (endLocation) => {

      let endLatLng = {
        lat: endLocation[0],
        lng: endLocation[1]
      }
      control.spliceWaypoints(control.getWaypoints().length - 1, 1, endLatLng)
    });
  }
    // TESTING FOR ROUTE END
  ,
  methods: {
    showLocations(){
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locations[i].latitude || this.locations[i].longitude !== null) {
          L.marker([this.locations[i].latitude, this.locations[i].longitude], {title: this.locations[i].title, alt: this.locations[i].title, riseOnHover: true})
          .addTo(this.glasgowMap)
          .bindPopup("<div id=" + this.locations[i]._id + " class=" + this.locations[i].colour_name + "><b>" + this.locations[i].title + "</b><br />"
          + this.locations[i].address + "</div>", {maxWidth: 200, minWidth: 200, offset: [-121, 138]})
          .on("click", function(marker) {
            let location = marker.latlng;
            eventBus.$emit('location-selected', location)
            eventBus.$emit('option-selected', 'details')
          });
        }
      }
    },

    addLocation(coords) {
      const payload = {
        latitude: coords[0],
        longitude: coords[1],
        userAdded: true
      };
      eventBus.$emit('location-added', payload);
    }

  }
}
</script>

<style lang="css" scoped>
@import "~leaflet/dist/leaflet.css";
@import "../assets/leaflet-routing-machine.css";

#glasgowMap {
  width: 100vw;
  height: 100vh;
}

</style>
