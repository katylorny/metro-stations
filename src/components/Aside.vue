<template>
  <el-aside>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Станции" name="stations">
        <el-input
            placeholder="Поиск станций"
            v-model="stationsSearchInput"
            suffix-icon="el-icon-search"
            @input="onStationsInputChange"
        />
        <el-tree :data="stations"
                 :props="defaultProps"
                 @node-click="handleNodeClick"
                 :default-expand-all="false"
                 ref="tree"
                 node-key="id"
                 :default-expanded-keys="openedLines"
        />
      </el-tab-pane>
      <el-tab-pane label="Остановки" name="stops">
        <el-input
            placeholder="Поиск остановок"
            v-model="stopsSearchInput"
            suffix-icon="el-icon-search"
            @input="onStopsInputChange"
        />
        <list :items="stops"/>
      </el-tab-pane>
    </el-tabs>
  </el-aside>

</template>

<script>

import List from "./List";
import {eventBus} from "../main";
import {mapGetters, mapMutations} from "vuex";
import mutationTypes from "../store/mutation-types";
import {debounce} from 'vue-debounce'

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
        return stop.properties.name
      })
    }
  },
  methods: {
    ...mapMutations([
      mutationTypes.SET_STOPS_INPUT_VALUE,
      mutationTypes.SET_STATIONS_INPUT_VALUE
    ]),
    handleNodeClick(data) {
      if (!data.children) {
        eventBus.$emit(`onStationClick`, {
          activeStationId: data.id
        })
      }
    },
    onStopsInputChange() {
      debounce(() => {
        this.SET_STOPS_INPUT_VALUE(this.stopsSearchInput)
      }, 500)()

    },
    onStationsInputChange() {
      debounce(() => {
        this.SET_STATIONS_INPUT_VALUE(this.stationsSearchInput)
        this.openedLines = []
        if (this.$store.state.stationsInputValue === "") return
        this.stations.forEach(line => {
          this.openedLines.push(line.id)
        })
      }, 500)()
    }
  }
}
</script>

<style scoped>

</style>