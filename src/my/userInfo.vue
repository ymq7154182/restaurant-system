<template>
  <div class="user-info">
    <div class="user-info-we">
      <div class="we-img">
        <img :src="weImg">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'userInfo',
  computed: {
    ...mapState({
      openid: state => state.user.openid,
      weImg: state => state.user.userImg,
      userRole: state => state.user.userRole
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/color.scss';
  .user-info-we {
    padding: 30px 0 0 0;
    text-align: center;
  }
  .we-img {
    width: 80px;
    height: 80px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: 3px solid $green;
    }
  }
  .we-name {
    padding: 10px 40px;
  }
</style>
