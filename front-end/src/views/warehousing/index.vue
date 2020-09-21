<template>
  <div class="warehousing">
    <el-row class="warehousing-filter">
      <el-form
        ref="warehousingForm"
        :inline="true"
        :model="formFilter"
        class="warehousing-filter-form"
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
          <el-button @click="resetForm('warehousingForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      justify="start"
      class="warehousing-action"
    >
      <el-button
        size="small"
        type="primary"
        @click="onAdd"
      >新建</el-button>
    </el-row>
    <el-row class="warehousing-table">
      <el-table
        :data="warehousingFilterList"
        stripe
        border
        :height="winHeight-150"
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
          min-width="180"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="商品描述"
          min-width="180"
          prop="specification"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="商品类型"
          width="140"
          prop="varietyName"
        ></el-table-column>
        <el-table-column
          label="库存数量"
          width="100"
          prop="quantity"
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
      class="warehousing-dialog"
      @close="onClose"
      width="50%"
    >
      <el-form
        :model="createForm"
        ref="warehousingCreateForm"
        label-width="120px"
        size="small"
      >
        <el-row class="warehousing--dialog-form">
          <el-form-item
            label="商品编号"
            prop="no"
          >
            <el-input
              v-model="createForm.no"
              placeholder="请输入商品编号"
              :style="{ width: '90%' }"
              @keyup.enter.native="getCommodityByNo"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品名称"
            prop="name"
          >
            <span>{{createForm.name}}</span>
          </el-form-item>
          <el-form-item label="商品数">
            <el-input-number
              v-model="createForm.quantity"
              :min="0"
              placeholder="请输入商品数"
              :style="{ width: '90%' }"
            ></el-input-number>
          </el-form-item>
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
  name: 'warehousing',
  data() {
    return {
      formFilter: {
        no: '',
        name: '',
        variety: ''
      },
      warehousingFilterList: [],
      currentPage: 1,
      total: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      layout: 'total, sizes, prev, pager, next, jumper',
      dialogFormVisible: false,
      createForm: {}
    }
  },
  computed: {
    ...mapState(['winHeight']),
    ...mapState('warehousing', ['warehousingList']),
    ...mapState('goodsType', ['goodsTypeList']),
    dialogTitle() {
      return this.createForm.id === '' ? '新建商品库存' : '修改商品库存'
    }
  },
  methods: {
    ...mapActions('warehousing', ['getAllExtant', 'add', 'update', 'delete']),
    ...mapActions('commodity', ['getByNo']),
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
      this.warehousingFilterList = _.slice(
        this.warehousingList.filter(
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
    getCommodityByNo() {
      this.getByNo({ no: this.createForm.no }).then(res => {
        this.createForm.goodId = res.id
        this.createForm.name = res.name
      })
    },
    onSubmit() {
      if (this.createForm.goodId === '') {
        this.$message({
          type: 'warning ',
          message: '请输入商品码'
        })
      }
      if (this.createForm.id === '') {
        this.$refs['warehousingCreateForm'].validate(valid => {
          if (valid) {
            this.add(this.createForm).then(() => { this.onSearch() })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs['warehousingCreateForm'].validate(valid => {
          if (valid) {
            this.update({
              id: this.createForm.id,
              warehousing: this.createForm
            }).then(() => { this.onSearch() })
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
      this.warehousingFilterList = _.slice(
        this.warehousingList,
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    },
    onClose() {
      this.dialogFormVisible = false
      this.$refs['warehousingCreateForm'].resetFields()
      this.createForm = this.initCreateForm()
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
  },
  created() {
    this.getAllExtant().then(() => { this.onSearch() })
  }
}
</script>

<style lang="scss">
.warehousing-filter {
  padding: 5px 10px;
  .warehousing-filter-form {
    display: flex;
    justify-self: start;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.warehousing-action {
  padding: 5px 10px;
  display: flex;
  justify-self: start;
}
.warehousing-table {
  width: calc(100% - 20px);
  margin: 5px 10px;
}
.warehousing-dialog {
  .el-dialog__body {
    padding: 5px 10px;
  }
}
</style>
