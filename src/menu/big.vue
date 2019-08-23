<template>
  <div class="big-screen">
    <div class="big-overlay">
      <div class="logo-back" :style="{'background-image': 'url(' + logoImg + ')'}"></div>
    </div>
    <div class="big-content">
      <over-roll></over-roll>
    </div>
  </div>
</template>
<script>
  import overRoll from './overRoll'
  export default {
    data () {
      return {
        logoImg: 'http://img3.imgtn.bdimg.com/it/u=2342726261,3398983232&fm=26&gp=0.jpg'
      }
    },
    components: { overRoll }
  }
</script>
<style lang="scss">
  .big-overlay {
    height: 100%;
    overflow: hidden;
    .logo-back {
      height: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      opacity: 0.4;
      &:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
        background: inherit;
        filter: blur(20px);
        z-index: 2;
      }
    }
  }
  .big-content {
    width: 80%;
    height: 80%;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 10%;
    left: 10%;
    border-radius: 10px;
    box-shadow: 2px 3px 5px rgba(0,0,0,0.2);
    .overroll {
      position: relative;
      top: 0;
    }
    .over-percent .per-item-title,
    .over-percent .per-item-num:after,
    .food-name {
      color: #fff;
    }
    .overroll-list .overroll-service .service-name {
      margin: 0 20px;
    }
    .overroll .overroll-title {
      margin-bottom: 0;
    }
    .overroll-list + .overroll-title {
      margin-top: 0;
    }
    .overroll-list .food-img,
    .overroll-list .food-name {
      display: inline-block;
    }
    .overroll-list .food-name {
      margin-top: 24px;
      vertical-align: top;
    }
  }
</style>