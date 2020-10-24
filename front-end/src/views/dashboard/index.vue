<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="8">
        <block-card
          :icon="todaySell.icon"
          :label="todaySell.label"
          :number="todaySell.number"
        />
      </el-col>
      <el-col :span="8">
        <block-card
          :icon="todayIncome.icon"
          :label="todayIncome.label"
          :number="todayIncome.number"
        />
      </el-col>
      <el-col :span="8">
        <block-card
          :icon="todayOutgoing.icon"
          :label="todayOutgoing.label"
          :number="todayOutgoing.number"
        />
      </el-col>
    </el-row>
    <el-row>
      <good-serach />
    </el-row>
    <el-row>
      <el-col :span="12">
        <ve-line :data="chartData" />
      </el-col>
      <el-col :span="12">
        <ve-bar
          :data="chartData"
          :settings="chartSettings"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <ve-line :data="chartData" />
      </el-col>
      <el-col :span="12">
        <ve-line :data="chartData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BlockCard from '@/components/BlockCard'
import GoodSerach from './compontents/Search'

export default {
  name: 'Dashboard',
  components: {
    BlockCard,
    GoodSerach
  },
  data() {
    return {
      todaySell: {
        icon: '',
        label: '今日销售额（元）',
        number: 333
      },
      todayIncome: {
        icon: '',
        label: '今日收入（元）',
        number: 666
      },
      todayOutgoing: {
        icon: '',
        label: '今日支出（元）',
        number: 666
      },
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393 },
          { '日期': '1/2', '访问用户': 3530 },
          { '日期': '1/3', '访问用户': 2923 },
          { '日期': '1/4', '访问用户': 1723 },
          { '日期': '1/5', '访问用户': 3792 },
          { '日期': '1/6', '访问用户': 4593 }
        ]
      },
      chartSettings: {
        dimension: ['日期'],
        metrics: ['访问用户']
      }
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
