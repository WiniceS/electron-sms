<template>
  <div class="commodity-unit">
    <el-row class="commodity-unit-filter">
      <el-form
        ref="commodityUnitForm"
        :inline="true"
        :model="formFilter"
        class="commodity-unit-filter-form"
        size="small"
      >
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="formFilter.name" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="resetForm('commodityUnitForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row justify="start" class="commodity-unit-action">
      <el-button size="small" type="primary" @click="onAdd">新建</el-button>
    </el-row>
    <el-row class="commodity-unit-table">
      <el-table :data="commodityUnitFilterList" stripe border :height="winHeight-150">
        >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="单位名称" width="180" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      class="commodity-unit-dialog"
      @close="onClose"
    >
      <el-form label-position="left" :model="createForm" ref="commodityUnitCreateForm" size="small">
        <el-form-item label="单位" prop="name">
          <el-input v-model="createForm.name" autocomplete="off" style="width:70%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose" size="small">取 消</el-button>
        <el-button type="primary" @click="onSubmit" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'commodityUnit',
  data() {
    return {
      formFilter: {
        name: ''
      },
      filterValue: {},
      currentPage: 1,
      total: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      layout: 'total, sizes, prev, pager, next, jumper',
      dialogFormVisible: false,
      createForm: {
        name: '',
        id: ''
      }
    }
  },
  computed: {
    ...mapState('commodityUnit', ['commodityUnitList']),
    ...mapState(['winHeight']),
    dialogTitle() {
      return this.createForm.id === '' ? '新建商品单位' : '编辑商品单位'
    },
    commodityUnitFilterList() {
      if (this.filterValue.name === '') {
        return _.slice(
          this.commodityUnitList,
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        )
      } else {
        return _.slice(
          this.commodityUnitList.filter(
            f => f.name.indexOf(this.filterValue.name) >= 0
          ),
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        )
      }
    }
  },
  methods: {
    ...mapActions('commodityUnit', ['getAllExtant', 'add', 'update', 'delete']),
    createSearch() {
      this.filterValue = {
        name: ''
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.createForm.id = row.id
      this.createForm.name = row.name
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该单位, 是否继续?', '提示', {
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
      if (this.formFilter.name != null) {
        if (this.commodityUnitList.length > 0) {
          this.filterValue.name = this.formFilter.name
        }
      }
    },
    onAdd() {
      this.dialogFormVisible = true
      this.createForm.id = ''
      this.createForm.name = ''
    },
    onSubmit() {
      if (this.createForm.name === '') {
        this.$message.error('商品单位名称不能为空')
      }
      if (this.createForm.id === '') {
        this.add({ name: this.createForm.name })
      } else {
        this.update({ id: this.createForm.id, name: this.createForm.name })
      }
      this.onClose()
    },
    resetForm(formName) {
      this.filterValue = this.$refs[formName].resetFields()
      this.createSearch()
    },
    onClose() {
      this.dialogFormVisible = false
      this.$refs['commodityUnitCreateForm'].resetFields()
      this.createForm.id = ''
    }
  },
  mounted() {
    if (this.commodityUnitList.length <= 0) {
      this.getAllExtant()
    }
    this.createSearch()
  }
}
</script>

<style lang="scss">
.commodity-unit-filter {
  padding: 5px 10px;
  .commodity-unit-filter-form {
    display: flex;
    justify-self: start;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.commodity-unit-action {
  padding: 5px 10px;
  display: flex;
  justify-self: start;
}
.commodity-unit-table {
  width: calc(100% - 20px);
  margin: 5px 10px;
}
.commodity-unit-dialog {
  .el-table__body {
    padding: 5px 10px;
  }
}
</style>
