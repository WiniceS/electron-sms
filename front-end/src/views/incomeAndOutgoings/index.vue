<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <block-card
          :icon="income.icon"
          :label="income.label"
          :number="income.number"
        />
      </el-col>
      <el-col :span="12">
        <block-card
          :icon="outgoings.icon"
          :label="outgoings.label"
          :number="outgoings.number"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BlockCard from '@/components/BlockCard'
import { getIncomeAndOutgoingStatistics } from '@/api/statistice'
export default {
  name: 'IncomeAndOutgoings',
  components: {
    BlockCard
  },
  data() {
    return {
      income: {
        icon: '',
        label: '今日收入（元）',
        number: 0
      },
      outgoings: {
        icon: '',
        label: '今日支出（元）',
        number: 0
      }
    }
  },
  created() {
    this.getStatistics()
  },
  methods: {
    getStatistics() {
      getIncomeAndOutgoingStatistics().then(res => {
        this.income.number = res.todayIncome
        this.outgoings.number = res.todayOutgoing
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>
</style>
