<template>
  <div class="overlay">
    <p v-if="isLoading"> Идет загрузка данных... </p>
    <p v-if="isError"> Ошибка загрузки данных </p>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Overlay",
  computed: {
    ...mapState([
        'isLoading',
        'isError'
    ])
  }
}
</script>

<style lang="scss" scoped>

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(64, 64, 64, 0.62);
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: white;
  }
}

</style>