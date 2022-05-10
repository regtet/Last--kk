<template>
  <div class="login">
    <div class="box">
      <div class="topBox">
        <img src="../../assets/img/ali0.png" alt="" />
      </div>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="ruleForm.username"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-tianchongxing-"
            v-model="ruleForm.password"
            placeholder="请输入内容"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>

      <div class="df">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="Reset">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { LoginApi } from '../../api/api'
export default {
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 5, max: 16, message: '长度在 5到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 5, max: 16, message: '长度在 5到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        LoginApi(this.ruleForm).then((res) => {
          console.log(res)
          sessionStorage.setItem('touken', res.token)
          this.$router.push('/')
        })
      })
    },
    Reset() {
      this.$refs.ruleForm.resetFields()
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {}
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2b4b6b;
  background-image: url(../../assets/img/miao.png);
  background-size: 100%;
  .box {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    margin: auto;
    width: 450px;
    padding: 120px 20px 20px;
    height: 300px;
    background: #fff;
    box-shadow: 0px 0px 10px 1px #fff;
    ::deep .el-input--suffix .el-input__inner {
      margin: 15px 0;
    }
    .topBox {
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      padding: 8px;
      background: #fff;
      box-shadow: 0px 0px 10px 3px #999;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .df {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
