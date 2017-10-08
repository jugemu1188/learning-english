<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
require('popper.js/dist/umd/popper.min.js')
require('bootstrap-material-design/dist/css/bootstrap-material-design.min.css')
require('bootstrap-material-design/dist/js/bootstrap-material-design.min.js')
require('font-awesome/css/font-awesome.css')

export default {
  name: 'app'
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
