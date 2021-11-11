<template>
  <div class="main">
    <el-container>
      <el-aside>
        <el-tree :data="stations" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <el-main>
        <Map/>
      </el-main>
    </el-container>
    <station-modal title="Бибирево"/>
  </div>
</template>

<script>

import Map from "../components/Map";
import StationModal from "../components/StationModal";
import {eventBus} from "../main";

export default {
  name: "Main",
  components: {
    StationModal,
    Map
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isModalOpened: false
    }
  },

  computed: {
    stations() {
      return this.$store.getters.stationsWithId.map((line) => {
        return {
          label: line.name,
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
    }
  },

  methods: {
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
    // closeModal() {
    //   this.isModalOpened = false
    // }
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
  }
}

.el-container {
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

.el-aside {
  padding: 20px 0;
  height: 100vh;
  overflow: auto;
}

</style>
