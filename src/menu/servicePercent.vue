<template>
  <div class="over-percent1">
    <div class="per-item1 good1">
      <div class="per-item-num12">{{servicePeopleNumber}}</div>
      <div class="per-item-title1">评价总人数</div>
    </div>
    <div class="per-item1 bad1">
      <div class="per-item-num1">{{servicetotal}}</div>
      <div class="per-item-title1">服务总评价数</div>
    </div>
    <div class="per-item1 good1">
      <div class="per-item-num1">{{servicegoodtotal}}</div>
      <div class="per-item-title1">服务满意总数</div>
    </div>
    <div class="per-item1 bad1">
      <div class="per-item-num1">{{servicebadtotal}}</div>
      <div class="per-item-title1">服务不满意总数</div>
    </div>
    <!--<div class="per-item1 good1">-->
      <!--<div class="per-item-num1">{{serviceCommon}}</div>-->
      <!--<div class="per-item-title1">服务一般总数</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'servicePercent',
    props: {
      servicetotal: String,
      servicePeopleNumber: String,
      servicegoodtotal: String,
      servicebadtotal: String,
      serviceCommon: String
    }
  }
</script>

<style lang="scss">
  .over-percent1 {
    text-align: center;
    margin-bottom: 14px;
    .per-item1 {
      text-align: center;
      display: inline-block;
      width: 40%;
    }
    .good1 .per-item-num1 {
      color: #03b349;
    }
    .bad1 .per-item-num1 {
      color: #ef5252;
    }
    .good1 .per-item-num12 {
      color: #03b349;
    }
    .per-item-num1 {
      font-size: 30px;
      position: relative;
      margin-left: 6px;
      &:after {
        color: #aaa;
        content: '条';
        font-size: 15px;
      }
    }
    .per-item-num12 {
      font-size: 30px;
      position: relative;
      margin-left: 6px;
      &:after {
        color: #aaa;
        content: '人';
        font-size: 15px;
      }
    }
    .per-item-title1 {
      font-size: 14px;
      color: #aaa;
    }
  }
</style>
