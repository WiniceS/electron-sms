<script>
export default {
  name: 'SearchBar',
  functional: true,
  props: {
    searchItems: {
      type: Array,
      default() {
        return []
      }
    },
    span: {
      type: Number,
      default: 6,
      validator(value) {
        // 这个值必须匹配下列数据中的一个
        return [6, 8, 12].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {}
  },
  render: (h, context) => {
    // function createInput(item) {
    //   if (item.type !== 'input') {
    //     return null
    //   } else {
    //     return h('el-input', {
    //       props: Object.assign({}, item.props)
    //     })
    //   }
    // }
    if (context.props.searchItems.length > 0) {
      const cols = context.props.searchItems.map(m => {
        return h('el-col', {
          props: {
            span: context.props.span
          }
        }, [])
      })
      return h('el-row', {}, cols)
    } else {
      return h('el-row', {}, ['xxxx'])
    }
  }
}
</script>

<style>
</style>
