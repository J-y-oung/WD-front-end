<template>
  <el-main class="content-area">
    <!-- 标签导航 -->
    <div class="tab-nav-wrapper">
      <el-tabs v-model="currentTag" class="tag-nav">
        <el-tab-pane label="校园生活" name="campus" />
        <el-tab-pane label="学术交流" name="academic" />
        <el-tab-pane label="搞笑" name="funny" />
      </el-tabs>
    </div>

    <!-- 内容区，现在还没有实质的东西，先空着 -->
    <div class="content-placeholder">
      <slot>
        <el-empty description="这里是主页内容区域" />
      </slot>
    </div>
  </el-main>
</template>

<script>
export default {
  props: {
    activeTag: {
      type: String,
      default: 'campus'
    },
    username: {
      type: String,
      default: ''
    }
  },
  emits: ['update:active-tag'],
  computed: {
    currentTag: {
      get() {
        return this.activeTag
      },
      set(value) {
        this.$emit('update:active-tag', value)
      }
    }
  }
}
</script>

<style scoped>
.content-area {
  flex: 1;
  overflow: auto;
  background: #f8f9fa;
}

.tab-nav-wrapper {
  position: sticky;
  top: 0;
  z-index: 998;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  padding: 0 20px;
}

.content-placeholder {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin: 20px;
  min-height: 500px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs__nav-wrap) {
  padding: 0 16px;
}
</style>