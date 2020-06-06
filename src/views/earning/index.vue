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
        <el-button size="small" @click="resetForm('warehousingForm')">重置</el-button>
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
      showLine: ['下单率']
    }
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    }
  },
  components: {}
}
</script>

<style lang="scss"></style>
