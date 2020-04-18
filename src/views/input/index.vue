<template>
  <div class="goods-input" :style="{ height: winHeight - 70 + 'px' }">
    <el-row class="goods-input-header">
      <el-col :span="16">
        <el-input v-model="goodsInputForm.goodId" placeholder="请输入商品编号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="getGood">查询</el-button>
      </el-col>
      <el-col :span="4" :offset="2">
        <el-button type="primary" @click="open">查看入库记录</el-button>
      </el-col>
    </el-row>
    <el-row class="goods-input-form" :style="{ height: winHeight - 120 + 'px' }">
      <el-form :model="goodsInputForm" :rules="rules" ref="goodsInputForm" label-width="120px">
        <el-row class="goods-input-form-body">
          <el-form-item label="商品编号" prop="goodId">
            <el-input
              v-model="goodsInputForm.goodId"
              placeholder="请输入商品编号"
              :style="{ width: '90%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodName">
            <el-input
              v-model="goodsInputForm.goodName"
              placeholder="请输入商品名称"
              :style="{ width: '90%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="goodSpecification">
            <el-input
              v-model="goodsInputForm.goodSpecification"
              placeholder="请输入商品规格"
              :style="{ width: '90%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品单位" prop="goodUnit">
            <el-select
              v-model="goodsInputForm.goodUnit"
              placeholder="请选择单位"
              :style="{ width: '90%' }"
            >
              <el-option
                v-for="item in unitOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品种" prop="goodVariety">
            <el-select
              v-model="goodsInputForm.goodVariety"
              placeholder="请选择品类"
              :style="{ width: '90%' }"
            >
              <el-option
                v-for="item in varietyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品售价" prop="goodSell">
            <el-input
              v-model="goodsInputForm.goodSell"
              placeholder="请输入商品售价"
              :style="{ width: '90%' }"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品成本" prop="goodCost">
            <el-input
              v-model="goodsInputForm.goodCost"
              placeholder="请输入商品成本"
              :style="{ width: '90%' }"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goodNumber">
            <el-input-number
              v-model="goodsInputForm.goodNumber"
              placeholder="请输入商品数量"
              :style="{ width: '90%' }"
              :min="0"
              :max="9999"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="有无父商品" prop="havfather">
            <el-radio v-model="goodsInputForm.havfather" label="0">没有父商品</el-radio>
            <el-radio v-model="goodsInputForm.havfather" label="1">有父商品</el-radio>
          </el-form-item>
          <el-form-item label="父商品编号">
            <el-input
              v-model="goodsInputForm.fatherGoodId"
              :disabled="goodsInputForm.havfather == '0'"
              placeholder="请输入子商品编号"
              :style="{ width: '90%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="关系比例">
            <el-input-number
              v-model="goodsInputForm.ratio"
              :disabled="goodsInputForm.havfather == '0'"
              placeholder="请输入关系比例"
              :style="{ width: '90%' }"
            ></el-input-number>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('goodsInputForm')">
            {{
            isNew ? '商品入库' : '更新商品'
            }}
          </el-button>
          <el-button
            type="warning"
            :style="{ marginLeft: '50px' }"
            @click="resetForm('goodsInputForm')"
          >清空</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-dialog
      title="最近添加记录"
      :visible.sync="dialogVisible"
      width="80%"
      top="10vh"
      :before-close="handleClose"
    >
      <el-row :style="{ padding: '5px' }">
        <el-col :span="16">
          <el-input v-model="recordGoodId" placeholder="请输入商品编号"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button type="primary" :style="{ width: '100%' }" @click="toSearchRecord">查询</el-button>
        </el-col>
      </el-row>
      <el-row class="goods-input-table">
        <el-table :data="goodsInputData" stripe :height="winHeight * 0.45" border>
          <el-table-column
            prop="good_id"
            label="商品编号"
            header-align="center"
            align="center"
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            prop="good_name"
            label="商品名称"
            align="center"
            header-align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="good_specification"
            label="商品规格"
            align="center"
            header-align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="good_sell"
            label="商品售价"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="good_cost"
            label="商品成本"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="good_number"
            label="商品数量"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="入库时间"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="160"
          ></el-table-column>
          <el-table-column
            label="操作"
            header-align="center"
            align="center"
            show-overflow-tooltip
            width="150"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="primay" @click="handleEdit(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.goodsId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentSize"
          :style="{ textAlign: 'right', margin: '5px 0' }"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Input',
  data() {
    return {
      goodsInputForm: {
        goodId: '',
        goodName: '',
        goodSpecification: '',
        goodUnit: '',
        havfather: '0',
        goodVariety: '',
        fatherGoodId: '',
        goodSell: 0,
        goodCost: 0,
        goodNumber: 0,
        ratio: 0
      },
      rules: {
        goodId: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ],
        goodName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goodSpecification: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        goodUnit: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        goodVariety: [
          { required: true, message: '请选择品类', trigger: 'change' }
        ],
        goodSell: [
          { required: true, message: '请输入商品售价', trigger: 'blur' }
        ],
        goodCost: [
          { required: true, message: '请输入商品成本', trigger: 'blur' }
        ],
        goodNumber: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        havfather: [{ required: true, message: '请确认关系', trigger: 'blur' }]
      },
      dialogVisible: false,
      isNew: true,
      recordGoodId: ''
    }
  },
  computed: {
    ...mapState(['winHeight']),
    ...mapState('input', [
      'goodsInputData',
      'varietyOption',
      'unitOption',
      'goodInfo',
      'total',
      'pageSize',
      'currentSize'
    ])
  },
  methods: {
    ...mapActions('input', [
      'getGoodInfoById',
      'getGoodInfo',
      'delGoodById',
      'updateGoodById',
      'addGood'
    ]),
    ...mapMutations('input', {
      setPageSize: 'SET_PAGESIZE',
      setCurrentSize: 'SET_CURRENTSIZE'
    }),
    // 获取商品信息
    getGood() {
      const re = /^[0-9]{13}$/
      let tmp = this.goodsInputForm.goodId.search(re)
      if (tmp > -1) {
        this.getGoodInfoById({ id: this.goodsInputForm.goodId }).then(res => {
          if (res.length > 0) {
            this.goodsInputForm.goodName = res.good_name
            this.goodsInputForm.goodSpecification = res.good_specification
            this.goodsInputForm.goodUnit = res.good_unit
            this.goodsInputForm.goodVariety = res.good_variety
            this.goodsInputForm.goodSell = res.good_sell
            this.goodsInputForm.goodCost = res.good_cost
            this.goodsInputForm.goodNumber = res.good_number
            this.isNew = false
          } else {
            this.isNew = true
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '输入的商品编号不正确'
        })
      }
    },
    // 提交表单
    submitForm() {
      // this.getGoodInfoById({ id: this.goodsInputForm.goodsId });
      this.$refs['goodsInputForm'].validate(valid => {
        if (valid) {
          if (this.isNew) {
            this.addGood(this.goodsInputForm)
              .then(() => {
                this.resetForm('goodsInputForm')
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
              })
              .catch(e => {
                console.log(e)
                this.$message({
                  type: 'error',
                  message: '新增失败'
                })
              })
          } else {
            this.updateGoodById(this.goodsInputForm)
              .then(() => {
                this.resetForm('goodsInputForm')
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
              })
              .catch(e => {
                console.log(e)
                this.$message({
                  type: 'error',
                  message: '更新失败'
                })
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置商品输入信息
    resetForm(formName) {
      console.log('重置商品信息')
      this.$refs[formName].resetFields()
      this.goodsInputForm = {
        goodId: '',
        goodName: '',
        goodSpecification: '',
        goodUnit: '',
        goodVariety: '',
        goodSell: 0,
        goodCost: 0,
        goodNumber: 0,
        havfather: '0',
        fatherGoodId: '',
        ratio: 0
      }
      this.isNew = true
    },
    // 打开入库详情页面
    open() {
      this.dialogVisible = true
      this.setPageSize(10)
      this.setCurrentSize(1)
      this.getGoodInfo({ id: this.recordGoodId })
    },
    // 改变每页数
    handleSizeChange(size) {
      this.setPageSize(size)
      this.setCurrentSize(1)
      this.getGoodInfo({ id: this.recordGoodId })
    },
    // 改变当前页数
    handleCurrentChange(page) {
      this.setCurrentSize(page)
      this.getGoodInfo({ id: this.recordGoodId })
    },
    // 关闭弹窗
    handleClose(done) {
      this.recordGoodId = ''
      done()
    },
    // 关闭弹窗
    close() {
      this.recordGoodId = ''
      this.dialogVisible = false
    },
    // 弹窗查询按钮
    toSearchRecord() {
      this.getGoodInfo({ id: this.recordGoodId })
    },
    // 修改商品信息
    handleEdit(item) {
      this.goodsInputForm.goodId = item.good_id
      this.goodsInputForm.goodName = item.good_name
      this.goodsInputForm.goodSpecification = item.good_specification
      this.goodsInputForm.goodUnit = item.good_unit
      this.goodsInputForm.goodVariety = item.good_variety
      this.goodsInputForm.goodSell = item.good_sell
      this.goodsInputForm.goodCost = item.good_cost
      this.goodsInputForm.goodNumber = item.good_number
      this.goodsInputForm.havfather = item.havfather
      this.goodsInputForm.fatherGoodId = item.father_good_id
      this.goodsInputForm.ratio = item.ratio
      this.isNew = false
      this.dialogVisible = false
    },
    // 根据id删除商品
    // TODO 还没调试过
    handleDelete(id) {
      this.$confirm(
        '此操作会删除其商品，库存中将不再有此商品，是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.delGoodById({
            id
          }).catch(e => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
            console.log(e)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.goods-input {
  background-color: #fff;

  .goods-input-header {
    width: 100%;
    padding: 10px 10px;
  }

  .goods-input-form {
    width: 100%;
    padding: 10px 10px;

    &-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .el-form-item {
        width: 50%;
      }
    }
  }

  .goods-input-table {
    flex: auto;
    padding: 10px 5px;
  }
}
</style>
