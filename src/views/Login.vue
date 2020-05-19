<template>
  <div class="login">
    <el-form
      :model="loginForm"
      class="form"
      ref="LoginFormRef"
      :label-position="labelPosition"
      :rules="LoginFormRules"
      label-width="80px"
    >
      <h1 style="font-family:FZShuTi;font-weight:600">用户登录</h1>
      <el-form-item class="el-form-item" prop="username" label="账号">
        <el-input
          v-model="loginForm.username"
          prefix-icon="el-icon-user"
          class="name"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="el-form-item">
        <el-input
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          type="password"
        ></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" @click="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      labelPosition: "right",
      loginForm: {
        username: "admin",
        password: "123456"
      },
      LoginFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //方法集合
  methods: {
    handleLogin() {
      this.$refs["LoginFormRef"].validate(async valid => {
        if (valid) {
          if (
            this.loginForm.username === "admin" &&
            this.loginForm.password === "123456"
          ) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            window.sessionStorage.setItem("name", this.loginForm.username);
            this.$store.commit("in");
          } else {
            this.$message({
              message: "密码错误",
              type: "error"
            });
            return;
          }
          this.$router.push("/Home");
        } else {
          return;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background-image: url(../assets/image/2500688657ed819a007a8ad6b8e4c09f.jpg);
  background-size: 100% 100%;
  position: absolute;
}

.form {
  width: 350px;
  height: 230px;
  padding: 15px 15px 15px 15px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-form-item {
  margin-bottom: 20px;
  margin-left: -38px;
}

.name {
  text-align: right;
}

h1 {
  font-weight: 700;
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: left;
}

.btn {
  width: 100%;
}
</style>
