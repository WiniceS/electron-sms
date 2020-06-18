<template>
  <div class="deal">
    <el-row class="deal-input">
      <el-col :span="12">
        <el-input
          class="deal-input-goodid"
          v-model="goodNo"
          placeholder="请输入商品编号"
          @keyup.native.enter="addGoodInSell"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button class="deal-input-add" type="primary" @click="addGoodInSell">添加</el-button>
      </el-col>
      <el-col :span="7">
        <span class="deal-sale">合计:{{sale}}元</span>
      </el-col>
    </el-row>
    <el-row class="deal-table">
      <el-table :data="dealRecords" stripe border :max-height="winHeight-130">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="商品编号" width="140" prop="no"></el-table-column>
        <el-table-column label="商品名称" min-width="180" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品描述" min-width="180" prop="specification" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品类型" width="120" prop="varietyName" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品售价" width="80" prop="sell"></el-table-column>
        <el-table-column label="商品数量" width="120" prop="quantity">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.quantity"
              @change="handleChange(scope.row)"
              :min="0"
              size="mini"
              :style="{width:'100px'}"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="优惠" width="100" prop="discounts">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.discounts"
              :min="0"
              :controls="false"
              size="mini"
              :style="{width:'80px'}"
              @change="handleChange(scope.row)"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计" width="60" prop="subtotal"></el-table-column>
        <el-table-column label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delDealList(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="deal-button">
      <el-button type="warning" @click="clearDeal">清空</el-button>
      <el-button type="primary" :style="{ width: '150px' }" @click="settleAccounts">确认</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'deal',
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
  methods: {
    ...mapActions('deal', ['sell']),
    ...mapActions('commodity', ['getByNo']),
    // 查询商品后添加到销售列表中
    addGoodInSell() {
      if (this.goodNo.length > 0) {
        const re = /^[0-9]{13}$/
        let tmp = this.goodNo.search(re)
        if (tmp > -1) {
          this.getByNo({ no: this.goodNo }).then(res => {
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
        this.sell({ record: this.dealRecords })
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
          this.sell({ record: this.dealRecords })
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
  },
  created() {
    document.addEventListener('keyup', this.keySale)
  },
  beforeDestroy() {
    document.removeEventListener('keyup',this.keySale)
  }
}
</script>

<style lang="scss">
.deal {
  .deal-input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .deal-sale {
      font-size: 160%;
      font-weight: bold;
    }
  }
  .deal-table {
    width: calc(100% - 20px);
    margin: 5px 10px;
  }
  .deal-button {
    margin-top: 5px;
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
