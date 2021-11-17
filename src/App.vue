<template>
  <div id="app">
    <main-component/>
  </div>
</template>

<script>

import MainComponent from "./views/Main";

export default {
  name: 'App',
  components: {
    MainComponent
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  align-self: stretch;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
