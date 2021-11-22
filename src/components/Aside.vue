<template>
  <el-aside>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Станции" name="stations">
        <el-input
            placeholder="Поиск станций"
            v-model="stationsSearchInput"
            suffix-icon="el-icon-search"
            v-debounce:300="onStationsInputChange"
            :debounce-events="'input'"
        />
        <!--        <el-tree :data="stations"-->
        <!--                 :props="defaultProps"-->
        <!--                 @node-click="handleNodeClick"-->
        <!--                 :default-expand-all="false"-->
        <!--                 ref="tree"-->
        <!--                 node-key="id"-->
        <!--                 :default-expanded-keys="openedLines"-->
        <!--        />-->
        <list
            :items="stations"
            @item-click="handleStationClick"
        />
      </el-tab-pane>
      <el-tab-pane label="Остановки" name="stops">
        <el-input
            placeholder="Поиск остановок"
            v-model="stopsSearchInput"
            suffix-icon="el-icon-search"
            v-debounce:300="onStopsInputChange"
            :debounce-events="'input'"
        />
        <list
            :items="stops"
            @item-click="handleStopClick"
        />
      </el-tab-pane>
    </el-tabs>
  </el-aside>

</template>

<script>

import List from "./List";
import {mapGetters, mapMutations} from "vuex";
import mutationTypes from "../store/helpers/mutation-types";
import {getDirective} from 'vue-debounce'

export default {
  name: "Aside",
  components: {List},
  data() {
    return {
      activeTab: 'stations',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      stationsSearchInput: '',
      stopsSearchInput: '',
      openedLines: []
    }
  },
  directives: {
    debounce: getDirective()
  },
  computed: {
    ...mapGetters([
      'stopsGeojson',
      'shownStations'
    ]),
    stations() {
      return this.shownStations.map((line) => {
        return {
          label: line.name,
          id: line.id,
          children: line.stations.map((station) => {
            return {
              label: station.name,
              id: station.id
            }
          })
        }
      })
    },
    stops() {
      return this.$store.getters.shownStops.map(stop => {
        return {
          label: stop.properties.name,
          id: stop.properties.id
        }
      })
    }
  },
  methods: {
    ...mapMutations([
      mutationTypes.SET_STOPS_INPUT_VALUE,
      mutationTypes.SET_STATIONS_INPUT_VALUE,
      mutationTypes.SET_SELECTED_STATION_ID,
      mutationTypes.SET_SELECTED_STOP_ID,
      mutationTypes.SET_SELECTED_TYPE
    ]),
    handleStopClick(id) {
      this.SET_SELECTED_STOP_ID(id)
      this.SET_SELECTED_TYPE('stops')
    },
    handleStationClick(id) {
      this.SET_SELECTED_STATION_ID(id)
      this.SET_SELECTED_TYPE('stations')
    },
    onStopsInputChange() {
      this.SET_STOPS_INPUT_VALUE(this.stopsSearchInput)
    },
    onStationsInputChange() {
      this.SET_STATIONS_INPUT_VALUE(this.stationsSearchInput)
      this.openedLines = []
      if (this.$store.state.stationsInputValue === "") return
      this.stations.forEach(line => {
        this.openedLines.push(line.id)
      })
    }
  }
}
</script>

<style scoped>

</style>