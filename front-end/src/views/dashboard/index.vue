<template>
  <div class="dashboard-container">
    <el-row>
      <good-serach />
    </el-row>
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
