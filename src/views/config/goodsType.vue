<template>
  <div class="goods-type">
    <el-row class="goods-type-filter">
      <el-form
        ref="goodsTypeForm"
        :inline="true"
        :model="formFilter"
        class="goods-type-filter-form"
        size="small"
      >
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="formFilter.name" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="resetForm('goodsTypeForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row justify="start" class="goods-type-action">
      <el-button size="small" type="primary" @click="onAdd">新建</el-button>
    </el-row>
    <el-row class="goods-type-table">
      <el-table :data="goodsTypeList" stripe border :height="winHeight-150">
        >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="类型名称" width="180" prop="name"></el-table-column>
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
      class="goods-type-dialog"
      @close="onClose"
    >
      <el-form label-position="left" :model="createForm" ref="goodsTypeCreateForm" size="small">
        <el-form-item label="类型" prop="name">
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
export default {
  name: 'goodsType',
  data() {
    return {
      formFilter: {
        name: ''
      },
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
    ...mapState('goodsType', ['goodsTypeList']),
    ...mapState(['winHeight']),
    dialogTitle() {
      return this.createForm.id === '' ? '新建商品类型' : '编辑商品类型'
    }
  },
  methods: {
    ...mapActions('goodsType', [
      'getAllExtant',
      'add',
      'update',
      'delete',
      'search'
    ]),
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
      this.delete({ id: row.id })
    },
    onSearch() {
      if (this.formFilter.name != null) {
        if (this.goodsTypeList.length > 0) {
          this.search({ name: this.formFilter.name })
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
        this.$message.error('商品类型名称不能为空')
      }
      if (this.createForm.id === '') {
        this.add({ name: this.createForm.name })
      } else {
        this.update({ id: this.createForm.id, name: this.createForm.name })
      }
      this.onClose()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onClose() {
      this.dialogFormVisible = false
      this.$refs['goodsTypeCreateForm'].resetFields()
      this.createForm.id = ''
    }
  },
  mounted() {
    if (this.goodsTypeList.length <= 0) {
      this.getAllExtant()
    }
  }
}
</script>

<style lang="scss">
.goods-type-filter {
  padding: 5px 10px;
  .goods-type-filter-form {
    display: flex;
    justify-self: start;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.goods-type-action {
  padding: 5px 10px;
  display: flex;
  justify-self: start;
}
.goods-type-table {
  width: calc(100% - 20px);
  margin: 5px 10px;
}
.goods-type-dialog {
  .el-table__body {
    padding: 5px 10px;
  }
}
</style>
