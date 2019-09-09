<template>
  <div class="overroll">
    <div v-if="loading" style="width: 100%">
      <loading></loading>
    </div>
    <div class="overroll-wrapper" v-else ref="overrollWrapper">
      <div class="overroll-content">
        <div class="overroll-title">本周菜品</div>
        <!--<over-percent :good="foodGood" :bad="foodBad" :data1="data2"></over-percent>-->
        <div style="margin-bottom: 30px;margin-left: -30px;padding-right: 30px">
          <div id="mycharts" style="width: 350px;height: 400px;margin: 0 auto"></div>
        </div>
        <div class="circlehome">
          <div class="circle1">
            <span class="words">{{dishEvaluationPeopleNumber}}</span>
            <!--<div class="words">-->
              <!--<span>dfwef</span>-->
            <!--</div>-->
          </div>
          <div class="circle2">
            <span class="words2">{{foodPerTotal}}</span>
          </div>
        </div>
        <div class="circlehome2">
          <div>
            <span class="words3">菜品评价总人数</span>
          </div>
          <div>
            <span class="words3">菜品评价条数</span>
          </div>
        </div>

        <!--<food-percent :foodtotal="foodPerTotal"-->
                      <!--:foodPeopleNumber="dishEvaluationPeopleNumber"-->
                      <!--:goodtotal="foodTotalfavorite"-->
                      <!--:badtotal="totalFoodBad"-->
                      <!--:foodCommon="totalCommon">-->

        <!--</food-percent>-->

        <over-list @setOneShow="setOneShow" @setCurOne="setCurOne" :text="'最喜欢'" :type="'food'" :list="foodGoodList"></over-list>
        <over-list @setOneShow="setOneShow" @setCurOne="setCurOne" :text="'最不喜欢'" :type="'food'" :list="foodBadList"></over-list>
      <!-- </div> -->
      <!-- <div class="overroll-content"> -->
        <div class="overroll-title">本周服务</div>
        <!--<over-percent :good="serviceGood" :bad="serviceBad"></over-percent>-->
        <div style="margin-bottom: 30px;margin-left: -30px;padding-right: 30px">
          <div id="mycharts2" style="width: 350px;height: 400px;margin: 0 auto"></div>
        </div>
        <div class="circlehome">
          <div class="circle1">
            <span class="words">{{serviceEvaPeopleNumber}}</span>
            <!--<div class="words">-->
            <!--<span>dfwef</span>-->
            <!--</div>-->
          </div>
          <div class="circle2">
            <span class="words2">{{servicePerTotal}}</span>
          </div>
        </div>
        <div class="circlehome2">
          <div>
            <span class="words3">服务评价总人数</span>
          </div>
          <div>
            <span class="words3">服务评价条数</span>
          </div>
        </div>

        <!--<service-percent :servicetotal="servicePerTotal"-->
                         <!--:servicePeopleNumber="serviceEvaPeopleNumber"-->
                         <!--:servicegoodtotal="Servicelike"-->
                         <!--:servicebadtotal="ServiceTotalBad"-->
                         <!--:serviceCommon="CommonService">-->

        <!--</service-percent>-->

        <over-list @setOneShow="setOneShow" @setCurOne="setCurOne" :text="'最喜欢'" :type="'service'" :list="serviceGoodList"></over-list>
        <over-list @setOneShow="setOneShow" @setCurOne="setCurOne" :text="'最不喜欢'" :type="'service'" :list="serviceBadList"></over-list>
      </div>
    </div>
    <popup :value="oneShow" @on-hide="setOneShow(false)">
      <div class="overroll-one">
        <div class="one-close" @click="setOneShow(false)">
          <i class="iconfont iconguanbi"></i>
        </div>
        <div class="one-img">
          <img :src="curOne.dishimgurl">
        </div>
        <div class="one-info">
          <div class="name">{{curOne.dishname}}</div>
          <div class="meal">{{curOne.meal}}</div>
          <!--<div class="desp">{{curOne.dishdesc || '暂无描述'}}</div>-->
          <div class="desp">{{curOne.dishdesc}}</div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

import overList from './overList'
import overPercent from './overPercent'
import loading from '../components/loading'
import request from '@/utils/request'
import foodPercent from './foodPercent'
import servicePercent from './servicePercent'
import { Popup } from 'vux'

