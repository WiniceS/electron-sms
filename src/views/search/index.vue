<template>
  <div class="search">
    <el-row class="search-filter">
      <el-input
        v-model="number"
        placeholder="请输入商品编号"
        size="small"
        @change="onSearch"
      ></el-input>
    </el-row>
    <el-row
      v-if="showForm.id"
      class="search-show"
      :style="{height:(winHeight-75)+'px'}"
    >
      <el-col :span="12">
        <el-image :src="src">
          <div
            slot="placeholder"
            class="image-slot"
          >
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
      </el-col>
      <el-col :span="12">
        <el-form
          v-model="showForm"
          ref="searchCreateForm"
          label-width="120px"
          size="small"
        >
          <el-row class="search-show-form">
            <el-form-item label="商品名称:">
              <span>{{showForm.name}}</span>
            </el-form-item>
            <el-form-item label="商品售价:">
              <span>{{showForm.sell}}元</span>
            </el-form-item>
            <el-form-item label="商品编号:">
              <span>{{showForm.no}}</span>
            </el-form-item>
            <el-form-item label="商品规格:">
              <span>{{showForm.specification}}</span>
            </el-form-item>
            <el-form-item label="商品品种:">
              <span>{{showForm.varietyName}}</span>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row
      v-else
      :style="{height:(winHeight-75)+'px'}"
    ></el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'search',
  data() {
    return {
      number: '',
      showForm: {
        name: '',
        id: '',
        no: '',
        specification: '',
        varietyName: '',
        sell: 0.0
      },
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
      this.getByNo({ no: this.number }).then(res => {
        this.showForm = res
      })
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
.search-show {
  margin: 5px 10px;
}
</style>
