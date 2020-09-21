<template>
  <div class="search">
    <el-row class="search-filter">
      <el-input
        ref="searchInput"
        v-model="number"
        placeholder="请输入商品编号"
        size="small"
        @keyup.native.enter="onSearch"
      ></el-input>
    </el-row>
    <el-row v-if="showForm.id" class="search-show" :style="{height:(winHeight-75)+'px'}">
      <el-col :span="10" :offset="1" class="search-show-image">
        <el-image :src="src" fit="contain">
          <div slot="placeholder" class="search-show-image-slot">
            加载中
            <span class="search-show-image-dot">...</span>
          </div>
          <div slot="error" class="search-show-image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-col>
      <el-col :span="12" :offset="1">
        <el-form v-model="showForm" ref="searchCreateForm" label-width="120px">
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
    <el-row v-else :style="{height:(winHeight-75)+'px'}"></el-row>
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
      this.getByNo({ no: this.number })
        .then(res => {
          this.showForm = res
          this.onFocus()
        })
        .catch(e => {
          this.number = ''
          this.onFocus()
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
    },
    onFocus() {
      if (this.$refs.searchInput) {
        this.$refs.searchInput.focus()
        this.$refs.searchInput.select()
      }
    }
  },
  mounted() {
    this.showForm = this.initShowForm()
    this.onFocus()
  }
}
</script>

<style lang="scss">
.search-filter {
  padding: 5px 10px;
}
.search-show {
  margin: 5px 10px;
  &-form {
    .el-form-item__content {
      font-size: 36px;
      line-height: 64px;
    }
    .el-form-item__label {
      font-size: 24px;
      line-height: 64px;
    }
  }
  &-image {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon-picture-outline {
      font-size: 64px;
    }
  }
}
</style>
