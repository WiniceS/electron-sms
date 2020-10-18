<template>
  <div class="goods-unit">
    <el-row class="goods-unit-filter">
      <el-form
        ref="unitSearchForm"
        :inline="true"
        :model="search"
        class="goods-unit-filter-form"
        size="small"
      >
        <el-form-item
          label="单位名称"
          prop="name"
        >
          <el-input
            v-model="search.name"
            placeholder="请输入单位名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <el-button @click="resetForm('unitSearchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      justify="start"
      class="goods-unit-action"
    >
      <el-button
        size="small"
        type="primary"
        :style="{width:'100%'}"
        @click="onAdd"
      >新建</el-button>
    </el-row>
    <el-row class="goods-unit-table">
      <el-table
        :data="unitsList"
        stripe
        border
      >
        >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          label="单位名称"
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
      class="goods-unit-pagination"
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
      class="goods-unit-dialog"
      @close="onClose"
    >
      <el-form
        ref="unitForm"
        label-position="left"
        :model="form"
        size="small"
      >
        <el-form-item
          label="单位"
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
import { getUnits, deleteUnit, addUnit, updateUnit } from '@/api/units'
export default {
  name: 'Units',
  data() {
    return {
      search: {
        name: ''
      },
      unitsList: [],
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
      return this.type === 'create' ? '新建商品单位' : '编辑商品单位'
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    ...mapActions('config', ['setUnitOptions']),
    query() {
      const request = Object.assign({
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }, this.search)
      this.loading = true
      getUnits(request).then(res => {
        this.total = res.total
        this.unitsList = res.data
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
      this.$confirm('此操作将删除该单位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          deleteUnit(row.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          this.handleSearch()
          this.setUnitOptions()
        })
        .catch(() => { this.loading = false })
    },
    onAdd() {
      this.dialogVisible = true
      this.type = 'create'
      this.form.id = ''
      this.form.name = ''
    },
    onSubmit() {
      if (this.form.name === '') {
        this.$message.error('商品单位名称不能为空')
      }
      if (this.type === 'create') {
        this.dialogLoading = true
        addUnit(this.form).then(() => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.onClose()
          this.handleSearch()
          this.setUnitOptions()
          this.dialogLoading = false
        })
      } else {
        this.dialogLoading = true
        updateUnit({
          id: this.form.id,
          unit: this.form
        }).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.onClose()
          this.handleSearch()
          this.setUnitOptions()
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
      this.$refs['unitForm'].resetFields()
      this.form.id = ''
      this.form.name = ''
    }
  }
}
</script>

<style lang="scss">
.goods-unit-filter {
  padding: 5px 10px;
  .goods-unit-filter-form {
    display: flex;
    justify-self: start;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.goods-unit-action {
  padding: 5px 10px;
  display: flex;
  justify-self: start;
}
.goods-unit-table {
  width: calc(100% - 20px);
  margin: 5px 10px;
}
.goods-unit-dialog {
  .el-dialog__body {
    padding: 5px 10px;
  }
}
.goods-unit-pagination {
  text-align: right;
}
.delete-button {
  color: #f56c6c;
}
.delete-button:hover {
  color: lighten(#f56c6c, 10%);
}
</style>
