<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import {mapMutations} from "vuex";

export default {
  name: "Map",

  mounted() {
    fetch(`./metro.json`)
        .then(response => response.json())
        .then((response) => {
          this.setStations(response)
        })
    this.initMap()
  },
  methods: {
    ...mapMutations([
      'setStations'
    ]),
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0eWxvcm55IiwiYSI6ImNrdnNhZDFjcmIxczgyb3M3azl6ZG8xamEifQ.egE0UVDX4gVCMuHly5a5gw';
      // const geojson = {
      //   'type': 'FeatureCollection',
      //   'features': [
      //     {
      //       'type': 'Feature',
      //       'geometry': {
      //         'type': 'Point',
      //         'coordinates': [
      //           37.6030121, 55.88387
      //         ]
      //       },
      //       'properties': {
      //         name: 'Бибирево'
      //       },
      //     },
      //     {
      //       'type': 'Feature',
      //       'geometry': {
      //         'type': 'Point',
      //         'coordinates': [
      //           37.58647, 55.8990326
      //         ]
      //       },
      //       'properties': {
      //         name: 'Алтуфьево'
      //       },
      //     }
      //   ]
      // }
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [37.6030121, 55.88387], // starting position [lng, lat]
        zoom: 15 // starting zoom
      });
      map.on('load', () => {
        for (const marker of this.$store.getters.geojson.features) {

          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = `#${marker.properties.color}`;
          el.style.width = `20px`;
          el.style.height = `20px`;

          el.addEventListener('click', () => {
            console.log(marker.properties);
          });

          new mapboxgl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .addTo(map);
        }
        // new mapboxgl.Marker()
        //     .setLngLat([37.6030121, 55.88387])
        //     .addTo(map);
        // map.addSource('ethnicity', {
        //   type: 'vector',
        //   url: 'mapbox://examples.8fgz4egr',
        // });
//         map.addLayer({
//           'id': 'population',
//           'type': 'circle',
//           'source': 'ethnicity',
//           'source-layer': 'sf2010',
//           'paint': {
// // Make circles larger as the user zooms from z12 to z22.
//             'circle-radius': {
//               'base': 1.75,
//               'stops': [
//                 [12, 2],
//                 [22, 180]
//               ]
//             },
//             'circle-color': 'red'
//           }
//         });
      });
    },
  }
}

</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}


</style>

<style lang="scss">
.marker {
  background: red;
  border-radius: 50%;
  cursor: pointer;
}
</style>