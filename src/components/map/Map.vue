<template>
  <div class="wrapper">
    <div id="map"></div>
    <layers-visibility :layers="layers" @click="onLayerToggleClick"/>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import {initMap} from "./core/initMap";
import {mapActions} from "vuex";
import {layersConfig} from "./configs";
import {
  SET_SELECTED_ID, SET_SELECTED_TYPE,
  SET_STATIONS,
  SET_STOPS
} from "../../store/helpers/mutation-types";
import LayersVisibility from "../LayersVisibility";

export default {
  name: "Map",
  components: {LayersVisibility},
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
    ...mapState([
      'selectedType',
      'selectedId'
    ]),
    ...mapGetters([
      'shownStops',
      'stationsGeojson'
    ])
  },
  watch: {
    shownStops: function () {
      this.rerenderLayer('stops')
    },
    stationsGeojson: function () {
      this.rerenderLayer('stations')
    },
    selectedType: function (layerName, oldValue) {
      if (layerName === null) {
        const color = oldValue === 'stops' ? 'black' : ['get', 'color']
        this.map.setPaintProperty(oldValue, 'circle-color', color)
      } else {
        const activeCircleColor = layerName === 'stops' ? 'red' : 'black'
        const inactiveCircleColor = layerName === 'stops' ? 'black' : ['get', 'color']

        this.map.setPaintProperty(layerName, 'circle-color', [
          'case',
          ['==', ['get', 'id'], this.selectedId],
          activeCircleColor,
          inactiveCircleColor
        ])
      }
    }
  },

  methods: {
    ...mapMutations([
      SET_STATIONS,
      SET_STOPS,
      SET_SELECTED_ID,
      SET_SELECTED_TYPE
    ]),

    ...mapActions([
      'loadData'
    ]),

    rerenderLayer(type) {
      if (this.map && this.map.isStyleLoaded()) {
        this.map.removeLayer(type)
        this.map.removeSource(`${type}Data`)
        this.setLayer(type)
      }
    },

    setData(source, features) {
      source.setData({
        "type": "FeatureCollection",
        "features": features
      })
    },

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

      const data = {
        type: 'FeatureCollection',
        features: features
      }
      if (source) {
        source.setData({
          type: `FeatureCollection`,
          data
        })
      } else {
        this.map.addSource(`${type}Data`, {
          type: `geojson`,
          data
        })
        const options = {
          ...layersConfig[type]
        }
        this.map.addLayer(options);

        this.map.on(`click`, type, (e) => {
          this.SET_SELECTED_ID(e.features[0].properties.id)
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
