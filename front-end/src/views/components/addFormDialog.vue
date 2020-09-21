<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        label="类别"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.select"
          placeholder="请选择"
          :style="{width:'220px'}"
        >
          <el-option
            v-for="(item) in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="金额"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="form.input"
          autocomplete="off"
          :min="0"
          :precision="2"
          :style="{width:'220px'}"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'addFormDialog',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        input: '',
        select: ''
      },
      rules: { select: [{ required: true, message: '请选择类型', trigger: 'change' }], input: [{ required: true, message: '请输入金额', trigger: 'blur' }] },
      formLabelWidth: '120px'
    }
  },
  props: {
    title: String,
    options: Array
  },
  methods: {
    handleDialogOpen() {
      this.dialogFormVisible = true
      this.form = {
        input: '',
        select: ''
      }
      this.$nextTick(() => {
        if (this.$refs.form) this.$refs.form.resetFields();
      })
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.$emit('submit', { ...this.form })
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss"></style>
