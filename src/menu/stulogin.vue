<template>
  <div style="position:relative;">
    <div class="stulogins">
      <group>
        <div style="font-size: 16px">
          <span>学号</span>
        </div>
        <!--<div style="position: absolute;top:40px">-->
          <!--<i class="ymq-icontubiao-qiapian" style="font-size: 20px"></i>-->
        <!--</div>-->

        <x-input  v-model="stuid" placeholder="学生学号" type="text">
          <i class="ymq-icontubiao-qiapian icons"  slot="label"></i>
        </x-input>
        <div style="font-size: 16px;margin-top: 40px">
          <span>姓名</span>
        </div>
        <x-input  v-model="stuname" placeholder="学生姓名" type="text">
          <i class="ymq-iconuser icons" slot="label"></i>
        </x-input>
      </group>
      <div style="font-size: 16px;margin-top: 20px">
        <span>评价人</span>
      </div>
      <div style="margin-top: 20px">
        <checker v-model="role" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item value="父亲" class="item1">{{'父亲'}}</checker-item>
          <checker-item value="母亲" class="item1">{{'母亲'}}</checker-item>
          <checker-item value="本人" class="item1">{{'本人'}}</checker-item>
        </checker>
      </div>
      <div style="width: 60%;margin: 40px auto">
        <x-button class="button" @click.native="stulogin" :disabled="shows" :style="buttons">立即登录</x-button>
      </div>

    </div>
  </div>
</template>


<script>
  import { XInput, XButton, Checker, CheckerItem } from 'vux'
  import request from '@/utils/request'
  export default {
    name: 'stulogin',
    components: {
      XInput,
      XButton,
      Checker,
      CheckerItem
    },
    computed: {
      shows () {
        if (this.stuid !== '' && this.stuname !== '' && this.role !== '') {
          return false
        } else {
          return true
        }
      },
      buttons () {
        if (this.stuid !== '' && this.stuname !== '' && this.role !== '') {
          return 'background-color:#66CCCC;color:black'
        } else {
          return 'background-color:#cccccc;color:white'
        }
      }
    },
    data () {
      return {
        stuid: '',
        stuname: '',
        role: '',
        openid: '',
        closediv: true
        // shows: true
      }
    },
    mounted () {
      this.openid = localStorage.getItem('wechatopenid')
    },
    methods: {
      stulogin () {
        console.log('学生登录')
        console.log(this.role)
        console.log(this.openid)
        const url = 'user/relationUserCode'
        request({
          url: url,
          method: 'post',
          data: {
            openid: this.openid,
            name: this.stuname,
            userCode: this.stuid,
            identity: this.role
          }
        }).then(res => {
          if (res.data.errno === 0) {
            alert('登录成功！')
            this.closediv = false
            this.$emit('closediv', this.closediv)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .stulogins {
    height: 500px;
    width: 80%;
    /*background-color: red;*/
    position: absolute;
    left: 50%;
    top: 15%;
    transform: translate(-50%, 15%);
  }
  .weui-cell {
    border-bottom: 1px solid grey;
    height: 40px;
    font-size: 16px;
  }
  .weui-cell:before {
    border-top: 0 solid white;
  }
  .demo1-item {
    border: 1px solid #66CCCC;
    border-radius: 20px;
    padding: 5px 15px;
    color: #66CCCC;
  }
  .demo1-item-selected {
    color: white;
    background-color: #66CCCC;
  }
  .item1 {
    margin-right: 10px;
  }
  .button {
    height: 42px;
    border-radius: 40px;
    background-color: #66CCCC;
    color: black;
    font-size: 14px;
  }
  /*.button:active {*/
    /*background-color: white;*/
  /*}*/
  .icons {
    font-size: 20px;
    margin-right: 10px;
    color: #66CCCC
  }
</style>
