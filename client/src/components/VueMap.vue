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
      },
      plaques: [
        {id:39209,
          "erected_at":null,"latitude":55.86282,"longitude":-4.24652,"updated_at":"2015-03-16T12:57:31.708Z","inscription":"Thomas Graham (1805-1869) Born in Glasgow and Professor of Chemistry at Anderson’s University (now University of Strathclyde) from 1830-1837. His famous contributions to Science were Graham’s Law of Diffusion and his pioneering work on dialysis. He founded the Chemical Society of London in 1841, and became Master of the Mint. He is commemorated by this building and by a statue in George Square.","is_current":true,"uri":"http://openplaques.org/plaques/39209","title":"Thomas Graham blue plaque","address":"295 Cathedral Street","subjects":"Thomas Graham","colour_name":"blue","machine_tag":"openplaques:id=39209","geolocated":true,"photographed":false,"thumbnail_url":null,"photos":[],"organisations":[{"name":"Royal Society of Chemistry","uri":"https://openplaques.org/organisations/royal_society_of_chemistry.json"}],"language":{"name":"English","alpha2":"en"},"area":{"name":"Glasgow","uri":"http://openplaques.org/places/gb/areas/glasgow.json","country":{"name":"United Kingdom","alpha2":"gb","uri":"http://openplaques.org/places/gb.json"}},"people":[{"uri":"http://openplaques.org/people/10075.json","full_name":"Thomas Graham FRS FRSE"}],"see_also":[]},
          {id:28128,"erected_at":null,"latitude":55.85778,"longitude":-4.25029,"updated_at":"2013-10-20T13:32:14.027Z","inscription":"Robert Burns lodged here when this building was the Black Bull Inn when he visited Glasgow June 1787, February and March 1788","is_current":true,"uri":"http://openplaques.org/plaques/28128","title":"Robert Burns stone plaque","address":"Virginia Street, G2 8AA","subjects":"Robert Burns","colour_name":"stone","machine_tag":"openplaques:id=28128","geolocated":true,"photographed":false,"thumbnail_url":null,"photos":[],"organisations":[],"language":{"name":"English","alpha2":"en"},"area":{"name":"Glasgow","uri":"http://openplaques.org/places/gb/areas/glasgow.json","country":{"name":"United Kingdom","alpha2":"gb","uri":"http://openplaques.org/places/gb.json"}},"people":[{"uri":"http://openplaques.org/people/3266.json","full_name":"Robert Burns"}],"see_also":[{"uri":"http://openplaques.org/plaques/1658"},{"uri":"http://openplaques.org/plaques/3564"},{"uri":"http://openplaques.org/plaques/5828"},{"uri":"http://openplaques.org/plaques/5830"},{"uri":"http://openplaques.org/plaques/5832"},{"uri":"http://openplaques.org/plaques/5834"},{"uri":"http://openplaques.org/plaques/5836"},{"uri":"http://openplaques.org/plaques/8382"},{"uri":"http://openplaques.org/plaques/9780"},{"uri":"http://openplaques.org/plaques/10299"},{"uri":"http://openplaques.org/plaques/11821"},{"uri":"http://openplaques.org/plaques/28139"},{"uri":"http://openplaques.org/plaques/28149"},{"uri":"http://openplaques.org/plaques/31402"},{"uri":"http://openplaques.org/plaques/39050"},{"uri":"http://openplaques.org/plaques/40479"},{"uri":"http://openplaques.org/plaques/40483"},{"uri":"http://openplaques.org/plaques/42586"},{"uri":"http://openplaques.org/plaques/43725"},{"uri":"http://openplaques.org/plaques/50852"}]},
          {id:11130,"erected_at":null,"latitude":55.8364,"longitude":-4.27296,"updated_at":"2012-08-11T13:09:32.007Z","inscription":"Charles Rennie Mackintosh","is_current":true,"uri":"http://openplaques.org/plaques/11130","title":"Charles Rennie Mackintosh brushed metal plaque","address":"15 Regent Park Square, G41 2AF","subjects":"Charles Rennie Mackintosh","colour_name":"brushed metal","machine_tag":"openplaques:id=11130","geolocated":true,"photographed":false,"thumbnail_url":null,"photos":[],"organisations":[],"language":{"name":"English","alpha2":"en"},"area":{"name":"Glasgow","uri":"http://openplaques.org/places/gb/areas/glasgow.json","country":{"name":"United Kingdom","alpha2":"gb","uri":"http://openplaques.org/places/gb.json"}},"people":[{"uri":"http://openplaques.org/people/4358.json","full_name":"Charles Rennie Mackintosh"}],"see_also":[{"uri":"http://openplaques.org/plaques/2738"},{"uri":"http://openplaques.org/plaques/13076"},{"uri":"http://openplaques.org/plaques/13078"},{"uri":"http://openplaques.org/plaques/28052"},{"uri":"http://openplaques.org/plaques/28053"},{"uri":"http://openplaques.org/plaques/28137"}]}
        ]
      }
    },
    mounted() {
      this.glasgowMap = L.map('glasgowMap');
      // this.glasgowMap.addEventListener('click', (e) => {
      //   let coords = [e.latlng.lat, e.latlng.lng]
      //   this.addMarker(coords, `Lat: ${coords[0]}, Lng: ${coords[1]} `)
      // });
      this.glasgowMap.setView(this.center, this.zoom);
      L.tileLayer(this.url, {attribution: this.attribution}).addTo(this.glasgowMap);
      // this.addMarker([55.865332,-4.258086], "Codeclan Glasgow");
      // this.addMarker([55.946910,-3.202068], "Codeclan Edinburgh");
      // this.addMarker(this.geojsonFeature.geometry.coordinates, this.geojsonFeature.properties.name);
      // for (let i = 0; i < this.plaques.length; i++) {
      //   this.addMarker([this.plaques[i].latitude, this.plaques[i].longitude], this.plaques[i].title);
      // };
      this.showLocations(this.plaques);


    },
    methods: {
      // addMarker(coords, message){
      //   L.marker(coords).addTo(this.glasgowMap)
      // .bindPopup("<b>" + message + "</b>" + "<br/><button type='button' @click='showMessage()'>Show More</button><div class='popupMessageHidden'>I am a popup.</div>", {maxWidth: 200, minWidth: 200}) },
      showLocations(plaques){
        for (let i = 0; i < this.plaques.length; i++) {
          L.marker([this.plaques[i].latitude, this.plaques[i].longitude])
          .addTo(this.glasgowMap)
          .bindPopup("<b>" + this.plaques[i].title + "</b><br />"
          + this.plaques[i].address, {maxWidth: 200, minWidth: 200})
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

#logoContainer {
    position: static;
    z-index: 1;
    top: 15px;
    left: 15px;
}

</style>
