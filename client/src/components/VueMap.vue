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

    // TESTING FOR ROUTE START
    let control = L.Routing.control({}).addTo(this.glasgowMap)

    function createButton(label, container) {
      let btn = L.DomUtil.create('button', 'routes', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    };

    this.glasgowMap.on('contextmenu', (e) => {

      let container = L.DomUtil.create('div');
      let begin = createButton('Select Startpoint', container);
      let end = createButton('Select Endpoint', container);

      L.popup({className: 'route-setter'})
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(this.glasgowMap);

      L.DomEvent.on(begin, 'click', () => {
        control.spliceWaypoints(0, 1, e.latlng)
        this.glasgowMap.closePopup()
      })

      L.DomEvent.on(end, 'click', () => {
         control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng)
         this.glasgowMap.closePopup()})

    })}



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
          });
        }
      }
    },
    // handleClick(e) {
    //   if (e) {
    //     let location = e.latlng;
    //     console.log(location);
    //   }
    // },
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
