<template>
  <div>
    <template v-if="loading">
      <loading></loading>
    </template>
    <div class="menu-no-data" v-if="!loading && goods.length === 0">
      <!--<Search top="112px" class="search" style="line-height: 28px" v-model="searchValue" @on-change="getSearchFoods" @on-submit="getSearchFoods" @on-cancel="cancelClick"></Search>-->
      <!--<div>-->
        <!--<div style="float: left;width: 95%">-->
          <!--<no-data></no-data>-->
        <!--</div>-->
        <!--<div style="float: right">-->
          <!--<div style="line-height: 15px;margin-right: 5px;margin-top: 20px">-->
            <!--<ul style="list-style-type: none">-->
              <!--<li v-for="(item, index) in Words" @click="searchByWords(item)">{{item}}</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <no-data></no-data>

      <!--<div style="line-height: 15px">-->
        <!--<ul style="list-style-type: none">-->
          <!--<li v-for="(item, index) in Words" @click="searchByWords(item)">{{item}}</li>-->
        <!--</ul>-->
      <!--</div>-->
    </div>
    <template v-if="!loading && goods.length !== 0">
      <Search top="112px" class="search" v-model="searchValue" @on-change="getSearchFoods"  @on-submit="getSearchFoods"></Search>
      <div class="add-goods">
        <div class="menu-wrapper" ref="menuWrapper">
         <ul>
           <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index)" v-if="item.isShow2 === 1 || flag4 === 0">
             <span class="text border-1px">{{item.name}}</span>
           </li>
         </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li v-for="item in goods" class="food-list food-list-hook" v-if="item.isShow2 === 1 || flag4 === 0">
             <h1 class="title">{{item.name}}</h1>
             <ul>
              <li v-for="food in item.foods" v-if="food.isShow === 1 || flag4 === 0" >
                <div class="food-item border-1px" v-if="food.isShow === 1 || flag4 === 0">
                  <div class="icon">
                    <img width="66" height="66" :src="food.dishimgurl">
                    <!--<popup :value="oneShow" @on-hide="setOneShow(false)">-->
                    <!--<div class="overroll-one">-->
                    <!--<div class="one-close" @click="setOneShow(false)">-->
                    <!--<i class="iconfont iconguanbi"></i>-->
                    <!--</div>-->
                    <!--<div class="one-img">-->
                    <!--<img :src="food.dishimgurl" width="66" height="66">-->
                    <!--</div>-->
                    <!--<div class="one-info">-->
                    <!--<div class="name">{{food.dishname}}</div>-->
                    <!--<div class="meal">{{food.meal}}</div>-->
                    <!--<div class="desp">{{food.dishdesc || '暂无描述'}}</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</popup>-->
                    <span @click="gotoFood(food)" class="iconfont iconbianji"></span>
                    <span @click="delFood(food)" class="iconfont iconshanchu"></span>
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.dishname}}</h2>
                    <p class="description">{{food.dishdesc}}</p>
                    <div class="cart-wrapper">
                      <cartcontrol
                        :partent="'menu'"
                        :food="food"
                        @selFood="selFood"
                      ></cartcontrol>
                    </div>
                  </div>
                </div>


              </li>
             </ul>
            </li>
          </ul>
        </div>
        <div style="margin-top: 10px;width: 25px" ref="ByWords">
          <ul style="list-style-type: none">
            <li v-for="(item, index) in Words" @click="searchByWords(item)" style="padding-left: 5px">{{item}}</li>
          </ul>
        </div>
        <shopcart
          :curDate="curDate"
          :curRole="curRole"
          :curCampus="curCampus"
          :selectFoods="selectFoodsArr"
          @emptySel="emptySel"
          @cartSelFood="cartSelFood"></shopcart>
      </div>
    </template>
</div>
</template>

<script>
import _ from 'underscore'

import request from '@/utils/request'
import { msg, errorMsg } from '@/utils/common'

import BScroll from 'better-scroll'
import shopcart from '../components/shopcart/shopcart'
import cartcontrol from '../components/cartcontrol/cartcontrol'
import food from '../components/food/food'
import loading from '../components/loading'
import noData from '../components/noData'
import { Popup } from 'vux'
import Search from 'vux/src/components/search/index'

