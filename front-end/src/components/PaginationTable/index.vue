<template>
  <el-row>
    <el-col
      :span="24"
      class="pagination-table-table"
    >
      <el-table
        :data="tableData"
        v-bind="table"
        :style="tableStyle"
        v-on="tableOn"
      >
        <custom-table-col
          v-for="col in tableCol"
          :key="col.props.prop"
          v-bind="col"
        />
        <custom-table-col-action v-bind="tableColAction" />
      </el-table>
    </el-col>
    <el-col
      :span="24"
      :style="{textAlign:'right'}"
      class="pagination-table-pagination"
    >
      <el-pagination
        hide-on-single-page
        v-bind="pagination"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-col>
  </el-row>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'PaginationTable',
  components: {
    CustomTableCol: {
      functional: true,
      name: 'CustomTableCol',
      render: (h, context) => {
        return h('el-table-column', {
          props: Object.assign({
            showOverflowTooltip: true,
            align: 'center'
          }, context.props.props),
          on: context.props.on || {},
          scopedSlots: context.props.scopedSlots || {}
        }, null)
      }
    },
    CustomTableColAction: {
      functional: true,
      name: 'CustomTableColAction',
      render: (h, context) => {
        const btn = (props) => {
          return context.props.actions.map((action) => {
            const on = {}
            if (_.isObject(action.on)) {
              for (const property in action.on) {
                on[property] = () => {
                  return action.on[property](props)
                }
              }
            }
            return h(
              'el-button',
              {
                on: on,
                props: Object.assign({ type: 'text' }, action.props)
              },
              action.label
            )
          })
        }
        return h('el-table-column', {
          props: Object.assign({
            showOverflowTooltip: true,
            align: 'center'
          }, context.props.props),
          on: context.props.on || {},
          scopedSlots: {
            default: (props) => {
              return h('span', {}, btn(props))
            }
          }
        }, null)
      }
    }
  },
  props: {
    // 请求数据的方法
    request: {
      type: Function,
      default: null
    },
    // table的属性
    tableAttr: {
      type: Object,
      default() {
        return {
        }
      }
    },
    tableStyle: {
      type: Object,
      default() {
        return {
          width: '100%'
        }
      }
    },
    // table的方法
    tableOn: {
      type: Object,
      default() {
        return {}
      }
    },
    tableCol: {
      type: Array,
      default() {
        return []
      }
    },
    tableColAction: {
      type: Object,
      default() {
        return {}
      }
    },
    // 对请求返回数据的过滤方法
    filterFun: {
      type: Function,
      default: null
    },
    // 分页的功能项
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 分页数
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1,
      localPageSize: 10,
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
    table() {
      return Object.assign({
        stripe: true,
        border: true
      }, this.tableAttr)
    },
    pagination() {
      const pageSizes = [this.pageSize, this.pageSize * 2, this.pageSize * 4, this.pageSize * 8]
      return {
        currentPage: this.currentPage,
        pageSizes: pageSizes,
        pageSize: this.localPageSize,
        layout: this.layout,
        total: this.filterData.length
      }
    },
    filterData() {
      if (!this.filterFun) {
        return this.tableData
      } else {
        return this.filterFun(this.tableData)
      }
    }
  },
  created() {
    // 附初始值
    this.localPageSize = this.pageSize
  },
  methods: {
    // 查询方法
    query() {
      if (!this.request) {
        return
      }
      this.request({
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }).then(res => {
        this.tableData = res
      }).catch(err => {
        console.error(err)
      })
    },
    // 分页改变方法
    handleSizeChange(val) {
      this.currentPage = 1
      this.localPageSize = val
      this.query()
    },
    // 当前页改变方法
    handleCurrentChange(val) {
      this.currentPage = val
      this.query()
    }
  }
}
</script>

<style>
</style>
