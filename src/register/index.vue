<template>
  <div>
    <user-info></user-info>
    <popup-picker
      title="用户类型"
      :value="[userType]"
      :data="types"
      :columns="1"
      @on-change="selType"></popup-picker>
    <register></register>

</div>
</template>
<script>
import formMixin from './formMixin.js'
import userInfo from '../my/info'
import register from './regBlock'
export default {
  mixins: [formMixin],
  components: { userInfo, register },
  data () {
    return {
      Show: false,
      userType: '学生',
      types: ['老师', '学生', '工作人员']
    }
  },
  computed: {
    img () {
      return this.$store.state.user.userImg
    },
    openid () {
      return this.$store.state.user.openid
    }
  },
  mounted () {
  },
  methods: {
    selType (item) {
      this.userType = item[0]
      const id = this.types.indexOf(this.userType) + 1
      this.$store.commit('SET_USR_TYPE', id)
    }
  }
}
</script>

