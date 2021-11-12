<template>
  <ul class="list">
    <li v-for="(item, i) in items" class="list__item" :key="i">
      {{ item }}
    </li>
  </ul>

</template>

<script>
export default {
  name: "ListItem",
  props: {
    items: []
  }
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}


.list__item {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #606266;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 26px;
  cursor: pointer;
  padding: 0 20px;
  font-size: 14px;

  &:hover {
    background-color: #F5F7FA;

  }
}
</style>