<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import {mapGetters, mapMutations} from "vuex";
import {eventBus} from "../main";

export default {
  name: "Map",

  data() {
    return {
      map: null
    }
  },
  mounted() {
    fetch(`./metro.json`)
        .then(response => response.json())
        .then((response) => {
          this.SET_STATIONS(response)
        })
        .then(() => {
          this.initMap()
        })

    fetch(`https://dmtlp-mob.simetragroup.ru/rest/stop_points`, {})
        .then(response => response.json())
        .then(response => {
          this.SET_STOPS(response)
        })
  },
  computed: {
    ...mapGetters([
      'shownStops',
      'stationsGeojson'
    ])
  },
  watch: {
    shownStops: function () {
      if (this.map && this.map.isStyleLoaded()) {
        this.map.removeLayer('stops')
        this.map.removeSource('stopsData')
        this.setStopsLayer()
      }
    },
    stationsGeojson: function () {
      if (this.map && this.map.isStyleLoaded()) {
        this.map.removeLayer('stations')
        this.map.removeSource('stationsData')
        this.setStationsLayer()
      }
    }
  },

  methods: {
    ...mapMutations([
      'SET_STATIONS',
      'SET_STOPS'
    ]),

    setStopsLayer() {
      this.map.addSource(`stopsData`, {
        type: `geojson`,
        data: {
          type: 'FeatureCollection',
          features: this.shownStops
        }
      })

      this.map.addLayer({
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
    },

    setStationsLayer() {
      this.map.addSource(`stationsData`, {
        type: `geojson`,
        data: {
          type: 'FeatureCollection',
          features: this.stationsGeojson
        }
      })

      this.map.addLayer({
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

      this.map.on(`click`, `stations`, (e) => {
        this.getActiveStationId(e.features[0].properties.id)
      })
    },
    getActiveStationId(id) {
      eventBus.$emit(`onStationClick`, {
        activeStationId: id,
      })
    },
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0eWxvcm55IiwiYSI6ImNrdnNhZDFjcmIxczgyb3M3azl6ZG8xamEifQ.egE0UVDX4gVCMuHly5a5gw';

      this.map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [37.6156, 55.7522],
        // center: [128.218463048, 51.496981567],
        zoom: 10 // starting zoom
      })


      this.map.on('load', () => {
        this.setStationsLayer()
        this.setStopsLayer()
      });

      this.map.on('idle', () => {
        if (!this.map.getLayer('stops') || !this.map.getLayer('stations')) {
          return;
        }

        const toggleableLayerIds = ['stations', 'stops'];

        for (const id of toggleableLayerIds) {
          if (document.getElementById(id)) {
            continue;
          }

          const link = document.createElement('a');
          link.id = id;
          link.href = '#';
          link.textContent = id;
          link.className = 'active';

// Show or hide layer when the toggle is clicked.
          link.onclick = (e) => {
            const clickedLayer = link.textContent;
            e.preventDefault();
            e.stopPropagation();

            const visibility = this.map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

// Toggle layer visibility by changing the layout object's visibility property.
            if (visibility === 'visible') {
              this.map.setLayoutProperty(clickedLayer, 'visibility', 'none');
              link.className = '';
            } else {
              link.className = 'active';
              this.map.setLayoutProperty(
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
      this.map.on('mouseenter', ['stations', 'stops'], () => {
        this.map.getCanvas().style.cursor = 'pointer';
      })
      this.map.on('mouseleave', ['stations', 'stops'], () => {
        this.map.getCanvas().style.cursor = '';
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
