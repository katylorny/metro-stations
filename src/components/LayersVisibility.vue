<template>
  <div id="menu">
    <a class="active" href="#" id="stations" @click="onLayerToggleClick">Станции метро</a>
    <a class="active" href="#" id="stops" @click="onLayerToggleClick">Остановки</a>
  </div>
</template>

<script>
export default {
  name: "LayersVisibility",
  methods: {
    onLayerToggleClick(e) {
      console.log(this.map);
      const clickedLayer = e.target.id
      const link = e.target
      const visibility = this.map.getLayoutProperty(
          clickedLayer,
          'visibility'
      );
      if (visibility === 'visible') {
        this.map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        link.className = '';
      } else {
        link.className = 'active';
        this.map.setLayoutProperty(
            clickedLayer,
            'visibility',
            'visible'
        );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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