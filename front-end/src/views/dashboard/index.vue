<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <block-card
          icon="dashboard"
          :number="364"
        />
      </el-col>
      <el-col :span="12">
        <block-card
          icon="form"
          :number="1364"
        />
      </el-col>
    </el-row>
    <el-row>
      <good-serach />
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BlockCard from '@/components/BlockCard'
import GoodSerach from './compontents/Search'

export default {
  name: 'Dashboard',
  components: {
    BlockCard,
    GoodSerach
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
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
