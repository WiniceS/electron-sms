<template>
  <div class="goods-type">
    <el-row class="goods-type-filter">
      <el-form
        ref="typeSearchForm"
        :inline="true"
        :model="search"
        class="goods-type-filter-form"
        size="small"
      >
        <el-form-item
          label="类型名称"
          prop="name"
        >
          <el-input
            v-model="search.name"
            placeholder="请输入类型名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <el-button @click="resetForm('typeSearchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      justify="start"
      class="goods-type-action"
    >
      <el-button
        size="small"
        type="primary"
        :style="{width:'100%'}"
        @click="onAdd"
      >新建</el-button>
    </el-row>
    <el-row class="goods-type-table">
      <el-table
        :data="typesList"
        stripe
        border
      >
        >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          label="类型名称"
          min-width="180"
          prop="name"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="true"
      class="goods-type-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      class="goods-type-dialog"
      @close="onClose"
    >
      <el-form
        ref="typeForm"
        label-position="left"
        :model="form"
        size="small"
      >
        <el-form-item
          label="类型"
          prop="name"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width:70%"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="onClose"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="onSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getTypes, deleteType, addType, updateType } from '@/api/types'
export default {
  name: 'Types',
  data() {
    return {
      search: {
        name: ''
      },
      typesList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      type: 'create',
      dialogVisible: false,
      loading: false,
      dialogLoading: false,
      form: {
        name: '',
        id: ''
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.type === 'create' ? '新建商品类型' : '编辑商品类型'
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    ...mapActions('config', ['setTypeOptions']),
    // 请求方法
    query() {
      const request = Object.assign({
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }, this.search)
      this.loading = true
      getTypes(request).then(res => {
        this.total = res.total
        this.typesList = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSearch() {
      if (!this.loading) {
        this.query()
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleSearch()
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.type = 'edit'
      this.form.id = row.id
      this.form.name = row.name
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          deleteType(row.id).then(() => {
            this.loading = false
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleSearch()
            this.setTypeOptions()
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    onAdd() {
      this.dialogVisible = true
      this.type = 'create'
      this.form.id = ''
      this.form.name = ''
    },
    onSubmit() {
      if (this.form.name === '') {
        this.$message.error('商品类型名称不能为空')
      }
      if (this.type === 'create') {
        this.dialogLoading = true
        addType(this.form).then(() => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.onClose()
          this.handleSearch()
          this.setTypeOptions()
          this.dialogLoading = false
        })
      } else {
        this.dialogLoading = true
        updateType({ id: this.from.id, type: this.form }).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.onClose()
          this.handleSearch()
          this.setTypeOptions()
          this.dialogLoading = false
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.handleSearch()
    },
    onClose() {
      this.dialogVisible = false
      this.$refs['typeForm'].resetFields()
      this.form.id = ''
      this.form.name = ''
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
  .el-dialog__body {
    padding: 5px 10px;
  }
}

.goods-type-pagination {
  text-align: right;
}
.delete-button {
  color: #f56c6c;
}
.delete-button:hover {
  color: lighten(#f56c6c, 10%);
}
</style>
