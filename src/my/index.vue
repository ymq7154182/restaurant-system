<template>
  <div class="my">
    <user-info></user-info>  
    <register ></register>  
  </div>
</template>
<script>
import { mapState } from 'vuex'
import userInfo from './info'
import register from '../register/regBlock'
export default {
  name: 'my',
  components: { userInfo, register },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.user.userRole
    })
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
  .feedback__header {
    line-height: 20px;
    padding: 10px 10px 10px 20px;
    position: relative;
    background: #fff;
  }
  .feedback__all {
    position: absolute;
    right: 10px;
    top: 10px;
    .iconfont {
      vertical-align: bottom;
      display: inline-block;
    }
  }
</style>
