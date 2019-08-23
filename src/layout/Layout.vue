<template>
  <div class="app-main ">
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from './navbar'
export default {
  components: { navbar },
  mounted () {
    this.$store.commit('SET_RETURN_TEXT', '')
    this.$store.commit('SET_RETURN_URL', '')
  }
}
</script>
<style type="text/css">
</style>
