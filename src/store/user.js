// import request from '../utils/request'
// import $ from 'jquery'

const user = {
  state: {
    userRole: '', // 1 教师 2 学生(家长) 3 食堂工作人员
    campusId: '',
    showMsg: false,
    msgType: '',
    msg: '',
    returnText: '',
    returnUrl: '',
    baseUrl: '',
    openid: '',
    userImg: '',
    infoObj: {},
    username: ''
  },
  mutations: {
    SET_INFO_OBJ: (state, obj) => {
      state.infoObj = obj
    },
    SET_CAMPUS: (state, id) => {
      state.campusId = id
    },
    SET_OPENID: (state, id) => {
      console.log('dds', id)
      state.openid = id
    },
    SET_USER_IMG: (state, img) => {
      state.userImg = img
    },
    SHOW_TOAST: (state, msg) => {
      state.msg = msg
      state.msgType = ''
      state.showMsg = true
    },
    SHOW_ERROR_TOAST: (state, msg) => {
      state.msg = msg
      state.msgType = 'error'
      state.showMsg = true
    },
    HIDE_TOAST: (state) => {
      state.msg = ''
      state.msgType = ''
      state.showMsg = false
    },
    SET_RETURN_TEXT: (state, text) => {
      state.returnText = text
    },
    SET_RETURN_URL: (state, url) => {
      state.returnUrl = url
    },
    SET_USR_TYPE: (state, type) => {
      state.userRole = type
    },
    SET_NAME: (state, name) => {
      state.username = name
    }
  },
  actions: {
    // getInfo ({ commit }) {
    //   request({
    //     url: 'http://www.zhiheyikaoqin.cn/user/queryUserInfo?openid=' + this.state.user.openid,
    //     method: 'get'
    //   }).then(res => {
    //     if (Number(res.code) !== 0) {
    //       console.log('res.dat', res.data.data)
    //       commit('SET_INFO_OBJ', res.data.data)
    //       const obj = res.data.data
    //       if (this.state.user.openid === undefined) {
    //         commit('SET_OPENID', obj.teaOpenid || obj.stuOpenid)
    //       }
    //       if (obj === null || obj.createTime === undefined || obj.createTime === null || obj.createTime === '') {
    //         // 彻底没授权过
    //         commit('SET_REG_AUTH', false)
    //       } else {
    //         // 有过头像，获取过授权
    //         commit('SET_REG_AUTH', true)

    //         if (obj.stuCode !== undefined && obj.stuCode !== null) {
    //           // 注册过
    //           commit('SET_REG_STATUS', true)
    //           if (obj.stuName !== null && obj.stuName !== '') {
    //             commit('SET_REG_INFO', true)
    //           } else {
    //             commit('SET_REG_INFO', false)
    //           }
    //         } else if (obj.teaCode !== undefined && obj.teaCode !== null) {
    //           // 注册过
    //           commit('SET_REG_STATUS', true)
    //           if (obj.teaName !== null && obj.teaName !== '') {
    //             commit('SET_REG_INFO', true)
    //           } else {
    //             commit('SET_REG_INFO', false)
    //           }
    //         } else {
    //           // 没注册过
    //           commit('SET_REG_STATUS', false)
    //         }
    //         // 根据信息判断老师还是学生
    //         if (obj.stuCode !== undefined) {
    //           commit('SET_USR_TYPE', '2')
    //         } else if (obj.teaCode !== undefined) {
    //           commit('SET_USR_TYPE', '1')
    //         } else if (obj.staffCode !== undefined) {
    //           commit('SET_USR_TYPE', '3')
    //         }
    //       }
    //     }
    //   }, 20)
    // }
  }
}

export default user
