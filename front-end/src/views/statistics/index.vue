<template>
  <div class="statistics">
    <el-row
      class="statistics-form"
      type="flex"
    >
      <el-select
        class="statistics-form-select"
        v-model="type"
        size="small"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        size="small"
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
        :clearable="false"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="开始时间"
        :picker-options="pickerOptions"
        format="yyyy/MM/dd"
      ></el-date-picker>
      <el-button
        class="statistics-form-button"
        size="small"
        type="primary"
        @click="onSearch"
      >查询</el-button>
      <el-button size="small">重置</el-button>
    </el-row>
    <el-row class="statistics-charts">
      <el-col
        :span="12"
        class="statistics-charts-top"
      >
        <ve-bar
          :data="chartDataTop"
          :settings="chartSettingsTop"
        ></ve-bar>
      </el-col>
      <el-col
        :span="12"
        class="statistics-charts-minimum"
      >
        <ve-bar
          :data="chartDataMinimum"
          :settings="chartSettingsMinimum"
        ></ve-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'statistics',
  data() {
    return {
      chartSettingsTop: {},
      chartSettingsMinimum: {},
      chartDataTop: {},
      chartDataMinimum: {},
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
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 7).toLocaleDateString(),
        new Date(new Date().getTime() + 3600 * 1000 * 24 * 1).toLocaleDateString()
      ]
    }
  },
  computed: {
    ...mapState('statistics', ['chartSettingsSaleTop', 'chartSettingsSaleMinimum', 'chartSettingsInventoryTop', 'chartSettingsInventoryMinimum', 'chartDataSaleTop', 'chartDataSaleMinimum', 'chartDataInventoryTop', 'chartDataInventoryMinimum'])
  },
  methods: {
    ...mapActions('statistics', ['getSales', 'getInventory']),
    onSearch() {
      if (this.type === 'sale') {
        this.getSales({ startTime: this.time[0], endTime: this.time[1] }).then(() => {
          this.chartSettingsTop = this.chartSettingsSaleTop
          this.chartSettingsMinimum = this.chartSettingsSaleMinimum
          this.chartDataTop = this.chartDataSaleTop
          this.chartDataMinimum = this.chartDataSaleMinimum
        })
      } else {
        this.getInventory({ startTime: this.time[0], endTime: this.time[1] }).then(() => {
          this.chartSettingsTop = this.chartSettingsInventoryTop
          this.chartSettingsMinimum = this.chartSettingsInventoryMinimum
          this.chartDataTop = this.chartDataInventoryTop
          this.chartDataMinimum = this.chartDataInventoryMinimum
        })
      }
    }
  },
  mounted() {
    this.onSearch()
  },
  components: {}
}
</script>

<style lang="scss">
.statistics {
  &-form {
    padding: 10px 10px;
    &-select {
      padding-right: 10px;
    }
    &-button {
      margin-left: 10px;
    }
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
