<template>
  <div class="rate-list">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in rateMenu"
            class="menu-item"
            :class="{'current': curRateMenu === index}"
            @click="selectRate(index)">
            <span class="text ">{{item}}</span>
         </li>
       </ul>
    </div>
    <div class="rate-wrapper" v-if="loading">
      <loading></loading>
    </div>
    <div v-if="" class="rate-wrapper" ref="rateWrapper">
      <ul v-if="curRateMenu === 1">
        <template v-if="!loading && noFood">
          <div class="menu-no-data">
            <no-data></no-data>
          </div>
        </template>
        <li v-if="!loading && !noFood" v-for="(food, findex) in foods" class="food-item">
          <div class="icon" @click="test">
            <img width="66" height="66" :src="food.dishimgurl || defaultImg">
          </div>
          <div class="content">
            <h2 class="name">{{food.dishname}}</h2>
            <!-- <p class="description">{{food.dishdesc}}</p> -->
            <div class="extra">
              <span class="count">{{food.meal}}</span><span class="rating">{{food.dishclass}}</span>
            </div>
            <div class="cart-wrapper">
              <div v-for="(sitem, sindex) in quesScore"
                v-if="sindex !== 0"
                class="ques-score-item"
                :class="{'active': food.suggestion && food.suggestionId === sindex}"
                v-tap="[setScore, findex, sindex, 'food']">
                <i :class="['iconfont', quesIcon[sindex]]"></i>
              </div>
            </div>
          </div>
        </li>
        <li v-if="!loading && !noFood" class="rate-item rate-btn" v-tap="[rateFoodAPI]">提交评价</li>
      </ul>
      <ul v-if="curRateMenu === 0">
        <template v-if="!loading && noService">
          <div class="menu-no-data">
            <no-data></no-data>
          </div>
        </template>
        <li v-if="!loading && !noService" v-for="(qitem, qindex) in ques" class="rate-item">
          <div class="ques-title">
            {{qitem.questionid}}. {{qitem.questioncontent}}
          </div>
          <div class="ques-score">
            <template v-if="qindex !== 6">
             <!--  <rate-comp
                :item="qitem"
                :list="quesScore"
                :findex="qindex"
                :type="'service'"
              ></rate-comp> -->
              <div class="ques-score-item"
                v-for="(sitem, sindex) in quesScore"
                :class="{'active': qitem.suggestion && qitem.suggestionId === sindex}"
                v-if="sindex !== 0"
                v-tap="[setScore, qindex, sindex, 'service']">
                <i :class="['iconfont', quesIcon[sindex]]"></i>
              </div>
            </template>
            <template v-else>
              <div class="rate-adv" v-tap="[setScore, qindex, '', 'service']">{{qitem.suggestionText || '点我输入'}}</div>
            </template>
          </div>
        </li>
        <li v-if="!loading && !noService" class="rate-item rate-btn" v-tap="[rateServiceAPI]">提交评价</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import request from '@/utils/request'
import { msg, errorMsg } from '@/utils/common'
import loading from '../components/loading'
import noData from '../components/noData'
import rateComp from './rateComp'

