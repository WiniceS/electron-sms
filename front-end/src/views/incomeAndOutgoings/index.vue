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
            <div :class="`income-and-outgoing-${scope.row.showType===0?'outgoing':'income'}`">{{ scope.row.number }}</div>
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
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
          @click="dialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BlockCard from '@/components/BlockCard'
import { getIncomeAndOutgoingStatistics } from '@/api/statistice'
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
      dialogVisible: false,
      dialogType: 'income',
      isEdit: false,
      form: {
        number: 0,
        type: '0'
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    dialogTitle() {
      return this.dialogType === 'income' ? '新增收入' : '新增支出'
    },
    typeLabel() {
      return this.dialogType === 'income' ? '收入类型' : '支出类型'
    },
    options() {
      const incomeOption = [
        { label: '销售', value: '0' },
        { label: '麻将', value: '1' },
        { label: '其他', value: '2' }]
      const outgoingOption = [
        { label: '进货', value: '0' },
        { label: '水电', value: '1' },
        { label: '其他', value: '2' }]
      return this.dialogType === 'income' ? incomeOption : outgoingOption
    }
  },
  created() {
    this.getStatistics()
  },
  methods: {
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
    },
    handleAddOutgoing() {
      this.dialogType = 'outgoing'
      this.dialogVisible = true
    },
    //  添加收入或者支出
    addIncomeOrOutgoing() {

    },
    handleEdit(index, row) {
      this.dialogType = row.showType === 1 ? 'income' : 'outgoing'
      this.dialogVisible = true
      this.form.number = row.number
      this.form.type = row.type
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
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
}
</style>
