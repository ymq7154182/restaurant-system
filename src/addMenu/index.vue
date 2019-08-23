<template>
  <div>
    <add-menu-header
      :curRole="curRole"
      :curDate="curDate"
      :curCampus="curCampus"
      @changeCampus="changeCampus"
      @changeDate="changeDate"
      @changeNav="changeNav"></add-menu-header>
    <add-menu-list
      :curCampus="curCampus"
      :curRole="curRole"
      :curDate="curDate"></add-menu-list>
  </div>
</template>
<script>
import addMenuHeader from './addMenuHeader'
import addMenuList from './addMenuList'
import { userGetDate } from '@/utils/common'

export default {
  components: {
    addMenuHeader,
    addMenuList
  },
  data () {
    return {
      curCampus: '1',
      curRole: '1',
      curDate: ''
    }
  },
  computed: {
    campusId () {
      return this.$store.state.user.campusId.toString()
    }
  },
  beforeMount () {
    this.curDate = userGetDate(new Date())
  },
  mounted () {
    this.curCampus = this.campusId
  },
  watch: {
    campusId () {
      this.curCampus = this.campusId
    }
  },
  methods: {
    changeCampus (id) {
      this.curCampus = id.toString()
    },
    changeNav (i) {
      this.curRole = i
    },
    changeDate (date) {
      this.curDate = date
    }
  }
}
</script>
<style lang="scss">

</style>
