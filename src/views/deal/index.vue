<template>
  <div class="goods-deal">
    <div class="goods-deal-input">
      <div class="goods-deal-input-id">
        <el-input class="goods-deal-input-goodid" v-model="goodId" placeholder="请输入商品编号"></el-input>
        <el-button class="goods-deal-input-add" type="primary" @click="addGoodInSell">添加</el-button>
      </div>
    </div>
    <el-table
      class="goods-deal-tabel"
      :data="computedDealList"
      :summary-method="getSummaries"
      show-summary
      stripe
      :height="400"
      :style="{ width: '100%;' }"
      border
    >
      <el-table-column
        prop="good_id"
        label="商品编号"
        header-align="center"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="good_name"
        label="商品名称"
        header-align="center"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="good_specification"
        label="商品规格"
        header-align="center"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="good_sell"
        label="商品售价"
        header-align="center"
        show-overflow-tooltip
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="good_sell_number"
        label="商品数量"
        header-align="center"
        show-overflow-tooltip
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="discounts"
        label="优惠金额"
        header-align="center"
        show-overflow-tooltip
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            :value="sale"
            :min="0"
            :max="scope.row.good_sell"
            :precision="2"
            :controls="false"
            placeholder="请输入优惠金额"
            @input="changeDiscounts($event, scope.row.good_id)"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="subtotal"
        label="小计"
        header-align="center"
        show-overflow-tooltip
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        header-align="center"
        show-overflow-tooltip
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" title="数量减1" @click="minusDealList(scope.row.good_id)">-</el-button>
          <el-button size="mini" title="数量加1" @click="plusDealList(scope.row.good_id)">+</el-button>
          <el-button size="mini" type="danger" @click="delDealList(scope.row.good_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="goods-deal-button">
      <el-button type="warning" @click="clearDeal">清空</el-button>
      <el-button type="primary" :style="{ width: '150px' }" @click="settleAccounts">确认</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'Deal',
  data() {
    return {
      goodId: '',
      sale: 0
    }
  },
  computed: {
    ...mapState('deal', []),
    ...mapState(['winHeight']),
    ...mapGetters('deal', ['computedDealList'])
  },
  methods: {
    ...mapActions('deal', ['onSale', 'getGoodInfoById', 'sell']),
    ...mapMutations('deal', {
      clearDealList: 'CLEAR_DEAL_LIST',
      delDealList: 'DEL_DEAL_LIST',
      plusDealList: 'PLUS_DEAL_LIST',
      minusDealList: 'MINUS_DEAL_LIST',
      modifyDiscounts: 'MODIFY_DISCOUNTS'
    }),
    // 自定义合计栏样式
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
        if (column.property === 'goodsSell') {
          sums[index] = ''
        }
        if (column.property === 'subtotal') {
          sums[index] += ' 元'
        }
      })
      return sums
    },
    // 查询商品后添加到销售列表中
    addGoodInSell() {
      if (this.goodId.length > 0) {
        const re = /^[0-9]{13}$/
        let tmp = this.goodId.search(re)
        if (tmp > -1) {
          this.getGoodInfoById(this.goodId)
          this.goodId = ''
        } else {
          this.$message({
            type: 'warning',
            message: '请输入正确的商品编码'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请输入商品编码'
        })
      }
    },
    changeDiscounts(value, id) {
      this.$nextTick(() => {
        this.modifyDiscounts({ value, id })
      })
    },
    // 删除一行销售商品
    handleDelete(id) {
      this.delDealList(id)
    },
    onSaleNumber() {
      if (this.sale > 0) {
        this.onSale(this.sale)
      }
    },
    // 清空销售列表
    clearDeal() {
      this.$confirm('是否清空销售列表', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.clearDealList()
        })
        .catch(() => {
          console.log('取消清空')
        })
    },
    // 结算
    settleAccounts() {
      this.sell()
        .then(() => {
          this.goodId = ''
        })
        .catch(e => {
          this.$message({
            type: 'error',
            message: '结算失败'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.goods-deal {
  display: none;
  .goods-deal-input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goods-deal-input-id {
      width: 700px;
      display: flex;
      justify-content: space-between;

      .goods-deal-input-goodid {
        width: 500px;
      }

      .goods-deal-input-add {
        width: 150px;
      }
    }
  }

  .goods-deal-button {
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .goods-deal-sale {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
