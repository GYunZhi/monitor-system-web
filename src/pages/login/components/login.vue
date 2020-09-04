<template>
  <div class="login">
    <div class="title">账号登录</div>
    <el-form
      v-if="isLoginForm"
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="form login-form">
      <el-form-item prop="username">
        <span class="icon-container">
          <i class="icon iconfont icon-user"></i>
        </span>
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autoComplete="on"
          placeholder="用户名"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="icon-container">
          <i class="icon iconfont icon-password"></i>
        </span>
        <el-input
          name="password"
          :type="pwdType"
          v-model="loginForm.password"
          autoComplete="on"
          placeholder="密码"
          class="pwd-input"
          @keyup.enter.native="handleLogin()"/>
          <span class="toggle-pwd-type" @click="togglePwdType">
            <i class="icon iconfont pointer" :class="pwdType === 'password' ? 'icon-eye-off' : 'icon-eye-on'"></i>
          </span>
      </el-form-item>

      <el-button
        type="primary"
        class="submit-btn"
        :loading="loading"
        @click.native.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
    <div class="qrcode-box" v-if="!isLoginForm">
      <div class="qrcode">
        <img :src="qrcodeSrc" v-if="qrcodeSrc" >
        <div class="qrcode-invalid" v-if="timeFlag">
          <p>二维码已失效</p>
          <a href="javascript:;" @click="getNewqrcode">请点击刷新</a>
        </div>
      </div>
      <p>打开  <span class="primary-color">微信</span>  扫一扫登录</p>
    </div>
    <div class="qrTab">
      <div class="tip">
        <p>{{isLoginForm?'二维码登录':'密码登录'}}</p>
      </div>
      <div @click="triggerLoginType">
        <img :src="isLoginForm ? require('../../../assets/images/qrcode.png') : require('../../../assets/images/qrcode2.png')" />
      </div>
    </div>
  </div>
</template>
<script>
import { Tooltip } from 'element-ui'
import { mapActions } from 'vuex'
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      },
      pwdType: 'password',
      loading: false,
      isLoginForm: true,
      activeType: 'account',
      qrcodeSrc: '',
      sceneId: '',
      timer: '',
      timer2: '',
      timeFlag: false
    }
  },
  methods: {
    ...mapActions([
      'login',
      'getUserInfo',
      'setUserToken'
    ]),
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let params = {
            name: 'admin',
            password: '1234567'
          }
          this.login(params).then((resp) => {
            this.loading = false
            if (resp === 'success') {
              this.getUser()
            }
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    // 异步函数，处理account请求重复问题
    async getUser () {
      // await this.getUserInfo()
      await this.$router.push({ name: 'home' })
    },
    // 显示隐藏密码
    togglePwdType () {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
    },
    // 切换登录方式
    triggerLoginType () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      if (this.isLoginForm) {
        this.getQrcode()
        this.inspectQrcode()
      }
      this.isLoginForm = !this.isLoginForm
      this.activeType = this.activeType === 'wechat' ? 'account' : 'wechat'
    },
    // 获取二维码
    getQrcode () {
      if (this.timer2) {
        return
      }
      this.timeFlag = false
      this.$http.get('/wechatNum/login').then(resp => {
        this.qrcodeSrc = resp.data.qrcode
        this.sceneId = resp.data.sceneId
        this.timer2 = setTimeout(() => { // 二维码30s过期
          this.timeFlag = true
          if (this.timer) {
            clearInterval(this.timer)
          }
        }, 30 * 1000)
      })
    },
    // 检验是否扫描二维码
    inspectQrcode () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        if (this.sceneId) {
          this.$http.get(`/checkWechatNumLogin/${this.sceneId}`).then(resp => {
            let data = resp.data
            if (data.code === 1) {
              clearInterval(this.timer)
              this.setUserToken(data.data)
              this.getUser()
            }
          })
        }
      }, 3000)
    },
    // 获取新的二维码
    getNewqrcode () {
      if (this.timeFlag) {
        this.timer2 = ''
        this.getQrcode()
        this.inspectQrcode()
      }
    }
  },
  components: {
    [Tooltip.name]: Tooltip
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/css/variables.scss';
@import './login.scss';
.login {
  padding: 20px;
  width: 380px;
  height: 380px;
  background-color: #fff;
  position: relative;
  margin: auto;
}
.title {
  font-size: 18px;
  line-height: 26px;
}
.login-form,
.qrcode-box {
  margin-top: 40px;
}
.register-tips {
  margin-top: 75px;
  text-align: center;
  font-size: 16px;
}
.qrcode-box {
  padding-top: 20px;
  text-align: center;
  .qrcode {
    width: 140px;
    height: 140px;
    margin: 0 auto 30px auto;
    position: relative;
    // background-color: $primary-color;
    img {
      width: 140px;
      height: 140px;
    }
  }
  .qrcode-invalid {
    position: absolute;
    width: 140px;
    height: 140px;
    left: 0;
    top: 0;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    p {
      line-height: 100px;
    }
    a {
      display: block;
      height: 40px;
      line-height: 40px;
      background: $primary_color;
      color: #fff;
    }
  }
}
.qrTab {
  position: absolute;
  right: 22px;
  top: 22px;
  white-space: nowrap;
  div {
    display: inline-block;
    vertical-align: top;
  }
  .tip {
    border: 1px solid $primary_color;
    color: $primary_color;
    padding: 0 10px;
    line-height: 30px;
    height: 30px;
    font-size: 14px;
    margin-right: 15px;
    background: #ebe7fd;
    position: relative;
    &::before {
      position: absolute;
      right: -11px;
      top: 8px;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 0 6px 11px;
      border-color: transparent transparent transparent $primary_color;
    }
    &::after {
      position: absolute;
      right: -10px;
      top: 9px;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 0 5px 10px;
      border-color: transparent transparent transparent #ebe7fd;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.login-form {
  .el-input__inner {
    padding: 0 45px;
    height: 45px;
    line-height: 45px;
    border-color: #dadadb !important;
    &:focus {
      border-color: #5d37eb !important;
    }
  }
  .pwd-input {
    .el-input__inner {
      padding-right: 55px;
    }
  }
  .submit-btn {
    padding: 12px 20px;
  }
}
</style>
