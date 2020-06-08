<template>
  <div>
    <el-row type="flex">
      <el-date-picker
        size="small"
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
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
        @click="onSearch"
      >新增</el-button>
    </el-row>
    <el-row>
      <ve-histogram
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
      time: [new Date(new Date().getTime() - 86400000 * 7).toLocaleDateString(), new Date().toLocaleDateString()],
      dialogOptions: [{
        label: '麻将',
        value: '1'
      }, {
        label: '其他收入',
        value: '2'
      }]
    }
  },
  computed: {
    ...mapState('expend', ['chartSettings', 'chartData'])
  },
  methods: {
    ...mapActions('expend', ['getExpend', 'addExpend']),
    onSearch() {
      this.getExpend({ startTime: this.time[0], endTime: this.time[1] })
    },
    onAdd() {
      if (this.$refs.addFormDialog) this.$refs.addFormDialog.handleDialogOpen();
    },
    addNewExpend(form) {
      this.addExpend({ type: form.select, amount: form.input }).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      })
    }
  }
}
</script>

<style lang="scss"></style>
