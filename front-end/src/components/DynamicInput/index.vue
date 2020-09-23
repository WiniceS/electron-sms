<script>
export default {
  name: 'DynamicInput',
  functional: true,
  props: {
    type: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    },
    config: {
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
    }
  },
  render: (h, context) => {

    const input = h('el-input', {
      props: {
        value: context.props.config.value
      },
      on: {
        input: (value) => {
          return value
        }
      }
    }, null)

    if (typeof context.props.vnodes === 'string') {
      return h('span', context.props.vnodes)
    }
    return context.props.vnodes
  }
}
</script>
