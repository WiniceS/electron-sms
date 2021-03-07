<template>
  <div class="income-and-outgoings">
    <el-row :gutter="20">
      <el-col
        :span="12"
        @click.native="handleAddIncome"
      >
        <block-card
          class=" income-and-outgoings-card"
          :icon="income.icon"
          :label="income.label"
          :number="income.number"
        />
      </el-col>
      <el-col
        :span="12"
        @click.native="handleAddOutgoing"
      >
        <block-card
          class=" income-and-outgoings-card"
          :icon="outgoings.icon"
          :label="outgoings.label"
          :number="outgoings.number"
        />
      </el-col>
    </el-row>
    <el-row class="income-and-outgoings-form">
      <el-form
        ref="incomeAndOutgoingForm"
        :inline="true"
        :model="search"
        class="goods-filter-form"
        size="small"
      >
        <el-form-item
          label="时间"
          prop="time"
        >
          <el-date-picker
            v-model="search.time"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            :clearable="false"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="开始时间"
            format="yyyy/MM/dd"
          />
        </el-form-item>
        <el-form-item
          label="类型"
          prop="variety"
        >
          <el-select
            v-model="search.type"
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
        <el-form-item
          label="种类"
          prop="no"
        >
          <el-select
            v-model="search.kind"
            placeholder="请选择"
            :clearable="true"
          >
            <el-option
              v-for="item in kindOptions"
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
          <el-button @click="resetForm('incomeAndOutgoingForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="income-and-outgoings-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          label="日期"
          min-width="180"
          prop="date"
        />
        <el-table-column
          label="金额"
          min-width="180"
        >
          <template slot-scope="scope">
            <div :class="`income-and-outgoings-${scope.row.showType===0?'outgoing':'income'}`">{{ scope.row.number }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          min-width="180"
          prop="typeName"
        >
          <template slot-scope="scope">
            <span>{{ showTypeName(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="form"
        label-width="80px"
      >
        <el-form-item label="金额">
          <el-input-number v-model="form.number" />
        </el-form-item>
        <el-form-item :label="typeLabel">
          <el-select
            v-model="form.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleRecord"
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BlockCard from '@/components/BlockCard'
import { getIncomeAndOutgoingStatistics } from '@/api/statistice'
import { getList, del, add, update } from '@/api/incomeAndOutgoing'

const incomeOption = [
  { label: '销售', value: '0' },
  { label: '麻将', value: '1' },
  { label: '其他', value: '2' }]
const outgoingOption = [
  { label: '进货', value: '0' },
  { label: '水电', value: '1' },
  { label: '其他', value: '2' }]

export default {
  name: 'IncomeAndOutgoings',
  components: {
    BlockCard
  },
  data() {
    return {
      income: {
        icon: '',
        label: '今日收入（元）',
        number: 0
      },
      outgoings: {
        icon: '',
        label: '今日支出（元）',
        number: 0
      },
      search: {
        time: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7).toLocaleDateString(),
          new Date(new Date().getTime() + 3600 * 1000 * 24 * 1).toLocaleDateString()
        ],
        kind: '',
        type: ''
      },
      typeOptions: [
        { label: '收入', value: 'income' },
        { label: '支出', value: 'outgoing' }
      ],
      dialogVisible: false,
      dialogType: 'income',
      isEdit: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      form: {
        number: 0,
        type: '0'
      },
      tableData: [],
      loading: false
    }
  },
  computed: {
    dialogTitle() {
      return this.dialogType === 'income' ? `${this.isEdit ? '修改' : '新增'}收入` : `${this.isEdit ? '修改' : '新增'}支出`
    },
    typeLabel() {
      return this.dialogType === 'income' ? '收入类型' : '支出类型'
    },
    options() {
      return this.dialogType === 'income' ? incomeOption : outgoingOption
    },
    kindOptions() {
      if (this.search.type === 'income') {
        return incomeOption
      } else if (this.search.type === 'outgoing') {
        return outgoingOption
      } else {
        return []
      }
    }
  },
  created() {
    this.getStatistics()
    this.query()
  },
  methods: {
    // 请求方法
    query() {
      const request = Object.assign({
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        startTime: this.search.time[0],
        endTime: this.search.time[1]
      }, this.search)
      this.loading = true
      delete request.time
      getList(request).then(res => {
        this.total = res.total
        this.tableData = res.data
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
    getStatistics() {
      getIncomeAndOutgoingStatistics().then(res => {
        this.income.number = res.todayIncome
        this.outgoings.number = res.todayOutgoing
      }).catch(err => {
        console.error(err)
      })
    },
    handleAddIncome() {
      this.dialogType = 'income'
      this.dialogVisible = true
      this.isEdit = false
      this.form = {
        id: '',
        number: 0,
        type: '0'
      }
    },
    handleAddOutgoing() {
      this.dialogType = 'outgoing'
      this.dialogVisible = true
      this.isEdit = false
      this.form = {
        id: '',
        number: 0,
        type: '0'
      }
    },
    handleRecord() {
      if (!this.isEdit) {
        this.addIncomeOrOutgoing()
      } else {
        this.modifyIncomeOrOutgoing()
      }
    },
    //  添加收入或者支出
    addIncomeOrOutgoing() {
      add({
        info: this.form,
        type: this.dialogType
      }).then(() => {
        this.dialogVisible = false
        this.query()
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }).catch(err => {
        console.error(err)
      })
    },
    //  修改收入或者支出
    modifyIncomeOrOutgoing() {
      update({
        id: this.form.id,
        info: this.form,
        type: this.dialogType
      }).then(() => {
        this.dialogVisible = false
        this.query()
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(err => {
        console.error(err)
      })
    },
    handleEdit(index, row) {
      this.dialogType = row.showType === 1 ? 'income' : 'outgoing'
      this.dialogVisible = true
      this.isEdit = true
      this.form.id = row.id
      this.form.number = row.number
      this.form.type = row.type
    },
    handleDelete(index, row) {
      del({ id: row.id, type: row.showType === 1 ? 'income' : 'outgoing' }).then(() => {
        this.query()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      })
    },
    showTypeName(row) {
      if (row.showType === 1) {
        return incomeOption.find(f => f.value === row.type)?.label ?? ''
      }
      if (row.showType === 0) {
        return outgoingOption.find(f => f.value === row.type)?.label ?? ''
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';

.income-and-outgoings-card {
  cursor: pointer;
}

.income-and-outgoings-table {
  margin-top: 10px;
}

.income-and-outgoings {
  &-income {
    color: $incomeColor;
  }

  &-outgoing {
    color: $outgoingColor;
  }

  &-form {
    margin-top: 10px;
  }
}
</style>
