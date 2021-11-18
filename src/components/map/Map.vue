<template>
  <div class="wrapper">
    <div id="map"></div>
    <div id="menu">
      <a class="active" href="#" id="stations" @click="onLayerToggleClick">Станции метро</a>
      <a class="active" href="#" id="stops" @click="onLayerToggleClick">Остановки</a>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import mutationTypes from "../../store/mutation-types";
import {initMap} from "./initMap";

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
          initMap(this)
        })

    fetch(`./stops.json`, {})
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
      mutationTypes.SET_STATIONS,
      mutationTypes.SET_STOPS,
      mutationTypes.SET_SELECTED_ID
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
        this.SET_SELECTED_ID(e.features[0].properties.id)
      })
    },

    onLayerToggleClick(e) {
      const clickedLayer = e.target.id
      const link = e.target
      const visibility = this.map.getLayoutProperty(
          clickedLayer,
          'visibility'
      );
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
    }
  }
}

</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
}

#menu {
  background: #fff;
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  border-radius: 3px;
  width: 120px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  font-family: 'Open Sans', sans-serif;

  &::v-deep {
    a {
      font-size: 13px;
      color: #404040;
      display: block;
      margin: 0;
      padding: 10px;
      text-decoration: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
      text-align: center;
    }

    a:last-child {
      border: none;
    }

    a:hover {
      background-color: #f8f8f8;
      color: #404040;
    }

    a.active {
      background-color: #3887be;
      color: #ffffff;
    }

    a.active:hover {
      background: #3074a4;
    }
  }
}

</style>
