<template>
  <el-dialog
      v-model="visible"
      title="用户登录"
      width="30%"
      :before-close="handleClose"
  >
    <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        label-width="80px"
        status-icon
    >
      <!-- 用户名 -->
      <el-form-item label="学号" prop="studentId">
        <el-input
            v-model="form.studentId"
            placeholder="请输入10位学号"
            clearable
        />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
            v-model="form.password"
            type="password"
            placeholder="6-20位字符"
            show-password
            clearable
        />
      </el-form-item>

      <!-- 其他登录方式区域 -->
      <div class="alternative-login">
        <h4>其他登录方式</h4>
<!--    github第三方登录    -->
        <el-button
            class="github-login"
            @click="handleGithubLogin"
        >
          <i class="fab fa-github"></i>
          使用GitHub登录
        </el-button>
        <div style="height: 40px"></div>
      </div>

      <!-- 底部操作区 -->
      <div class="footer-actions">
        <router-link to="/register">没有账号？按此注册</router-link>
        <el-button type="primary" @click="handleLogin">立即登录</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    // 这里是正则匹配区
    const validateStudentId = (rule, value, callback) => {
      const numericPattern = /^\d{10}$/;
      if (!numericPattern.test(value)) {
        callback(new Error("学号必须为10位数字"));
      } else {
        callback();
      }
    };

    return {
      visible: false,
      form: {
        studentId: "",
        password: "",
      },
      rules: {
        studentId: [  // 规则改为studentId
          { required: true, message: "请输入学号", trigger: "blur" },
          { validator: validateStudentId, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 打开登录弹窗
    open() {
      this.visible = true;
    },
    // 关闭弹窗
    close() {
      this.visible = false;
      this.$refs.loginForm.resetFields();
    },
    // 处理登录提交
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios
              .post("/api/auth/login", {
                authProvider: "PASSWORD",
                studentId: this.form.studentId,
                password: this.form.password,
              })
              .then((res) => {
                const token = res.data;
                if (token) {
                  this.$message.success("登录成功");

                  // 保存 token 到本地存储
                  localStorage.setItem("token", token);

                  localStorage.setItem("username", this.form.studentId);

                  this.close();
                  location.reload();
                } else {
                  this.$message.error("登录失败");
                }
              })
              .catch((err) => {
                console.error(err);
                const errorMsg = err.response?.data || "请求出错";
                this.$message.error(errorMsg);
              });
        }
      });
    },
    handleGithubLogin() {
      axios
          .post("/api/auth/login", {
            authProvider: "GITHUB",
          })
      const clientId = 'Ov23ctx46pToVBNYJ8EV';
      // 同时向后端发送authProvider:"GITHUB"
      const redirectUri = 'http://localhost:8080/oauth/github/callback';
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
      window.location.href = githubAuthUrl;
    },
    // 弹窗关闭前的处理
    handleClose(done) {
      this.$refs.loginForm.resetFields();
      done();
    },
  },
};
</script>

<style scoped>
/* 其他登录方式区域样式 */
.alternative-login {
  margin: 20px 0;
  padding: 15px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.alternative-login h4 {
  color: #999;
  margin-bottom: 15px;
}

/* 底部操作区样式 */
.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.footer-actions a {
  color: #409eff;
  cursor: pointer;
  text-decoration: none;
}

.footer-actions a:hover {
  text-decoration: underline;
}
</style>