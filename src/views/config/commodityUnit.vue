<template>
  <div class="commodity-unit">
    <el-row>
      <el-button @click="getAllUnit">获取所有</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 90%" border>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'commodityUnit',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      currentPage: 1,
      total: 100,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  },
  computed: {
    ...mapState('commodityUnit', ['commodityUnitList'])
  },
  methods: {
    ...mapActions('commodityUnit', ['getAll']),
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {},
    getAllUnit() {
      console.log(this.commodityUnitList)
      console.log(this)
      let res = this.getAll()
      console.log('最外层', res)
    }
  }
}
</script>

<style lang="scss">
</style>
