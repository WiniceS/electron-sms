<template>
  <div class="deal">
    <el-row class="deal-input">
      <el-col :span="24">
        <el-input
          v-model="goodNo"
          placeholder="请输入商品编号"
          class="deal-input-goodid"
          @keyup.native.enter="addGoodInSell"
        >
          <el-button
            slot="append"
            icon="el-icon-circle-plus"
            type="primary"
            @click="addGoodInSell"
          >添加</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="12"
        class="deal-summation"
      >
        <span>合计：</span><span>{{ sale }}</span><span>元</span>
      </el-col>
      <el-col :span="6">
        <el-button
          :style="{width:'100%'}"
          type="primary"
          size="small"
          @click="settleAccounts"
        >结算</el-button>
      </el-col>
      <el-col
        :span="4"
        :offset="2"
      >
        <el-button
          :style="{width:'100%'}"
          type="warning"
          size="small"
          @click="clearDeal"
        >清空</el-button>
      </el-col>
    </el-row>
    <el-row class="deal-table">
      <el-table
        :data="dealRecords"
        stripe
        border
        :max-height="800"
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          label="商品编号"
          min-width="140"
          prop="no"
        />
        <el-table-column
          label="商品名称"
          min-width="180"
          prop="name"
          show-overflow-tooltip
        />
        <el-table-column
          label="商品描述"
          min-width="180"
          prop="specification"
          show-overflow-tooltip
        />
        <el-table-column
          label="商品类型"
          min-width="120"
          prop="variety"
          show-overflow-tooltip
        />
        <el-table-column
          label="商品售价"
          min-width="80"
          prop="sell"
        />
        <el-table-column
          label="商品数量"
          min-width="120"
          prop="quantity"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.quantity"
              :min="0"
              size="mini"
              :style="{width:'100px'}"
              @change="handleChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="优惠"
          min-width="100"
          prop="discounts"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.discounts"
              :min="0"
              :controls="false"
              size="mini"
              :style="{width:'80px'}"
              @change="handleChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="小计"
          min-width="60"
          prop="subtotal"
          fixed="right"
        />
        <el-table-column
          label="操作"
          min-width="80"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="delDealList(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getGoodByNo } from '@/api/goods'
import { deal } from '@/api/deal'
export default {
  name: 'Deal',
  data() {
    return {
      goodNo: '',
      dealRecords: [],
      timer: null
    }
  },
  computed: {
    ...mapState(['winHeight']),
    sale() {
      let tmp = 0
      if (this.dealRecords.length > 0) {
        this.dealRecords.forEach(f => {
          tmp += f.sell * f.quantity - f.discounts
        })
      }
      return tmp
    }
  },
  created() {
    document.addEventListener('keyup', this.keySale)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keySale)
    this.timer = null
  },
  methods: {
    ...mapActions('deal', ['sell']),
    ...mapActions('commodity', ['getByNo']),
    // 查询商品后添加到销售列表中
    addGoodInSell() {
      if (this.goodNo.length > 0) {
        const re = /^[0-9]{6,13}$/
        const tmp = this.goodNo.search(re)
        if (tmp > -1) {
          getGoodByNo(this.goodNo).then(res => {
            res.quantity = 1
            res.discounts = 0
            res.subtotal = res.quantity * res.sell - res.discounts
            this.dealRecords.push(res)
          })
          this.goodNo = ''
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
    handleChange(row) {
      if (Math.round(row.quantity) === 0) {
        this.handleDelete(row.id)
      } else {
        row.subtotal = row.quantity * row.sell - row.discounts
      }
    },
    // 删除一行销售商品
    handleDelete(id) {
      this.dealRecords = this.dealRecords.filter(f => f.id !== id)
    },
    // 清空销售列表
    clearDeal() {
      this.$confirm('是否清空销售列表', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dealRecords = []
        })
        .catch(() => {
          console.log('取消清空')
        })
    },
    // 结算
    settleAccounts() {
      if (this.dealRecords.length > 0) {
        deal(this.dealRecords)
          .then(() => {
            this.$message({
              type: 'success',
              message: '结算成功'
            })
            this.goodNo = ''
            this.dealRecords = []
          })
          .catch(e => {
            console.error(e)
            this.$message({
              type: 'error',
              message: '结算失败'
            })
          })
      }
    },
    onSell(e) {
      if (e.code === 'F9') {
        if (this.dealRecords.length > 0) {
          deal(this.dealRecords)
            .then(() => {
              this.$message({
                type: 'success',
                message: '结算成功'
              })
              this.goodNo = ''
              this.dealRecords = []
            })
            .catch(e => {
              console.error(e)
              this.$message({
                type: 'error',
                message: '结算失败'
              })
            })
        }
      }
    },
    keySale(e) {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(this.onSell(e), 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.deal {
  &-input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  &-summation {
    text-align: center;
    span {
      font-size: 160%;
      font-weight: bold;
    }
  }
  .deal-table {
    margin-top: 10px;
    height: 80vh;
  }
}
</style>
