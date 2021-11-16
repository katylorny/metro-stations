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

    fetch(`https://dmtlp-mob.simetragroup.ru/rest/stop_points`, {})
        .then(response => response.json())
        .then(response => {
          this.setStops(response)
        })
  },
  methods: {
    ...mapMutations([
      'setStations',
      'setStops'
    ]),
    getActiveStationId(id) {
      eventBus.$emit(`onStationClick`, {
        activeStationId: id,
      })
    },
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0eWxvcm55IiwiYSI6ImNrdnNhZDFjcmIxczgyb3M3azl6ZG8xamEifQ.egE0UVDX4gVCMuHly5a5gw';

      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [37.6156, 55.7522],
        zoom: 10 // starting zoom
      })


      map.on('load', () => {

        map.addSource(`stationsData`, {
          type: `geojson`,
          data: {
            type: 'FeatureCollection',
            features: this.$store.getters.stationsGeojson
          }
        })

        map.addLayer({
          'id': 'stations',
          'type': 'circle',
          'layout': {
            'visibility': 'visible'
          },
          'source': 'stationsData',
          'paint': {
            'circle-radius': 10,
            'circle-color': ["get", "color"]
          }
        });


        map.on(`click`, `stations`, (e) => {
          this.getActiveStationId(e.features[0].properties.id)
        })

        map.addSource(`stopsData`, {
          type: `geojson`,
          data: {
            type: 'FeatureCollection',
            features: this.$store.getters.shownStops
          }
        })

        map.addLayer({
          'id': 'stops',
          'type': 'circle',
          'layout': {
            'visibility': 'visible'
          },
          'source': 'stopsData',
          'paint': {
            'circle-radius': 8,
            'circle-color': 'black'
          }
        });


      });
      map.on('idle', () => {
        if (!map.getLayer('stops') || !map.getLayer('stations')) {
          return;
        }

        const toggleableLayerIds = ['stations', 'stops'];

        for (const id of toggleableLayerIds) {
          if (document.getElementById(id)) {
            console.log(`document.getElementById(id)`, document.getElementById(id));
            continue;
          }

          const link = document.createElement('a');
          link.id = id;
          link.href = '#';
          link.textContent = id;
          link.className = 'active';

// Show or hide layer when the toggle is clicked.
          link.onclick = function (e) {
            const clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

// Toggle layer visibility by changing the layout object's visibility property.
            if (visibility === 'visible') {
              map.setLayoutProperty(clickedLayer, 'visibility', 'none');
              this.className = '';
            } else {
              this.className = 'active';
              map.setLayoutProperty(
                  clickedLayer,
                  'visibility',
                  'visible'
              );
            }
          };

          const layers = document.getElementById('menu');
          layers.appendChild(link);
        }
      });
      map.on('mouseenter', ['stations', 'stops'], () => {
        map.getCanvas().style.cursor = 'pointer';
      })
      map.on('mouseleave', ['stations', 'stops'], () => {
        map.getCanvas().style.cursor = '';
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
