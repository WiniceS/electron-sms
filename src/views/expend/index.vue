<template>
  <div class="expend">
    <el-row
      type="flex"
      class="expend-from"
    >
      <el-date-picker
        class="expend-date"
        size="small"
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
        :clearable="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        format="yyyy/MM/dd"
      ></el-date-picker>
      <el-button
        size="small"
        type="primary"
        @click="onSearch"
      >查询</el-button>
      <el-button size="small">重置</el-button>
      <el-button
        size="small"
        type="primary"
        @click="onAdd"
      >新增</el-button>
    </el-row>
    <el-row>
      <ve-histogram
        ref="chart"
        :data="chartData"
        :settings="chartSettings"
      ></ve-histogram>
    </el-row>
    <add-form-dialog
      ref="addFormDialog"
      :options="dialogOptions"
      title="新增支出"
      @submit="addNewExpend(form)"
    ></add-form-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import addFormDialog from '../components/addFormDialog'
export default {
  name: 'expend',
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      time: [new Date(new Date().getTime() - 86400000 * 7).toLocaleDateString(), new Date(new Date().getTime() + 3600 * 1000 * 24 * 1).toLocaleDateString()],
      dialogOptions: [{
        label: '水电费',
        value: '1'
      }, {
        label: '生活费用',
        value: '2'
      }],
      chartData: {
        columns: ['date', 'utilitiesExpense', 'purchaseExpense', 'livingExpenses', 'utilitiesExpenseLine', 'purchaseExpenseLine', 'livingExpensesLine'],
        rows: []
      }
    }
  },
  computed: {
    ...mapState('expend', ['chartSettings', 'rowData'])
  },
  methods: {
    ...mapActions('expend', ['getExpend', 'addExpend']),
    onSearch() {
      this.getExpend({ startTime: this.time[0], endTime: this.time[1] }).then(() => {
        this.chartData.rows = this.rowData
      })
    },
    onAdd() {
      if (this.$refs.addFormDialog) this.$refs.addFormDialog.handleDialogOpen();
    },
    addNewExpend(form) {
      console.log(form)
      this.addExpend({ type: form.select, amount: form.input }).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      })
    }
  },
  mounted() {
    this.onSearch()
  },
  components: {
    addFormDialog
  }
}
</script>

<style lang="scss">
.expend {
  &-from {
    padding: 10px;
  }
  &-date {
    margin-right: 10px;
  }
}
</style>
