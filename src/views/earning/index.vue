<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-date-picker
          size="small"
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button size="small" type="primary" @click="onSearch">查询</el-button>
        <el-button size="small">重置</el-button>
      </el-col>
      <el-col :span="4">
        <el-button size="small" type="primary" @click="onSearch">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'earning',
  data() {
    this.chartSettings = {
      showLine: ['user', 'user2'],
      yAxisName: ['收入'],
      legendName: {
        user: '用户',
        user2: '永固',
        down: '啥率'
      },
      labelMap: {
        user: '用户',
        user2: '永固',
        down: '啥率'
      },
      label: { show: true, position: 'top' }
    }
    return {
      chartData: {
        columns: ['date', 'user', 'user2', 'down'],
        rows: [
          { date: '1/1', user: 13, user2: 10, down: 0.32 },
          { date: '1/2', user: 35, user2: 32, down: 0.26 },
          { date: '1/3', user: 29, user2: 26, down: 0.76 },
          { date: '1/4', user: 17, user2: 14, down: 0.49 },
          { date: '1/5', user: 37, user2: 34, down: 0.323 },
          { date: '1/6', user: 45, user2: 42, down: 0.78 }
        ]
      },
      value: '',
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
      value2: ''
    }
  },
  methods: {
    onSearch() {}
  },
  components: {}
}
</script>

<style lang="scss"></style>
