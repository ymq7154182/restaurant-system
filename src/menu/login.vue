<template>


  <div class="login-area">
    <div class="title" >
      <span></span>登录<span></span>
    </div>
    <!--<label>-->
      <!--<input type="text" placeholder="账号" class="common input"  v-model="user_name">-->
      <!--<input type="password" placeholder="密码" class="common input psw-height" v-model="user_passwd">-->
    <!--</label>-->
    <group>
      <x-input  type="text" placeholder="账号" v-model="user_name" class="common input" style="background-color: white"></x-input>
      <x-input  type="password" placeholder="密码" v-model="user_passwd" class="common input" style="background-color: white"></x-input>
    </group>
    <!--<button class="common login-btn" @click="staffLogin">-->
      <!--登录-->
    <!--</button>-->
    <x-button class="common login-btn" @click.native="staffLogin">登录</x-button>
  </div>
</template>
<!---->

<script>
  import request from '@/utils/request'
  import { XInput, XButton } from 'vux'

  export default {
    // 向index.vue传入Show=false
    props: ['Show'],
    components: {
      XInput,
      XButton
    },
    data () {
      return {
        user_name: '',
        user_passwd: '',
        wechat_openid: localStorage.getItem('wechatopenid')
      }
    },
    // mounted () {
    //   var scale = 1 / devicePixelRatio
    //   document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
    //   document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'
    // },
    methods: {
      staffLogin () {
        // var url = '/user/registerStaff'
        // this.$axios.post(url,this.$qs.stringify({
        //   user_name: this.form.user_name,
        //     user_passwd: this.form.user_passwd
        // }))
        // var data = this.qs.stringify({
        //   user_name: this.form.user_name,
        //   user_passwd: this.form.user_passwd
        // })
        request({
          url: '/user/registerStaff',
          method: 'post',
          data: {
            user_name: this.user_name,
            user_passwd: this.user_passwd,
            wechat_openid: this.wechat_openid
          }

        }

        // localStorage.setItem("name",this.form.user_name),
        // console.log('efewfwef==='+localStorage.setItem("name",this.form.user_name))
          // 传入false
        ).then((res) => {
          if (res.data.errno === 0) {
            localStorage.setItem('name', this.user_name)
            // this.$store.commit('SET_NAME', this.user_name)
            this.$emit('reg', false)
            console.log('openid===' + localStorage.getItem('wechatopenid'))
            console.log('ewewfew==' + this.wechat_openid)
            console.log('localStorage.openid===' + localStorage.openid)
          } else {
            alert(res.data.errmsg)
          }

          // console.log('fewfwefwef===='+this.user_name)
          // console.log('efewfwef==='+localStorage.setItem("name",this.form.name))
        })
      }
    }
  }
</script>

<style>
  /*.input1{*/
    /*!*width: 50%;*!*/
    /*!*max-width: 500px;*!*/
    /*!*padding: 10px 20px;*!*/
    /*!*text-align: center;*!*/
    /*!*margin-left: 55px;*!*/

    /*height: 35px;*/
    /*width: 60%;*/
    /*padding: 5px 5px 5px 10px;*/
    /*margin: 0 18% 20px;*/
    /*font-size: 14px;*/
    /*border: 1px solid #d2d2d2;*/
    /*font-family: 微软雅黑;*/
    /*!*position: relative;*!*/
  /*}*/
  .login-area {
    margin: 0 auto;
    width: 10rem;
    height: 8rem;
    margin-top: 2.66rem;
  }

  .login-area .common {
    font-family: 微软雅黑;
    position: relative;

  }

  .login-area .input {
    top: 1.3rem;
    height: 1.2rem;
    width: 80%;
    padding: 0.03rem 0.03rem 0.03rem 0.06rem;
    margin: 0.26rem 12%;
    font-size: 1.8em;
    border: 0.013rem solid #d2d2d2;
    outline: none;
  }
  .login-area .input_on{
    border-color:#00BBFF;
  }


  .login-area .psw-height {
    top: 1.46rem;
  }

  .login-area .login-btn {
    top: 2.26rem;
    left: 0.3rem;
    /*left: 1.25rem;*/
    background: #3090e7;
    border: none;
    width: 80%;
    height: 1rem;
    color: #fff;
    font-size: 1.4em;
  }

  .login-area .title {
    font-family: 微软雅黑;
    color: #3090e7;
    position: relative;
    top: 0.933rem;
    font-size: 1.8em;
    width: 100%;
    text-align: center;
  }

  .login-area .title span {
    border-bottom: 0.013rem solid #3090e7;
    width: 0.533rem;
    height: 0;
    display: inline-block;
    margin: 0 0.133rem 0.066rem;
  }
</style>
<!--<style>-->
  <!--/*.input1{*/-->
  <!--/*!*width: 50%;*!*/-->
  <!--/*!*max-width: 500px;*!*/-->
  <!--/*!*padding: 10px 20px;*!*/-->
  <!--/*!*text-align: center;*!*/-->
  <!--/*!*margin-left: 55px;*!*/-->

  <!--/*height: 35px;*/-->
  <!--/*width: 60%;*/-->
  <!--/*padding: 5px 5px 5px 10px;*/-->
  <!--/*margin: 0 18% 20px;*/-->
  <!--/*font-size: 14px;*/-->
  <!--/*border: 1px solid #d2d2d2;*/-->
  <!--/*font-family: 微软雅黑;*/-->
  <!--/*!*position: relative;*!*/-->
  <!--/*}*/-->
  <!--.login-area {-->
    <!--margin: 0 auto;-->
    <!--width: 600px;-->
    <!--height: 450px;-->
    <!--margin-top: 200px;-->
  <!--}-->

  <!--.login-area .common {-->
    <!--font-family: 微软雅黑;-->
    <!--position: relative;-->

  <!--}-->

  <!--.login-area .input {-->
    <!--top: 100px;-->
    <!--height: 50px;-->
    <!--width: 70%;-->
    <!--padding: 10px 10px 10px 20px;-->
    <!--margin: 5px 12%;-->
    <!--font-size: 14px;-->
    <!--border: 2px solid #d2d2d2;-->
    <!--outline: none;-->
  <!--}-->
  <!--.login-area .input_on{-->
    <!--border-color:#00BBFF;-->
  <!--}-->


  <!--.login-area .psw-height {-->
    <!--top: 110px;-->
  <!--}-->

  <!--.login-area .login-btn {-->
    <!--top: 170px;-->
    <!--left: 85px;-->
    <!--background: #3090e7;-->
    <!--border: none;-->
    <!--width: 70%;-->
    <!--height: 50px;-->
    <!--color: #fff;-->
    <!--font-size: 1em;-->
  <!--}-->

  <!--.login-area .title {-->
    <!--font-family: 微软雅黑;-->
    <!--color: #3090e7;-->
    <!--position: relative;-->
    <!--top: 70px;-->
    <!--font-size: 1.4em;-->
    <!--width: 100%;-->
    <!--text-align: center;-->
  <!--}-->

  <!--.login-area .title span {-->
    <!--border-bottom: 1px solid #3090e7;-->
    <!--width: 40px;-->
    <!--height: 0;-->
    <!--display: inline-block;-->
    <!--margin: 0 10px 5px;-->
  <!--}-->
<!--</style>-->
