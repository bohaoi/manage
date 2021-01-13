<template>
  <div class="login-container">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">会员管理平台</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 269px"
          @click="submitForm('form')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.form.username, this.form.password).then((response) => {
            const resp = response.data;
            // console.log(response.data);
            if (resp.flag) {
              //通过token获取用户信息
              getUserInfo(resp.data.token).then((response) => {
                const respUser = response.data;
                if (respUser.data) {
                  console.log(respUser.data);
                  localStorage.setItem(
                    "mam-user",
                    JSON.stringify(respUser.data)
                  );
                  localStorage.setItem("mam-token", resp.data.token);
                  //前往首页
                  this.$router.push("/");
                } else {
                  this.$message({
                    message: resp.message,
                    type: "warning",
                  });
                }
              });
            }
          });
        } else {
          //未通过
          this.$message({
            message: "登录失败",
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 230px auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/log.jpg");
  /* background: url("../../assets/login.png"); */
}

.login-title {
  color: #303133;
  text-align: center;
}
</style>