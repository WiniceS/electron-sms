<template>
  <el-dialog
    :title="dialogTitle"
    :visible="dialogVisible"
    class="good-dialog"
    width="70%"
    @close="onClose(false)"
  >
    <el-form
      ref="goodsForm"
      :model="form"
      :rules="rules"
      label-width="120px"
      size="small"
    >
      <el-row class="good--dialog-form">
        <el-col :span="12">
          <el-form-item
            label="商品编号"
            prop="no"
          >
            <el-input
              v-model="form.no"
              placeholder="请输入商品编号"
              :style="{ width: '90%' }"
            />
          </el-form-item>
          <el-form-item
            label="商品名称"
            prop="name"
          >
            <el-input
              v-model="form.name"
              placeholder="请输入商品名称"
              :style="{ width: '90%' }"
            />
          </el-form-item>
          <el-form-item
            label="商品规格"
            prop="specification"
          >
            <el-input
              v-model="form.specification"
              placeholder="请输入商品规格"
              :style="{ width: '90%' }"
            />
          </el-form-item>
          <el-form-item
            label="商品单位"
            prop="unit"
          >
            <el-select
              v-model="form.unit"
              placeholder="请选择单位"
              :style="{ width: '90%' }"
            >
              <el-option
                v-for="item in unitOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="商品品种"
            prop="variety"
          >
            <el-select
              v-model="form.variety"
              placeholder="请选择品类"
              :style="{ width: '90%' }"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="商品售价(元)"
            prop="sell"
          >
            <el-input-number
              v-model="form.sell"
              :min="0"
              placeholder="请输入商品售价"
              :style="{ width: '90%' }"
            />
          </el-form-item>
          <el-form-item
            label="商品成本(元)"
            prop="cost"
          >
            <el-input-number
              v-model="form.cost"
              :min="0"
              placeholder="请输入商品成本"
              :style="{ width: '90%' }"
            />
          </el-form-item>
          <el-form-item label="父商品编号">
            <el-input
              v-model="form.parentNo"
              placeholder="请输入父商品编号"
              :style="{ width: '90%' }"
              @change="getNumberExist"
            />
          </el-form-item>
          <el-form-item label="关系比例">
            <el-input-number
              v-model="form.radio"
              :min="1"
              placeholder="请输入关系比例"
              :style="{ width: '90%' }"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="small"
        @click="onClose(false)"
      >取 消</el-button>
      <el-button
        type="primary"
        size="small"
        @click="onSubmit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { addGood, updateGood, getGoodByNo } from '@/api/goods'
import _ from 'lodash'
export default {
  name: 'GoodsDialog',
  props: {
    type: {
      type: String,
      default: 'create'
    },
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogVisible: Boolean
  },
  data() {
    return {
      form: {},
      rules: {
        no: [
          { required: true, message: '请输入商品编号', trigger: 'blur' },
          { min: 1, max: 13, message: '长度13个字符', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        specification: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        variety: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      },
      loading: false
    }
  },
  computed: {
    dialogTitle() {
      return this.type === 'create' ? '新建商品' : '编辑商品'
    },
    ...mapState('config', ['typeOptions', 'unitOption'])
  },
  watch: {
    'type'(newValue, oldValue) {
      if (newValue === 'create') {
        this.form = this.initCreateForm()
      } else if (newValue === 'edit') {
        this.form = _.cloneDeep(this.info)
      }
    }
  },
  methods: {
    initCreateForm() {
      return {
        name: '',
        id: '',
        no: '',
        specification: '',
        unit: '',
        variety: '',
        sell: 0.0,
        cost: 0.0,
        parentId: '',
        parentNo: '',
        radio: 0
      }
    },
    getNumberExist(number) {
      getGoodByNo(number).then(res => {
        if (res.id) {
          this.form.parentId = res.id
        } else {
          this.$message({
            type: 'error',
            message: '请先导入该商品:' + number
          })
        }
      })
    },
    onSubmit() {
      if (this.type === 'create') {
        this.$refs['goodsForm'].validate(valid => {
          if (valid) {
            this.loading = true
            addGood(this.form).then(() => {
              this.loading = false
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.onClose(true)
            })
          } else {
            console.log('error submit!!')
            this.loading = false
            return false
          }
        })
      } else {
        this.$refs['goodsForm'].validate(valid => {
          if (valid) {
            this.loading = true
            updateGood({
              id: this.form.id,
              good: this.form
            }).then(() => {
              this.loading = false
              this.$message({
                type: 'success',
                message: '更新成功'
              })
              this.onClose(true)
            })
          } else {
            console.log('error submit!!')
            this.loading = false
            return false
          }
        })
      }
    },
    onClose(refresh) {
      this.$emit('close', refresh)
    },
    requestUnits() {

    },
    requestTypes() {

    }
  }
}
</script>

<style>
</style>
