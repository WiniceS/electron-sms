<template>
  <div class="inventory">
    <el-row class="inventory-filter">
      <el-form
        ref="inventoryForm"
        :inline="true"
        :model="search"
        class="inventory-filter-form"
        size="small"
      >
        <el-form-item
          label="商品编号"
          prop="no"
        >
          <el-input
            v-model="search.no"
            placeholder="请输入商品编号"
          />
        </el-form-item>
        <el-form-item
          label="商品名称"
          prop="name"
        >
          <el-input
            v-model="search.name"
            placeholder="请输入商品名称"
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
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询
          </el-button>
          <el-button @click="resetForm('inventoryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      justify="start"
      class="inventory-action"
    >
      <el-button
        size="small"
        type="primary"
        :style="{width:'100%'}"
        @click="handleAdd"
      >新建
      </el-button>
    </el-row>
    <el-row>
      <el-col :span="12">
        <ve-bar
          :data="maxChartData"
          :title="maxChart.title"
          :settings="chartSettings"
          :legend-visible="false"
        />
      </el-col>
      <el-col :span="12">
        <ve-bar
          :data="minChartData"
          :title="minChart.title"
          :settings="chartSettings"
          :legend-visible="false"
        />
      </el-col>
    </el-row>
    <el-row class="inventory-table">
      <el-table
        :data="inventoriesList"
        stripe
        border
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          label="商品编号"
          min-width="180"
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
          min-width="140"
          prop="varietyName"
        />
        <el-table-column
          label="库存数量"
          min-width="100"
          prop="quantity"
        />
        <el-table-column
          label="操作"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      class="inventory-pagination"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      class="inventory-dialog"
      @close="onClose"
    >
      <el-form
        ref="inventoryForm"
        :model="form"
        label-width="120px"
        size="small"
      >
        <el-row class="inventory--dialog-form">
          <el-form-item
            label="商品编号"
            prop="no"
          >
            <el-input
              v-model="form.no"
              placeholder="请输入商品编号"
              :style="{ width: '90%' }"
              @keyup.enter.native="getCommodityByNo"
            />
          </el-form-item>
          <el-form-item
            label="商品名称"
            prop="name"
          >
            <span>{{ form.name }}</span>
          </el-form-item>
          <el-form-item label="商品数">
            <el-input-number
              v-model="form.quantity"
              :min="0"
              placeholder="请输入商品数"
              :style="{ width: '90%' }"
            />
          </el-form-item>
        </el-row>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="onClose"
        >取 消
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="onSubmit"
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  getInventories,
  deleteInventory,
  addInventory,
  updateInventory,
  getInventoryStatistics
} from '@/api/inventories'
import { getGoodByNo } from '@/api/goods'
import 'echarts/lib/component/title'

export default {
  name: 'Inventory',
  data() {
    return {
      // 搜索栏
      search: {
        no: '',
        name: '',
        variety: ''
      },
      // 库存数据
      inventoriesList: [],
      // 当前页
      currentPage: 1,
      // 总条数
      total: 0,
      // 每页数
      pageSize: 10,
      // 弹窗类型
      type: 'create',
      loading: false,
      dialogLoading: false,
      dialogVisible: false,
      // 弹窗表单内容
      form: {
        no: '',
        name: '',
        quantity: 0
      },
      maxChartData: {
        columns: ['name', 'number'],
        rows: []
      },
      maxChart: {
        title: {
          text: '最多库存TOP',
          left: 'center'
        }
      },
      minChartData: {
        columns: ['name', 'number'],
        rows: []
      },
      minChart: {
        title: {
          text: '最少库存TOP',
          left: 'center'
        }
      },
      chartSettings: {
        labelMap: {
          name: '商品名称',
          number: '库存数量'
        }
      }
    }
  },
  computed: {
    ...mapState('config', ['typeOptions']),
    dialogTitle() {
      return this.type === 'create' ? '新建商品库存' : '修改商品库存'
    }
  },
  created() {
    this.handleSearch()
    this.getInventoryTop()
    if (this.typeOptions.length < 1) {
      this.$nextTick(() => {
        this.setTypeOptions()
      })
    }
  },
  methods: {
    ...mapActions('config', ['setTypeOptions']),
    // 查询方法
    query() {
      const request = Object.assign({
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }, this.search)
      this.loading = true
      getInventories(request).then(res => {
        this.total = res.total
        this.inventoriesList = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询按钮
    handleSearch() {
      if (!this.loading) {
        this.query()
      }
    },
    // 改变每页数
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.handleSearch()
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleSearch()
    },
    // 编辑方法
    handleEdit(index, row) {
      this.dialogVisible = true
      this.type = 'edit'
      this.form = row
    },
    // 删除方法
    handleDelete(index, row) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteInventory(row.id)
          .then(() => {
            this.loading = false
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleSearch()
          })
          .catch(() => {
            this.loading = false
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      })
    },
    // 添加方法
    handleAdd() {
      this.dialogVisible = true
      this.type = 'create'
      this.form = this.initCreateForm()
    },
    // 获取表单数据
    getInventoryTop() {
      const top = 10
      getInventoryStatistics({ top }).then(res => {
        this.minChartData.rows = res.minInventoryTop.reverse()
        this.maxChartData.rows = res.maxInventoryTop.reverse()
      }).catch(err => {
        console.error(err)
      })
    },
    // 根据商品编号获取商品信息
    getCommodityByNo() {
      getGoodByNo(this.form.no).then(res => {
        this.form.goodId = res.id
        this.form.name = res.name
      })
    },
    // 提交新增的商品库存
    onSubmit() {
      if (this.form.goodId === '') {
        this.$message({
          type: 'warning ',
          message: '请输入商品码'
        })
      }
      // 新增
      if (this.form.id === '') {
        this.$refs['inventoryForm'].validate(valid => {
          if (valid) {
            addInventory(this.form).then(() => {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.onClose()
              this.handleSearch()
              this.getInventoryTop()
              this.dialogLoading = false
            }).catch(() => {
              this.dialogLoading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        // 更新
        this.$refs['inventoryForm'].validate(valid => {
          if (valid) {
            this.dialogLoading = true
            updateInventory({ id: this.form.id, inventory: this.form }).then(() => {
              this.$message({
                type: 'success',
                message: '更新成功'
              })
              this.onClose()
              this.handleSearch()
              this.getInventoryTop()
              this.dialogLoading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.handleSearch()
    },
    onClose() {
      this.dialogVisible = false
      this.$refs['inventoryForm'].resetFields()
      this.form = this.initCreateForm()
    },
    initCreateForm() {
      return {
        name: '',
        goodId: '',
        id: '',
        no: '',
        quantity: 0
      }
    }
  }
}
</script>

<style lang="scss">
.inventory-filter {
  padding: 5px 10px;

  .inventory-filter-form {
    display: flex;
    justify-self: start;

    .el-form-item {
      margin-bottom: 0;
    }
  }
}

.inventory-action {
  padding: 5px 10px;
  display: flex;
  justify-self: start;
}

.inventory-table {
  width: calc(100% - 20px);
  margin: 5px 10px;
}

.inventory-dialog {
  .el-dialog__body {
    padding: 5px 10px;
  }
}

.inventory-pagination {
  text-align: right;
}

.delete-button {
  color: #f56c6c;
}

.delete-button:hover {
  color: lighten(#f56c6c, 10%);
}
</style>
