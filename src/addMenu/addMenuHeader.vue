<template>
  <div class="add-menu-header">
    <div class="header-img">
      <div class="logo-back" :style="{'background-image': 'url(' + logoImg + ')'}"></div>
    </div>
    <div class="add-menu-title">配菜</div>
    <div class="sel-ope">
      <div class="sel-campus">
        <popup-picker title="菜品校区"
          :value="[campus[Number(curCampus) - 1]]"
          :data="campus"
          :columns="1"
          @on-change="selCampus"></popup-picker>
      </div>
      <div class="sel-date">
        <calendar
          :title="''"
          v-model="innerDate"
          @on-change="changeDate"></calendar>
      </div>
    </div>
    <div class="all-food" @click="gotoAddFood">
      <div>加菜</div>
    </div>
    <div class="sub-nav">
      <div @click="changeNav('1')" :class="{'active': curRole==='1'}" class="navbar-item">老师</div>
      <div @click="changeNav('2')" :class="{'active': curRole==='2'}" class="navbar-item">学生</div>
    </div>
  </div>
</template>
<script>
import { PopupPicker } from 'vux'
export default {
  components: {
    PopupPicker
  },
  data () {
    return {
      campus: ['校本部', '清华园校区', '双榆树校区'],
      innerDate: '',
      logoImg: 'http://img3.imgtn.bdimg.com/it/u=2342726261,3398983232&fm=26&gp=0.jpg'
    }
  },
  props: {
    curRole: String,
    curDate: String,
    curCampus: String
  },
  mounted () {
    this.innerDate = this.curDate
  },
  methods: {
    selCampus (item) {
      this.$emit('changeCampus', this.campus.indexOf(item[0]) + 1)
    },
    changeNav (i) {
      this.$emit('changeNav', i)
    },
    changeDate (val) {
      this.$emit('changeDate', val)
    },
    gotoAddFood () {
      this.$router.push({ name: 'addFood' })
    }
  }
}
</script>
<style lang="scss">
.sel-campus {
  width: 100px;
  margin: auto;
  margin-right: 26px;
  .vux-popup-picker-select {
    &:after {
      position: absolute;
      content: "";
      top: 8px;
      right: -14px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #1881dc;
    }
  }
  .weui-cell {
    padding: 0;
  }
  .weui-cell__hd,
  .weui-cell__ft {
    display: none;
  }
  .vux-popup-picker-value {
    font-size: 14px;
  }
}
.sel-date {
  text-align: center;
  .vux-calendar:before {
    display: none;
  }
  .vux-cell-value {
    font-size: 14px;
  }
  .weui-cell {
    width: 100px;
    margin: auto;
    padding: 0;
  }
  .vux-cell-primary {
    text-align: center;
  }
  .weui-cell_access .weui-cell__ft:after {
    position: absolute;
    content: "";
    height: 0;
    width: 0;
    top: 12px !important;
    right: 0;
    transform: none !important;
    width: 0 !important;
    height: 0 !important;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #1881dc;
  }
}
.sel-campus,
.sel-date {
  display: inline-block;
  vertical-align: top;
}
.add-menu-header {
  height: 100px;
  position: relative;
}
.add-menu-title {
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.sel-ope {
  position: absolute;
  top: 46px;
  width: 100%;
  text-align: center;
}
.return-body .header-img {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: -1;
  overflow: hidden;
  .logo-back {
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    opacity: 0.2;
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
.all-food {
  position: absolute;
  right: 12px;
  top: 14px;
}

.sub-nav {
  border-bottom: 1px solid #ddd;
  text-align: center;
  padding-top: 69px;
  .navbar-item {
    display: inline-block;
    width: 40%;
    text-align: center;
    position: relative;
    padding: 10px 0;
    &.active {
      font-weight: bold;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -60px;
        width: 120px;
        height: 2px;
        background: #00a0dc;
      }
    }
  }
}
</style>
