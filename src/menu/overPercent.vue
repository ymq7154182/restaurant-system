<template>
  <div class="over-percent">
    <div class="per-item good">
      <div class="per-item-num">{{good}}</div>
      <div class="per-item-title">满意率</div>
    </div>
    <div class="per-item bad">
      <div class="per-item-num">{{bad}}</div>
      <div class="per-item-title">不满意率</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    good: String,
    bad: String
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
