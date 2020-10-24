<template>
  <div>
    <el-row>
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
        number: 333
      },
      outgoings: {
        icon: '',
        label: '今日支出（元）',
        number: 333
      }
    }
  }
}
</script>

<style>
</style>
