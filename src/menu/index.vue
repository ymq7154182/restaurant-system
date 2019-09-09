<template>
  <div>
    <!-- <cal></cal> -->
    <menu-header
      @changeNav="changeNav"
      @changeDate="changeDate"
      @changeWeek="changeWeek"
      @changeCamp="changeCamp"
      :nowDate="nowDate"
      :nowWeek="nowWeek"
      :nowCamp="nowCamp"
      :curNav="curNav"></menu-header>
    <component
      v-bind:is="content"
      :nowWeek="nowWeek"
      :nowDate="nowDate"
      :nowCamp="nowCamp"
    ></component>
    <div class="login" v-show="Show">
      <Login :Show="Show" v-on:reg="ds"></Login>
    </div>
    <div class="stulogin"  v-show="Show1">
     <StuLogin v-on:closediv="closediv"></StuLogin>
    </div>
  </div>



</template>

<script>
  import menuHeader from './menuHeader'
  import menuList from './menuList'
  import cal from './cal'
  import rateList from './rateList'
  import overRoll from './overRoll'
  import stuOverRoll from './stuOverRoll'
  import teaOverRoll from './teaOverRoll'
  import request from '@/utils/request'
  import { userGetDate } from '@/utils/common'
  import Login from '@/menu/login'
  import StuLogin from '@/menu/stulogin'

  export default {
    name: 'cmenu', // 菜单列表页
    components: { cal, menuHeader, menuList, rateList, overRoll, stuOverRoll, teaOverRoll, Login, StuLogin },
    data () {
      return {
        Show: false,
        content: 'menuList',
        navCon: ['menuList', 'rateList', 'overRoll', '', 'stuOverRoll', 'teaOverRoll'],
        curNav: 0,
        nowDate: '',
        nowWeek: '',
        nowCamp: '校本部',
        camps: ['', '校本部', '清华园校区', '双榆树校区'],
        Show1: false,
        openid: '',
        Show2: 1
      }
    },
    computed: {
      campusId () {
        return this.$store.state.user.campusId
      },
      userRole () {
        return this.$store.state.user.userRole
      }
    },
    watch: {
      campusId () {
        this.getCamp()
      },
      userRole () {
        this.initNav()
        this.getRole()
      }
    },
    mounted () {
      this.openid = localStorage.getItem('wechatopenid')
      this.nowDate = userGetDate(new Date())
      this.getWeek()
      this.getCamp()
      this.initNav()
      this.getRole()
      console.log('fffeeerrrrer')
      console.log(this.userRole)
      this.findRole()
      // this.getName()
    },
    methods: {
      initNav () {
        if (this.userRole === '3') {
          this.curNav = 4
          this.changeNav(4)
        } else {
          this.curNav = 2
          this.changeNav(2)
          // this.curNav = 0
          // this.changeNav(0)
        }
      },
      getCamp () {
        if (this.campusId === undefined || this.campusId === '') {
          this.nowCamp = ''
        } else {
          this.nowCamp = this.camps[this.campusId]
        }
      },
      getWeek () {
        this.loading = true
        const url = 'rest/getCurrentWeek'
        const date = userGetDate(new Date())
        request({
          url: url,
          method: 'post',
          data: {
            date: date
          }
        }).then(res => {
          if (res.data.errno === 0) {
            console.log('s', res.data)
            this.nowWeek = res.data.week
          }
        })
      },
      getDate () {
        this.nowDate = userGetDate(new Date())
      },
      changeCamp (i) {
        this.nowCamp = i
      },
      changeWeek (i) {
        this.nowWeek = i
      },
      changeDate (i) {
        this.nowDate = i
      },
      changeNav (i) {
        console.log('dd', i)
        if (this.userRole !== '3') {
          this.getWeek()
        }
        if (this.curNav === 2 || i === 2 || this.userRole === '3') {
          this.getDate()
        }
        this.curNav = i
        this.content = this.navCon[i]
      },
      getRole () {
        if (this.userRole === '3') {
          this.Show1 = false
          // this.Show = true
          var name = localStorage.getItem('name')
          // var name = this.$store.state.user.username
          console.log('名字：' + name)
          // console.log('ewfweweewr=='+name)
          if (name === null) {
            this.Show = true
          } else {
            this.Show = false
          }
        }
          // this.$router.push('/login')
        // } else if (this.userRole === '2' && this.Show2 === 0) {
        //   console.log(this.openid)
        //   this.Show = false
        //   this.Show1 = true
        // } else {
        //   this.Show = false
        //   this.Show1 = false
        // }
      },
      findRole () {
        const url = 'user/findUserCode?openid=' + this.openid + '&role=' + localStorage.getItem('role')
        request({
          url: url,
          method: 'get'
        }).then(res => {
          console.log('fffffff')
          console.log(this.userRole)
          if (res.data.errno === 115) {
            this.Show1 = true
            console.log('fffffffeeeeeeeefff')
            console.log(this.userRole)
            // if (this.userRole === '2') {
            //   this.Show1 = true
            // } else {
            //   this.Show1 = false
            // }
          } else {
            // this.Show2 = 1
            this.Show1 = false
            console.log('fffffffffee')
            console.log(this.userRole)
          }
        })
      },
      // getName () {
      //   var name = localStorage.getItem('name')
      //   // console.log('ewfweweewr=='+name)
      //   if (name === null) {
      //     this.Show = true
      //   } else {
      //     this.Show = false
      //   }
      // },
      // 接受login.vue传来的false 并赋值给Show
      ds (msg) {
        this.Show = msg
        console.log(msg)
      },
      closediv (msg) {
        console.log(msg)
        this.Show1 = msg
      }
    }
  }
</script>

<style>
  .login{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
  }
  .stulogin {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(255, 255,255, 1);
  }
</style>