export default {
  components: {
    loading,
    noData,
    rateComp
  },
  data () {
    return {
      noService: false,
      noFood: false,
      loading: false,
      camps: ['', '校本部', '清华园校区', '双榆树校区'],
      rateMenu: ['评价食堂', '评价菜品'],
      curRateMenu: 0,
      curCom: '',
      foods: [],
      ques: [],
      quesIcon: ['', 'iconxiaolian', 'iconpinglian', 'iconkulian'],
      quesScore: ['', '满意', '一般', '不满意'],
      defaultImg: 'https://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114'
    }
  },
  props: {
    nowDate: String,
    nowCamp: String
  },
  computed: {
    userRole () {
      return this.$store.state.user.userRole
    },
    campusId () {
      return this.$store.state.user.campusId
    },
    openid () {
      return this.$store.state.user.openid
    }
  },
  created () {
    this.initDailyMenu()
    this.initQues()
  },
  watch: {
    userRole () {
      this.initDailyMenu()
      this.initQues()
    },
    nowDate () {
      this.initDailyMenu()
      this.initQues()
    },
    nowCamp () {
      this.initDailyMenu()
      this.initQues()
    }
  },
  methods: {
    test () {
      console.log('test')
    },
    _initScroll () {
      this.loading = false
      this.$nextTick(() => {
        this.foodsScroll = new BScroll(this.$refs.rateWrapper, {
          // scrollY: true
        })
      })
    },
    // 获取当日菜单
    initDailyMenu () {
      if (this.nowDate === undefined || this.nowDate === '' || this.nowCamp === '') {
        return
      }
      this.loading = true
      const campusId = this.camps.indexOf(this.nowCamp)
      const url = 'rest/getCommentInfo?role=' + this.userRole + '&date=' + this.nowDate + '&campus_id=' + campusId
      request({
        url: url,
        method: 'get'
      }).then(res => {
        if (res.data.errno === 0) {
          const mealNameMap = ['', '早餐', '中餐', '晚餐']

          this.foods = res.data.disheslist.map(item => {
            // item.dishimgurl = item.dishimgurl
            // item.dishimgurl = this.defaultImg
            item.suggestionId = -1 // 2
            item.suggestion = '' // this.quesScore[2]
            return item
          }).sort(function (a, b) {
            const amealid = mealNameMap.indexOf(a.mealid.split('-')[0])
            const bmealid = mealNameMap.indexOf(b.mealid.split('-')[0])
            console.log(amealid, bmealid)
            return Number(amealid) - Number(bmealid)
          })
          this.noFood = false

          setTimeout(() => {
            this._initScroll()
          }, 20)
        } else {
          this.loading = false
          this.noFood = true
        }
      })
    },
    initQues () {
      if (this.nowDate === undefined || this.nowDate === '' || this.nowCamp === '') {
        return
      }
      const campusId = this.camps.indexOf(this.nowCamp)
      this.loading = true
      request({
        url: 'rest/getServiceInfo?campus_id=' + campusId,
        method: 'get'
      }).then(res => {
        if (res.data.errno === 0 && res.data.dishservicelist.length !== 0) {
          this.ques = res.data.dishservicelist.map(item => {
            item.suggestionId = -1
            item.suggestion = '' // this.quesScore[-1]
            return item
          })
          this.noService = false

          setTimeout(() => {
            this._initScroll()
          }, 20)
        } else {
          this.loading = false
          this.noService = true
        }
      })
    },
    // 切换评价菜单或服务
    selectRate (i) {
      this.curRateMenu = i
      this.initQues()
      this.initDailyMenu()
    },
    // 点击评价
    setScore (qIndex, sIndex, type) {
      console.log('setScore')
      const _this = this
      if (type === 'service') {
        if (sIndex === 3 || qIndex === 6) {
          this.$vux.confirm.show({
            title: '评价意见',
            showInput: true,
            closeOnConfirm: true,
            placeholder: '请输入意见',
            // 组件除show外的属性
            onCancel () {
            },
            onConfirm (value) {
              if (value === '') {
                errorMsg(_this, '不能为空')
                return
              }
              _this.$set(_this.ques[qIndex], 'suggestion', _this.quesScore[sIndex])
              _this.$set(_this.ques[qIndex], 'suggestionId', sIndex)
              _this.$set(_this.ques[qIndex], 'suggestionText', value)
            }
          })
        } else {
          _this.$set(_this.ques[qIndex], 'suggestion', _this.quesScore[sIndex])
          _this.$set(_this.ques[qIndex], 'suggestionId', sIndex)
        }
      } else {
        if (sIndex === 1 || sIndex === 2) {
          _this.$set(_this.foods[qIndex], 'suggestion', _this.quesScore[sIndex])
          _this.$set(_this.foods[qIndex], 'suggestionId', sIndex)
        } else {
          this.$vux.confirm.show({
            title: '评价意见',
            showInput: true,
            closeOnConfirm: true,
            placeholder: '请输入您的意见',
            // 组件除show外的属性
            onCancel () {
            },
            onConfirm (value) {
              if (value === '') {
                errorMsg(_this, '输入不能为空')
                return
              }
              _this.$set(_this.foods[qIndex], 'suggestion', _this.quesScore[sIndex])
              _this.$set(_this.foods[qIndex], 'suggestionId', sIndex)
              _this.$set(_this.foods[qIndex], 'suggestionText', value)
            }
          })
        }
      }
    },
    // 评价服务接口
    rateServiceAPI () {
      // let flag = false
      // this.ques.map(item => {
      //   if (item.suggestionId === -1) {
      //     flag = item.suggestionId || flag
      //   }
      // })
      // if (flag) {
      //   errorMsg(this, '评价不能为空')
      //   return
      // }
      const campusId = this.camps.indexOf(this.nowCamp)

      request({
        url: 'rest/insertServiceInfo',
        method: 'post',
        data: {
          role: 1,
          date: this.nowDate,
          campus_id: campusId,
          user_code: this.openid,
          dishservicelist: JSON.stringify(this.ques.map(item => {
            const tmpItem = {
              questionid: item.questionid,
              suggestion: item.suggestionId === -1 ? '' : item.suggestionId,
              message: item.suggestionText
            }
            return tmpItem
          }))
        }
      }).then(res => {
        if (res.data.errno === 0) {
          msg(this, '评价成功')
        } else {
          errorMsg(this, res.data.errmsg)
        }
      })
    },
    // 评价菜品接口
    rateFoodAPI () {
      const campusId = this.camps.indexOf(this.nowCamp)
      // let flag = false
      // this.foods.map(item => {
      //   if (item.suggestionId === -1) {
      //     flag = item.suggestionId || flag
      //   }
      // })
      // if (flag) {
      //   errorMsg(this, '评价不能为空')
      //   return
      // }

      request({
        url: 'rest/insertCommentInfo',
        method: 'post',
        data: {
          role: 1,
          date: this.nowDate,
          campus_id: campusId,
          user_code: this.openid,
          disheslist: JSON.stringify(this.foods.map(item => {
            const tmpItem = {
              dishid: item.dishid,
              suggestion: item.suggestionId === -1 ? '' : item.suggestionId,
              message: item.suggestionText
            }
            return tmpItem
          }))
        }
      }).then(res => {
        if (res.data.errno === 0) {
          msg(this, '评价成功')
        } else {
          errorMsg(this, res.data.errmsg)
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .rate-list {
    position: absolute;
    top: 144px;
    bottom: 0;
    width: 100%;
    max-width: 540px;;
    display: flex;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 90px;
      background: #f3f5f7;
      .menu-item{
        width: 70px;
        height: 54px;
        display: table;
        font-size: 12px;
        line-height: 14px;
        padding: 0 10px;
        font-weight: 200;
        text-align: center;
        &:last-child{
          .text:after{
            border-top: none;
          }
        }
        &.current{
          position: relative;
          background: #fff;
          font-weight: 700;
          margin-top: -1px;
          z-index: 100;
          .text:after{
            border-top: 0;
          }
        }
        .text{
          display: table-cell;
          vertical-align: middle;
          width: 56px;
          font-size: 12px;
          .icon{
            vertical-align: top;
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;

          }
        }
      }
    }
    .food-list {
      list-style: none;
    }
    .rate-wrapper{
      flex: 1;
      & > ul {
        padding-bottom: 1px;
        padding-top: 20px;
      }
      .title{
        margin-left: 20px;
        padding-left: 10px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        height: 26px;
        line-height: 26px;
        color: rgb(147,153,159);
      }
      .food-item {
        display: flex;
        margin: 0 18px 24px 18px;
        &:last-child:after{
          border-top: 0;
        }
        .icon{
          flex: 0 0 66px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          position: relative;
          .name{
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .description,
          .extra{
            font-size: 10px;
            line-height: 1.2;
            color: rgb(147,153,159);
            margin-bottom: 8px;
          }
          .extra{
            .count{
              margin-right: 12px;
              line-height: 10px;
            }
            .rating{
              line-height: 10px;
            }
          }
          .price{
            .now{
              font-size: 14px;
              color: rgb(240,20,20);
              font-weight: 700;
              line-height: 24px;
              margin-right: 8px;
            }
            .old{
               font-size: 10px;
               text-decoration: line-through;
               color: rgb(147,153,159);
               font-weight: 700;
               line-height: 24px;
            }
          }
        }
      }
      .rate-item {
        list-style: none;
        margin: 0 18px 18px 18px;
      }
      .ques-title {
        margin-bottom: 4px;
      }
      .ques-score-item {
        display: inline-block;
        border-radius: 20px;
        width: 18px;
        height: 18px;
        padding: 1px;
        line-height: 20px;
        text-align: center;
        .iconfont {
          line-height: 1;
        }
        &:nth-child(1) {
          background: #5dc386;
          color: #fff;
        }
        &:nth-child(2) {
          background: #aaa;
          color: #fff;
        }
        &:nth-child(3) {
          background: #ef5252;
          color: #fff;
        }
        &:not(.active) {
          background: #fff;
          border-color: #ddd;
          color: #5a4f4f;
        }
      }
      .rate-item .ques-score-item {
        border-radius: 4px;
        border: 1px solid #ddd;
        padding: 6px 4px;
        line-height: 18px;
        .iconfont {
          line-height: 1;
        }
        &:nth-child(1) {
          background: #5dc386;
          border-color: #5dc386;
          color: #fff;
        }
        &:nth-child(2) {
          background: #aaa;
          border-color: #aaa;
          color: #fff;
        }
        &:nth-child(3) {
          background: #ef5252;
          border-color: #ef5252;
          color: #fff;
        }
        &:not(.active) {
          background: #fff;
          border-color: #ddd;
          color: #5a4f4f;
        }
      }
      .ques-score-item + .ques-score-item {
        margin-left: 25px;
      }
      .rate-btn {
        margin: 30px auto;
        width: 100px;
        height: 30px;
        line-height: 30px;
        background: #00a0dc;
        color: #fff;
        border-radius: 5px;
        text-align: center;
      }
    }
  }
</style>
