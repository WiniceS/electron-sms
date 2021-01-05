<template>
  <div class="statistics-sell">
    <el-row class="statistics-sell-form">
      <el-form
        ref="commodityForm"
        :inline="true"
        :model="search"
        class="goods-filter-form"
        size="small"
      >
        <el-form-item
          label="时间"
          prop="time"
        >
          <el-date-picker
            v-model="search.time"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            :clearable="false"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="开始时间"
            format="yyyy/MM/dd"
          />
        </el-form-item>
        <el-form-item
          label="商品种类"
          prop="variety"
        >
          <el-select
            v-model="search.variety"
            placeholder="请选择"
            :clearable="true"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品编号"
          prop="no"
        >
          <el-input
            v-model="search.no"
            placeholder="请输入商品编号"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <el-button @click="resetForm('commodityForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="statistics-sell-charts">
      <el-col
        :span="12"
        class="statistics-sell-charts-top"
      >
        <ve-line :data="chartData" />
      </el-col>
      <el-col
        :span="12"
        class="statistics-sell-charts-minimum"
      >
        <ve-bar :data="chartData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'StatisticsSell',
  data() {
    return {
      search: {
        time: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7).toLocaleDateString(),
          new Date(new Date().getTime() + 3600 * 1000 * 24 * 1).toLocaleDateString()
        ],
        no: '',
        variety: ''
      },
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  methods: {
    handleSearch() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
