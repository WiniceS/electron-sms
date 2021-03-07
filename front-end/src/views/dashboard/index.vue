<template>
  <div class="dashboard-container">
    <el-row
      :gutter="20"
      class="dashboard-container-block-card"
    >
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
    <el-row class="dashboard-container-search">
      <good-search ref="searchBar" />
    </el-row>
    <el-row
      :gutter="10"
      :style="{marginBottom:'10px'}"
    >
      <el-col :span="12">
        <ve-line
          class="dashboard-container-chart"
          :data="saleChartData"
          :legend-visible="false"
          :settings="lineChartSettings"
          :title="{text:'近7天销售额',left:'center'}"
        />
      </el-col>
      <el-col :span="12">
        <ve-bar
          class="dashboard-container-chart"
          :data="saleTopChartData"
          :settings="barChartSettings"
          :legend-visible="false"
          :title="{text:'近7天销售商品数top10',left:'center'}"
        />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <ve-line
          class="dashboard-container-chart"
          :data="incomeChartData"
          :settings="lineChartSettings"
          :legend-visible="false"
          :title="{text:'近7天收入',left:'center'}"
        />
      </el-col>
      <el-col :span="12">
        <ve-line
          class="dashboard-container-chart"
          :data="outgoingChartData"
          :settings="lineChartSettings"
          :legend-visible="false"
          :title="{text:'近7天支出',left:'center'}"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BlockCard from '@/components/BlockCard'
import GoodSearch from './compontents/Search'
import { getDashboardStatistics } from '@/api/statistice'
import 'echarts/lib/component/title'

export default {
  name: 'Dashboard',
  components: {
    BlockCard,
    GoodSearch
  },
  data() {
    return {
      // 今日销售额
      todaySell: {
        icon: '',
        label: '今日销售额（元）',
        number: 0
      },
      // 今日收入
      todayIncome: {
        icon: '',
        label: '今日收入（元）',
        number: 0
      },
      // 今日支出
      todayOutgoing: {
        icon: '',
        label: '今日支出（元）',
        number: 0
      },
      // 近7天销售额
      saleChartData: {
        columns: ['date', 'number'],
        rows: []
      },
      // 近7天销售商品数top10
      saleTopChartData: {
        columns: ['name', 'number'],
        rows: []
      },
      // 近7天收入
      incomeChartData: {
        columns: ['date', 'number'],
        rows: []
      },
      // 近7天支出
      outgoingChartData: {
        columns: ['date', 'number'],
        rows: []
      },
      // 折线图配置
      lineChartSettings: {
        labelMap: {
          date: '日期',
          number: '金额'
        }
      },
      // 柱状图配置
      barChartSettings: {
        labelMap: {
          date: '商品名称',
          number: '销售数量'
        }
      }
    }
  },
  computed: {},
  created() {
    this.getStatistics()
  },
  mounted() {
    this.$refs['searchBar'].getInputFocus()
  },
  methods: {
    /**
     * @description 获取图表和块的统计信息
     * @returns {Promise<void>}
     */
    getStatistics() {
      return getDashboardStatistics().then(res => {
        this.todaySell.number = res.todaySale
        this.todayIncome.number = res.todayIncome
        this.todayOutgoing.number = res.todayOutgoing
        this.saleChartData.rows = res.saleStatistics
        this.saleTopChartData.rows = res.saleStatisticsTop
        this.incomeChartData.rows = res.incomeStatistics
        this.outgoingChartData.rows = res.outgoingStatistics
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;

    &-block-card {
      margin-bottom: 20px;
    }

    &-search {
      margin-bottom: 10px;
    }

    &-chart {
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 10px;
    }
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
