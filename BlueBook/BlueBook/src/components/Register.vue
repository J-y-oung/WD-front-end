<template>
  <el-dialog
      v-model="visible"
      title="用户注册"
      width="30%"
      :before-close="handleClose"
  >
    <el-form
        ref="registerForm"
        :model="form"
        :rules="rules"
        label-width="80px"
        status-icon
    >
      <!-- 学号 -->
      <el-form-item label="学号" prop="studentId">
        <el-input
            v-model="form.studentId"
            placeholder="6位数字学号"
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

      <!-- 确认密码 -->
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
            clearable
        />
      </el-form-item>

      <!-- 姓名 -->
      <el-form-item label="姓名" prop="name">
        <el-input
            v-model="form.name"
            placeholder="2-10位中文或字母"
            clearable
        />
      </el-form-item>

      <!-- 底部操作区 -->
      <div class="footer-actions">
        <router-link to="/">已有账号？点此回到主页</router-link>
        <el-button
            type="primary"
            @click="handleRegister"
            :loading="loading"
        >
          立即注册
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    // 学号验证规则
    const validateStudentId = (rule, value, callback) => {
      const pattern = /^\d{6}$/;
      if (!pattern.test(value)) {
        callback(new Error("请输入6位数字学号"));
      } else {
        callback();
      }
    };

    // 密码一致性验证
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    // 姓名验证规则
    const validateName = (rule, value, callback) => {
      const pattern = /^[\u4e00-\u9fa5a-zA-Z]{2,10}$/;
      if (!pattern.test(value)) {
        callback(new Error("2-10位中文或英文字符"));
      } else {
        callback();
      }
    };

    return {
      // 这里需要显式地设置为true，否则无法显示
      visible: true,
      loading: false,
      form: {
        studentId: "",
        password: "",
        confirmPassword: "",
        name: ""
      },
      rules: {
        studentId: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { validator: validateStudentId, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateConfirmPassword, trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { validator: validateName, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 打开注册弹窗
    open() {
      this.visible = true;
    },

    // 关闭弹窗
    close() {
      this.visible = false;
      this.$refs.registerForm.resetFields();
      this.loading = false;
    },

    // 处理注册提交
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          axios
              .post("/api/auth/register", {
                studentId: this.form.studentId,
                password: this.form.password,
                name: this.form.name
              })
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("注册成功");
                  this.close();
                  // 自动跳转到登录页面
                  this.$router.push("/login");
                }
              })
              .catch(err => {
                console.error(err);
                const errorMsg = err.response?.data || "注册失败";
                this.$message.error(errorMsg);
              })
              .finally(() => {
                this.loading = false;
              });
        }
      });
    },

    // 弹窗关闭前的处理
    handleClose(done) {
      this.$refs.registerForm.resetFields();
      done();
    }
  }
};
</script>

<style scoped>
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