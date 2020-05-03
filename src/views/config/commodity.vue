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
        <el-form-item label="商品编号" prop="no">
          <el-input v-model="formFilter.name" placeholder="请输入商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="formFilter.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品种类" prop="variety">
          <el-select v-model="formFilter.variety" placeholder="请选择">
            <el-option
              v-for="item in goodsTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="resetForm('commodityForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row justify="start" class="commodity-action">
      <el-button size="small" type="primary" @click="onAdd">新建</el-button>
    </el-row>
    <el-row class="commodity-table">
      <el-table :data="commodityList" stripe border :height="winHeight-150">
        >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="商品编号" width="180" prop="no"></el-table-column>
        <el-table-column label="商品名称" width="180" prop="name"></el-table-column>
        <el-table-column label="商品描述" min-width="180" prop="specification"></el-table-column>
        <el-table-column label="商品类型" width="180" prop="variety"></el-table-column>
        <el-table-column label="商品售价" width="180" prop="sell"></el-table-column>
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
      class="commodity-dialog"
      @close="onClose"
    >
      <el-form label-position="left" :model="createForm" ref="commodityCreateForm" size="small">
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
      createForm: {
        name: '',
        id: ''
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
    ...mapActions('goodsType', {
      getGoodsType: 'getAllExtant'
    }),
    ...mapActions('commodityUnit', {
      getCommodityUnit: 'getAllExtant'
    }),
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
      this.createForm.id = row.id
      this.createForm.name = row.name
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
      this.createForm.id = ''
      this.createForm.name = ''
    },
    onSubmit() {
      if (this.createForm.id === '') {
        this.add({ name: this.createForm.name })
      } else {
        this.update({ id: this.createForm.id, name: this.createForm.name })
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
      this.createForm.id = ''
    }
  },
  mounted() {
    if (this.commodityList.length <= 0) {
      this.getAllExtant()
    }
    if (this.goodsTypeList.length <= 0) {
      this.getGoodsType()
    }
    if (this.commodityUnitList.length <= 0) {
      this.getCommodityUnit()
    }
    this.commodityFilterList = _.slice(
      this.commodityList,
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    )
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
  .el-table__body {
    padding: 5px 10px;
  }
}
</style>
