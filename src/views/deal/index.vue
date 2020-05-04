<template>
  <div class="deal">
    <el-row class="deal-input">
      <el-input class="deal-input-goodid" v-model="goodId" placeholder="请输入商品编号"></el-input>
      <el-button class="deal-input-add" type="primary" @click="addGoodInSell">添加</el-button>
    </el-row>
    <el-row>
      <span>合计:{{sale}}</span>
    </el-row>
    <el-row class="commodity-table">
      <el-table :data="commodityFilterList" stripe border :height="winHeight-150">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="商品编号" width="180" prop="no"></el-table-column>
        <el-table-column label="商品名称" width="180" prop="name"></el-table-column>
        <el-table-column label="商品描述" min-width="180" prop="specification"></el-table-column>
        <el-table-column label="商品类型" width="180" prop="varietyName"></el-table-column>
        <el-table-column label="商品售价" width="180" prop="sell"></el-table-column>
        <el-table-column label="商品数量" width="180" prop="quantity">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.quantity" @change="handleChange" :min="0"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="优惠" width="180" prop="discounts">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.discounts"
              @change="handleChange"
              :min="0"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="60">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delDealList(scope.row.good_id)">删除</el-button>
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
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'deal',
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
    ...mapActions('deal', ['sell']),
    ...mapActions('commodity', ['getByNo']),
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
    // 删除一行销售商品
    handleDelete(id) {
      this.delDealList(id)
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
.deal {
  display: none;
  .deal-input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .deal-input-id {
      width: 700px;
      display: flex;
      justify-content: space-between;

      .deal-input-goodid {
        width: 500px;
      }

      .deal-input-add {
        width: 150px;
      }
    }
  }

  .deal-button {
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .deal-sale {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
