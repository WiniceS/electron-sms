import _ from 'lodash'
export default {
  functional: true,
  name: 'customTabel',
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
      type: Object
    },
    on: {
      type: Object
    }
  },
  render(h, context) {
    // Table组件默认配置
    const defaultTableProps = {
      stripe: true,
      border: true,
      size: 'mini'
    }
    // 按钮默认配置
    const defaultBtnProps = { type: 'primary', size: 'mini' }
    return h(
      'el-table',
      {
        props: Object.assign(
          defaultTableProps,
          { data: context.data },
          context.attrs
        ),
        style: context.props.style || { width: '100%' },
        on: context.props.on || {},
        nativeOn: context.props.nativeOn || {},
        ref: context.data.ref
      },
      context.header.map(function(col) {
        // 操作栏和非操作栏区分开来
        if (col.isAction) {
          const btn = function(props) {
            return col.actions.map(action => {
              const on = {}
              if (_.isObject(action.on)) {
                for (let property in action.on) {
                  on[property] = function() {
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
            props: {
              align: 'center',
              ...col.props
            },
            scopedSlots: {
              default: props => {
                return h('span', {}, btn(props))
              }
            }
          })
        } else {
          return h('el-table-column', {
            props: {
              showOverflowTooltip: !!col.scopedSlots,
              ...col.props
            },
            scopedSlots: col.scopedSlots || {}
          })
        }
      })
    )
  }
}
