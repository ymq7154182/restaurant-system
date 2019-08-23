<template>
  <div>
    <template v-if="loading">
      <loading></loading>
    </template>
    <div v-if="!loading && goods.length === 0" class="menu-no-data">
      <no-data></no-data>
    </div>
    <template v-if="!loading && goods.length !== 0">
      <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index)">
              <span class="text ">{{item.name}}</span>
           </li>
         </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul v-if="goods.length !== 0">
            <li v-for="item in goods" class="food-list food-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="food in item.foods" class="food-item ">
                  <div class="icon">
                    <img width="66" height="66" :src="food.dishimgurl || defaultImg">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.dishname}}</h2>
                    <p class="description">{{food.dishdesc}}</p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'underscore'
import request from '@/utils/request'
import BScroll from 'better-scroll'
import cartcontrol from '../components/cartcontrol/cartcontrol'
import loading from '../components/loading'
import noData from '../components/noData'

export default {
  components: {
    cartcontrol,
    noData,
    loading
  },
  data () {
    return {
      currentIndex: 0,
      loading: false,
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      camps: ['', '校本部', '清华园校区', '双榆树校区'],
      baseUrl: 'http://zhongkeruitong.top:80',
      defaultImg: 'https://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114'
    }
  },
  computed: {
    // currentIndex: {
    //   get () {
    //     for (let i = 0; i < this.listHeight.length; i++) {
    //       let height1 = this.listHeight[i]
    //       let height2 = this.listHeight[i + 1]
    //       if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
    //         return i
    //       }
    //     }
    //     return 0
    //   },
    //   set (v) {
    //     return v
    //   }
    // },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    },
    userRole () {
      return this.$store.state.user.userRole
    }
  },
  props: {
    nowDate: String,
    nowCamp: String
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this.initDailyMenu()
  },
  mounted () {
  },
  watch: {
    userRole () {
      this.initDailyMenu()
    },
    nowDate () {
      this.initDailyMenu()
    },
    nowCamp () {
      this.initDailyMenu()
    }
  },
  methods: {
    calIndex: _.throttle(function () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        console.log('ddd', this.scrollY, height1, height2)
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this.currentIndex = i
          return
        }
      }
    }, 500, true),
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        this.calIndex()
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight = []
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    // 获取当日菜单
    initDailyMenu () {
      if (this.nowDate === undefined || this.nowDate === '' || this.nowCamp === '') {
        return
      }
      this.loading = true
      const campusId = this.camps.indexOf(this.nowCamp)
      if (this.userRole === undefined || this.userRole === '') {
        return
      }
      const url = 'rest/getCommentInfo?role=' + this.userRole + '&date=' + this.nowDate + '&campus_id=' + campusId
      request({
        url: url,
        method: 'get'
      }).then(res => {
        this.loading = false
        if (res.data.errno === 0) {
          // mealid  早餐、中餐或晚餐（如1表示早餐
          // dishclassid 菜的类别（如1：肉类
          const mealNameMap = ['', '早餐', '中餐', '晚餐']
          const mealTypeMap = ['', '套餐', '小炒', '盖饭', '面点', '小吃', '清真', '其他']

          const listIndexMenu = []
          const listMenu = []

          // res.data.disheslist = tmpArr.concat(tmpArr, tmpArr, tmpArr, tmpArr)
          res.data.disheslist.map(item => {
            // item.dishimgurl = this.baseUrl + item.dishimgurl
            // item.dishimgurl = this.defaultImg
            const tmpIndex = listIndexMenu.indexOf(item.mealid + '-' + item.dishclassid)
            if (tmpIndex === -1) {
              listIndexMenu.push(item.mealid + '-' + item.dishclassid)
              listMenu[listIndexMenu.length - 1] = {
                name: mealNameMap[item.mealid] + '-' + mealTypeMap[item.dishclassid],
                type: listIndexMenu.length - 1,
                foods: [item]
              }
            } else {
              listMenu[tmpIndex].foods.push(item)
            }
          })
          this.goods = listMenu.sort(function (a, b) {
            const amealid = mealNameMap.indexOf(a.name.split('-')[0])
            const bmealid = mealNameMap.indexOf(b.name.split('-')[0])
            console.log(amealid, bmealid)
            return Number(amealid) - Number(bmealid)
          })

          setTimeout(() => {
            this._initScroll()
            this._calculateHeight()
          }, 20)
        } else {
          this.goods = []
        }
      })
    },
    selectMenu (index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let ref = foodList[index]
      this.currentIndex = index
      this.foodsScroll.scrollToElement(ref, 300)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/mixin.scss';

.goods {
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
  .foods-wrapper{
    flex: 1;
    & > ul {
      padding-bottom: 1px;
      padding-top: 10px;
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
    .food-item{
      display: flex;
      margin: 18px;
      &:last-child:after{
        border-top: 0;
      }
      .icon{
        flex: 0 0 66px;
        margin-right: 10px;
      }
      .content{
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);
          white-space: nowrap;
          overflow: hidden;
        }
        .description,
        .extra {
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
        .cart-wrapper{
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
