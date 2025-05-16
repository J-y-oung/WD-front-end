<template>
  <el-container class="main-container">
    <!-- 这是头部的内容 -->
    <el-header class="topbar">
      <div class="search-container">
        <el-input
            v-model="searchKeyword"
            placeholder="请输入搜索内容"
            class="search-input"
            clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="user-info">
        <span
            class="username"
            :class="{ 'clickable': true }"
            @click="handleUserClick"
        >
          {{ username || '请登录' }}
        </span>
      </div>
    </el-header>

    <el-container>

      <el-aside width="200px" class="sidebar">
        <div class="menu-group">
          <el-button
              type="primary"
              class="menu-item"
              @click="showLoginPage"
          >
            登录
          </el-button>
          <el-button
              type="success"
              class="menu-item"
              @click="$router.push('/publish')"
          >
            发布作品
          </el-button>
        </div>
      </el-aside>

      <!-- 主要内容 -->
      <content-place
          :active-tag="activeTag"
          @update:active-tag="val => activeTag = val"
      />

    </el-container>

    <!-- 登录弹窗 -->
    <Login ref="loginModal" />
  </el-container>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import Login from '@/components/Login.vue'
import ContentPlace from '@/components/ContentPlace.vue'

export default {
  components: {
    Search,
    Login,
    ContentPlace
  },
  data() {
    return {
      searchKeyword: '',
      activeTag: 'campus',
      username: localStorage.getItem('username') || ''
    }
  },
  methods: {
    showLoginPage() {
      this.$refs.loginModal.open()
    },
    // 用户点击头像,不过逻辑待补充
    handleUserClick() {
      if (this.username) {
        this.$router.push('/profile')
      } else {
        this.showLoginPage()
      }
    }
  }
}
</script>

<style scoped>
.main-container {
  height: 100vh;
}

/* 顶部导航栏 */
.topbar {
  position: relative;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-area {
  flex: 1;
  overflow: auto;
}
.search-container {
  width: 500px;
  min-width: 300px;
  max-width: 600px;
}

.user-info {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
}

/* 侧边导航栏 */
.sidebar {
  background: #f5f7fa;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.menu-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-item {
  width: 100%;
  margin-left: 0px;
}

.username {
  font-size: 14px;
  color: #409EFF;
  cursor: pointer;
  text-decoration: underline;
}


</style>