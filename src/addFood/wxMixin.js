import wx from 'weixin-js-sdk'
import request from '@/utils/request'

export default {
  methods: {
    getSign () {
      // const url = location.href.split('#')[0]
      const url = encodeURIComponent(window.location.href.split('#')[0])
      console.log('=======', location.href.split('#')[0])
      request({
        url: 'http://zhongkeruitong.top/canteen-system/wechat/getSign?url=' + url,
        method: 'get'
      }).then(res => {
        if (Number(res.data.code) !== 0) {
          console.log('请求失败')
          this.msg = '获取失败'
          this.msgType = 'error'
          this.$refs.msgRef.toast()
        } else {
          this.wxSign = res.data.data
          this.signWX()
        }
      })
    },
    savepictureurl () {
      let thisurl = this.serverIds
      // alert('我进入了这个方法' + thisurl)
      request({
        url: 'http://zhongkeruitong.top/canteen-system/wechat/savePicture?serverIds=' + thisurl,
        method: 'get'
      }).then(res => {
        // alert('这是后端返回的东西：' + res.data)
        // if (Number(res.data.errno) !== 0) {
        //   alert('请求接口失败')
        //   console.log('请求失败')
        //   this.msg = '获取失败'
        //   this.msgType = 'error'
        //   this.$refs.msgRef.toast()
        // } else {
        //   alert('我拿到返回的data了')
        //   this.dishimgurl = res.data.toString()
        //   alert('通过接口获得的服务器地址' + this.dishimgurl)
        // }
        // alert('我拿到返回的data了')
        this.dishimgurl = res.data.toString()
        // alert('通过接口获得的服务器地址' + this.dishimgurl)
      })
    },
    signWX () {
      // const _this = this
      /* eslint-disable */
      console.log('先进行config调试')
      console.log(this.wxSign.appId)
      console.log(this.wxSign.signature)
      console.log(this.wxSign.nonceStr)
      console.log(this.wxSign.jsapi_ticket)
      console.log(this.wxSign.url)
      // alert('appid'+this.wxSign.appId+'signature'+this.wxSign.signature+'nonceStr'+this.wxSign.nonceStr+'jsapi_ticket'+this.wxSign.jsapi_ticket+'url'+this.wxSign.url)

      wx.config({
        debug: false,
        appId: this.wxSign.appId, // 必填，公众号的唯一标识
        timestamp: this.wxSign.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.wxSign.nonceStr, // 必填，生成签名的随机串
        signature: this.wxSign.signature, // 必填，签名
        jsApiList: ['checkJsApi','chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        console.log('调试准备')
        wx.checkJsApi({
          jsApiList : ['checkJsApi','chooseImage', 'uploadImage'],
          success : function(res) {
            console.log('success', res)
          }
        })
        // wx.scanQRCode({
        //   needResult: 0,
        //   scanType: ['qrCode'],
        //   success: function (res) {
        //     var result = res.resultStr
        //     console.log('scanb', res, result)
        //   }
        // })
      })
      wx.error(function(res){
        console.log('调试错误', res)
      })
      /* eslint-enable */
    },
    selPic () {
      console.log('选择图片准备')
      // this.dishimgurl = this.logoImg
      wx.chooseImage({
        // 调用wx选择图片
        count: 1, // 默认9, 我设置成5张，也可通过变量设置
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          console.log('可以选择图片了')
          this.localIds = res.localIds.toString() // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          // localIds.forEach(li => {
          // this.dishimgurl.push(li)// 示例中定义，的图片集合中接收到每个图片的src供页面展示
          // console.log(li)
          // console.log(this.dishimgurl)
          // })
          // this.dishimgurl = localIds
          wx.getLocalImgData({
            localId: this.localIds,
            success: res => {
              // this.uploadPicture()
              // console.log(res)
              // this.uploadpictureurl()
              let localData = res.localData
              if (localData.indexOf('data:image') !== 0) {
                localData = 'data:image/jpeg;base64,' + localData
              }
              localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg')
              this.dishimgurl = localData
              // this.showpicurl = localData.replace('jpg', 'jpeg')
              // if (window.isIOS) {
              //   console.log('ios')
              //   let localData = res.localData
              //   this.showpicurl = localData.replace('jpg', 'jpeg')
              // } else if (window.android) {
              //   this.showpicurl = 'data:image/jpeg/png;base64,' + res.localData
              // }
            }
          })
          this.uploadpictureurl()
        },
        /* eslint-disable */
        fail: err => {
          console.log('fff')
        }
      })
    },
    /* eslint-disable */
    uploadpictureurl () {
      // alert('上传我的图片')
      console.log('上传我的图片')

      wx.uploadImage({  // 调用微信上传图片
        localId: this.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: res => {
          let serverId = res.serverId
          this.serverIds = serverId // 给data中定义的数组添加值，把它传到后台
          //this.dishimgurl = this.serverIds
          //alert("这是图片提交服务器地址：" + this.serverIds)
          //alert('创建成功...')
          this.savepictureurl()
        },
        fail: err => {
          alert('创建失败...')
        }
      })
    }
  }
}
