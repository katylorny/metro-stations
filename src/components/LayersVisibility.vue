<template>
  <ul class="layers-visibility">
    <li v-for="(layer, i) in layers" :key="i">
      <a
         href="#"
         :class="layer.isActive ? 'active' : ''"
         :id="layer.id"
         @click="$emit('click', layer)"
      >
        {{ layer.name }}
      </a>
    </li>

  </ul>
</template>

<script>
export default {
  name: "LayersVisibility",
  props: {
    layers: Array
  },
}
</script>

<style lang="scss" scoped>
.layers-visibility {
  background: #fff;
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  border-radius: 3px;
  width: 120px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  font-family: 'Open Sans', sans-serif;
  padding-left: 0;
  list-style: none;

  li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);

    &:last-child {
      border-bottom: none;
    }
  }

  a {
    font-size: 13px;
    color: #404040;
    display: block;
    margin: 0;
    padding: 10px;
    text-decoration: none;
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
</style>