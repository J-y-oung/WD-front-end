<template>
  <div class="publish-container">
    <!-- 标题 -->
    <h2>发布新作品</h2>

    <!-- 表单区域 -->
    <el-form :model="form" label-width="80px" ref="formRef">
<!--el-form-item是表单容器，可以包含输入框  -->
      <!-- 作品标题 -->
      <el-form-item label="作品标题" prop="title" required>
        <el-input v-model="form.title" placeholder="请输入作品标题" />
      </el-form-item>

      <!-- 文件上传 -->
      <el-form-item label="作品文件" prop="file" required>
        <!-- drag拖动；action后面会替换为实际api；on-change：回调函数；limit限制数量-->
        <el-upload
            class="upload-demo"
            drag
            action="/api/upload"
            :auto-upload="false"
            :on-change="handleFileChange"
             :limit="1"
            accept=".jpg,.png,.pdf,video/*"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">拖动文件或点击都可上传</div>
        <template #tip>
          <div class="el-upload__tip">请上传图片或视频文件</div>
        </template>
        </el-upload>
      </el-form-item>

      <el-form-item label="作品标签" prop="tag" required>
        <el-radio-group v-model="form.tag">
          <el-radio label="校园生活" size="large">校园生活</el-radio>
          <el-radio label="学术交流" size="large">学术交流</el-radio>
          <el-radio label="搞笑" size="large">搞笑</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 表单数据
const form = reactive({
  title: '',
  file: null,
  tag: ''
})

// 文件选择回调
const handleFileChange = (file) => {
  form.file = file.raw
}

// 提交表单
const submitForm = async () => {
  // 表单验证
  if (!form.title) {
    ElMessage.error('请输入作品标题')
    return
  }
  if (!form.file) {
    ElMessage.error('请选择上传文件')
    return
  }
  if (!form.tag) {
    ElMessage.error('请选择作品标签')
    return
  }

  // 创建 FormData，将表单数据添加，一同提交
  const formData = new FormData()
  formData.append('title', form.title)
  formData.append('tag', form.tag)
  formData.append('file', form.file)

  try {
    // 调用 API 接口，后续再具体更改
    const response = await fetch('/api/publish', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      ElMessage.success('发布成功！')
      // 重置表单
      form.title = ''
      form.tag = ''
      form.file = null
    } else {
      throw new Error('发布失败')
    }
  } catch (error) {
    ElMessage.error('发布失败，请重试')
  }
}
</script>

<style scoped>
.publish-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.upload-demo {
  width: 100%;
}

:deep(.ql-editor) {
  min-height: 200px;
}
</style>