export default {
  components: {
    Popup,
    loading,
    overList,
    overPercent,
    foodPercent,
    servicePercent
  },
  data () {
    return {
      camps: ['', '校本部', '清华园校区', '双榆树校区'],
      oneShow: false,
      curOne: {},
      week: '',
      loading: false,
      foodGood: '',
      foodBad: '',
      foodGoodList: [],
      foodBadList: [],
      serviceGood: '',
      serviceBad: '',
      serviceGoodList: [],
      serviceBadList: [],
      foodPerTotal: '',
      servicePerTotal: '',
      dishEvaluationPeopleNumber: '',
      serviceEvaPeopleNumber: '',
      foodTotalfavorite: '',
      totalCommon: '',
      totalFoodBad: '',
      Servicelike: '',
      CommonService: '',
      ServiceTotalBad: '',
      data2: [
        {value: 335, name: '不满意'},
        {value: 310, name: '一般', itemStyle: {color: '#D48265'}},
        {value: 234, name: '满意', itemStyle: {color: '#91C7AE'}}
      ],
      data3: [
        {value: 335, name: '不满意'},
        {value: 310, name: '一般', itemStyle: {color: '#D48265'}},
        {value: 234, name: '满意', itemStyle: {color: '#91C7AE'}}
      ]
    }
  },
  props: {
    nowWeek: String,
    nowDate: String,
    nowCamp: String,
    nowRole: String
  },
  computed: {
    userRole () {
      return this.$store.state.user.userRole
    }
  },
  watch: {
    userRole () {
      this.initOverroll()
    },
    nowWeek () {
      this.initOverroll()
    },
    nowCamp () {
      this.initOverroll()
    },
    nowRole () {
      this.initOverroll()
    }
  },
  mounted () {
    console.log('mounted', this.nowWeek, this.userRole, this.nowCamp)

    this.initOverroll()
    // this.getData()
  },
  updated () {
    this.initcharts()
    this.initcharts2()
  },
  methods: {
    setOneShow (flag) {
      this.oneShow = flag
    },
    setCurOne (obj) {
      this.setOneShow(true)
      this.curOne = obj
    },
    _initScroll () {
      this.overrollScroll = new BScroll(this.$refs.overrollWrapper, {
        click: true
      })
    },
    initOverroll () {
      if (this.nowRole === '') {
        return
      }
      if (this.nowWeek === '') {
        return
      }
      const campusId = this.camps.indexOf(this.nowCamp)
      if (campusId === 0 || campusId === -1) {
        return
      }
      this.loading = true
      request({
        url: 'rest/getWeekStatisticsinfo',
        method: 'post',
        data: {
          campus_id: campusId,
          role: this.userRole === '3' ? this.nowRole : this.userRole,
          week: this.nowWeek
        }
      }).then(res => {
        this.loading = false
        if (res.data.errno === 0) {
          // 菜品
          this.foodGood = this.getPercent(res.data.statisticsinfo.satisfactionRateOfDishes) || '0'
          this.foodBad = this.getPercent(res.data.statisticsinfo.dissatisfactionRateOfDishes) || '0'
          this.foodGoodList = res.data.statisticsinfo.favoriteDish || []
          this.foodBadList = res.data.statisticsinfo.dislikedDishes || []
          // 菜品总评价数
          this.foodPerTotal = this.getPercent(res.data.statisticsinfo.dishEvaluateTotal) || '0'
          // console.log('菜品总评价数===' + this.foodPerTotal)

          // 菜品评价人数
          this.dishEvaluationPeopleNumber = this.getPercent(res.data.statisticsinfo.dishEvaluationPeopleNumber) || '0'

          // 菜品满意数
          this.foodTotalfavorite = this.getPercent(res.data.statisticsinfo.totalFavorite) || '0'
          this.data2[2].value = this.foodTotalfavorite

          // 菜品一般数
          this.totalCommon = this.getPercent(res.data.statisticsinfo.totalCommonDish) || '0'
          this.data2[1].value = this.totalCommon

          // 菜品不满意数
          this.totalFoodBad = this.getPercent(res.data.statisticsinfo.totalDishBad) || '0'
          this.data2[0].value = this.totalFoodBad
          // 服务
          this.serviceGood = this.getPercent(res.data.statisticsinfo.serviceSatisfactionRate) || '0'
          this.serviceBad = this.getPercent(res.data.statisticsinfo.serviceDissatisfactionRate) || '0'
          this.serviceGoodList = res.data.statisticsinfo.satisfactoryService.map(item => item.satisfactoryService) || []
          this.serviceBadList = res.data.statisticsinfo.unsatisfactoryService.map(item => item.unsatisfactoryService) || []
          // 服务总评价数
          this.servicePerTotal = this.getPercent(res.data.statisticsinfo.serviceEvaluateTotal) || '0'

          // 服务评价人数
          this.serviceEvaPeopleNumber = this.getPercent(res.data.statisticsinfo.serviceEvaluationPeopleNumber) || '0'

          // 服务满意数
          this.Servicelike = this.getPercent(res.data.statisticsinfo.totalServicelike) || '0'
          this.data3[2].value = this.Servicelike

          // 服务一般数
          this.CommonService = this.getPercent(res.data.statisticsinfo.totalCommonService) || '0'
          this.data3[1].value = this.CommonService

          // 服务不满意数
          this.ServiceTotalBad = this.getPercent(res.data.statisticsinfo.totalServiceBad) || '0'
          this.data3[0].value = this.ServiceTotalBad
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
    },
    initcharts () {
      let myChart = this.$echarts.init(document.getElementById('mycharts'))
      myChart.setOption({
        title: {
          text: '本周菜品用户评价反馈情况',
          // subtext: '纯属虚构',
          x: 60
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          // bottom: -25,
          // left: 'center',
          x: 'center',
          y: 'bottom',
          data: [ '满意', '一般', '不满意' ]
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: {
        //       show: true,
        //       type: [ 'pie', 'funnel' ]
        //     },
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },
        series: [
          {
            name: '本周菜品',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.data2,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    initcharts2 () {
      let myChart = this.$echarts.init(document.getElementById('mycharts2'))
      myChart.setOption({
        title: {
          text: '本周服务用户评价反馈情况',
          // subtext: '纯属虚构',
          x: 60
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          // bottom: -25,
          // left: 'center',
          x: 'center',
          y: 'bottom',
          data: [ '满意', '一般', '不满意' ]
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: {
        //       show: true,
        //       type: [ 'pie', 'funnel' ]
        //     },
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },
        series: [
          {
            name: '本周服务',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.data3,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    getPercent (str) {
      if (isNaN(str)) {
        return '0'
      } else {
        return Number(str).toFixed(0)
      }
    },
    getData () {
      request({
        url: 'rest/getWeekStatisticsinfo',
        method: 'post',
        data: {
          role: '1',
          campus_id: 1,
          week: 7
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss">
.overroll {
  position: absolute;
  top: 144px;
  bottom: 0;
  width: 100%;
  display: flex;
  overflow: hidden;
  padding: 0 0 20px 0;
  .overroll-wrapper {
    flex: 1;
  }
  * {
    list-style: none;
  }
  .overroll-content {
    padding: 30px;
  }
  .overroll-content + .overroll-content {
    margin-top: 20px;
  }
  .overroll-title {
    margin-left: -30px;
    padding: 4px 20px;
    margin-bottom: 10px;
    background: #00a0dc;
    color: #fff;
    width: 60px;
    text-align: center;
    border-radius: 0 6px 16px 0;
  }
}

.overroll-one {
  position: relative;
}
.one-close {
  position: absolute;
  right: 14px;
  top: 14px;
  background: rgba(0,0,0,0.5);
  width: 24px;
  height: 24px;
  border-radius: 30px;
  text-align: center;
  line-height: 24px;
  .iconfont {
    font-size: 12px;
    color: #fff;
  }
}
.one-img {
  width: 100%;
  height: 300px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.one-info {
  background: #fff;
  padding: 14px 20px 20px;
  .name {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .meal {
    margin-bottom: 4px;
  }
}
.circlehome {
  /*position: absolute;*/
  height: 80px;
  width: 320px;
  //left: 50%;
  //top: 42%;
  //transform: translate(-50%, 0);
  display: flex;
  margin: 0 auto;
  padding-right: 30px;
}
.circlehome2 {
  /*position: absolute;*/
  height: 80px;
  width: 350px;
  //left: 50%;
  //top: 42%;
  //transform: translate(-50%, 0);
  display: flex;
  margin: 0 auto;
  padding-right: 20px;
}
.circlehome2 div {
  flex: 1;
  margin-right: 25px;
  margin-left: 40px;
  margin-top: 20px;
}
.circlehome div {
  flex: 1;
  margin-right: 40px;
  margin-left: 40px;
}
.circle1 {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align:center;
  /*background-color: red;*/
  border: 2px solid #FF0033;
}
.circle2 {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align:center;
  border: 2px solid #66CCCC;
}
  .words {
    vertical-align:middle;
    line-height: 80px;
    color: #FF0033;
    font-weight: bold;
    font-size: 20px;
  }
  .words2 {
    vertical-align:middle;
    line-height: 80px;
    color: #66CCCC;
    font-weight: bold;
    font-size: 20px;
  }
  .words3 {
    color: #aaa;
    font-size: 14px;
  }
</style>
