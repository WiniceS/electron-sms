<template>
  <el-row>
    <el-col :span="24">
      <el-input>
        <el-button
          slot="append"
          icon="el-icon-search"
        />
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
              src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
              lazy
            />
          </el-col>
          <el-col :span="12">
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
            >
              <el-form-item label="活动名称">
                <div>{{ form.name }}</div>
              </el-form-item>
              <el-form-item label="即时配送">
                <div>{{ form.delivery }}</div>
              </el-form-item>
              <el-form-item label="特殊资源">线上品牌商赞助</el-form-item>
              <el-form-item label="活动形式">
                活动形式
              </el-form-item>
              <el-form-item>
                <el-button @click="showContent=false">关闭</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'GoodSearch',
  props: {
  },
  data() {
    return {
      showContent: true,
      translateStyle: {
        height: '500px',
        overflow: 'hidden'
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-good-info {
  overflow: hidden;
  height: 500px;
}
.show-content-enter-active,
.show-content-leave-active {
  transition: all 1.5s;
}
.show-content-enter, .show-content-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0px;
}
</style>
