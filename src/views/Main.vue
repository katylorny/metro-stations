<template>
  <div class="main">
    <el-container>
      <vue-custom-scrollbar class="scroll-area">
        <aside-component/>
      </vue-custom-scrollbar>
      <el-main>
        <Map/>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import Map from "../components/map/Map";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import AsideComponent from "../components/Aside";

export default {
  name: "Main",
  components: {
    AsideComponent,
    Map,
    vueCustomScrollbar
  },
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

</style>
