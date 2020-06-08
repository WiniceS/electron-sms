<template>
  <div class="earning">
    <el-row
      class="earning-from"
      type="flex"
    >
      <el-date-picker
        class="earning-date"
        size="small"
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
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
        :data="chartData"
        :settings="chartSettings"
      ></ve-histogram>
    </el-row>
    <add-form-dialog
      ref="addFormDialog"
      :options="dialogOptions"
      title="新增收入"
      @submit="addNewEarning(form)"
    ></add-form-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import addFormDialog from '../components/addFormDialog'
export default {
  name: 'earning',
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
    ...mapState('earning', ['chartSettings', 'chartData'])
  },
  methods: {
    ...mapActions('earning', ['getEarning', 'addEarning']),
    onSearch() {
      this.getEarning({ startTime: this.time[0], endTime: this.time[1] })
    },
    onAdd() {
      if (this.$refs.addFormDialog) this.$refs.addFormDialog.handleDialogOpen();
    },
    addNewEarning(form) {
      this.addEarning({ type: form.select, grossMargin: form.input, netProfit: form.input }).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      })
    }
  },
  components: { addFormDialog }
}
</script>

<style lang="scss">
.earning {
  &-from {
    padding: 10px;
  }
  &-date {
    margin-right: 10px;
  }
}
</style>
