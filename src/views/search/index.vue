<template>
  <div class="search">
    <el-row class="search-filter">
      <el-input v-model="number" placeholder="请输入商品编号" size="small" v-on:keyup.enter="onSearch"></el-input>
    </el-row>
    <el-row class="search-table">
      <el-col :span="12">
        <el-image :src="src">
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
      </el-col>
      <el-col :span="12">
        <el-form :model="showForm" ref="searchCreateForm" label-width="120px" size="small">
          <el-row class="search-show-form">
            <el-form-item label="商品名称" prop="name">
              <span>{{showForm.name}}</span>
            </el-form-item>
            <el-form-item label="商品售价" prop="sell">
              <span>{{showForm.sell}}</span>
            </el-form-item>
            <el-form-item label="商品编号" prop="no">
              <span>{{showForm.no}}</span>
            </el-form-item>
            <el-form-item label="商品规格" prop="specification">
              <span>{{showForm.specification}}</span>
            </el-form-item>
            <el-form-item label="商品品种" prop="variety">
              <span>{{showForm.varietyName}}</span>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'search',
  data() {
    return {
      number: '',
      showForm: {},
      src:
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  computed: {
    ...mapState(['winHeight'])
  },
  methods: {
    ...mapActions('commodity', ['getByNo']),
    onSearch() {
      this.showForm = this.getByNo()
    },
    initShowForm() {
      return {
        name: '',
        id: '',
        no: '',
        specification: '',
        varietyName: '',
        sell: 0.0
      }
    }
  },
  mounted() {
    this.showForm = this.initShowForm()
  }
}
</script>

<style lang="scss">
.search-filter {
  padding: 5px 10px;
}
</style>
