<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" @click="toggleList">
          <div class="logo" :class="{'highlight': totalCount > 0} ">
            <span class="iconfont iconcaipu" :class="{'highlight': totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click.stop.prevent="pay">保存</div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="cartShow">
        <div class="list-header">
          <h1 class="title">菜单</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-if="mealZao.length !== 0" class="food-type">早餐</li>
            <li v-if="mealZao.length !== 0" v-for="food in mealZao" class="food">
              <span class="name">{{food.dishname}}</span>
              <div class="cartcontrol-wrapper">
                <cartcontrol
                  :partent="'shopcart'"
                  :food="food"
                  @cartSelFood="cartSelFood"
                ></cartcontrol>
              </div>
            </li>
            <li v-if="mealWu.length !== 0" class="food-type">午餐</li>
            <li v-if="mealWu.length !== 0" v-for="food in mealWu" class="food">
              <span class="name">{{food.dishname}}</span>
              <div class="cartcontrol-wrapper">
                <cartcontrol
                  :partent="'shopcart'"
                  :food="food"
                  @cartSelFood="cartSelFood"
                ></cartcontrol>
              </div>
            </li>
            <li v-if="mealWan.length !== 0" class="food-type">晚餐</li>
            <li v-if="mealWan.length !== 0" v-for="food in mealWan" class="food">
              <span class="name">{{food.dishname}}</span>
              <div class="cartcontrol-wrapper">
                <cartcontrol
                  :partent="'shopcart'"
                  :food="food"
                  @cartSelFood="cartSelFood"
                ></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask-fade">
      <div class="list-mask" @click="hideList" v-show="cartShow"></div>
    </transition>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import { msg, errorMsg } from '@/utils/common'

  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default {
    props: {
      curRole: String,
      curDate: String,
      curCampus: String,
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        listContentScroll: null,
        fold: true,
        mealZao: [],
        mealWu: [],
        mealWan: []
      }
    },
    computed: {
      totalCount () {
        return this.selectFoods.length || 0
      },
      payClass () {
        if (this.selectFoods.length === 0) {
          return `not-enough`
        } else {
          return `enough`
        }
      },
      cartShow () {
        if (this.totalCount === 0) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          // 手动刷新better-scroll重新计算页面高度
          if (!this.listContentScroll) {
            this.listContentScroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.$nextTick(() => {
              this.listContentScroll.refresh()
            })
          }
        }
        return show
      },
      selectFoodsIndex () {
        return this.selectFoods.map(item => item.dishid)
      }
    },
    mounted () {
      this.classify()
    },
    watch: {
      selectFoods: {
        handler: function () {
          this.classify()
        },
        deep: true
      }
    },
    methods: {
      classify () {
        this.selectFoods.map(item => {
          if (item.mealid === '1') {
            const isInArr = this.mealZao.map(item => Number(item.dishid)).indexOf(Number(item.dishid)) === -1
            console.log('mealZao', isInArr)
            if (isInArr) {
              this.mealZao.push(item)
            }
          } else if (item.mealid === '2') {
            const isInArr = this.mealWu.map(item => Number(item.dishid)).indexOf(Number(item.dishid)) === -1
            console.log('mealWu', isInArr)
            if (isInArr) {
              this.mealWu.push(item)
            }
          } else if (item.mealid === '3') {
            const isInArr = this.mealWan.map(item => Number(item.dishid)).indexOf(Number(item.dishid)) === -1
            console.log('mealWan', isInArr)
            if (isInArr) {
              this.mealWan.push(item)
            }
          }
        })
        this.mealZao = this.mealZao.filter(item => {
          return item.isSel
        })
        this.mealWu = this.mealWu.filter(item => {
          return item.isSel
        })
        this.mealWan = this.mealWan.filter(item => {
          return item.isSel
        })
        console.log('ttttttttttttt')
        console.log(this.mealZao)
      },
      toggleList () {
        if (this.totalCount && this.totalCount === 0) {
          return
        }
        this.fold = !this.fold
      },
      hideList () {
        this.fold = true
      },
      empty () {
        this.$emit('emptySel')
      },
      pay () {
        if (this.selectFoodsIndex.length === 0) {
          errorMsg(this, '菜单不能为空')
          return
        }
        if (!this.fold) {
          this.toggleList()
        }
        request({
          url: 'rest/insertBaseDayDishes',
          method: 'post',
          data: {
            date: this.curDate,
            role: this.curRole,
            campus_id: this.curCampus,
            dishnameidlist: JSON.stringify(this.selectFoodsIndex)
          }
        }).then(res => {
          if (res.data.errno === 0) {
            msg(this, '保存成功')
          } else {
            errorMsg(this, res.data.errmsg)
          }
        })
        // console.log('sfef')
        // console.log(this.selectFoodsIndex)
      },
      // 选中菜品
      cartSelFood (foodId, flag) {
        console.log('d', foodId, flag)
        console.log('f')
        console.log(this.selectFoods)
        this.selectFoods.map((fItem, index) => {
          if (Number(fItem.dishid) === Number(foodId)) {
            this.selectFoods.splice(index, 1)
          }
        })
        this.$emit('cartSelFood', foodId, flag)
        console.log('e')
        console.log(this.selectFoods)
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="scss">
  .shopcart {
    position: fixed;
    max-width: 540px;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 4;
    .content {
      display: flex;
      background: #141d27;
      color: rgba(255,255,255,.4);
      .content-left {
        flex: 1;
        font-size: 0;
        .logo-wrapper {
          padding: 6px;
          margin: 0 12px;
          background: #141d27;
          width: 56px;
          height: 56px;
          display: inline-block;
          position: relative;
          top: -10px;
          box-sizing: border-box;
          border-radius: 50%;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            line-height: 44px;
            &.highlight {
              background: rgb(0,160,220);
            }
            .iconfont {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
              &.highlight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
          }
        }
        .price {
          display: inline-block;
          height: 24px;
          line-height: 24px;
          vertical-align: top;
          margin-top: 12px;
          font-size: 16px;
          font-weight: 700;
          border-right: 1px solid rgba(255,255,255,.1);
          padding-right: 12px;
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          font-size: 10px;
          line-height: 24px;
          vertical-align: top;
          margin: 12px 0 0 12px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #4ea0df;
            color: #fff;
          }
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        &.drop-enter, &.drop-enter-active {
          transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
        }
        .inner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all .4s linear;
        }
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: -1;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active, &.fold-leave-active {
        transition: all 0.5s;
      }
      &.fold-enter, &.fold-leave-to {
        transform: translate3d(0, 0, 0);
      }
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,.1);
      .title {
        font-size: 14px;
        float: left;
        color: rgb(7,17,27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0,160,220);
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 231px;
      background: #fff;
      overflow: hidden;
      .food-type {
        list-style: none;
        padding: 10px 0 0;
        color: #5ca0e2;
        font-weight: bold;
      }
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        list-style: none;
        &:after {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7,17,27,.1);
          content: "";
        }
        &:last-child:after {
          border-top: 0;
        }
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
    .list-mask {
      position: fixed;
      max-width: 540px;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      background: rgba(7,17,27,.6);
      backdrop-filter: blur(10px);
      z-index: -2;
      opacity: 1;
      &.mask-fade-enter-active, &.mask-fade-leave-active {
        transition: all 0.3s;
      }
      &.mask-fade-enter, &.mask-fade-leave-to {
        opacity: 0;
      }
    }
  }
</style>
