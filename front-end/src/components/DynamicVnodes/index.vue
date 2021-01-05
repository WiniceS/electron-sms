<script>
export default {
  name: 'DynamicVnodes',
  functional: true,
  render: (h, context) => {
    if (typeof context.props.vnodes === 'string') {
      return h('span', context.props.vnodes)
    }
    return context.props.vnodes
  }
}
</script>
