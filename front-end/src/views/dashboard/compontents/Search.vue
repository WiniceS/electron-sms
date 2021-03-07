<template>
  <el-row>
    <el-col :span="24">
      <el-input
        v-model="number"
        ref="input"
        placeholder="查询商品"
        @change="handleSearchGood"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearchGood"
        >查询
        </el-button>
      </el-input>
    </el-col>
    <el-col :span="24" class="good-search-body">
      <transition name="show-content">
        <el-row
          v-show="showContent"
          class="search-good-info"
        >
          <el-form
            ref="form"
            :model="form"
            class="good-search-form"
            label-width="180px"
          >
            <el-form-item label="商品名称">{{ form.name }}</el-form-item>
            <el-form-item label="商品编号">{{ form.no }}</el-form-item>
            <el-form-item label="商品种类">{{ form.variety }}</el-form-item>
            <el-form-item label="商品售价">{{ form.sell }}元</el-form-item>
          </el-form>
          <div>
            <el-button
              size="mini"
              :style="{width:'100%'}"
              @click="showContent=false"
            >关闭
            </el-button>
          </div>
        </el-row>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
import { getGoodByNo } from '@/api/goods'

export default {
  name: 'GoodSearch',
  props: {},
  data() {
    return {
      // 商品编码
      number: '',
      // 显示商品信息内容
      showContent: false,
      // 商品信息表单
      form: {
        // 商品名称
        name: '',
        // 商品编号
        no: '',
        // 商品种类
        variety: '',
        // 售价
        sell: 0
      }
    }
  },
  methods: {
    // 根据商品编号查询商品信息方法
    handleSearchGood() {
      if (this.number.length > 0) {
        const re = /^[0-9]{6,13}$/
        const tmp = this.number.search(re)
        if (tmp > -1) {
          getGoodByNo(this.number).then(res => {
            this.showContent = true
            this.form = res
            this.form.src = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请输入正确的商品编码'
          })
        }
        this.$refs['input'].focus()
        this.$refs['input'].select()
      } else {
        this.$message({
          type: 'warning',
          message: '请输入商品编码'
        })
        this.$refs['input'].focus()
        this.$refs['input'].select()
      }
    },
    getInputFocus() {
      this.$refs['input'].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.good-search-body {
  border: 1px solid #eeeeee;
  border-bottom: none;
}

.good-search-form {
  padding-left: 20px;
  padding-right: 20px;

  .el-form-item {
    margin-bottom: 0;
  }
}

.search-good-info {
  overflow: hidden;
  position: relative;
  height: 200px;

  > div:last-child {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}

.show-content-enter-active,
.show-content-leave-active {
  transition: all 1.5s;
}

.show-content-enter, .show-content-leave-to /* .fade-leave-active below version 2.1.8 */
{
  height: 0px;
}
</style>
