<template>
  <div class="main">
    <el-container>
      <vue-custom-scrollbar class="scroll-area">
        <aside-component/>
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
import vueCustomScrollbar from 'vue-custom-scrollbar'
import AsideComponent from "../components/Aside";

export default {
  name: "Main",
  components: {
    AsideComponent,
    StationModal,
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
