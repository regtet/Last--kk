<template>
  <transition name="fade" class="fade">
    <div class="login">
      <div class="box">
        <div class="icon">
          <img src="../../assets/阿狸0.png" title="阿狸" />
          <el-form
            width="800px"
            class="form"
            ref="forname"
            :model="from"
            :rules="rules"
          >
            <el-form-item prop="username">
              <el-input
                v-model="from.username"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="from.password"
                show-password
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <div class="btn">
              <el-button type="primary" @click="ok">确定</el-button>
              <el-button>取消</el-button>
            </div></el-form
          >
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { login } from "../../api/api";
export default {
  data() {
    return {
      from: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$refs.forname.validate(async (valid) => {
        if (valid) {
          console.log(this.from);
          const res = await login(this.from);
          console.log(res);
          if (sessionStorage.getItem("token")) {
            this.$router.push("/home");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: pink;
  .box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 500px;
    min-width: 300px;
    height: 300px;
    background: skyblue;
    border-radius: 15px;
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      transform: translateY(-50px);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      padding: 5px;
      border: 1px solid red;
      box-shadow: 0 0 8px 1px red;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 0 8px 5px #000;
      }
      .form {
        position: absolute;
        margin-left: -200px;
        width: 500px;
        padding: 20px;
        padding-top: 50px;
        box-sizing: border-box;
        .btn {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
.fade-enter-active {
  animation: ami 2s;
}

@keyframes ami {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.fade-leave-active {
  animation: amiro 2s;
  transform-origin: center center;
}

@keyframes amiro {
  0% {
    transform: translateX(0) rotateZ(0);
  }
  100% {
    transform: translateX(-100%) rotateZ(-180deg);
  }
}
</style>
