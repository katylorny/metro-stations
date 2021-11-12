<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import {mapMutations} from "vuex";
import {eventBus} from "../main";

export default {
  name: "Map",

  mounted() {
    fetch(`./metro.json`)
        .then(response => response.json())
        .then((response) => {
          this.setStations(response)
        })
        .then(() => {
          this.initMap()
        })
  },
  methods: {
    ...mapMutations([
      'setStations'
    ]),
    getActiveStationId(id) {
      eventBus.$emit(`onStationClick`, {
        activeStationId: id,
        // isOpened: true
      })
    },
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0eWxvcm55IiwiYSI6ImNrdnNhZDFjcmIxczgyb3M3azl6ZG8xamEifQ.egE0UVDX4gVCMuHly5a5gw';

      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        // style: {
        //   "version": 8,
        //   // url: 'mapbox://styles/mapbox/streets-v11',
        //   // "name": "Mapbox Streets",
        //   "sources": {
        //     "mapbox-streets": {
        //       "type": "vector",
        //       "url": 'mapbox://styles/mapbox/streets-v11'
        //     }
        //   },
        //   "layers": []
        // },
        center: [37.6156, 55.7522],
        zoom: 10 // starting zoom
      })


      map.on('load', () => {

        map.addSource(`stationsData`, {
          type: `geojson`,
          data: this.$store.getters.geojson
        })

        map.addLayer({
          'id': 'stations',
          'type': 'circle',
          'source': 'stationsData',
          'paint': {
            'circle-radius': 10,
            'circle-color': ["get", "color"]
          }
        });
      });

      map.on(`click`, `stations`, (e) => {
        this.getActiveStationId(e.features[0].properties.id)
      })
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
//.marker {
//  background: red;
//  border-radius: 50%;
//  cursor: pointer;
//}
</style>