<template>
  <div class="main">
    <el-container>
      <vue-custom-scrollbar class="scroll-area">
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
      </vue-custom-scrollbar>
      <el-main>
        <Map/>
        <div id="menu"></div>

      </el-main>
    </el-container>
    <station-modal/>
  </div>
</template>

<script>

import Map from "../components/Map";
import StationModal from "../components/StationModal";
import {eventBus} from "../main";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import {mapGetters, mapMutations} from "vuex";
import List from "../components/List";

export default {
  name: "Main",
  components: {
    List,
    StationModal,
    Map,
    vueCustomScrollbar
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isModalOpened: false,
      activeTab: 'stations',
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
              // admArea: station.admArea,
              // district: station.district,
              // status: station.status,
              id: station.id
            }
          })
        }
      })
    },
    stops() {
      // return this.$store.getters.stopsGeojson.features.map(stop => {
      return this.$store.getters.shownStops.map(stop => {
        return stop.properties.name
      })
    }
  },

  methods: {
    ...mapMutations([
      'setStopsInputValue',
      'setStationsInputValue'
    ]),
    handleNodeClick(data) {
      if (!data.children) {
        // this.isModalOpened = true

        console.log(data);
        eventBus.$emit(`onStationClick`, {
          // isOpened: true,
          activeStationId: data.id
        })
      }
    },
    onStopsInputChange() {
      //TODO debounce?
      this.setStopsInputValue(this.stopsSearchInput)
    },
    onStationsInputChange() {
      this.setStationsInputValue(this.stationsSearchInput)
      this.openedLines = []
      if (this.$store.state.stationsInputValue === "") return
      this.stations.forEach(line => {
        this.openedLines.push(line.id)
      })
    }

  }
}
</script>

<style lang="scss" scoped>

main {
  padding: 0;
}

.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  position: relative;

  &::v-deep {
    .el-tree-node__content {
      padding: 0 20px;
    }

    .el-input {
      margin-bottom: 25px;
    }

    .el-tabs__header {
      padding-left: 10px;
    }

  }
}

.el-container {
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

.el-aside {
  padding: 20px 0;
  overflow: auto;
}

.scroll-area {
  height: 100vh;
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
      padding: 0;
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
