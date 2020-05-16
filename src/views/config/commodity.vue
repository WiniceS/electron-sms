<template>
  <div class="commodity">
    <el-row class="commodity-filter">
      <el-form
        ref="commodityForm"
        :inline="true"
        :model="formFilter"
        class="commodity-filter-form"
        size="small"
      >
        <el-form-item
          label="商品编号"
          prop="no"
        >
          <el-input
            v-model="formFilter.no"
            placeholder="请输入商品编号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品名称"
          prop="name"
        >
          <el-input
            v-model="formFilter.name"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品种类"
          prop="variety"
        >
          <el-select
            v-model="formFilter.variety"
            placeholder="请选择"
            :clearable="true"
          >
            <el-option
              v-for="item in goodsTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
          <el-button @click="resetForm('commodityForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      justify="start"
      class="commodity-action"
    >
      <el-button
        size="small"
        type="primary"
        @click="onAdd"
      >新建</el-button>
    </el-row>
    <el-row class="commodity-table">
      <el-table
        :data="commodityFilterList"
        stripe
        border
        :height="winHeight-150"
      >
        >
        <el-table-column
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column
          label="商品编号"
          width="180"
          prop="no"
        ></el-table-column>
        <el-table-column
          label="商品名称"
          width="180"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="商品描述"
          min-width="180"
          prop="specification"
        ></el-table-column>
        <el-table-column
          label="商品类型"
          width="180"
          prop="varietyName"
        ></el-table-column>
        <el-table-column
          label="商品售价"
          width="180"
          prop="sell"
        ></el-table-column>
        <el-table-column
          label="操作"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
    ></el-pagination>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      class="commodity-dialog"
      @close="onClose"
      width="70%"
    >
      <el-form
        :model="createForm"
        :rules="rules"
        ref="commodityCreateForm"
        label-width="120px"
        size="small"
      >
        <el-row class="commodity--dialog-form">
          <el-col :span="12">
            <el-form-item
              label="商品编号"
              prop="no"
            >
              <el-input
                v-model="createForm.no"
                placeholder="请输入商品编号"
                :style="{ width: '90%' }"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品名称"
              prop="name"
            >
              <el-input
                v-model="createForm.name"
                placeholder="请输入商品名称"
                :style="{ width: '90%' }"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品规格"
              prop="specification"
            >
              <el-input
                v-model="createForm.specification"
                placeholder="请输入商品规格"
                :style="{ width: '90%' }"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品单位"
              prop="unit"
            >
              <el-select
                v-model="createForm.unit"
                placeholder="请选择单位"
                :style="{ width: '90%' }"
              >
                <el-option
                  v-for="item in commodityUnitList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="商品品种"
              prop="variety"
            >
              <el-select
                v-model="createForm.variety"
                placeholder="请选择品类"
                :style="{ width: '90%' }"
              >
                <el-option
                  v-for="item in goodsTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="商品售价"
              prop="sell"
            >
              <el-input
                v-model="createForm.sell"
                placeholder="请输入商品售价"
                :style="{ width: '90%' }"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="商品成本"
              prop="cost"
            >
              <el-input
                v-model="createForm.cost"
                placeholder="请输入商品成本"
                :style="{ width: '90%' }"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="父商品编号">
              <el-input
                v-model="createForm.parentNo"
                placeholder="请输入父商品编号"
                :style="{ width: '90%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="关系比例">
              <el-input-number
                v-model="createForm.radio"
                placeholder="请输入关系比例"
                :style="{ width: '90%' }"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="onClose"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
          size="small"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'commodity',
  data() {
    return {
      formFilter: {
        no: '',
        name: '',
        variety: ''
      },
      commodityFilterList: [],
      currentPage: 1,
      total: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      layout: 'total, sizes, prev, pager, next, jumper',
      dialogFormVisible: false,
      createForm: {},
      rules: {
        no: [
          { required: true, message: '请输入商品编号', trigger: 'blur' },
          { min: 13, max: 13, message: '长度13个字符', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        specification: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        variety: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState('commodity', ['commodityList']),
    ...mapState('goodsType', ['goodsTypeList']),
    ...mapState('commodityUnit', ['commodityUnitList']),
    ...mapState(['winHeight']),
    dialogTitle() {
      return this.createForm.id === '' ? '新建商品' : '编辑商品'
    }
  },
  methods: {
    ...mapActions('commodity', ['getAllExtant', 'add', 'update', 'delete']),
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.onSearch()
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.createForm = row
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete({ id: row.id })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      })
    },
    onSearch() {
      this.commodityFilterList = _.slice(
        this.commodityList.filter(
          f =>
            (this.formFilter.name === ''
              ? true
              : f.name.indexOf(this.formFilter.name) >= 0) &&
            (this.formFilter.no === ''
              ? true
              : f.no.indexOf(this.formFilter.no) >= 0) &&
            (this.formFilter.variety === ''
              ? true
              : f.variety === this.formFilter.variety)
        ),
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    },
    onAdd() {
      this.dialogFormVisible = true
      this.createForm = this.initCreateForm()
    },
    onSubmit() {
      if (this.createForm.id === '') {
        this.$refs['commodityCreateForm'].validate(valid => {
          if (valid) {
            this.add(this.createForm).then(() => {
              this.onSearch()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs['commodityCreateForm'].validate(valid => {
          if (valid) {
            this.update({ id: this.createForm.id, commodity: this.createForm }).then(() => {
              this.onSearch()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
      this.onClose()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.commodityFilterList = _.slice(
        this.commodityList,
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    },
    onClose() {
      this.dialogFormVisible = false
      this.$refs['commodityCreateForm'].resetFields()
      this.createForm = this.initCreateForm()
    },
    initCreateForm() {
      return {
        name: '',
        id: '',
        no: '',
        specification: '',
        unit: '',
        variety: '',
        sell: 0.0,
        cost: 0.0,
        parentId: '',
        parentNo: '',
        radio: 0
      }
    }
  },
  mounted() {
    if (this.commodityList.length <= 0) {
      this.getAllExtant()
    }
    this.onSearch()
  }

}
</script>

<style lang="scss">
.commodity-filter {
  padding: 5px 10px;
  .commodity-filter-form {
    display: flex;
    justify-self: start;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.commodity-action {
  padding: 5px 10px;
  display: flex;
  justify-self: start;
}
.commodity-table {
  width: calc(100% - 20px);
  margin: 5px 10px;
}
.commodity-dialog {
  .el-dialog__body {
    padding: 5px 10px;
  }
}
</style>
