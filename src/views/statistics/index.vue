<template>
  <div class="statistics">
    <el-row class="statistics-form">
      <el-col :span="6">
        <el-select v-model="type" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          size="small"
          v-model="time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始good"
          end-placeholder="结束good"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button size="small" type="primary" @click="onSearch">查询</el-button>
        <el-button size="small">重置</el-button>
      </el-col>
    </el-row>
    <el-row class="statistics-charts">
      <el-col :span="12" class="statistics-charts-top">
        <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
      </el-col>
      <el-col :span="12" class="statistics-charts-minimum">
        <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'statistics',
  data() {
    this.chartSettings = {
      metrics: ['sales'],
      dataOrder: {
        label: 'sales',
        order: 'desc'
      },
      legendName: {
        good: '商品',
        sales: '商品销售数'
      },
      labelMap: {
        good: '商品',
        sales: '商品销售数'
      }
    }
    return {
      chartData: {
        columns: ['good', 'sales'],
        rows: [
          { good: '1/1', sales: 13 },
          { good: '1/2', sales: 30 },
          { good: '1/3', sales: 23 },
          { good: '1/4', sales: 13 },
          { good: '1/5', sales: 32 },
          { good: '1/6', sales: 43 }
        ]
      },
      options: [
        {
          value: 'sale',
          label: '商品销售'
        },
        {
          value: 'inventory',
          label: '库存'
        }
      ],
      type: 'sale',
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
  computed: {},
  methods: {
    onSearch() {}
  },
  mounted() {},
  components: {}
}
</script>

<style lang="scss">
.statistics {
  &-form {
    padding: 10px 0;
  }
  &-charts {
    padding: 10px;
    &-top {
      padding: 0 10px;
    }
    &-minimum {
      padding: 0 10px;
    }
  }
}
</style>
