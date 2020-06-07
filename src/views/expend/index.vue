<template>
  <div>
    <el-row type="flex">
      <el-date-picker
        size="small"
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button
        size="small"
        type="primary"
        @click="onSearch"
      >查询</el-button>
      <el-button size="small">重置</el-button>
      <el-button
        size="small"
        type="primary"
        @click="onSearch"
      >新增</el-button>
    </el-row>
    <el-row>
      <ve-histogram
        :data="chartData"
        :settings="chartSettings"
      ></ve-histogram>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'expend',
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      time: [
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7),
        new Date()
      ]
    }
  },
  computed: {
    ...mapState('expend', ['chartSettings', 'chartData'])
  },
  methods: {
    ...mapActions('expend', ['getExpend']),
    onSearch() { }
  }
}
</script>

<style lang="scss"></style>
