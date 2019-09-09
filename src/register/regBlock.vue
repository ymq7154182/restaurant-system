<template>
  <div class="register">
    <tea-reg :type="type" v-if="user === 1" @reg="reg" @modi="modi"></tea-reg>
    <stu-reg :type="type" v-if="user === 2" @reg="reg" @modi="modi"></stu-reg>
    <staff-reg :type="type" v-if="user === 3" @reg="reg" @modi="modi"></staff-reg>
  </div>
</template>

<script>
import request from '../utils/request'
import { errorMsg, msg } from '@/utils/common'

import stuReg from './stuReg'
import teaReg from './teaReg'
import staffReg from './staffReg'
export default {
  name: 'register',
  components: {
    stuReg,
    teaReg,
    staffReg
  },
  data () {
    return {
      openid: localStorage.openid,
      // openid: 'oMXOb1SbA65U3odw5hi9hbpgoaHA',
      role: ''

    }
  },
  computed: {
    user () {
      if (Number(this.$store.state.user.userRole) === 0) {
        return 2
      } else {
        return Number(this.$store.state.user.userRole)
      }

      // return Number(this.role)
    },
    type () {
      if (this.$route.name === 'my') {
        return 'info'
      }
    }
  },
  mounted () {
    console.log('fffff')
    console.log(this.user)
    console.log(this.openid)
    // this.openid = localStorage.getItem('wechatopenid')
    this.$store.commit('SET_RETURN_URL', '/menu')
  },
  updated () {
    console.log(this.user)
  },
  methods: {
    reg (form) {
      const obj = {
        useropenid: this.openid,
        campus_id: form.campusId, // 是 int 校区 （1：校本部 2：清华园校区 3：双榆树校区）
        user_role: form.userRole, // 是 int 用户角色 （1：教师 2：学生(家长) 3：食堂工作人员
        user_img: this.$store.state.user.userImg
        // user_code: form.userCode, // 是 String  学号或教工号
        // user_level: form.userLevel, // 否 String  初中或高中
        // user_grade: form.userGrade, // 否 String  如 “2018级”
        // user_class: form.userClass // 否 String  如 “1班”
      }
      request({
        url: 'http://zhongkeruitong.top/canteen-system/user/register',
        method: 'post',
        data: obj
      }).then(res => {
        if (res.data.errno !== 0) {
          errorMsg(this, res.data.msg, '120px')
        } else {
          msg(this, '提交成功')
          setTimeout(() => {
            this.$router.push({ name: 'menu' })
          }, 500)
        }
      })
    },
    modi (form) {
      const obj = {
        useropenid: this.openid,
        campus_id: form.campusId, // 是 int 校区 （1：校本部 2：清华园校区 3：双榆树校区）
        user_role: form.userRole // 是 int 用户角色 （1：教师 2：学生(家长) 3：食堂工作人员）
      }
      request({
        url: 'http://zhongkeruitong.top/canteen-system/user/switchCampus',
        method: 'post',
        data: obj
      }).then(res => {
        if (res.data.errno !== 0) {
          errorMsg(this, res.data.msg, '120px')
        } else {
          msg(this, '修改成功')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.register-form {
  .weui-label {
    width: 70px !important;
  }
  .weui-input {
    text-align: right;
  }
  .weui-cells:first-child {
    margin-top: 0;
  }
}
</style>
