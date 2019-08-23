<template>
  <div class="menu-header">
    <div class="toolbars">
      <div class="tool-icon" v-if="userRole === '1'">
        <i class="iconfont iconxiaoquyilan"></i>
        <popup-picker title=""
          :value="[innerCamp]"
          :data="campus"
          :columns="1"
          @on-change="changeCamp"></popup-picker>
      </div>
      <div class="tool-icon" @click="changeDate" v-if="curNav!==2 && userRole !== '3'">
        <i class="iconfont iconrili"></i>
      </div>
      <div class="tool-icon" v-if="curNav===2 || userRole === '3'">
        <i class="iconfont iconrili"></i>
        <popup-picker title=""
          :value="['第' + innerWeek + '周']"
          :data="weekArr"
          :columns="1"
          @on-change="changeWeek"></popup-picker>
      </div>
      <div v-if="userRole === '3'" class="tool-icon" @click="gotoAdd">
        <i class="iconfont iconjikediancanicon01"></i>
      </div>
      <div class="tool-icon" @click="gotoMy">
        <i class="iconfont iconhome_my"></i>
      </div>
    </div>
    <div class="header-img">
      <div class="logo-back" :style="{'background-image': 'url(' + logoImg + ')'}"></div>
      <img :src="logoImg">
    </div>
    <div class="info">
      <span>{{nowCamp}}</span>
      <span>{{nowDate}}</span>
    </div>
    <div class="navbar">
      <div v-if="userRole !== '3'" @click="changeNav(0)" :class="{'active': curNav===0}" class="navbar-item">菜单</div>
      <div v-if="userRole !== '3'" @click="changeNav(1)" :class="{'active': curNav===1}" class="navbar-item">评价</div>
      <div v-if="userRole !== '3'" @click="changeNav(2)" :class="{'active': curNav===2}" class="navbar-item">一周统计</div>
      <div v-if="userRole === '3'" @click="changeNav(4)" :class="{'active': curNav===4}" class="navbar-item">学生统计</div>
      <div v-if="userRole === '3'" @click="changeNav(5)" :class="{'active': curNav===5}" class="navbar-item">老师统计</div>
    </div>
  </div>
</template>
<script>
  import { PopupPicker } from 'vux'
  export default {
    name: 'menuHeader', // 菜单列表
    components: { PopupPicker },
    data () {
      return {
        logoImg: 'http://img3.imgtn.bdimg.com/it/u=2342726261,3398983232&fm=26&gp=0.jpg',
        list: [1, 2, 3],
        innerNowDate: '',
        innerWeek: '',
        innerCamp: '',
        campus: ['校本部', '清华园校区', '双榆树校区'],
        weekArr: []
      }
    },
    computed: {
      userRole () {
        return this.$store.state.user.userRole
      }
    },
    props: {
      curNav: Number,
      nowCamp: String,
      nowDate: String,
      nowWeek: String
    },
    watch: {
      nowDate () {
        this.innerNowDate = this.nowDate
      },
      nowWeek () {
        this.innerWeek = this.nowWeek
      },
      nowCamp () {
        this.innerCamp = this.nowCamp
      }
    },
    mounted () {
      this.weekArr = Array.from({ length: 30 }).map((v, k) => ('第' + (k + 1) + '周'))
    },
    methods: {
      changeCamp (item) {
        console.log(item[0])
        if (item[0] !== '') {
          this.$emit('changeCamp', item[0])
        }
      },
      changeWeek (item) {
        this.innerWeek = item[0].replace('第', '').replace('周', '')
        this.$emit('changeWeek', this.innerWeek)
      },
      changeDate () {
        const _this = this
        this.$vux.datetime.show({
          value: _this.innerNowDate, // 其他参数同 props
          onHide () {
            // const _this = this
          },
          onShow () {
            // const _this = this
          },
          onConfirm (v) {
            console.log('d', v)
            _this.innerNowDate = v
            _this.$emit('changeDate', v)
          }
        })
      },
      changeNav (i) {
        this.$emit('changeNav', i)
      },
      gotoAdd () {
        this.$router.push({ path: '/addMenu' })
      },
      gotoMy () {
        this.$router.push({ path: '/my' })
      }
    }
  }
</script>
<style lang="scss">
  .menu-header {
    background: #fff;
    height: 160px;
    .info {
      font-size: 12px;
      color: #545454;
      position: absolute;
      top: 44px;
      right: 10px;
      span {
        display: block;
        text-align: right;
      }
    }
  }
  .toolbars {
    position: absolute;
    top: 12px;
    right: 10px;
    z-index: 9;
    .tool-icon {
      margin-left: 6px;
      display: inline-block;
      width: 24px;
      height: 24px;
      text-align: center;
      border-radius: 30px;
      border: 1px solid #aaa;
      position: relative;
      .vux-cell-box {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 0;
        left: 0;
        overflow: hidden;
        opacity: 0;
        .vux-popup-picker-value {
          font-size: 0;
        }
      }
      .iconfont {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
  .header-img {
    height: 80px;
    overflow: hidden;
    .logo-back {
      height: 80px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      opacity: 0.4;
      &:after {
        content: "";
        width: 100%;
        height: 50px;
        position: absolute;
        left:0;
        top:0;
        background: inherit;
        filter: blur(20px);
        z-index: 2;
      }
    }
    img {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 20px;
      left: 50%;
      margin-left: -40px;
    }
  }
  .navbar {
    margin: 36px 0 0;
    padding: 0 20px 6px 20px;
    text-align: center;
    border-bottom: 1px solid #f7f7f7;
    .navbar-item {
      display: inline-block;
      width: 30%;
      text-align: center;
      position: relative;
      &.active {
        font-weight: bold;
        &:after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          margin-left: -10px;
          width: 20px;
          height: 2px;
          background: #00a0dc;
        }
      }
    }
  }
</style>
