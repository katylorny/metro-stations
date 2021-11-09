<template>
  <div class="main">
    <el-container>
      <el-aside>
        Список станций
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
}

.el-container {
  flex: 1;
}
</style>