export default {
  components: {
    Search,
    loading,
    shopcart,
    cartcontrol,
    food,
    noData,
    Popup
  },
  data () {
    return {
      oneShow: false,
      currentIndex: 0,
      wordcolor: 'black',
      init: true,
      loading: false,
      searchValue: '',
      goods: [],
      pList: [], // 所有菜品平铺
      listHeight: [],
      scrollY: 0,
      selectFoods: [],
      Words: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      defaultImg: 'https://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114',
      openid: '',
      goodList: [],
      pingLists: [],
      goodList1: [],
      tmpArr: [],
      selectFoods2: [],
      selectFoods3: [],
      tmpArr2: [],
      pList1: [],
      flag2: 0,
      tmpArr3: [],
      goods2: [],
      flag3: 0,
      pList2: [],
      goods3: [],
      flag4: 0
    }
  },
  props: {
    seller: Object,
    curRole: String,
    curDate: String,
    curCampus: String
  },
  computed: {
    // currentIndex () {
    //   for (let i = 0; i < this.listHeight.length; i++) {
    //     let height1 = this.listHeight[i]
    //     let height2 = this.listHeight[i + 1]
    //     if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
    //       return i
    //     }
    //   }
    //   return 0
    // },
    selectFoodsArr () {
      const tmpArr = []
      this.selectFoods.map(id => {
        const tmpPIndex = this.pList.map(item => Number(item.dishid)).indexOf(Number(id))
        if (tmpPIndex !== -1) {
          tmpArr.push(this.pList[tmpPIndex])
        }
      })
      console.log('222222222')
      console.log(tmpArr)
      return tmpArr
    }
  },
  created () {
    this.init = true
    this.initDailyMenu()
  },
  mounted () {
    this.openid = localStorage.getItem('wechatopenid')
    this.flag4 = 0
  },
  watch: {
    goods: {
      handler: function () {
        this.selectFoods = []
        this.goods.map(item => {
          if (item.foods.length !== 0) {
            item.foods.map(fItem => {
              if (fItem.isSel) {
                this.selectFoods.push(fItem.dishid)
              }
            })
          }
        })
      },
      deep: true
    },

    curCampus () {
      this.initDailyMenu()
    },
    curDate () {
      this.initDailyMenu()
    },
    curRole () {
      this.initDailyMenu()
    }
  },
  methods: {
    // 数组中对象去重
    deteleObject (obj) {
      var uniques = []
      var stringify = {}
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i])
        keys.sort(function (a, b) {
          return (Number(a) - Number(b))
        })
        var str = ''
        for (var j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j])
          str += JSON.stringify(obj[i][keys[j]])
        }
        if (!stringify.hasOwnProperty(str)) {
          uniques.push(obj[i])
          stringify[str] = true
        }
      }
      // uniques = uniques
      return uniques
    },
    calIndex: _.throttle(function () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        console.log('ddd', this.scrollY, height1, height2, i)
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this.currentIndex = i
          return
        }
      }
    }, 500, true),
    setOneShow (flag) {
      this.oneShow = flag
    },
    _initScroll () {
      this.menuScroll = null
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = null
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.wordsScroll = null
      this.wordsScroll = new BScroll(this.$refs.ByWords, {
        click: true
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
    // 获取每日菜单
    getDailyMenu () {
      this.loading = true
      const url = 'rest/getCommentInfo?role=' + this.curRole + '&date=' + this.curDate + '&campus_id=' + this.curCampus
      request({
        url: url,
        method: 'get'
      }).then(res => {
        if (res.data.errno === 0) {
          console.log('d', res.data.disheslist)
          this.selectFoods = res.data.disheslist.map(item => Number(item.dishid))
        } else {
          this.selectFoods = []
        }
        this.getAllFoods()
        this.currentIndex = 0
      })
    },
    // 获取全部菜品
    getAllFoods () {
      request({
        url: 'rest/getBaseDishByRole?campus_id=' + this.curCampus + '&role=' + this.curRole,
        method: 'get'
      }).then(res => {
        this.currentIndex = 0
        this.loading = false
        if (res.data.errno === 0) {
          // mealid  早餐、中餐或晚餐（如1表示早餐
          // dishclassid 菜的类别（如1：肉类
          const mealNameMap = ['', '早餐', '中餐', '晚餐']
          const mealTypeMap = ['', '套餐', '小炒', '盖饭', '面点', '小吃', '清真', '其他']

          const listIndexMenu = []
          const listMenu = []

          const roleIndex = 0
          const tmpList = res.data.disheslist[roleIndex]
          const pingList = tmpList[0].concat(tmpList[1], tmpList[2])
          if (pingList.length === 0) {
            this.goods = []
            return
          }
          this.pList = pingList.map(item => {
            // item.dishimgurl = this.defaultImg
            item.isSel = (this.selectFoods.indexOf(Number(item.dishid)) !== -1)

            // 封装
            const tmpIndex = listIndexMenu.indexOf(item.mealid + '-' + item.dishclassid)
            if (item.mealid !== '' && (['1', '2', '3'].indexOf(item.mealid) !== -1)) {
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
            }
            return item
          })
          this.pList1 = this.pList
          // 排序
          this.goods = listMenu.sort(function (a, b) {
            const amealid = mealNameMap.indexOf(a.name.split('-')[0])
            const bmealid = mealNameMap.indexOf(b.name.split('-')[0])
            console.log(amealid, bmealid)
            return Number(amealid) - Number(bmealid)
          })

          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
            this.init = false
          })
          console.log('ffffffffffffffeeeeeeeeeeeeeee')
          console.log(this.goods)
          this.goods2 = this.goods
        } else {
          this.goods = []
        }
      })
    },
    // 搜索菜品
    getSearchFoods () {
      this.flag4 = 1
      this.goods.map(item => {
        this.$set(item, 'isShow2', 0)
        item.foods.map(item2 => {
          this.$set(item2, 'isShow', 0)
        })
      })
      request({
        url: 'rest/searchBaseDishes?campus_id=' + this.curCampus + '&role=' + this.curRole + '&dishname=' + this.searchValue,
        method: 'get'
      }).then((res) => {
        this.currentIndex = 0
        this.loading = false
        if (res.data.errno === 0) {
          // mealid  早餐、中餐或晚餐（如1表示早餐
          // dishclassid 菜的类别（如1：肉类
          const mealNameMap = ['', '早餐', '中餐', '晚餐']
          const mealTypeMap = ['', '套餐', '小炒', '盖饭', '面点', '小吃', '清真', '其他']

          const listIndexMenu = []
          const listMenu = []
          // var pingListss = []
          const roleIndex = 0
          const tmpList = res.data.disheslist[roleIndex]
          const pingList = tmpList[0].concat(tmpList[1], tmpList[2])
          if (pingList.length === 0) {
            this.goods3 = []
            return
          }

          // this.pList = this.pList.concat(pingList)
          // pingLists = pingList.concat(this.pList)
          this.pList2 = pingList.map(item => {
            // item.dishimgurl = this.defaultImg
            item.isSel = (this.selectFoods.indexOf(Number(item.dishid)) !== -1)

            // 封装
            const tmpIndex = listIndexMenu.indexOf(item.mealid + '-' + item.dishclassid)
            if (item.mealid !== '' && (['1', '2', '3'].indexOf(item.mealid) !== -1)) {
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
            }
            return item
          })
          // console.log(this.pingLists)
          // this.pList.push(pingListss)

          // 排序
          this.goods3 = listMenu.sort(function (a, b) {
            const amealid = mealNameMap.indexOf(a.name.split('-')[0])
            const bmealid = mealNameMap.indexOf(b.name.split('-')[0])
            console.log(amealid, bmealid)
            return Number(amealid) - Number(bmealid)
          })
          // this.goodList.push(this.goods)
          // this.goodList1 = this.goodList[this.goodList.length - 1]
          // console.log(this.goodList1)
          console.log('goods3')
          console.log(this.goods3)
          // console.log(this.pList2)
          // console.log(this.pList)
          this.goods3.map(item => {
            if (item.foods.length !== 0) {
              item.foods.map(item2 => {
                this.goods.map(item3 => {
                  if (item3.foods.length !== 0) {
                    item3.foods.map(item4 => {
                      if (Number(item2.dishid) === Number(item4.dishid)) {
                        this.$set(item4, 'isShow', 1)
                        this.$set(item3, 'isShow2', 1)
                      }
                    })
                  }
                })
              })
            }
          })
          console.log('goods')
          console.log(this.goods)
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
            this.init = false
          })
        } else {
          this.goods3 = []
        }
      })
    },
    searchByWords (item) {
      if (item === '#') {
        this.flag4 = 1
        this.goods.map(item => {
          this.$set(item, 'isShow2', 1)
          item.foods.map(item2 => {
            this.$set(item2, 'isShow', 1)
          })
        })
        // this.currentIndex = 0
        // this.goods = this.goodList
      } else {
        // console.log(this.currentIndex)
        // console.log(this.goods)
        this.flag4 = 1
        this.goods.map(item => {
          this.$set(item, 'isShow2', 0)
          item.foods.map(item2 => {
            this.$set(item2, 'isShow', 0)
          })
        })
        var dishclassid = ''
        dishclassid = this.goods[this.currentIndex].foods[0].dishclassid
        // console.log(dishclassid)
        var mealid = ''
        mealid = this.goods[this.currentIndex].foods[0].mealid
        // console.log(mealid)
        request({
          url: 'rest/getDishByLetter?role=' + this.curRole + '&campus_id=' + this.curCampus + '&dishclassid=' + dishclassid + '&mealid=' + mealid + '&letter=' + item,
          method: 'get'
        }).then((res) => {
          this.currentIndex = 0
          this.loading = false
          if (res.data.errno === 0) {
            // mealid  早餐、中餐或晚餐（如1表示早餐
            // dishclassid 菜的类别（如1：肉类
            const mealNameMap = ['', '早餐', '中餐', '晚餐']
            const mealTypeMap = ['', '套餐', '小炒', '盖饭', '面点', '小吃', '清真', '其他']

            const listIndexMenu = []
            const listMenu = []

            const roleIndex = 0
            const tmpList = res.data.disheslist[roleIndex]
            const pingList = tmpList[0].concat(tmpList[1], tmpList[2])
            if (pingList.length === 0) {
              this.goods3 = []
              return
            }
            this.pList2 = pingList.map(item => {
              // item.dishimgurl = this.defaultImg
              item.isSel = (this.selectFoods.indexOf(Number(item.dishid)) !== -1)

              // 封装
              const tmpIndex = listIndexMenu.indexOf(item.mealid + '-' + item.dishclassid)
              if (item.mealid !== '' && (['1', '2', '3'].indexOf(item.mealid) !== -1)) {
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
              }
              return item
            })

            // 排序
            this.goods3 = listMenu.sort(function (a, b) {
              const amealid = mealNameMap.indexOf(a.name.split('-')[0])
              const bmealid = mealNameMap.indexOf(b.name.split('-')[0])
              console.log(amealid, bmealid)
              return Number(amealid) - Number(bmealid)
            })
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
              this.init = false
            })
            this.goods3.map(item => {
              if (item.foods.length !== 0) {
                item.foods.map(item2 => {
                  this.goods.map(item3 => {
                    if (item3.foods.length !== 0) {
                      item3.foods.map(item4 => {
                        if (Number(item2.dishid) === Number(item4.dishid)) {
                          this.$set(item4, 'isShow', 1)
                          this.$set(item3, 'isShow2', 1)
                        }
                      })
                    }
                  })
                })
              }
            })
            console.log(this.goods)
          } else {
            this.goods3 = []
          }
        })
      }
    },
    cancelClick () {
      // this.searchValue = ''
      // this.pList = []
    },
    // 获取当日菜单
    initDailyMenu () {
      this.getDailyMenu()
    },
    // 切换左侧菜单
    selectMenu (index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      console.log('t', index, foodList)
      let ref = foodList[index]
      this.foodsScroll.scrollToElement(ref, 300)
      this.currentIndex = index
    },
    // 选中菜品
    selFood (food, flag) {
      this.$set(food, 'isSel', flag)
    },
    // 清空菜谱
    emptySel () {
      this.goods.map(item => {
        if (item.foods.length !== 0) {
          item.foods.map(fItem => {
            fItem.isSel = false
          })
        }
      })
    },
    // 切换选择菜品
    cartSelFood (foodId, flag) {
      this.goods.map(item => {
        if (item.foods.length !== 0) {
          item.foods.map(fItem => {
            if (Number(fItem.dishid) === Number(foodId)) {
              this.$set(fItem, 'isSel', flag)
            }
          })
        }
      })
    },
    gotoFood (item) {
      console.log(item)
      this.$router.push({ path: '/editFood/' + item.dishid })
    },
    delFood (item) {
      const _this = this
      this.$vux.confirm.show({
        content: '是否删除' + item.dishname,
        onCancel () {
        },
        onConfirm () {
          _this._delFoodAPI(item)
        }
      })
    },
    _delFoodAPI (item) {
      request({
        url: 'rest/delBaseDishes',
        method: 'post',
        data: {
          dishid: item.dishid,
          campus_id: this.curCampus,
          role: this.curRole,
          openid: this.openid
        }
      }).then(res => {
        this.loading = false
        if (res.data.errno === 0) {
          this.initDailyMenu()
          msg(this, '删除成功')
        } else {
          errorMsg(this, res.data.errormsg)
        }
      })
    }
  }
}
</script>


<style lang="scss">
.menu-no-data {
  line-height: 160px;
}
.add-goods {
  position: absolute;
  top: 152px;
  bottom: 48px;
  width: 100%;
  max-width: 540px;
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
        z-index: 1;
        .text:after{
          border-top: 0;
        }
      }
      .text{
        display: table-cell;
        vertical-align: middle;
        width: 56px;
        font-size: 12px;
        .icon {
          position: relative;
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
        .iconfont {
          display: inline-block;
          padding: 5px;
        }
      }
      .content{
        position: relative;
        flex: 1;
        .name{
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .description,.extra{
          font-size: 10px;
          line-height: 16px;
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
          top: -3px;
        }
      }
    }
  }
}
.search {
  .weui-search-bar__box .weui-icon-search {
    line-height: 58px;
  }
  .weui-search-bar__box .weui-icon-clear {
    line-height: 58px;
  }
}
.vux-prev-icon, .vux-next-icon {
  border-color: #00a0dc;
}
.inline-calendar td.current > span.vux-calendar-each-date {
  background-color: #00a0dc;
}

</style>
