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
  </div>
</template>

<script>

import Map from "../components/Map";

export default {
  name: "Main",
  components: {
    Map
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
              admArea: station.admArea,
              district: station.district,
              status: station.status
            }
          })
        }
      })
    }
  },

  methods: {
    handleNodeClick(data) {
      console.log(data);
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

  &::v-deep {
    .el-tree-node__content {
      padding: 0 20px;
    }
  }
}

.el-container {
  flex: 1;
}

.el-aside {
  padding: 20px 0;
}

</style>
