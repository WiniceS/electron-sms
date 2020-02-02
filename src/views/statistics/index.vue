<template>
  <div class="goodsStatistics">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="总览" name="first">
        <el-row>
          <el-col :span="12" :style="{height:contentHeight/2+'px'}">
            <v-chart auto-resize ref="topTnventoryChart" :options="topInventoryOption"></v-chart>
          </el-col>
          <el-col :span="12" :style="{height:contentHeight/2+'px'}">
            <v-chart auto-resize ref="bottomTnventoryChart" :options="bottomInventoryOption"></v-chart>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="goodsStatistics-center">
              <el-date-picker
                v-model="sellTopTime"
                type="daterange"
                size="mini"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </div>
            <div :style="{height:contentHeight/2-28+'px'}">
              <v-chart auto-resize :options="topSellOption"></v-chart>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="goodsStatistics-center">
              <el-date-picker
                v-model="sellBottomTime"
                type="daterange"
                size="mini"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </div>
            <div :style="{height:contentHeight/2-28+'px'}">
              <v-chart auto-resize :options="bottomSellOption"></v-chart>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品销售量" name="second">
        <el-row>
          <el-date-picker
            v-model="sellTime"
            type="daterange"
            size="small"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
          <el-select
            v-model="sellVariety"
            placeholder="请选择品类"
            size="small"
            :style="{width:'130px'}"
          >
            <el-option
              v-for="item in varietyOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="sellName" size="small" placeholder="请输入商品名称" :style="{width:'160px'}"></el-input>
          <el-input
            v-model="sellGoodId"
            size="small"
            placeholder="请输入商品编号"
            :style="{width:'120px'}"
          ></el-input>
          <el-button type="primary" size="small">查询</el-button>
        </el-row>
        <el-row :style="{height:contentHeight-50+'px'}">
          <v-chart auto-resize :options="sellOption"></v-chart>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品库存" name="third">
        <el-row>
          <el-select v-model="inventoryVariety" placeholder="请选择品类" size="small">
            <el-option
              v-for="item in varietyOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="inventoryGoodId"
            size="small"
            placeholder="请输入商品编号"
            :style="{width:'194px'}"
          ></el-input>
          <el-button type="primary" size="small">查询</el-button>
        </el-row>
        <el-row :style="{height:contentHeight-50+'px'}">
          <v-chart auto-resize :options="inventoryOption"></v-chart>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import echarts from "vue-echarts";
export default {
  name: "GoodsStatistics",
  data() {
    return {
      activeName: "first",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      sellTopTime: [new Date(), new Date()],
      sellBottomTime: [new Date(), new Date()],
      sellTime: [new Date(), new Date()],
      sellVariety: "",
      sellName: "",
      sellGoodId: "",
      inventoryVariety: "",
      inventoryGoodId: ""
    };
  },
  computed: {
    ...mapState(["winHeight"]),
    ...mapState("goodsInput", ["varietyOption"]),
    ...mapState("goodsStatistics", [
      "topInventoryOption",
      "bottomInventoryOption",
      "topSellOption",
      "bottomSellOption",
      "sellOption",
      "inventoryOption"
    ]),
    contentHeight() {
      return this.winHeight - 127;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    console.log(this.$refs);
    this.$refs["topTnventoryChart"].mergeOptions({
      yAxis: { data: ["周一", "周二", "周三", "周四", "周五"] },
      series: [{ data: [100, 170, 140, 244, 200] }]
    });
    this.$refs["bottomTnventoryChart"].mergeOptions({
      yAxis: { data: ["周一", "周二", "周三", "周四", "周五"] },
      series: [{ data: [100, 170, 140, 244, 200] }]
    });
  },
  components: {
    "v-chart": echarts
  }
};
</script>

<style lang="scss">
.goodsStatistics {
  width: 100%;
  height: 100%;
  background-color: white;
  &-center {
    display: flex;
    justify-content: center;
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
