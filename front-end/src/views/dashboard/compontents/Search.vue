<template>
  <el-row>
    <el-col :span="24">
      <el-input
        v-model="number"
        placeholder="查询商品"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handelSearchGood"
        >查询</el-button>
      </el-input>
    </el-col>
    <el-col :span="24">
      <transition name="show-content">
        <el-row
          v-show="showContent"
          class="search-good-info"
        >
          <el-col :span="12">
            <el-image
              :src="form.src"
              lazy
              fit="contain"
            />
          </el-col>
          <el-col :span="12">
            <el-form
              ref="form"
              :model="form"
              class="good-search-form"
              label-width="80px"
            >
              <el-form-item label="商品名称">{{ form.name }}</el-form-item>
              <el-form-item label="商品编号">{{ form.no }}</el-form-item>
              <el-form-item label="商品种类">{{ form.variety }}</el-form-item>
              <el-form-item label="商品售价">{{ form.sell }}元</el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="mini"
                  :style="{width:'60%'}"
                  @click="showContent=false"
                >关闭</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
import { getGoodByNo } from '@/api/goods'
export default {
  name: 'GoodSearch',
  props: {

  },
  data() {
    return {
      number: '',
      showContent: false,
      translateStyle: {
        height: '200px',
        overflow: 'hidden'
      },
      form: {
      }
    }
  },
  methods: {
    handelSearchGood() {
      if (this.number.length > 0) {
        const re = /^[0-9]{6,13}$/
        const tmp = this.number.search(re)
        if (tmp > -1) {
          getGoodByNo(this.number).then(res => {
            this.showContent = true
            this.form = res
            this.form.src = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
          })
          this.number = ''
        } else {
          this.$message({
            type: 'warning',
            message: '请输入正确的商品编码'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请输入商品编码'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good-search-form {
  .el-form-item {
    margin-bottom: 0;
  }
}
.search-good-info {
  overflow: hidden;
  height: 200px;
}
.show-content-enter-active,
.show-content-leave-active {
  transition: all 1.5s;
}
.show-content-enter, .show-content-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0px;
}
</style>
