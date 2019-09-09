<template>
  <div class="over-percent">
    <!--<div class="per-item good">-->
      <!--<div class="per-item-num">{{good}}</div>-->
      <!--<div class="per-item-title">满意率</div>-->
    <!--</div>-->
    <!--<div class="per-item bad">-->
      <!--<div class="per-item-num">{{bad}}</div>-->
      <!--<div class="per-item-title">不满意率</div>-->
    <!--</div>-->
    <div id="mycharts" style="width: 350px;height: 400px;margin: 0 auto"></div>
  </div>
</template>
<script>
export default {
  props: {
    good: String,
    bad: String,
    data1: Array
  },
  data () {
    return {
    }
  },
  mounted () {
    // this.initcharts()
    console.log('sdfef')
    console.log(this.data1)
    console.log(this.good)
  },
  methods: {
    initcharts () {
      let myChart = this.$echarts.init(document.getElementById('mycharts'))
      myChart.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
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
          data: [ '直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎' ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: [ 'pie', 'funnel' ]
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.data1,
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
    }
  }
}
</script>

<style lang="scss">
.over-percent {
  text-align: center;
  margin-bottom: 14px;
  .per-item {
    text-align: center;
    display: inline-block;
    width: 40%;
  }
  .good .per-item-num {
    color: #03b349;
  }
  .bad .per-item-num {
    color: #ef5252;
  }
  .per-item-num {
    font-size: 30px;
    position: relative;
    margin-left: 6px;
    &:after {
      color: #aaa;
      content: '%';
      font-size: 14px;
    }
  }
  .per-item-title {
    font-size: 14px;
    color: #aaa;
  }
}
</style>
