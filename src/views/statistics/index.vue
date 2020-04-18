<template>
  <div>
    <el-button @click="openNewDialog">打开新弹窗</el-button>
  </div>
</template>

<script>
const ipc = require('electron').ipcRenderer
export default {
  name: 'Statistics',
  data() {
    return {}
  },
  computed: {},
  methods: {
    openNewDialog() {
      ipc.send('add')
    }
  },
  mounted() {},
  components: {}
}
</script>

<style lang="scss"></style>
