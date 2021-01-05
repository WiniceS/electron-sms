<script>
import _ from 'lodash'
export default {
  name: 'CustomTabel',
  functional: true,
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    header: {
      type: Array,
      default() {
        return []
      }
    },
    attrs: {
      type: Object,
      default() {
        return {}
      }
    },
    on: {
      type: Object,
      default() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  render(h, context) {
    // Table组件默认配置
    const defaultTableProps = {
      stripe: true,
      border: true
    }
    // 按钮默认配置
    const defaultBtnProps = { type: 'text' }

    const defaultColProps = {
      showOverflowTooltip: true,
      align: 'center'
    }

    const table = h(
      'el-table',
      {
        props: Object.assign(
          defaultTableProps,
          { data: context.props.data },
          context.attrs
        ),
        style: context.props.style || { width: '100%' },
        on: context.props.on || {},
        nativeOn: context.props.nativeOn || {},
        ref: context.props.ref
      },
      context.props.header.map((col) => {
        // 操作栏和非操作栏区分开来
        if (col.isAction) {
          const btn = (props) => {
            return col.actions.map((action) => {
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
                  props: Object.assign(defaultBtnProps, action.props)
                },
                action.label
              )
            })
          }
          return h('el-table-column', {
            props: Object.assign(defaultColProps, {
              ...col
            }),
            scopedSlots: {
              default: (props) => {
                return h('span', {}, btn(props))
              }
            }
          })
        } else {
          return h('el-table-column', {
            props: Object.assign(defaultColProps, {
              ...col
            }),
            scopedSlots: col.scopedSlots || {}
          })
        }
      })
    )

    return h('div', {}, [table])
  }
}
</script>
