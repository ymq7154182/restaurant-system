<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    openid () {
      return this.$store.state.user.openid
      // return 'oMXOb1f-ADg5c_IEmSjtcYBEE5-g'
      // return 'oMXOb1ePIXkK9I_NKLRMMw8BD-3Y ' // 普通教师
      // return 'oMXOb1RFg_BcxgJghlMatgePLMBY' // 学生
      // return 'oMXOb1ePIXkK9I_NKLRMMw8BD-3Y'
      // return 'oMXOb1SbA65U3odw5hi9hbpgoaHA'
    }
  },
  watch: {
    '$route': function () {
      this.checkRedict()
    }
  },
  mounted () {
    if (localStorage.userimg !== '') {
      this.$store.commit('SET_USER_IMG', localStorage.userimg)
    }
    if (localStorage.openid !== '') {
      this.$store.commit('SET_OPENID', localStorage.openid)
      console.log('localStorage.openid===' + localStorage.openid)
    }

    this.checkRedict()
  },
  methods: {
    checkRedict () {
      request({
        // url: 'http://zhongkeruitong.top/user/getUserInfo?useropenid=' + this.openid,
        // url: 'http://localhost:8081/user/getUserInfo?useropenid=' + this.openid,
        url: 'http://zhongkeruitong.top/canteen-system/user/getUserInfo?useropenid=' + this.openid,
        method: 'get'
      }).then(res => {
        if (res.data.errno === 0) {
          console.log(res.data.data)
          localStorage.setItem('wechatopenid', this.openid)
          localStorage.setItem('role', res.data.data.user_role)
          this.$store.commit('SET_USR_TYPE', res.data.data.user_role)
          this.$store.commit('SET_CAMPUS', res.data.data.campus_id)
          this.$store.commit('SET_INFO_OBJ', res.data.data)
          this.$store.commit('SET_USER_IMG', res.data.data.user_img)
          if (this.$route.name === 'register') {
            this.$router.push({ path: '/menu' })
          }
        } else {
          if (this.$route.name !== 'register') {
            this.$router.push({ path: '/register' })
          }
        }
      }).catch(res => {
        if (this.$route.name !== 'register') {
          this.$router.push({ path: '/register' })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss'; // 全局自定义样式

html, body,
#app,
.app-main {
  height: 100%;
  margin: 0;
}
</style>
