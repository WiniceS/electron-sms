import request from './../../framework/network/request.js'
// initial state
const state = {
  topInventoryOption: {
    title: {
      text: '库存数量前五',
      textAlign: 'auto'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    series: [
      {
        name: '库存',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      }
    ]
  },
  bottomInventoryOption: {
    title: {
      text: '库存数量后五',
      textAlign: 'auto'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    series: [
      {
        name: '库存',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      }
    ]
  },
  topSellOption: {
    title: {
      text: '销售数量前五',
      textAlign: 'auto'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    series: [
      {
        name: '销售量',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [200, 170, 240, 244, 200, 220, 210]
      }
    ]
  },
  bottomSellOption: {
    title: {
      text: '销售数量后五',
      textAlign: 'auto'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    series: [
      {
        name: '销售量',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [200, 170, 240, 244, 200, 220, 210]
      }
    ]
  },
  sellOption: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['line', 'bar']
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    legend: {
      data: ['Growth', 'Budget 2011', 'Budget 2012'],
      itemGap: 5
    },
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          'Securities',
          'Other',
          'Office',
          'Departmental',
          'United',
          'Public',
          'Christopher',
          'Morris'
        ]
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Budget (million USD)'
      }
    ],
    dataZoom: [
      {
        show: true,
        start: 94,
        end: 100
      },
      {
        type: 'inside',
        start: 94,
        end: 100
      },
      {
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 30,
        height: '80%',
        showDataShadow: false,
        left: '93%'
      }
    ],
    series: [
      {
        name: 'Budget 2011',
        type: 'bar',
        data: [300, 1000, 1200, 1300, 2000, 2000, 1000, 3000]
      },
      {
        name: 'Budget 2012',
        type: 'bar',
        data: [300, 1000, 1200, 1300, 2000, 2000, 1000, 3000]
      }
    ]
  },
  inventoryOption: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['line', 'bar']
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    legend: {
      data: ['Growth', 'Budget 2011', 'Budget 2012'],
      itemGap: 5
    },
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          'Securities',
          'Other',
          'Office',
          'Departmental',
          'United',
          'Public',
          'Christopher',
          'Morris'
        ]
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Budget (million USD)'
      }
    ],
    dataZoom: [
      {
        show: true,
        start: 94,
        end: 100
      },
      {
        type: 'inside',
        start: 94,
        end: 100
      },
      {
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 30,
        height: '80%',
        showDataShadow: false,
        left: '93%'
      }
    ],
    series: [
      {
        name: 'Budget 2011',
        type: 'bar',
        data: [300, 1000, 1200, 1300, 2000, 2000, 1000, 3000]
      },
      {
        name: 'Budget 2012',
        type: 'bar',
        data: [300, 1000, 1200, 1300, 2000, 2000, 1000, 3000]
      }
    ]
  },
  sellRecord: []
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  }
}

// actions
const actions = {
  // 获取销售记录
  getSellRecode(store, { condition }) {
    const { commit } = store
    return request
      .post(
        '/sell/api/getSellRecord',
        {
          condition
        },
        store
      )
      .then(res => {
        commit('setSellRecord', res.data)
      })
  },
  // 获取商品库存
  getGoodInventory(store, { condition }) {
    const { commit } = store
    return request
      .post(
        '/goods/api/goods/getGoodInventory',
        {
          condition
        },
        store
      )
      .then(res => {
        commit('setGoodInventory', res.data)
      })
  }
}

// mutations
const mutations = {
  setSellRecord(state, { data }) {
    state.sellRecord = data
  },
  setGoodInventory(state, { data }) {
    state.goodInventory = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
