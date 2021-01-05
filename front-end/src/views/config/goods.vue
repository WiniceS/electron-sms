<template>
  <div class="goods">
    <el-row class="goods-filter">
      <el-form
        ref="commodityForm"
        :inline="true"
        :model="search"
        class="goods-filter-form"
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
          >查询</el-button>
          <el-button @click="resetForm('commodityForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      justify="start"
      class="goods-action"
    >
      <el-button
        size="small"
        type="primary"
        :style="{width:'100%'}"
        @click="handelAdd"
      >新建</el-button>
    </el-row>
    <el-row class="goods-table">
      <el-table
        :data="goodsList"
        stripe
        border
      >
        >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          label="商品编号"
          min-width="140"
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
          label="商品售价"
          min-width="100"
          prop="sell"
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
      class="goods-pagination"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <goods-dialog
      :dialog-visible="dialogVisible"
      :type="type"
      :info="dialogInfo"
      @close="handleDialogClose"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GoodsDialog from './components/goodsDialog'
import { getGoodsList, deleteGoods } from '@/api/goods'

export default {
  name: 'Goods',
  components: {
    GoodsDialog
  },
  data() {
    return {
      search: {
        no: '',
        name: '',
        variety: ''
      },
      loading: false,
      goodsList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      type: 'create',
      dialogInfo: {}
    }
  },
  computed: {
    ...mapState('config', ['typeOptions', 'unitOption'])
  },
  created() {
    this.handleSearch()
    if (this.typeOptions.length < 1) {
      this.$nextTick(() => {
        this.setTypeOptions()
      })
    }
    if (this.unitOption.length < 1) {
      this.$nextTick(() => {
        this.setUnitOptions()
      })
    }
  },
  methods: {
    ...mapActions('config', ['setTypeOptions', 'setUnitOptions']),
    // 请求方法
    query() {
      const request = Object.assign({
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }, this.search)
      this.loading = true
      getGoodsList(request).then(res => {
        this.total = res.total
        this.goodsList = res.data
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
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.handleSearch()
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
      this.dialogInfo = row
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods(row.id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleSearch()
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      })
    },
    handelAdd() {
      this.dialogVisible = true
      this.type = 'create'
      this.dialogInfo = {}
    },
    handleDialogClose(refresh) {
      this.dialogVisible = false
      this.dialogInfo = {}
      if (refresh) {
        this.handleSearch()
      }
    }
  }
}
</script>

<style lang="scss">
.goods-filter {
  padding: 5px 10px;
  .goods-filter-form {
    display: flex;
    justify-self: start;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.goods-action {
  padding: 5px 10px;
  display: flex;
  justify-self: start;
}
.goods-table {
  width: calc(100% - 20px);
  margin: 5px 10px;
}
.goods-pagination {
  text-align: right;
}
.delete-button {
  color: #f56c6c;
}
.delete-button:hover {
  color: lighten(#f56c6c, 10%);
}
</style>
