<template>
  <div class="app-main">
    <div class="return-block">
      <i class="iconfont iconback" v-tap="[returnBack]"></i>
      <span style="font-size:14px;margin-left: -4px;padding-left: 4px;" v-tap="[returnBack]">{{returnText}}</span>
    </div>
    <router-view class="return-body"></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    returnText () {
      return this.$store.state.user.returnText
    },
    toUrl () {
      return this.$store.state.user.returnUrl
    }
  },
  methods: {
    returnBack () {
      if (this.toUrl !== '') {
        this.$router.push({ path: this.toUrl })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  html, body,
  #app,
  .app-main {
    height: 100%;
    margin: 0;
  }
  .return-block {
    display: inline-block;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    padding: 20px;
    * {
      vertical-align: middle;
    }
    .iconfont {
      height: 24px;
      width: 22px;
      display: block;
      border-radius: 30px;
      border: 1px solid #aaa;
      padding-left: 2px;
    }
  }
  .return-body {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
