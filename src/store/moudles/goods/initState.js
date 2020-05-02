export function initState() {
  return {
    goodInfo: {},
    // 商品入库记录
    goodsInputData: [],
    unitOption: [
      {
        label: '盒',
        value: '盒'
      },
      {
        label: '瓶',
        value: '瓶'
      },
      {
        label: '罐',
        value: '罐'
      },
      {
        label: '杯',
        value: '杯'
      },
      {
        label: '个',
        value: '个'
      },
      {
        label: '包',
        value: '包'
      },
      {
        label: '支',
        value: '支'
      },
      {
        label: '根',
        value: '根'
      },
      {
        label: '碗',
        value: '碗'
      },
      {
        label: '捆',
        value: '捆'
      }
    ],
    varietyOption: [
      {
        label: '烟类',
        value: '1'
      },
      {
        label: '酒类',
        value: '2'
      },
      {
        label: '调味类',
        value: '3'
      },
      {
        label: '饮料类',
        value: '4'
      },
      {
        label: '食品类',
        value: '5'
      },
      {
        label: '生活用品类',
        value: '6'
      },
      {
        label: '冷饮类',
        value: '7'
      },
      {
        label: '其他类',
        value: '0'
      }
    ],
    total: 0,
    pageSize: 10,
    currentSize: 1
  }
}
