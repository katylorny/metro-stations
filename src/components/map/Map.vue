<template>
  <div class="wrapper">
    <div id="map"></div>
    <div id="menu">
      <a v-for="(layer, i) in layers"
         :key="i"
         href="#"
         :class="layer.isActive ? 'active' : ''"
         :id="layer.id"
         @click="onLayerToggleClick(layer)"
      >
        {{ layer.name }}
      </a>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import mutationTypes from "../../store/helpers/mutation-types";
import {initMap} from "./core/initMap";
import {mapActions} from "vuex";
import {layersConfig} from "./configs";

export default {
  name: "Map",

  data() {
    return {
      map: null,
      layers: [
        {
          id: 'stations',
          name: 'Станции метро',
          isActive: true
        },
        {
          id: 'stops',
          name: 'Остановки',
          isActive: true
        }
      ]
    }
  },
  async mounted() {
    await this.loadData()
    initMap(this)
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
        console.log(1);
        this.map.removeLayer('stops')
        this.map.removeSource('stopsData')
        this.setLayer('stops')
        // this.setStopsLayer()
      }
    },
    stationsGeojson: function () {
      if (this.map && this.map.isStyleLoaded()) {
        this.map.removeLayer('stations')
        this.map.removeSource('stationsData')
        this.setLayer('stations')
        // this.setStationsLayer()
      }
    }
  },

  methods: {
    ...mapMutations([
      mutationTypes.SET_STATIONS,
      mutationTypes.SET_STOPS,
      mutationTypes.SET_SELECTED_STATION_ID,
      mutationTypes.SET_SELECTED_STOP_ID,
      mutationTypes.SET_SELECTED_TYPE
    ]),

    ...mapActions([
      'loadData'
    ]),

    setLayer(type) {
      const source = this.map.getSource(`${type}Data`)
      let features
      switch (type) {
        case 'stations':
          features = this.stationsGeojson
          break
        case 'stops':
          features = this.shownStops
          break
      }

      const geoJson = {
        type: `geojson`,
        data: {
          type: 'FeatureCollection',
          features: features
        }
      }

      if (source) {
        source.setData(geoJson)
      } else {
        this.map.addSource(`${type}Data`, geoJson)
        const options = {
          // source: `${type}Data`,
          ...layersConfig[type]
        }

        this.map.addLayer(options);

        this.map.on(`click`, type, (e) => {

          switch (type) {
            case 'stations':
              this.SET_SELECTED_STATION_ID(e.features[0].properties.id)
              break
            case 'stops':
              this.SET_SELECTED_STOP_ID(e.features[0].properties.id)
              break
          }
          this.SET_SELECTED_TYPE(type)
        })
      }
    },

    onLayerToggleClick(layer) {
      layer.isActive = !layer.isActive
      this.map.setLayoutProperty(
          layer.id,
          'visibility',
          layer.isActive ? 'visible' : 'none'
      );
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
